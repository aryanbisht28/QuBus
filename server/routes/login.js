const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const nodemailer = require("nodemailer")
const sendMail = require("../utils/sendMail")
const jwt = require("jsonwebtoken")


router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const users = await User.find({ email: req.body.email });
    // console.log("users",users)
    if (users.length > 1) {
      res.status(200).send({ message: "Analyst+Manager" });
    } else {
      const user = await User.findOne({ email: req.body.email });
      // console.log("user", user);
      if (!user) {
        return res.send({ message: "Invalid Email" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) return res.send({ message: "Invalid Password" });

      const UserData = await User.findOne({ email: req.body.email }).exec();
      // console.log("User Data", UserData);
      const data = {};
      data["name"] = UserData.name;
      data["email"] = UserData.email;
      data["type"] = UserData.type;
      res.status(200).send({ data: data, message: "logged in successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error11" });
  }
});

router.post("/both", async (req, res) => {
  try {
    // console.log('body',req.body)
    const { error } = validate1(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email, type:req.body.type });
      // console.log("user", user);
      if (!user) {
        return res.send({ message: "Invalid Email" });
      }
      // console.log('sahi hai1',user)

      // console.log('body pass',req.body.password,'user pass',user.password)
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      // console.log('sahi hai2',validPassword)

      if (!validPassword) return res.send({ message: "Invalid Password" });
      // console.log('sahi hai')
      const UserData = await User.findOne({ email: req.body.email, type:req.body.type  }).exec();
      // console.log("User Data", UserData);
      const data = {};
      data["name"] = UserData.name;
      data["email"] = UserData.email;
      data["type"] = UserData.type;
      res.status(200).send({ data: data, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error11" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

const validate1 = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    type:Joi.string().required().label("typenation")
  });
  return schema.validate(data);
};

router.post("/sendpasswordlink" , async(req, res) => {
  console.log(req.body)
  // const {email} = req.body 
  try{
    const oldUser = await User.findOne({email: req.body.email});
    if(!oldUser){
      return res.send("User Not Exists!!");
    }
    console.log("userfind", oldUser)
    // const token = jwt.sign()
    
    const secret = process.env.JWTPRIVATEKEY + oldUser.password;
    const token = jwt.sign({id: oldUser._id , email: oldUser.email}, secret, {expiresIn: "5m"});
    // console.log("bhadwa")
    const link =  `<p>Dear ${oldUser.name},</p>` + "<p>We recently received a request to reset the password associated with your account. To proceed with resetting your password, please click on the following link:</p>"+
    `<p>http://localhost:3000/newpassword/${oldUser._id}/${token}</p>` + "<p>Please note that for security reasons, the link provided above will expire within 5 Minutes. If the link expires, you can always request another password reset by visiting our website and following the necessary steps.</p>"
    + "<p>Thanks & Regards<br>Support Team</br></p>"
    // console.log(link)
    await sendMail( oldUser.email, "", "Reset Password", link )
  }
  catch(error){
    res.status(500).send({ message: "Internal Server Error11" })
  }
})

router.get("/forgotpassword/:id/:token" , async(req,res) => {
  const{id , token} = req.params;
  // console.log(id,token)
  try{
    const validuser = await User.findOne({_id:id});
    // const verifyToken = jwt.verify(token, process.env.JWTPRIVATEKEY+validuser.password)
    if(validuser){
      res.status(201).json({status:201,validuser})
    }
    // console.log(validuser)
  }catch{
    res.status(500).send({ message: "Internal Server Error11" })
  }

  // console.log(req.params)
})

router.patch("/updatepassword" , async(req, res) => {
   try{
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.findOne({ _id : req.body._id });
      console.log("connected");
      if (user) {
        const _id = user["_id"];
        User.findByIdAndUpdate(
          _id,
          {
            password: hashPassword,
          },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              res.send("Successful");
            }
          }
        );
      }
      console.log("connected1");
   }catch{
    res.status(500).send({ message: "Internal Server Error11" })
   }
})

router.patch("/changepassword" , async(req, res) => {
  try{
    console.log(req.body)
     const user = await User.findOne({ email : req.body.email , type: req.body.type});
     const salt = await bcrypt.genSalt(Number(process.env.SALT));
     const hashPassword = await bcrypt.hash(req.body.password, salt);
     const validPassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password
    );
    if (!validPassword){
       return res.send("Invalid Password")
      };
     console.log("connected");
     if (user) {
       const _id = user["_id"];
       User.findByIdAndUpdate(
         _id,
         {
           password: hashPassword,
         },
         function (err, docs) {
           if (err) {
             console.log(err);
           } else {
             res.send("Successful");
           }
         }
       );
     }
     console.log("connected1");
  }catch{
    res.status(500).send({ message: "Internal Server Error11" })
  }
})

module.exports = router;

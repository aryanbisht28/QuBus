import PropTypes from "prop-types";
import { Box } from "@mui/material";
import MainCard from "../ui-component/cards/MainCard";

const AuthCardWrapper = ({ children, ...other }) => (
  <MainCard
    style={{
      borderRadius: "32.222px",
      border: " 2.417px solid rgba(255, 255, 255, 0.49)",
      background: "rgba(83, 88, 218, 0.28)",
      backdropFilter: "blur(10.06944465637207px)",
    }}
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthCardWrapper;

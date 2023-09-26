// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import './index.css';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();


// /*index.js*/
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './store/reduxStore';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );



// import { createRoot } from 'react-dom/client';

// // third party
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';

// // project imports
// import * as serviceWorker from './serviceWorker';
// import App from './App';
// import { createStore, applyMiddleware } from 'redux'; 

// import config from './config';
// const store = createStore(() => [], {}, applyMiddleware());



// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//     <Provider store={store}>
//         <BrowserRouter basename={config.basename}>
//             <App />
//         </BrowserRouter>
//     </Provider>
// );

// serviceWorker.unregister();


import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
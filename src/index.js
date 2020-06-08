import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Home';
import Head from './Head';
import Foot from './Foot';
import * as serviceWorker from './serviceWorker';
import { Router, Route , Redirect} from 'react-router'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// React.render((
//   <Router>
//     <Route path="/" component={App}>
//     </Route>
//   </Router>
// ),   document.getElementById('root'))

ReactDOM.render(
  <Router history={history}>
    <Head />
    
    <Redirect path="/" to="/home" />
    <Route path="/home">
      <App />
    </Route>
    <Route path="/test">
      <Foot />
    </Route>
    <Foot />
  </Router>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

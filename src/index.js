import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Home';
import Head from './Head';
import Foot from './Foot';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


const hashLinkScroll = () => {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}
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
  <Router history={history}   onUpdate={hashLinkScroll}>
    <Head />
    
    <Redirect path="/" to="/home" />
    <Route path="/home" onEnter={hashLinkScroll}>
      <App />
    </Route>
    <Route path="/test">
      <Foot />
    </Route>
    <Route path="/test1">
      <Head />
    </Route>
    <Foot />
  </Router>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

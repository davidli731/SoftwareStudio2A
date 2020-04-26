import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "./home.js";
import Login from "./users/login.js";
import Register from "./users/register.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./circuit/main.js";
/**
* This file initialises all pages so they are able to appea
* To make a new page, you need to add the following in this file
* Make sure to change the following to suit your page
* path = the url extension
* <Home /> = the imported file from above. This is called whatever you imported it as

          <Route exact={true} path='/' render={() => ( <-- the path is the url extension : i.e. login would be /login
            <div className="App">
              <Home />  <-- this is the file you imported above
            </div>
          )}/>

* To make a new file, please copy and paste the below template
* Make sure to rename the class whatever the file is called

          import React, { Component } from 'react';
          import 'bootstrap/dist/css/bootstrap.min.css';
          import NavBar from "../components/navBar.js";

          export default class Register extends Component {
            render() {
              return (
                <div className="App">
                  <NavBar />
                  <body className="App-body">

                  </body>
                </div>
              );
            }
          }

*/

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>

            <Route exact={true} path='/' render={() => (
              <div className="App">
                <Login />
              </div>
            )}/>

            <Route exact={true} path='/register' render={() => (
              <div className="App">
                <Register />
              </div>
            )}/>

            <Route exact={true} path='/dnd' render={() => (
              <div className="App">
                <Main />
              </div>
            )}/>

            </div>
          </BrowserRouter>
      );
    }
  }

  export default App;

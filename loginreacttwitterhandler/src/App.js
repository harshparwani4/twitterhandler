import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing'
import Twitter from './components/TwitterHandler'
import Messenger from './components/Messenger';
import LoginRoutes from './LoginRoutes';
import Page404 from './components/Page404';

import {accessGranted} from './components/UserFunctions';

import './App.css';

export default function App() {

  let [isUserAuthenticated, setIsUserAuthenticated] = useState(null);  
  let [error, setError] = useState('');
  let [triggerUpdate, setTriggerUpdate]=useState(0);
        
  const fetchInformation = async () =>{
        const userToken = window.localStorage.getItem('usertoken') ;
        console.log('usertoken', userToken)
        if(userToken){
        const request={authorization:userToken};
         await accessGranted(request).then(res=>{
         if(!res || res.error){

            setError('Please Login To Continue');
            setIsUserAuthenticated(false);
        }
        else{
            setIsUserAuthenticated(true);
        }
    });
    }

    else{

        setError('Register First and Login');
      setIsUserAuthenticated(false);
    }
}

      useEffect(()=>{
      fetchInformation();

    },[triggerUpdate]);

 return (
      <Router>
        <div className="App">
        <Switch>
          <Route  exact  path="/" render={props=><Landing isUserAuthenticated={isUserAuthenticated}  setTriggerUpdate={setTriggerUpdate} error={error} {...props}/>}/>
          <LoginRoutes isUserAuthenticated={isUserAuthenticated} error={error} path="/twitter" component={Twitter} />
          <LoginRoutes  isUserAuthenticated={isUserAuthenticated} error={error} path="/messenger" component={Messenger} />

          <LoginRoutes iUserAuthenticated={isUserAuthenticated} error={error} component={Page404}/>
        </Switch>
        </div>
      </Router>
    );
  }

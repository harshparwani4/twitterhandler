import React, { useState, useEffect } from 'react'
import Register from './Register';
import {accessGranted} from './UserFunctions';
import Login from './Login';

export default function Landing(props) {
            
          let [isUserAuthenticated, setIsUserAuthenticated] = useState(null);  
        useEffect(()=>{


        const userToken = window.localStorage.getItem('usertoken') ;

        if(userToken){
        const request={authorization:userToken};
        accessGranted(request).then(res=>{
         if(res.error){
            setIsUserAuthenticated(false);
        }
        else{
            setIsUserAuthenticated(true);
        }
    });
    }

    else{

    setIsUserAuthenticated(false);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
     },[]);

        const reRoute = ()=>{
            props.history.push('/twitter');
        }


        return (
                isUserAuthenticated===null?(<h2>Loading</h2>):
                (
                    <div>
                {
                    !isUserAuthenticated?(<div className="container">
                <div className="jumbotron row">
                    <div className="col-sm-6 col-xs-6">
                        <Register/>
                        </div>
                        <div className="col-sm-6 col-xs-3">
                        <Login/>
                        </div>
                </div>
            </div>):<div>{reRoute()}</div>}
                    </div>)
        )
}
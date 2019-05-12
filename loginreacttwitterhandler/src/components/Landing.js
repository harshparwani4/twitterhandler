import Register from './Register';
import Login from './Login';

import React from 'react'

import {Redirect} from 'react-router';

export default function Landing(props) {
            
    
    const {location:{state={}}={}, isUserAuthenticated} = props;

    console.log('isUserAuthenticated',isUserAuthenticated, state);
    const {error}=state;          
        return (
            isUserAuthenticated===null?(<h2>Loading</h2>):(
                <div>
                {
                !isUserAuthenticated?<div className="container">
                <div className="jumbotron row">
                   
                    <div className="col-sm-6 col-xs-6">
                        <Register {...props}/>
                    </div>
                    <div className="col-sm-6 col-xs-3">
                        <Login {...props} setTriggerUpdate={props.setTriggerUpdate}/>
                    </div>
                     {

                        error?(<div className="col-sm-6 col-xs-6 text-center">{error}</div>):null
                    }
                </div>
            </div>:(
                <Redirect to={{
                            pathname:'/twitter',
                        }}/>
                        )
        }
            </div>)
        )
}
import React from 'react'
import Register from './Register';
import Login from './Login';

export default function Landing(props) {
        const isLocalStoragePresent = !!window.localStorage.getItem('usertoken') ;

        const reRoute = ()=>{

            console.log('Inside123');
            props.history.push('/twitter');
        }
        return (
            !isLocalStoragePresent?(<div className="container">
                <div className="jumbotron row">
                    <div className="col-sm-6 col-xs-6">
                        <Register/>
                        </div>
                        <div className="col-sm-6 col-xs-3">
                        <Login/>
                        </div>
                </div>
            </div>):<div>{reRoute()}</div>
        )
}

import React from 'react';


import {Route} from 'react-router-dom';
import {Redirect} from 'react-router';


export default function LoginRoutes(props){

	const {isUserAuthenticated, error} =props
	console.log('error',error);
	const {component:Comp, path, ...remainingProps} = props;
	return (
			isUserAuthenticated===null?(<h2>Loading</h2>):
			(<div>
					<Route  path={path} {...remainingProps} render={props=>{
						return isUserAuthenticated?
						(<Comp {...props}/>):
						(<Redirect to={{
							pathname:'/',
							state:{
								prevLocation: path,
                				error: error.length? error:'You need to Login First' ,
							},
						}}/>);
					}}/>
				</div>)
		)
}

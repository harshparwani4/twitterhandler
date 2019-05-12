
import React from 'react'

import { Link } from "react-router-dom";


export default function Page404() {

        return (
            <div className="container">
                <div className="jumbotron row">
                        <div className="col-md-6 mt-5 mx-auto text-center">

                        <h1>404</h1>
                          <h2>Page Not Found</h2>
                        <Link to="/">
                        <button type="submit" style={{fontSize:'20px'}} className="btn btn-lg btn-primary btn-block">
                                <span style={{paddingLeft:"5px"}}>Go to the Home Page</span>
                        </button>
                        </Link>
                    </div>  
                </div>
                </div>
                )
    }
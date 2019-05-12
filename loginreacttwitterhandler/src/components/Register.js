import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            message:'',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

         register(user).then(res=>
            {
            if(res.error)
            {this.setState({
                message:res.error
            })
    }
    else{
        this.setState({
                message:"Registration SuccesFul. Login To Continue."
            });
    }
}
    );
        }

    render () {
        return (    
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                            {this.state.message.length?<div>{this.state.message}</div>:null}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
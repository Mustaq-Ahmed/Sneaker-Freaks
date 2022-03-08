import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { signup } from '../auth/helper/index'
import Base from '../core/Base'


export default function Signup() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    const { name, email, password, error, success } = values


    const inputChangeHandler = (inputVal) => (e) => {
        setValues({
            ...values,
            error: false,
            [inputVal]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(values)
        setValues({
            ...values,
            error: false
        })
        signup({ name, email, password })
            .then((data) => {    
                if (data.error) { 
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true      // because we got the response from the backend
                    })
                }
            })
            .catch((err) => console.log("Error in SIGNUP"))
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}>
                        New Account was Successfully created, please <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group  mb-2">
                            <label className="text-light">Name</label>
                            <input className='form-control' type="text" onChange={inputChangeHandler("name")} value={name} />
                        </div>
                        <div className="form-group mb-2">
                            <label className="text-light">Email</label>
                            <input className='form-control' type="email" onChange={inputChangeHandler("email")} value={email} />
                        </div>
                        <div className="form-group mb-2">
                            <label className="text-light">Password</label>
                            <input className='form-control' type="password" onChange={inputChangeHandler("password")} value={password} />
                        </div>
                        <button onClick={submitHandler} className="btn btn-success btn-block offset-5">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='Signup Page' description='A page for user to creating an account'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

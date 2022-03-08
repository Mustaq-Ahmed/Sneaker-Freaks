import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Base from '../core/Base'

import { signin, authenticate, isAuthenticated } from '../auth/helper/index'

export default function Signin() {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        isLoading: false,
        didRiderect: false     // after signin user should be redirect to some other component
    })
    const { email, password, error, isLoading, didRiderect } = values

    let { user } = isAuthenticated()  // returns FALSE or TOKEN and USER

    const inputChangeHandler = (inputVal) => (e) => {
        setValues({
            ...values,
            error: false,
            [inputVal]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            error: false,
            isLoading: true,
        })

        signin({ email, password })
            .then((data) => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        isLoading: false
                    })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRiderect: true
                        })
                    })
                }
            })
            .catch((err) => console.log("Signin request failed"))
    }

    const performRedirect = () => {
        if (didRiderect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            isLoading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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



    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
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
        <Base title='User Signin' description='A page for user to signin'>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

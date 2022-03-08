import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../core/Menu'
import { sendEmail } from './helper/contactUsHelper'


export default function ContactUsForm() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
        error: "",
        success: ""
    })

    const { name, email, message, error, success } = values

    const goToUserDashboard = () => {
        return (
            <div className="mt-3">
                <Link className='btn btn-block btn-success mb-3' to="/user/dashboard">User Home</Link>
            </div>
        )
    }

    const inputChangeHandler = (inputVal) => (e) => {
        setValues({
            ...values,
            error: "",
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
        let data = {
            name,
            email,
            message
        }
        sendEmail(data)
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
                        message: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch((err) => console.log("Error in SEND EMAIL"))
    }


    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}>
                        Message Sent Successfully, Thanks for Contacting Us
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


    return (
        <div>
            <Menu />
            <div style={{marginTop: "75px"}} className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center my-4">
                    <h1 className='text-warning'>Contact Us Form</h1>
                    <h4>Fill out this form and convey your message we are keen to know your wants</h4>
                </div>

                {goToUserDashboard()}
                {errorMessage()}
                {successMessage()}

                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                            <div className="form-group  mb-2">
                                <label className="text-light">Name</label>
                                <input className='form-control' type="text" value={name} onChange={inputChangeHandler("name")} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-light">Email</label>
                                <input className='form-control' type="email" value={email} onChange={inputChangeHandler("email")} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-light d-block">Message</label>
                                <textarea className='form-control' rows="5" value={message} onChange={inputChangeHandler("message")}></textarea>
                            </div>
                            <button onClick={submitHandler} className="btn btn-success btn-block offset-5">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

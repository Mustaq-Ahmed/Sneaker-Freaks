import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth/helper'
import Base from '../../core/Base'
import { getUserInfo, updateUserInfo } from '../helper/userapicalls'



export default function UpdateUserInfo() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const preLoadUserInfo = () => {
        getUserInfo(user._id, token)
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError(false)
                    setName(data.name)
                    setEmail(data.email)
                }
            })
            .catch((err) => console.log("Error Occured in UserInfo Component"))
    }

    useEffect(() => {
        preLoadUserInfo(user._id, token)
    }, [])

    const goToUserDashboard = () => {
        return (
            <div className="mt-3">
                <Link className='btn btn-block btn-success mb-3' to="/user/dashboard">User Home</Link>
            </div>
        )
    }

    const nameChangeHandler = (e) => {
        setError("")
        setName(e.target.value)
    }

    const emailChangeHandler = (e) => {
        setError("")
        setEmail(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        const updatedInfo = {
            name,
            email
        }
        //userapicall
        updateUserInfo(user._id, token, updatedInfo)
            .then((data) => {
                if (data.error) {
                    setError(true)
                    // setError(data.error)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                    setEmail("")
                }
            })
            .catch((err) => console.log("Error Occured in Update User Information"))
    }

    const successMessage = () => {
        if (success) {
            return <h4 className='text-success'>Information Updated Successfully</h4>
        }
    }

    const warningMessage = () => {
        if (error) {
            return <h4 className='text-warning'>Failed to Update Information</h4>
        }
    }
    const userInfoUpdateForm = () => {
        return (
            <div className="row">
                <div className="col-md-8">
                    <form>
                        <div className="form-group mb-2 ">
                            <label className="my-1">Name</label>
                            <input className='form-control' type="text" onChange={nameChangeHandler} value={name} />
                        </div>
                        <div className="form-group mb-2">
                            <label className="my-1">Email</label>
                            <input className='form-control' type="email" onChange={emailChangeHandler} value={email} />
                        </div>
                        <button onClick={submitHandler} className="btn btn-success btn-block offset-5 my-3">
                            Update Info
                        </button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title='Update User Info'
            description='Page to Update user information'
            className='container bg-info p-4'>
            <div className="row bg-white rounded">
                {goToUserDashboard()}
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {userInfoUpdateForm()}
                </div>
            </div>
        </Base>
    )
}



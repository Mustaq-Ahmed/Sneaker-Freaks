import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth/helper'
import Base from '../../core/Base'
import { getUserInfo } from '../helper/userapicalls'



export default function UserInfo() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        accountCreatedAt: ""
    })

    const { name, email, error, accountCreatedAt } = values


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getUserInfoHandler = (userId, token) => {
        getUserInfo(userId, token)
            .then((data) => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    setValues({
                        ...values,
                        error: false,
                        name: data.name,
                        email: data.email,
                        accountCreatedAt: data.createdAt.substr(0,10)
                    })
                }
            })
            .catch((err) => console.log("Error Occured in UserInfo Component"))
    }

    useEffect(() => {
        getUserInfoHandler(userId, token)
    }, [userId, token])

    // go back to admin dashboard
    const goToUserDashboard = () => {
        return (
            <div className="mt-3">
                <Link className='btn btn-block btn-success mb-3' to="/user/dashboard">User Home</Link>
            </div>
        )
    }

    const warningMessage = () => {
        if (error) {
            return <h4 className='text-warning'>Failed to Show User Information</h4>
        }
    }

    //TODO: format date 
    // date converting to dd-mm-yyyy
    // let formatedDate = `${dateToString.getDate()}-${dateToString.getMonth() + 1}-${dateToString.getFullYear}`
    // console.log(accountCreatedAt.getDate())

    const myCategoryForm = () => {
        return (
            <form className='mb-5'>
                <div className="form-group">
                    <div className="fs-4 text-success border-bottom fw-bold mt-2">
                        <span>Name: {name}</span>
                    </div>
                    <div className="fs-4 text-success border-bottom fw-bold mt-2">
                        <span>Email: {email}</span>
                    </div>
                    {/* <div className="fs-4 text-success border-bottom fw-bold mt-2">
                        <span>Password: Mustaq</span>
                    </div> */}
                    <div className="fs-4 text-success border-bottom fw-bold mt-2">
                        <span>Account Created At: {accountCreatedAt}</span>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <Base title='User Information'
            description='Check out Information'
            className='container bg-info p-4'>
            <div className="row bg-white rounded">
                {goToUserDashboard()}
                <div className="col-md-8 offset-md-2">
                    {warningMessage()}
                    {myCategoryForm()}
                </div>
            </div>
        </Base>
    )
}


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

export default function AddCategory() {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    // go back to admin dashboard
    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const changeHandler = (e) => {
        setError("")
        setName(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        //adminapicall, backend request fire, {name} =>we are doing JSON.stringify() to post name at backend
        createCategory(user._id, token, { name })
            .then((data) => {
                if (data.error) {
                    setError(true)
                    // setError(data.error)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
            .catch((err) => console.log("Error Occured in ADD CATEGORY"))
    }

    const successMessage = () => {
        if (success) {
            return <h4 className='text-success'>Category Created Successfully</h4>
        }
    }

    const warningMessage = () => {
        if (error) {
            return <h4 className='text-warning'>Failed to Create Category</h4>
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className='lead'>Enter the Category</p>
                    <input type="text"
                        className='form-control my-3'
                        value={name}
                        onChange={changeHandler}
                        autoFocus
                        required
                        placeholder='For Ex. Summer'
                    />
                    <button onClick={submitHandler} className='btn btn-outline-info mb-3'>Create Category</button>
                </div>
            </form>
        )
    }

    return (
        <Base title='Create Category'
            description='Add a New Category for new tshirt collection'
            className='container bg-info p-4'>
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

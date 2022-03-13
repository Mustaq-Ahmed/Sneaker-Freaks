import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { deleteCategory, getAllCategories } from './helper/adminapicall'


export default function ManageCategories() {

    const [categories, setCategories] = useState([])

    const { user, token } = isAuthenticated()

    const preLoad = () => {
        getAllCategories()
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setCategories(data)
                }
            })
            .catch((err) => console.log("Error Occured in Manage Products"))
    }

    useEffect(() => {
        preLoad()
    }, [])

    const deleteCategoryHandler = (categoryId) => {
        // adminapicall function to delete a Category
        deleteCategory(categoryId, user._id, token)
            .then((data) => {
                if (data.error) {
                    console.log("Delete Category Error: ",data.error);
                } else {
                    //setCategories(data)
                    preLoad() //after CATE is DEL the page get reloaded and display CATE'S except DEL one
                }
            })
            .catch((err) => console.log("Error occured in DELETING A PRODUCT"))
    }


    return (
        <Base title="Welcome Admin" description="Manage Categories Here">
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            {/* <h2 className="mb-4">All products:</h2> */}
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-4">All Categories:</h2>
                    {
                        categories.map((category, index) => {
                            return (
                                <div key={index} className="row text-center mb-2 ">
                                    <div className="col-4">
                                        <h3 className="text-white text-left">{category.name}</h3>
                                    </div>
                                    <div className="col-4">
                                        <Link
                                            className="btn btn-success"
                                            to={`/admin/category/update/${category._id}`}
                                        >
                                            <span className="">Update</span>
                                        </Link>
                                    </div>
                                    <div className="col-4">
                                        <button onClick={() => {
                                            deleteCategoryHandler(category._id)
                                        }} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </Base>
    )

}

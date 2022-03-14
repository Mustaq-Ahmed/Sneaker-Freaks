import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getAllCategories, getAProduct, updateProduct } from './helper/adminapicall'

export default function UpdateProduct({ match }) {

    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        isLoading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    })
    const {
        name, description, price, size, stock, categories, category, isLoading, error, createdProduct, getaRedirect, formData
    } = values

    const preLoad = (productId) => {
        getAProduct(productId)
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    preLoadCategories()
                    setValues({
                        // before updating all the values should be there for that product.
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        size: data.size,
                        category: data.category._id,
                        stock: data.stock,
                        formData: new FormData()
                    })
                }
            })
            .catch((err) => console.log("Error Occured in PRE-LOAD"))
    }

    const preLoadCategories = () => {
        getAllCategories()
            .then((data) => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    setValues({
                        // no need to update all the product details we just need to get categories with name's
                        categories: data,
                        formData: new FormData()
                    })
                    console.log(data);
                }
            })
            .catch()
    }

    useEffect(() => {
        preLoad(match.params.productId)
    }, [match.params.productId])

    const submitHandler = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            error: "",
            isLoading: true
        })
        // function call from adminapicall/ createProduct
        updateProduct(match.params.productId, user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    setValues({
                        isLoading: false,
                        error: data.error,
                    })
                } else {
                    setValues({
                        name: "",
                        description: "",
                        price: "",
                        size: "",
                        stock: "",
                        photo: "",
                        isLoading: false,
                        createdProduct: data.name,

                    })
                }
            })
            .catch()
    }


    const changeHandler = (inputVal) => (e) => {
        const value = inputVal === "photo" ? e.target.files[0] : e.target.value
        formData.set(inputVal, value)  //setting the form data
        setValues({
            ...values,
            [inputVal]: value
        })
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
                style={{ display: createdProduct ? "" : "none" }}>
                <h1>{createdProduct} : Updated Successfully</h1>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div className="alert alert-danger mt-3"
                style={{ display: error ? "" : "none" }}>
                <h1> Failed to Update Product</h1>
            </div>
        )
    }

    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group mb-3">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={changeHandler("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={changeHandler("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group mb-3">
                <textarea
                    onChange={changeHandler("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={changeHandler("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={changeHandler("size")}
                    type="number"
                    className="form-control"
                    placeholder="Size"
                    value={size}
                />
            </div>
            <div className="form-group mb-3">
                <select
                    onChange={changeHandler("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select Category</option>
                    {categories && (
                        categories.map((cate, index) => {
                            return <option key={index} value={cate._id}>{cate.name}</option>
                        })
                    )}
                </select>
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={changeHandler("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={submitHandler} className="btn btn-outline-success rounded-pill mb-3">
                Update Product
            </button>
        </form>
    );

    return (
        <Base
            title='Update Product'
            description='Welcome to Update Product Section'
            className='container bg-info p-4'
        >
            <Link className='btn btn-sm btn-dark mb-3' to="/admin/dashboard">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getAllProducts, deleteProduct } from './helper/adminapicall'


export default function ManageProducts() {

    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const preLoad = () => {
        getAllProducts()
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setProducts(data)  // products is an array so directly saving without making objects
                }
            })
            .catch((err) => console.log("Error Occured in Manage Products"))
    }

    useEffect(() => {
        preLoad()
    }, [])

    const deleteProductHandler = (productId) => {
        // adminapicall function to delete a product
        deleteProduct(productId, user._id, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    //setProducts(data)
                    preLoad() //after PRO is DEL the page get reloaded and display PRO'S except DEL one
                }
            })
            .catch((err) => console.log("Error occured in DELETING A PRODUCT"))
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            {/* <h2 className="mb-4">All products:</h2> */}
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-4">All Products:</h2>
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{product.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/update/${product._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {
                                        deleteProductHandler(product._id)
                                    }} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </Base>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'


export default function AdminDashBoard() {

    // isAuthenticated() => return TOKEN and USER and again USER has _id, name, email, role
    const { user: { name, email } } = isAuthenticated()

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className='nav-link text-success'>Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className='nav-link text-success'>Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className='nav-link text-success'>Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className='nav-link text-success'>Manage Products</Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link to="/admin/orders" className='nav-link text-success'>Manage Orders</Link>
                    </li> */}
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge rounded-pill bg-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge rounded-pill bg-success mr-2">Email:</span> {email}
                    </li>

                    <li className="list-group-item">
                        <span className="badge rounded-pill bg-danger ">Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title='Welcome to Admin Area' description='Manage all you Products here'
            className='container bg-success p-4'>
            <div className="row">
                <div className="col-md-4 mb-2">{adminLeftSide()}</div>
                <div className="col-md-8">{adminRightSide()}</div>
            </div>
        </Base>
    )
}

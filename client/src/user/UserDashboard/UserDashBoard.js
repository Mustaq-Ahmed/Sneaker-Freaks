import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth/helper'
import Base from '../../core/Base'

export default function UserDashBoard() {

    const { user: { name, email } } = isAuthenticated()

    const userLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">User Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/user/info/:userId" className='nav-link text-success'>User Information</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/info/update/:userId" className='nav-link text-success'>
                            Update User Information
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/orders/:userId" className='nav-link text-success'>All Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/user/delete/:userId" className='nav-link text-success'>Delete Account</Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link to="/admin/products" className='nav-link text-success'>Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className='nav-link text-success'>Manage Orders</Link>
                    </li> */}
                </ul>
            </div>
        )
    }

    const userRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge rounded-pill bg-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge rounded-pill bg-success mr-2">Email:</span> {email}
                    </li>

                    <li className="list-group-item">
                        <span className="badge rounded-pill bg-danger ">User Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title='Welcome to User Area' description='Manage all your Information here'
            className='container bg-success p-4'>
            <div className="row">
                <div className="col-md-4 mb-2">{userLeftSide()}</div>
                <div className="col-md-8">{userRightSide()}</div>
            </div>
        </Base>
    )
}

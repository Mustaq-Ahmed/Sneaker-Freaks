import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '../../auth/helper'
import Base from '../../core/Base'
import { getAllOrders } from '../helper/userOrdersHelper'



export default function AllOrders() {

    const [userOrders, setUserOrders] = useState([])

    const { user, token } = isAuthenticated()

    const getAllOrdersHandler = (userId, token) => {
        getAllOrders(userId, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setUserOrders(data)
                    // console.log(data);
                }
            })
            .catch((err) => console.log("Error Occured in GET ALL ORDERS"))
    }

    const goToUserDashboard = () => {
        return (
            <div className="mt-3">
                <Link className='btn btn-block btn-success mb-3' to="/user/dashboard">User Home</Link>
            </div>
        )
    }

    useEffect(() => {
        getAllOrdersHandler(user._id, token)
    }, [user._id, token])

    return (
        <Base title='All Your Orders Here' description='Welcome to orders page to get all Details about orders'>
            {goToUserDashboard()}
            <table className='table text-white'>
                <thead className='fs-4 text-warning'>
                    <tr>
                        <th>Date(y/m/d)</th>
                        <th>Products</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.map((uOrder) => {
                        return (

                            <tr key={uuidv4()}>
                                <td>{uOrder.createdAt.substr(0, 10)}</td>

                                <td>
                                    <table>

                                        <thead>
                                            <tr>
                                                <th className=''>Item</th>
                                                <th className='px-3'>Name</th>
                                                <th className='px-3'>Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {uOrder.products.map((uOrderProduct, i) => {
                                                return (
                                                    <tr key={uuidv4()}>
                                                        <td className=''>{i + 1}</td>
                                                        <td className='px-3'>{uOrderProduct.name}</td>
                                                        <td className='px-3'>₹ {uOrderProduct.price}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>

                                    </table>
                                </td>

                                <td>₹ {uOrder.amount}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </Base >
    )
}


// {userOrders.map((uo, index) => {
//     return (
//         <ul key={index} className="list-group bg-white">
//             <li className='list-group-item'>OrderId: {uo._id}</li>
//             <li>Products:
//                 {uo.products.map((uoPro, index) => {
//                     return (
//                         <ul key={index}>
//                             <li className='list-group-item'>Item Name: {uoPro.name}</li>
//                             <li>Item Price: {uoPro.price}</li>
//                         </ul>
//                     )
//                 })}
//             </li>
//             <li>Total Amount: {uo.amount}</li>
//         </ul>
//     )
// })}
import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../../core/Base'



export default function DeleteAccount() {

    const confirmDeletion = () => {
        // window.confirm("Are You Sure ? You Wanna DELETE Your ACCOUNT.")
        if (window.confirm("Are You Sure ? You Wanna DELETE Your ACCOUNT.") === true) {
            alert("Account Deleted Successfully")
        }
    }

    const goToUserDashboard = () => {
        return (
            <div className="mt-3">
                <Link className='btn btn-block btn-success mb-3' to="/user/dashboard">User Home</Link>
            </div>
        )
    }


    return (
        <Base title='Delete Account' description='Page to Delete Self Account'>
            {goToUserDashboard()}
            <div className="text-center">
                <h2 className="text-warning">Delete self Account by clicking below Delete Account Button</h2>
                <button className='btn btn-block btn-danger my-5' onClick={confirmDeletion}>
                    Delete Account
                </button>
            </div>
        </Base>
    )
}

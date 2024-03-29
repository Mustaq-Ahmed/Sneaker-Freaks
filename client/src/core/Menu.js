import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'
import { loadCart } from './helper/cartHelper'

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" }
  } else {
    return { color: "#ffffff" }
  }
}

function Menu({ history }) {
  return (
    <div className='fixed-top'>
      <ul className="nav nav-tabs bg-dark fw-bold py-1">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className='nav-link' to="/">Home</Link>
        </li>
        <li className="nav-item" onClick={() => loadCart()}>
          <Link style={currentTab(history, "/cart")} className='nav-link' to="/cart">Cart</Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link style={currentTab(history, "/user/dashboard")} className='nav-link' to="/user/dashboard">Dashboard</Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link style={currentTab(history, "/admin/dashboard")} className='nav-link' to="/admin/dashboard">Dashboard</Link>
          </li>
        )}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link style={currentTab(history, "/signup")} className='nav-link' to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
              <Link style={currentTab(history, "/signin")} className='nav-link' to="/signin">Signin</Link>
            </li>

          </>
        )}

        {isAuthenticated() && (
          <li className="nav-item cursorPointer">
            <span className='nav-link text-warning'
              onClick={() => {
                signout(() => {
                  history.push("/")
                })
              }}>
              Signout
            </span>
          </li>
        )}

      </ul>
    </div>
  )
}


export default withRouter(Menu)
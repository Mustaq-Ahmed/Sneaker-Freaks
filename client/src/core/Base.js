import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'


export default function Base({
    title = "My Title",
    description = "My Description",
    className = "bg-dark text-white p-4",
    children
}) {


    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h1 className='text-warning' style={{ marginTop: "75px" }}>{title}</h1>
                    <h4>{description}</h4>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto pt-3">
                <div className="container-fluid bg-secondary text-center py-3">
                    <h4>If you want any listed Sneaker in different size or got any queries Contact Us.</h4>
                    <div className="">
                        <Link className='btn btn-block btn-warning fw-bold' to="/contact">Contact Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

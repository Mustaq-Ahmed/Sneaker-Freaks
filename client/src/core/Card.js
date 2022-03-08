import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'
import ImageHelper from './helper/ImageHelper'

export default function Card(
    {
        product,
        addToCart = true,
        removeFromCart = false,
        setReload = f => f,
        reload = undefined
    }
) {

    const [redirect, setRedirect] = useState(false)

    const productPrice = product.price;  
    const price = function (productPrice) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(productPrice);
    };

    const cartTitle = product ? product.name : "A photo from pixels"
    const cartDescription = product ? product.description : "Default Description"
    const cartPrice = product ? price(productPrice) : "Default"
    const cartSize = product ? product.size : "10"

    const addToCartHandler = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    //TODO: work here for Add to cart working
    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={addToCartHandler}
                    className="btn btn-block btn-outline-success mt-2 mb-2 rounded"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id)
                        setReload(!reload)  // reload = undefined => !undefined = true
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2 rounded"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-body">
                {getARedirect(redirect)}
                <ImageHelper product={product} />
                <div className="bg-success lead">{cartTitle}</div>
                <p className=" font-weight-normal text-wrap my-2"> {cartDescription}</p>
                <div className="bg-secondary mb-2 fs-5 d-flex justify-content-around">
                    <span className="rounded"> {cartPrice}</span>
                    <span className="rounded">UK : {cartSize}</span>
                </div>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    )
}


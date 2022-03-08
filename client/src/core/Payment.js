import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty } from './helper/cartHelper'
import { createOrder } from './helper/orderHelper'
import { getToken, processPayment } from './helper/paymentHelper'
import DropIn from 'braintree-web-drop-in-react'


export default function Payment({ products, setReload = f => f, reload = undefined }) {

    const [info, setInfo] = useState({
        isLoading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getTokenHandler = (userId, token) => {
        getToken(userId, token)
            .then((info) => {
                // console.log("INFORMATION", info);
                if (info.error) {
                    setInfo({
                        ...info,
                        error: info.error
                    })
                } else {
                    const clientToken = info.clientToken
                    setInfo({ clientToken })
                }
            })
            .catch((err) => console.log(err))
    }

    const showbtdropIn = () => {
        return (
             <div>
                {
                    info.clientToken !== null && products.length > 0 ? (
                        <div>
                            <DropIn
                                options={{ authorization: info.clientToken }}
                                onInstance={(instance) => (info.instance = instance)}
                            />
                            <div className='d-grid gap-2 col-6 mx-auto'>
                                <button className='btn btn-outline-success fw-bold fs-4' onClick={onPurchase}>
                                    {userId ? "Buy" : "Sign In Before Checkout"}
                                </button>
                            </div>
                        </div>
                    )
                        : (<h3> Please Login or Add Something to Cart</h3>)
                }
            </div>
        )
    }

    useEffect(() => {
        getTokenHandler(userId, token)
    }, [userId, token])


    const onPurchase = () => {
        setInfo({ isLoading: true })
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then((data) => {
                console.log("DATA", data)
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotalAmount()
                }
                // function call to paymentHelper to process the payment
                processPayment(userId, token, paymentData)
                    .then((res) => {
                        setInfo({
                            ...info,
                            success: res.success,
                            isLoading: false,
                            // error: ""
                        })
                        // console.log("PAYMENT SUCCESS");
                        const orderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount
                        }
                        // function call
                        createOrder(userId, token, orderData);

                        //loadCart() method
                        cartEmpty(() => {
                            alert("Order Successfully Place! Thank you for Shopping with Us");
                        })
                        // force reload
                        setReload(!reload)
                    })
                    .catch((err) => {
                        setInfo({
                            // error: err,
                            isLoading: false,
                            success: false
                        })
                        // console.log("PAYMENT FAILED");
                    })
            })
    }

    // const priceINR = function (totalAmount) {
    //     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(totalAmount);
    // };

    const getTotalAmount = () => {
        let amount = 0;
        products.map((product) => {
            return amount = amount + product.price
        })
        return (amount)
    }

    return (
        <div>
            {products.length > 0 && <h2>Total Amount to be paid : {getTotalAmount()}</h2>}
            {showbtdropIn()}
        </div>
    )
}

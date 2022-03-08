import React, { useEffect, useState } from 'react'
import Base from './Base';
import '../styles.css'
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Payment from './Payment';


export default function Cart() {

    const [products, setProducts] = useState([])  // cart products not home page products
    const [reload, setReload] = useState(false)

    const loadAllProducts = (products) => {
        return (
            <div className="">
                <h2>All Cart Products</h2>
                {products.reverse().map((product, index) => {
                    return (
                        <Card
                            key={index}
                            product={product}
                            addToCart={false}
                            removeFromCart={true}
                            setReload={setReload}
                            reload={reload}
                        />
                    )
                })}
            </div>
        )
    }

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])


    return (
        <Base title='Cart Page' description='Ready to Checkout'>
            <div className="row text-center">
                <div className="col-md-6 mb-3">
                    {
                        products.length > 0 ? loadAllProducts(products) :
                            (<h3>No Product in Cart</h3>)
                    }
                </div>
                <div className="col-md-6">
                    <Payment
                        products={products}
                        setReload={setReload}
                    />
                </div>
            </div>
        </Base>
    )
}

import React, { useEffect, useState } from 'react'
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import '../styles.css'


export default function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const [value, setValue] = useState("All")

    const loadAllProducts = () => {
        getProducts()
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProducts(data)
                }
            })
            .catch((err) => console.log("Error Occured in Load All Products"))
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    const warningMessage = () => {
        return (
            error && (
                <div className="alert alert-danger mt-3">
                    <h1>{error}</h1>
                </div>
            )
        )
    }

    return (
        <Base title='Sneaker Freaks' description="Welcome to the Sneaker Head's Favourite Place, All Sneaker's Below">
            {warningMessage()}
            <div className="row text-center mb-3 customCategory">

                <div className="col-md-6 mb-3">
                    <div className="row">
                        <div className="col-4">
                            <button className='btn btn-block btn-outline-primary rounded'
                                onClick={() => setValue("All")}>
                                All_Shoes
                            </button>
                        </div>
                        <div className="col-4">
                            <button className='btn btn-block btn-outline-primary rounded'
                                onClick={() => setValue("Jordan")}>
                                Jordan
                            </button>
                        </div>
                        <div className="col-4">
                            <button className='btn btn-block btn-outline-primary rounded'
                                onClick={() => setValue("Nike")}>
                                Nike
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="row">
                        <div className="col-4">
                            <button className='btn btn-block btn-outline-primary rounded'
                                onClick={() => setValue("Addidas")}>
                                Addidas</button>
                        </div>
                        <div className="col-4">
                            <button className='btn btn-block btn-outline-primary rounded'
                                onClick={() => setValue("Puma")}>
                                Puma
                            </button>
                        </div>
                        <div className="col-4">
                            <button className='btn btn-block btn-outline-primary rounded'
                                onClick={() => setValue("Converse")}>
                                Converse
                            </button>
                        </div>
                    </div>
                </div>

            </div>


            <div className="row text-center justify-content-center">
                {/* <h3 className="text-white">All T-shirts Here</h3> */}
                <div className="row customFlex">
                    {
                        products.map((product, index) => {
                            // console.log(product.category.name)

                            if (value === "All") {
                                return (
                                    <div key={index} className="col-md-4 mb-4">
                                        <Card product={product} />
                                    </div>
                                )
                            } else {
                                return (
                                    product.category.name === value &&
                                    (
                                        <div key={index} className="col-md-4 mb-4">
                                            <Card product={product} />
                                        </div>
                                    )
                                )

                            }

                        })
                    }
                </div>
            </div>
        </Base>
    )
}

import React from 'react'
import { API } from '../../backend'


export default function ImageHelper({ product }) {

    const imageURL = product ? `${API}/product/photo/${product._id}` : <img src={require("../../assets/NoImageFound.png")} alt="NO INTERNET CONNECTION" />

    return (
        <div>
            <div className="rounded border border-success p-2">
                <img
                    src={imageURL}
                    alt="pic"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    className="mb-3 rounded"
                />
            </div>
        </div>
    )
}

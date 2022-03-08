
export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window != undefined) {  
        if (localStorage.getItem("cart")) { 
            cart = JSON.parse(localStorage.getItem("cart"))  // Loading up entire cart into "cart variable"
        }
        cart.push({
            ...item,
        })

        localStorage.setItem("cart", JSON.stringify(cart))  // putting all cart values into a cart variable
        next()
    }
}

export const loadCart = () => {
    if (typeof window != undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart")) //cart item previously exist then add to "cart VAR"
        }

        cart.map((product, index) => {
            if (product._id === productId) {
                cart.splice(index, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}


export const cartEmpty = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        // after the payment is successfull showing the empty cart instead of undefined
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}
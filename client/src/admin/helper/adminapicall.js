import { API } from "../../backend"

//SECTION: CATEGORY calls
//* create Category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`    // remember from postman adding Bearer token
        },
        body: JSON.stringify(category)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* Get All Categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* Get A Category
export const getACategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* Delete Category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* Update Category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}




//SECTION: PRODUCT calls
//* create a product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // NO content-type because "product" data is a form of multipart/formdata
            Authorization: `Bearer ${token}`
        },
        body: product     // data type => multipart/formdata
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* Get All products
export const getAllProducts = () => {
    return fetch(`${API}/products`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* Delete A Product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

//* get A product (Single Product)
export const getAProduct = (productId) => {
    return fetch(`${API}/product/${productId}`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
}


//* update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}
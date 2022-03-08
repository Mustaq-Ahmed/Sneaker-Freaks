import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import Home from "./core/Home"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import PrivateRoute from "./auth/helper/PrivateRoute"
import UserDashBoard from "./user/UserDashboard/UserDashBoard"
import AdminRoute from "./auth/helper/AdminRoute"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from "./admin/AddCategory"
import ManageCategories from "./admin/ManageCategories"
import AddProduct from "./admin/AddProduct"
import ManageProducts from "./admin/ManageProducts"
import UpdateProduct from "./admin/UpdateProduct"
import UpdateCategory from "./admin/UpdateCategory"
import Cart from "./core/Cart"
import UserInfo from "./user/UserDashboard/UserInfo"
import UpdateUserInfo from "./user/UserDashboard/UpdateUserInfo"
import DeleteAccount from "./user/UserDashboard/DeleteAccount"
import AllOrders from "./user/UserDashboard/AllOrders"
import ContactUsForm from "./user/ContactUsForm"
// import Menu from "./core/Menu"


export default function Routes() {
    return (
        <BrowserRouter>
            {/* <Menu /> */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/contact" exact component={ContactUsForm} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <PrivateRoute path="/user/info/:userId" exact component={UserInfo} />
                <PrivateRoute path="/user/info/update/:userId" exact component={UpdateUserInfo} />
                <PrivateRoute path="/user/delete/:userId" exact component={DeleteAccount} />
                <PrivateRoute path="/user/orders/:userId" exact component={AllOrders} />
                <Route path="*" exact>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}



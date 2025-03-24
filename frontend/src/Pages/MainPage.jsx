import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import HomePages from "./HomePages"
import LoginPage from "./LoginPage"
import HeaderComponent from '../Components/layout/HeaderComponent';
import SearchDetail from '../Components/search/SearchDetail';
import ProductListComponent from '../Components/product/ProductListComponent';
import UserDetail from '../Components/user/UserDetail';
import FooterComponent from '../Components/layout/FooterComponent';
import CartComponent from '../Components/cart/CartComponent';
import ContactComponent from '../Components/contact/ContactComponent';
import { doLoginAction } from '../Components/login/LoginAction';
import CreateProduct from '../Components/product/CreateProduct';
import { useState } from 'react';

const MainPage = () => {
  const dispatch = useDispatch()  
  const currentPage = useSelector((state) => state.pages.currentPage)
  const user = useSelector(state => state.loginReducer.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!user && token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(doLoginAction({ token, user: parsedUser }));
      } catch (error) {
        console.error("Error al parsear user desde localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  return (
    <div>
        <HeaderComponent/>
      {currentPage === "home" &&  <HomePages/>}
      {currentPage === "login" && <LoginPage/>}
      {currentPage === "cart" && <CartComponent/>}
      {currentPage === "search" && <SearchDetail/>}
      {currentPage === "menu" && <ProductListComponent/>}
      {currentPage === "user-detail" && <UserDetail/>}
      {currentPage === "contact" && <ContactComponent/>}
      {currentPage === "create-product" && <CreateProduct/>}
      <FooterComponent/>
    </div>
  )
}

export default MainPage
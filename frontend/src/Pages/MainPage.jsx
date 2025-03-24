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

const MainPage = () => {
  const dispatch = useDispatch()  
  const currentPage = useSelector((state) => state.pages.currentPage)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
  
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(doLoginAction({ token, user: parsedUser }));
      } catch (error) {
        console.error("Error al parsear user desde localStorage:", error);
        localStorage.removeItem("user"); // limpia si está corrupto
      }
    }
  }, []);
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
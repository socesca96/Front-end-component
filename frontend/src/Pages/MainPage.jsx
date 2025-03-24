import React from 'react'
import { useSelector } from "react-redux";
import HomePages from "./HomePages"
import LoginPage from "./LoginPage"
import HeaderComponent from '../Components/layout/HeaderComponent';
import SearchDetail from '../Components/search/SearchDetail';
import ProductListComponent from '../Components/product/ProductListComponent';
import UserDetail from '../Components/user/UserDetail';
import FooterComponent from '../Components/layout/FooterComponent';
import CartComponent from '../Components/cart/CartComponent';
import ContactComponent from '../Components/contact/ContactComponent';

const MainPage = () => {

  
    const currentPage = useSelector((state) => state.pages.currentPage)
    console.log("Pagina actual:", currentPage);
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
      <FooterComponent/>
    </div>
  )
}

export default MainPage
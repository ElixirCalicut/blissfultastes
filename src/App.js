
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import ProductDetailPage from "./layouts/ProductDetailPage";
import { Routes } from "react-router-dom";
import HomePage from "./layouts/HomePage";
import Headers from "./components/header/Headers";
import CartPage from "./features/cart/CartPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCartFromLocalStorage } from "./features/cart/reducer/CartReducer";
import OrderSummaryPage from "./layouts/OrderSummaryPage";
import { useSelector } from "react-redux";
import './styles/Custom.css'; // Import the SCSS file
import ThankYouOrder from "./layouts/ThankYouOrder";
import FloatingCartIcon from "./components/floatingcart/FloatingCartIcon";
import PlacesAutoComplete from "./features/map/component/PlacesAutoComplete";
import CategoryDetails from "./features/categories/components/CategoryDetails";
import Footer from "./components/footer/Footer";
import PopularProducts from "./features/products/components/PopularProducts";
import AboutUs from "./layouts/AboutUs";
import { fetchSettingsApi } from "./features/thunks/Thunks";
import ContactUs from "./layouts/ContactUs";
import UserDetail2 from "./layouts/UserDetail2";

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(loadCartFromLocalStorage(cartData));
    dispatch(fetchSettingsApi());
  }, [dispatch]);
  const cartItemCount=useSelector((state)=>state.cart.count);

  return (
    <>
      <BrowserRouter>
        <Headers cartCount={cartItemCount}/>
         <FloatingCartIcon itemCount={cartItemCount} /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/popular" element={<PopularProducts />} />
          <Route path="/productdetail/:id" element={<ProductDetailPage />} />
          <Route path="/viewcart" element={<CartPage />} />
          {/* <Route path="/adddetail/:option" element={<UserDetail />} /> */}
         <Route path="/adddetail/:option/:delivery_cost/:cookingData" element={<UserDetail2 />} />
          <Route path="/ordersummary" element={<OrderSummaryPage />} />
          <Route path="/location" element={<PlacesAutoComplete/>}/>
          <Route path="/ordercompleted" element={<ThankYouOrder/>}/>
          <Route path="/all" element={<CategoryDetails/>}/>
        
        </Routes>
         <Footer itemCount={cartItemCount} /> 
      </BrowserRouter>

    </>
  );
}

export default App;

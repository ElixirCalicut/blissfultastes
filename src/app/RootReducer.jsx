import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "../features/products/reducer/ProductReducer";
import CategoryReducer from "../features/categories/reducer/CategoryReducer";
import CartReducer from "../features/cart/reducer/CartReducer";
import SettingsReducer from "../features/settings/reducer/SettingsReducer";
import ProductDetailReducer from "../features/products/reducer/ProductDetailReducer";

//combine reducer containg all reducers for store
const rootReducer = combineReducers({
  product: ProductReducer,
  productdetail:ProductDetailReducer,
  category: CategoryReducer,
  cart:CartReducer,
  settings:SettingsReducer


});

export default rootReducer;

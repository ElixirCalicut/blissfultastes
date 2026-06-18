import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../data/Constants";

//fetch products api
export const fetchProductData = createAsyncThunk("product/get", async () => {
  const response = await axios.get(`${BASE_URL}/products/`);
  console.log(response);
  return response.data;
});
//fetch categories api
export const fetchCategories = createAsyncThunk("categories/get", async () => {
  const response = await axios.get(`${BASE_URL}/categories/`);
  console.log(response);
  return response.data;
});
//fetch popular products
export const fetchPopularProducts = createAsyncThunk("popular_products/get", async () => {
  const response = await axios.get(`${BASE_URL}/popular_products/`);
  console.log(response);
  return response.data;
});
//fetch products on clicking category by passing id of category
export const fetchProductsByCategory = createAsyncThunk(
  "product/getByCategory",
  async (category) => {
    const response = await axios.get(
      `${BASE_URL}/products/?category_id=${category}`
    );
    return response.data;
  }
);
//fetch details of product by passing id
export const fetchProductDetailByID = createAsyncThunk(
  "productdetail/getProductDetailByID",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}/`);
    console.log(response);
    return response.data;
  }
);
//post cart data with userdetails to backend 
export const postData = createAsyncThunk(
    "type/postData",
    async (payload) => {
   
      try {
        const response = await axios.post(`${BASE_URL}/create_customer_order_and_send_whatsapp_message/`, payload, { headers: { "Content-Type": "application/json" } });
        // If you want to get something back
        console.log(response.data)
        return response.data;
      } catch (err) {
        console.error(err)
      }
    }
  );


//get tax vat and currency details
export const fetchSettingsApi = createAsyncThunk(
  "settings/currencyVattax",
  async () => {
   
    const response = await axios.get(`${BASE_URL}/settings/`);
    console.log(response);
    //const data=response?response.data[0]:"";
   
    return response.data[0];
  }
);
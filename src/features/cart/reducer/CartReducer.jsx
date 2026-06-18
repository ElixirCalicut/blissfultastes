import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewCart: [],
  addCart: [],
  total: 0.00,
  totalPrice:0.00,
  count:0,
  updatedCart: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementProduct: (state, action) => {
      const { _id, quantity } = action.payload;
      console.log("inc",action.payload);
      console.log("viewCartbefr",JSON.parse(JSON.stringify(state.viewCart)));
      state.viewCart = state.viewCart.map((item) => {
        if (parseInt(item._id) === parseInt(_id)) {
          item.quantity = quantity;
          item.subtotal = (quantity * item.price).toFixed(2);
        }
        return item;
      });
      console.log("viewCartafttr",state.viewCart);
      state.count = state.viewCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.viewCart));
    },
    decrementProduct: (state, action) => {
      const { _id, quantity } = action.payload;
     console.log(quantity);
      state.viewCart = state.viewCart.map((item) => {
        if (parseInt(item._id) === parseInt(_id) ) {
          item.quantity = quantity;
          item.subtotal =  (quantity * item.price).toFixed(2);
        }
        return item;
      });
      state.count = state.viewCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.viewCart));
    
    },
    totalProducts: (state) => {
      state.total = state.viewCart.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
      console.log(state.total);
    },

    grandTotal: (state,action) => {
      state.totalPrice = action.payload;

    },
    clearCart: (state) => {
      state.viewCart = [];
      state.count=0;
      localStorage.removeItem("cart");
    },
    removeItem: (state, action) => {
      const _id = action.payload;
      console.log(action.payload)
      state.viewCart = state.viewCart.filter((item) => parseInt(item._id) !== parseInt(_id));
      state.count = state.viewCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.viewCart));
    },
    addCartProducts: (state, action) => {
      const newProducts = action.payload;
      newProducts.forEach((newItem) => {
        const existingItem = state.viewCart.find((item) => parseInt(item._id) === parseInt(newItem._id));
        if (existingItem) {
          existingItem.quantity = newItem.quantity;
          existingItem.subtotal = newItem.quantity * parseFloat(newItem.price);
        } else {
          state.viewCart.push(newItem);
        }
 
        console.log(state.total);
      });
      state.count = state.viewCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.viewCart));
    },
    loadCartFromLocalStorage: (state, action) => {
      state.viewCart = action.payload;
      state.count = state.viewCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

    },
  },
});

export default cartSlice.reducer;
export const {
  incrementProduct,
  decrementProduct,
  totalProducts,
  clearCart,
  removeItem,
  loadCartFromLocalStorage,
  addCartProducts,
  grandTotal
} = cartSlice.actions;

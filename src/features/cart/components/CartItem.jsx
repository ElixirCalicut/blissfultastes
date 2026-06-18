import React from 'react';
import { useState } from 'react';


function CartItem({ item, onRemove, onIncrement, onDecrement }) {
  
   
    return (
      <div  key={item._id}>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button onClick={() => onDecrement(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrement(item)}>+</button>
          {/* <button onClick={() => onRemove(item)}>Remove</button> */}
        </div>
      </div>
    );
  }


export default CartItem
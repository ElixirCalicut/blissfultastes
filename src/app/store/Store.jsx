import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../RootReducer';

//main store with root reducer
//main store with root reducer
export const store = configureStore({
  reducer: rootReducer,
});

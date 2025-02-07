import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

 
//redux persis is used internally to remember user data , redux alone cant do it on refresh the user data is cleared


// Combine reducers
const rootReducer = combineReducers({
  Agent: userReducer,
  
});

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure persistor
export const persistor = persistStore(store);

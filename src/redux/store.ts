import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage' 
import favoritesReducer from './favorites/favoritesSlice';
import authReducer from './auth/authSlice'
import moviesReducer from './movies/moviesSlice'


const favoritesConfig  = {
  key: 'favorites',
  storage,
}

const authConfig  = {
  key: 'auth',
  storage,
}

const persistedFavoritesReducer = persistReducer(favoritesConfig, favoritesReducer);
const persistedAuthReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
  reducer: { 
    movies: moviesReducer,
    favorites: persistedFavoritesReducer, 
    auth: persistedAuthReducer,
},

middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

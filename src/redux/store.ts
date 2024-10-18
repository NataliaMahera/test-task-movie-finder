import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { FavoritesState } from './favorites/favoritesSlice';
import moviesReducer from './movies/moviesSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

const favoritesConfig  = {
  key: 'favorites',
  storage,
}

export const store = configureStore({
  reducer: { 
    movies: moviesReducer,
    favorites: persistReducer<FavoritesState & PersistPartial>(favoritesConfig, favoritesReducer),
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

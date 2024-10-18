import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites/favoritesSlice';
import moviesReducer from './movies/moviesSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';

const favoritesConfig  = {
  key: 'favorites',
  storage,
}

export const store = configureStore({
  reducer: { 
    movies: moviesReducer,
    favorites: persistReducer(favoritesConfig ,favoritesReducer)
},
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
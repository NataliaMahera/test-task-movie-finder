import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites/favoritesSlice';
import moviesReducer from './movies/moviesSlice'

export const store = configureStore({
  reducer: { 
    movies: moviesReducer,
    favorites: favoritesReducer 
},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

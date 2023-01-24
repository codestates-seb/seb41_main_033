import Logined from './slice/loginstate';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import GameInfo from './slice/matchInfo';
import UserInfo from './slice/userInfo';
import blockSlice from './slice/blockSlice';

const reducer = combineReducers({
  islogin: Logined.reducer,
  games: GameInfo.reducer,
  userInfo: UserInfo.reducer,
  block: blockSlice.reducer,
});
const persistConfig = {
  key: 'persist',
  storage,
};
const combineReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

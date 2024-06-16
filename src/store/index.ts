import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {LOGOUT_USER} from 'store/actions';
import addressesReducer, {initialState as addressesInitialState} from 'store/addresses';
import artworksReducer, {initialState as artworksInitialState} from 'store/artworks';
import artworkTransfersReducer, {initialState as artworkTransfersInitialState} from 'store/artworkTransfers';
import assetPairsReducer, {initialState as assetPairsInitialState} from 'store/assetPairs';
import authenticationReducer, {initialState as authenticationInitialState} from 'store/authentication';
import cartProductsReducer, {initialState as cartProductsInitialState} from 'store/cartProducts';
import commentsReducer, {initialState as commentsInitialState} from 'store/comments';
import contributionsReducer, {initialState as contributionsInitialState} from 'store/contributions';
import contributionsCumulativeReducer, {
  initialState as contributionsCumulativeInitialState,
} from 'store/contributionsCumulative';
import contributorsReducer, {initialState as contributorsInitialState} from 'store/contributors';
import conversationsReducer, {initialState as conversationsInitialState} from 'store/conversations';
import coresReducer, {initialState as coresInitialState} from 'store/cores';
import coursesReducer, {initialState as coursesInitialState} from 'store/courses';
import exchangeOrdersReducer, {initialState as exchangeOrdersInitialState} from 'store/exchangeOrders';
import followersReducer, {initialState as followersInitialState} from 'store/followers';
import followingsReducer, {initialState as followingsInitialState} from 'store/followings';
import iaReducer, {initialState as iaInitialState} from 'store/ia';
import invitationLimitsReducer, {initialState as invitationLimitsInitialState} from 'store/invitationLimits';
import invitationsReducer, {initialState as invitationsInitialState} from 'store/invitations';
import lecturesReducer, {initialState as lecturesInitialState} from 'store/lectures';
import managerReducer, {initialState as managerInitialState} from 'store/manager';
import messagesReducer, {initialState as messagesInitialState} from 'store/messages';
import notificationsReducer, {initialState as notificationsInitialState} from 'store/notifications';
import ordersReducer, {initialState as ordersInitialState} from 'store/orders';
import postsReducer, {initialState as postsInitialState} from 'store/posts';
import productsReducer, {initialState as productsInitialState} from 'store/products';
import selfReducer, {initialState as selfInitialState} from 'store/self';
import tradesReducer, {initialState as tradesInitialState} from 'store/trades';
import usersReducer, {initialState as usersInitialState} from 'store/users';
import userStatsReducer, {initialState as userStatsInitialState} from 'store/userStats';
import walletsReducer, {initialState as walletsInitialState} from 'store/wallets';
import wiresReducer, {initialState as wiresInitialState} from 'store/wires';

const rootReducer = combineReducers({
  addresses: addressesReducer,
  artworkTransfers: artworkTransfersReducer,
  artworks: artworksReducer,
  assetPairs: assetPairsReducer,
  authentication: authenticationReducer,
  cartProducts: cartProductsReducer,
  comments: commentsReducer,
  contributions: contributionsReducer,
  contributionsCumulative: contributionsCumulativeReducer,
  contributors: contributorsReducer,
  conversations: conversationsReducer,
  cores: coresReducer,
  courses: coursesReducer,
  exchangeOrders: exchangeOrdersReducer,
  followers: followersReducer,
  followings: followingsReducer,
  ia: iaReducer,
  invitationLimits: invitationLimitsReducer,
  invitations: invitationsReducer,
  lectures: lecturesReducer,
  manager: managerReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  orders: ordersReducer,
  posts: postsReducer,
  products: productsReducer,
  self: selfReducer,
  trades: tradesReducer,
  userStats: userStatsReducer,
  users: usersReducer,
  wallets: walletsReducer,
  wires: wiresReducer,
});

const appReducer = (state: any, action: AnyAction) => {
  if (action.type === LOGOUT_USER) state = undefined;
  return rootReducer(state, action);
};

const persistConfig = {
  key: 'thenewboston',
  migrate: async (state: any) => {
    if (state) {
      return {
        ...state,
        addresses: state.addresses || addressesInitialState,
        artworkTransfers: state.artworkTransfers || artworkTransfersInitialState,
        artworks: state.artworks || artworksInitialState,
        assetPairs: state.assetPairs || assetPairsInitialState,
        authentication: state.authentication || authenticationInitialState,
        cartProducts: state.cartProducts || cartProductsInitialState,
        comments: state.comments || commentsInitialState,
        contributions: state.contributions || contributionsInitialState,
        contributionsCumulative: state.contributionsCumulative || contributionsCumulativeInitialState,
        contributors: state.contributors || contributorsInitialState,
        conversations: state.conversations || conversationsInitialState,
        cores: state.cores || coresInitialState,
        courses: state.courses || coursesInitialState,
        exchangeOrders: state.exchangeOrders || exchangeOrdersInitialState,
        followers: state.followers || followersInitialState,
        followings: state.followings || followingsInitialState,
        ia: state.ia || iaInitialState,
        invitationLimits: state.invitationLimits || invitationLimitsInitialState,
        invitations: state.invitations || invitationsInitialState,
        lectures: state.lectures || lecturesInitialState,
        manager: state.manager || managerInitialState,
        messages: state.messages || messagesInitialState,
        notifications: state.notifications || notificationsInitialState,
        orders: state.orders || ordersInitialState,
        posts: state.posts || postsInitialState,
        products: state.products || productsInitialState,
        self: state.self || selfInitialState,
        trades: state.trades || tradesInitialState,
        userStats: state.userStats || userStatsInitialState,
        users: state.users || usersInitialState,
        wallets: state.wallets || walletsInitialState,
        wires: state.wires || wiresInitialState,
      };
    }
    return {
      addresses: addressesInitialState,
      artworkTransfers: artworkTransfersInitialState,
      artworks: artworksInitialState,
      assetPairs: assetPairsInitialState,
      authentication: authenticationInitialState,
      cartProducts: cartProductsInitialState,
      comments: commentsInitialState,
      contributions: contributionsInitialState,
      contributionsCumulative: contributionsCumulativeInitialState,
      contributors: contributorsInitialState,
      conversations: conversationsInitialState,
      cores: coresInitialState,
      courses: coursesInitialState,
      exchangeOrders: exchangeOrdersInitialState,
      followers: followersInitialState,
      followings: followingsInitialState,
      ia: iaInitialState,
      invitationLimits: invitationLimitsInitialState,
      invitations: invitationsInitialState,
      lectures: lecturesInitialState,
      manager: managerInitialState,
      messages: messagesInitialState,
      notifications: notificationsInitialState,
      orders: ordersInitialState,
      posts: postsInitialState,
      products: productsInitialState,
      self: selfInitialState,
      trades: tradesInitialState,
      userStats: userStatsInitialState,
      users: usersInitialState,
      wallets: walletsInitialState,
      wires: wiresInitialState,
    };
  },
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

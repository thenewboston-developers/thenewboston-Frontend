import {createSelector} from '@reduxjs/toolkit';

import {RootState} from 'types';

export const getAssetPairs = (state: RootState) => state.assetPairs;
export const getAuthentication = (state: RootState) => state.authentication;
export const getComments = (state: RootState) => state.comments;
export const getCurrencies = (state: RootState) => state.currencies.byId;
export const getCurrenciesOrdered = createSelector(
  [(state: RootState) => state.currencies.byId, (state: RootState) => state.currencies.ids],
  (byId, ids) => ids.map((id) => byId[id]),
);
export const getExchangeOrders = (state: RootState) => state.exchangeOrders.exchangeOrders;
export const hasMoreExchangeOrders = (state: RootState) => state.exchangeOrders.hasMore;
export const isLoadingExchangeOrders = (state: RootState) => state.exchangeOrders.isLoading;
export const getFollowers = (state: RootState) => state.followers;
export const getFollowings = (state: RootState) => state.followings;
export const getFrontendDeployments = (state: RootState) => state.frontendDeployments;
export const getInvitationLimits = (state: RootState) => state.invitationLimits;
export const getInvitations = (state: RootState) => state.invitations;
export const getManager = (state: RootState) => state.manager;
export const getMints = (state: RootState) => state.mints;
export const getNotifications = (state: RootState) => state.notifications.notifications || {};
export const hasMoreNotifications = (state: RootState) => state.notifications.hasMore;
export const isLoadingNotifications = (state: RootState) => state.notifications.isLoading;
export const getTotalUnreadNotificationCount = (state: RootState) => state.notifications.totalUnreadCount;
export const getOrderBookBuyOrders = (state: RootState) => state.orderBook.buyOrders;
export const getOrderBookSellOrders = (state: RootState) => state.orderBook.sellOrders;
export const isLoadingOrderBook = (state: RootState) => state.orderBook.isLoading;
export const getPosts = (state: RootState) => state.posts.posts;
export const getSelf = (state: RootState) => state.self;
export const getTradePriceChartData = (state: RootState) => state.tradePriceChartData;
export const getTrades = (state: RootState) => state.trades;
export const getUserStats = (state: RootState) => state.userStats;
export const getUsers = (state: RootState) => state.users;
export const getWallets = (state: RootState) => state.wallets;
export const getWires = (state: RootState) => state.wires;
export const hasMorePosts = (state: RootState) => state.posts.hasMore;
export const isLoadingPosts = (state: RootState) => state.posts.isLoading;

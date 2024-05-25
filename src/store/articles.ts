import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ARTICLES} from 'constants/store';
import {Article, Articles} from 'types';

const initialState: Articles = {};

const articles = createSlice({
  initialState,
  name: ARTICLES,
  reducers: {
    setArticle: (state: Articles, {payload}: PayloadAction<Article>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setArticles: (state: Articles, {payload}: PayloadAction<Article[]>) => {
      return payload.reduce((acc: Articles, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetArticle: (state: Articles, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setArticle, setArticles, unsetArticle} = articles.actions;
export default articles.reducer;

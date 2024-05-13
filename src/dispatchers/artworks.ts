import {store} from 'store';
import {
  createArtwork as _createArtwork,
  deleteArtwork as _deleteArtwork,
  getArtwork as _getArtwork,
  getArtworks as _getArtworks,
  GetArtworksParams,
  updateArtwork as _updateArtwork,
} from 'api/artworks';
import {resetArtworks as _resetArtworks, setArtwork, setArtworks, startLoading, unsetArtwork} from 'store/artworks';
import {AppDispatch, CreateArtworkRequest, EditArtworkRequest} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createArtwork = (data: CreateArtworkRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createArtwork(data);
  dispatch(setArtwork(responseData));
};

export const deleteArtwork = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteArtwork(id);
  dispatch(unsetArtwork(id));
};

export const getArtwork = (id: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getArtwork(id);
  dispatch(setArtwork(responseData));
};

export const getArtworks = (params?: GetArtworksParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().artworks);
  const responseData = await _getArtworks(nextURL, params);
  dispatch(setArtworks(responseData));
};

export const resetArtworks = () => (dispatch: AppDispatch) => {
  dispatch(_resetArtworks());
};

export const updateArtwork = (id: number, data: EditArtworkRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _updateArtwork(id, data);
  dispatch(setArtwork(responseData));
};

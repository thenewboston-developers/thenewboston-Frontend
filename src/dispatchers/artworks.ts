import {
  createArtwork as _createArtwork,
  deleteArtwork as _deleteArtwork,
  getArtwork as _getArtwork,
  getArtworks as _getArtworks,
  updateArtwork as _updateArtwork,
  GetArtworksParams,
} from 'api/artworks';
import {setArtwork, setArtworks, unsetArtwork} from 'store/artworks';
import {AppDispatch, CreateArtworkRequest, EditArtworkRequest} from 'types';

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
  const responseData = await _getArtworks(params);
  dispatch(setArtworks(responseData));
};

export const updateArtwork = (id: number, data: EditArtworkRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _updateArtwork(id, data);
  dispatch(setArtwork(responseData));
};

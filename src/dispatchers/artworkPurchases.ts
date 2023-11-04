import {createArtworkPurchase as _createArtworkPurchase} from 'api/artworkPurchases';
import {setArtworkTransfer} from 'store/artworkTransfers';
import {AppDispatch, CreateArtworkPurchaseRequest} from 'types';

export const createArtworkPurchase = (data: CreateArtworkPurchaseRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createArtworkPurchase(data);
  dispatch(setArtworkTransfer(responseData));
};

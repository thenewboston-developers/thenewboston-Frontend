import {createArtworkTransfer as _createArtworkTransfer} from 'api/artworkTransfers';
import {setArtworkTransfer} from 'store/artworkTransfers';
import {AppDispatch, CreateArtworkTransferRequest} from 'types';

export const createArtworkTransfer = (data: CreateArtworkTransferRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createArtworkTransfer(data);
  dispatch(setArtworkTransfer(responseData));
};

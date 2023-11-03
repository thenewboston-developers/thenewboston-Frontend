import {
  createArtworkTransfer as _createArtworkTransfer,
  getArtworkTransfers as _getArtworkTransfers,
  GetArtworkTransfersParams,
} from 'api/artworkTransfers';
import {setArtworkTransfer, setArtworkTransfers} from 'store/artworkTransfers';
import {AppDispatch, CreateArtworkTransferRequest} from 'types';

export const createArtworkTransfer = (data: CreateArtworkTransferRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createArtworkTransfer(data);
  dispatch(setArtworkTransfer(responseData));
};

export const getArtworkTransfers = (params?: GetArtworkTransfersParams) => async (dispatch: AppDispatch) => {
  const responseData = await _getArtworkTransfers(params);
  dispatch(setArtworkTransfers(responseData));
};

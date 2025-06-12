import {ChartDataResponse, ChartTimeRange, getChartData as _getChartData} from 'api/exchangeChartData';
import {AppDispatch} from 'types';

export const getChartData =
  (assetPairId: number, timeRange: ChartTimeRange) =>
  async (dispatch: AppDispatch): Promise<ChartDataResponse> => {
    try {
      const data = await _getChartData({
        asset_pair: assetPairId,
        time_range: timeRange,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

import {getChartData as _getChartData} from 'api/chartData';
import {setChartData} from 'store/chartData';
import {AppDispatch, ChartData, ChartTimeRange} from 'types';

export const getChartData =
  (assetPairId: number, timeRange: ChartTimeRange) =>
  async (dispatch: AppDispatch): Promise<ChartData> => {
    try {
      const response = await _getChartData({
        asset_pair: assetPairId,
        time_range: timeRange,
      });

      dispatch(
        setChartData({
          candlesticks: response.candlesticks,
          intervalMinutes: response.interval_minutes,
          primaryCurrencyId: response.primary_currency,
          secondaryCurrencyId: response.secondary_currency,
        }),
      );

      return response;
    } catch (error) {
      throw error;
    }
  };

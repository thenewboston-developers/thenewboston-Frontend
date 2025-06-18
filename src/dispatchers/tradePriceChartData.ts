import {getTradePriceChartData as _getTradePriceChartData} from 'api/tradePriceChartData';
import {setTradePriceChartData} from 'store/tradePriceChartData';
import {AppDispatch, ChartTimeRange, TradePriceChartData} from 'types';

export const getTradePriceChartData =
  (assetPairId: number, timeRange: ChartTimeRange) =>
  async (dispatch: AppDispatch): Promise<TradePriceChartData> => {
    try {
      const response = await _getTradePriceChartData({
        asset_pair: assetPairId,
        time_range: timeRange,
      });

      dispatch(
        setTradePriceChartData({
          candlesticks: response.candlesticks,
          currentTimeRange: timeRange,
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

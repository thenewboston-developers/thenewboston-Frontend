import {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as d3 from 'd3';

import CurrencyLogo from 'components/CurrencyLogo';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {getTradePriceChartData as fetchTradePriceChartData} from 'dispatchers/tradePriceChartData';
import {useActiveAssetPair} from 'hooks';
import {getTradePriceChartData} from 'selectors/state';
import {clearTradePriceChartData} from 'store/tradePriceChartData';
import {colors} from 'styles';
import {AppDispatch, Candlestick, ChartTimeRange, SFC} from 'types';
import {chartDisplayDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface DisplayCandlestick extends Candlestick {
  display_date: string;
}

const Chart: SFC = ({className}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1D');
  const activeAssetPair = useActiveAssetPair();
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const svgRef = useRef<SVGSVGElement>(null);
  const tradePriceChartDataState = useSelector(getTradePriceChartData);
  const {candlesticks} = tradePriceChartDataState;

  // Fetch chart data when activeAssetPair or timeframe changes
  useEffect(() => {
    if (!activeAssetPair) return;

    (async () => {
      // Map UI timeframe to API timerange
      const timeframeToApiMap: Record<string, ChartTimeRange> = {
        '1D': '1d',
        '1W': '1w',
        '1M': '1m',
        '3M': '3m',
        '1Y': '1y',
        ALL: 'all',
      };

      setIsLoading(true);
      try {
        await dispatch(fetchTradePriceChartData(activeAssetPair.id, timeframeToApiMap[timeframe]));
      } catch (error) {
        displayErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [activeAssetPair, dispatch, timeframe]);

  // Clear chart data when unmounting or switching asset pairs
  useEffect(() => {
    return () => {
      dispatch(clearTradePriceChartData());
    };
  }, [dispatch, activeAssetPair?.id]);

  const displayData = useMemo(() => {
    return candlesticks.map((candlestick) => ({
      ...candlestick,
      display_date: chartDisplayDate(candlestick.end),
    }));
  }, [candlesticks]);

  const lastTradePrice = useMemo(() => {
    const lastCandlestick = candlesticks[candlesticks.length - 1];
    return lastCandlestick?.close || 0;
  }, [candlesticks]);

  const firstTradePrice = useMemo(() => {
    const firstCandlestick = candlesticks[0];
    return firstCandlestick?.close || 0;
  }, [candlesticks]);

  const priceChange = useMemo(() => {
    if (!firstTradePrice || !lastTradePrice) return 0;
    return ((lastTradePrice - firstTradePrice) / firstTradePrice) * 100;
  }, [firstTradePrice, lastTradePrice]);

  const priceStats = useMemo(() => {
    if (!candlesticks.length) return {avg: 0, max: 0, min: 0};

    const highs = candlesticks.map((c) => c.high);
    const lows = candlesticks.map((c) => c.low);
    const allPrices = candlesticks.flatMap((c) => [c.open, c.high, c.low, c.close]);

    const min = Math.min(...lows);
    const max = Math.max(...highs);
    const avg = allPrices.reduce((a, b) => a + b, 0) / allPrices.length;

    return {avg, max, min};
  }, [candlesticks]);

  const isPositive = priceChange >= 0;

  const renderChartContent = () => {
    if (isLoading && candlesticks.length === 0) {
      return (
        <S.LoadingContainer>
          <Loader size={24} />
        </S.LoadingContainer>
      );
    }

    if (candlesticks.length === 0) {
      return (
        <S.EmptyContainer>
          <EmptyText>No chart data available for this timeframe</EmptyText>
        </S.EmptyContainer>
      );
    }

    return <svg ref={svgRef}></svg>;
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || displayData.length === 0) return;

    const renderChart = () => {
      const margin = {bottom: 40, left: 60, right: 40, top: 20};
      const container = containerRef.current;
      if (!container) return;

      // Get the actual container width to prevent overflow
      const containerWidth = container.getBoundingClientRect().width;
      const width = Math.max(0, containerWidth - margin.left - margin.right);
      const height = 420 - margin.top - margin.bottom;

      // Clear previous chart
      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('overflow', 'visible');

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      // Scales
      const xExtent = d3.extent(displayData, (d) => new Date(d.end)) as [Date, Date];
      // Add padding to the time domain to ensure last candlestick fits
      const timePadding = (xExtent[1].getTime() - xExtent[0].getTime()) * 0.02;
      const xScale = d3
        .scaleTime()
        .domain([xExtent[0], new Date(xExtent[1].getTime() + timePadding)])
        .range([0, width]);

      const yExtent = d3.extent(displayData.flatMap((d) => [d.low, d.high])) as [number, number];
      const yPadding = (yExtent[1] - yExtent[0]) * 0.1;
      const yScale = d3
        .scaleLinear()
        .domain([Math.max(0, yExtent[0] - yPadding), yExtent[1] + yPadding])
        .range([height, 0]);

      // Grid lines
      g.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickSize(-height)
            .tickFormat(() => ''),
        )
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.3);

      g.append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(() => ''),
        )
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.3);

      // X Axis
      // Adjust tick count based on data density to prevent overcrowding
      const xAxisTickCount = Math.min(10, Math.max(4, Math.floor(width / 100)));

      // Format x-axis labels based on timeframe
      const formatXAxisLabel = (d: Date | d3.NumberValue) => {
        const date = new Date(d.toString());

        switch (timeframe) {
          case '1D':
            // For 1 day view, show time in 12-hour format with AM/PM
            return date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });
          case '1W':
            // For 1 week view, show date and time with AM/PM
            return `${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}`;
          case '1M':
          case '3M':
            // For month views, show date only
            return `${date.getMonth() + 1}/${date.getDate()}`;
          case '1Y':
          case 'ALL':
            // For year and all time views, show month/year
            return `${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`;
          default:
            return chartDisplayDate(d.toString());
        }
      };

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(xAxisTickCount).tickFormat(formatXAxisLabel))
        .style('font-size', '12px')
        .style('color', colors.palette.gray[600]);

      // Y Axis
      g.append('g')
        .call(
          d3
            .axisLeft(yScale)
            .tickFormat((d) => d.toString())
            .tickPadding(10),
        )
        .style('font-size', '12px')
        .style('color', colors.palette.gray[600]);

      // Candlestick width based on data density
      // Adjust width based on number of data points to handle variable length data
      const maxCandleWidth = 20;
      const minCandleWidth = 1;
      const idealWidth = (width / displayData.length) * 0.7; // Reduced from 0.8 to ensure space
      const candleWidth = Math.max(minCandleWidth, Math.min(maxCandleWidth, idealWidth));

      // High-Low lines
      g.selectAll('.high-low-line')
        .data(displayData)
        .enter()
        .append('line')
        .attr('class', 'high-low-line')
        .attr('x1', (d) => xScale(new Date(d.end)))
        .attr('x2', (d) => xScale(new Date(d.end)))
        .attr('y1', (d) => yScale(d.high))
        .attr('y2', (d) => yScale(d.low))
        .attr('stroke', (d) => (d.open <= d.close ? colors.palette.green[500] : colors.palette.red[500]))
        .attr('stroke-width', 1);

      // Candle bodies
      g.selectAll('.candle-body')
        .data(displayData)
        .enter()
        .append('rect')
        .attr('class', 'candle-body')
        .attr('x', (d) => xScale(new Date(d.end)) - candleWidth / 2)
        .attr('y', (d) => {
          // If open equals close, position the dash centered on the price
          if (d.open === d.close) {
            return yScale(d.close) - 0.5;
          }
          return yScale(Math.max(d.open, d.close));
        })
        .attr('width', candleWidth)
        .attr('height', (d) => {
          // If open equals close, make a 1px tall dash
          if (d.open === d.close) {
            return 1;
          }
          return Math.abs(yScale(d.open) - yScale(d.close));
        })
        .attr('fill', (d) => (d.open <= d.close ? colors.palette.green[500] : colors.palette.red[500]))
        .attr('stroke', (d) => (d.open <= d.close ? colors.palette.green[500] : colors.palette.red[500]))
        .attr('stroke-width', 1);

      // Vertical hover line
      const hoverLine = g
        .append('line')
        .attr('class', 'hover-line')
        .attr('y1', 0)
        .attr('y2', height)
        .style('stroke', colors.palette.gray[400])
        .style('stroke-width', 1)
        .style('opacity', 0);

      // Tooltip
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'd3-tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '8px')
        .style('font-size', '12px')
        .style('pointer-events', 'none');

      // Invisible overlay for mouse events
      g.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mousemove', (event) => {
          const [mouseX] = d3.pointer(event, g.node());
          const bisectDate = d3.bisector<DisplayCandlestick, Date>((d) => new Date(d.end)).left;
          const x0 = xScale.invert(mouseX);
          const i = bisectDate(displayData, x0, 1);
          const d0 = displayData[i - 1];
          const d1 = displayData[i];
          const d =
            !d1 || x0.getTime() - new Date(d0.end).getTime() > new Date(d1.end).getTime() - x0.getTime() ? d1 : d0;

          if (d) {
            // Show and position the hover line at the center of the hovered interval
            hoverLine
              .style('opacity', 1)
              .attr('x1', xScale(new Date(d.end)))
              .attr('x2', xScale(new Date(d.end)));
            // Format start and end times based on timeframe
            const startDate = new Date(d.start);
            const endDate = new Date(d.end);
            let timeRangeText;

            // Helper function for date/time formatting
            const formatDateTime = (date: Date) => {
              const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
              const timeStr = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });
              return `${dateStr} ${timeStr}`;
            };

            // Helper function for date only formatting
            const formatDate = (date: Date) =>
              `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}`;

            switch (timeframe) {
              case '1D':
              case '1W':
              case '1M':
                // For shorter timeframes, show full date and time with AM/PM
                timeRangeText = `${formatDateTime(startDate)} - ${formatDateTime(endDate)}`;
                break;
              case '3M':
              case '1Y':
              case 'ALL':
                // For longer timeframes, show date only
                timeRangeText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
                break;
              default:
                // Default to date only format
                timeRangeText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
                break;
            }

            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
              .html(
                `
              <div style="margin-bottom: 8px;"><strong>${timeRangeText}</strong></div>
              <div>Open: ${Math.round(d.open).toLocaleString()}</div>
              <div>High: ${Math.round(d.high).toLocaleString()}</div>
              <div>Low: ${Math.round(d.low).toLocaleString()}</div>
              <div>Close: ${Math.round(d.close).toLocaleString()}</div>
              <div>Volume: ${Math.round(d.volume).toLocaleString()}</div>
            `,
              )
              .style('left', event.pageX + 10 + 'px')
              .style('top', event.pageY - 28 + 'px');
          }
        })
        .on('mouseout', () => {
          tooltip.transition().duration(500).style('opacity', 0);
          hoverLine.style('opacity', 0);
        });

      // Cleanup tooltip on unmount
      return () => {
        d3.select('body').selectAll('.d3-tooltip').remove();
      };
    };

    renderChart();

    // Handle resize
    const handleResize = () => {
      renderChart();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      d3.select('body').selectAll('.d3-tooltip').remove();
    };
  }, [displayData, isPositive, timeframe]);

  return (
    <S.Container className={className}>
      <S.ChartHeader>
        <S.PriceSection>
          <S.PriceWrapper>
            <S.CurrentPrice>
              {activeAssetPair && (
                <>
                  <S.PriceLogo>
                    <CurrencyLogo logo={activeAssetPair.secondary_currency.logo} width="32px" />
                  </S.PriceLogo>
                  <S.PriceAmount>{lastTradePrice}</S.PriceAmount>
                </>
              )}
            </S.CurrentPrice>

            <S.PriceChange $isPositive={isPositive}>
              <S.ChangeArrow $isPositive={isPositive}>{isPositive ? '▲' : '▼'}</S.ChangeArrow>
              {Math.abs(priceChange).toFixed(2)}%
            </S.PriceChange>
          </S.PriceWrapper>

          <S.StatsBar>
            <S.StatItem>
              <S.StatLabel>High</S.StatLabel>
              <S.StatValue>{priceStats.max}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>Low</S.StatLabel>
              <S.StatValue>{priceStats.min}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>Avg</S.StatLabel>
              <S.StatValue>{priceStats.avg.toFixed(2)}</S.StatValue>
            </S.StatItem>
          </S.StatsBar>
        </S.PriceSection>

        <S.ChartControls>
          <S.TimeframeButtons>
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
              <S.TimeframeButton $active={timeframe === tf} key={tf} onClick={() => setTimeframe(tf)}>
                {tf}
              </S.TimeframeButton>
            ))}
          </S.TimeframeButtons>
        </S.ChartControls>
      </S.ChartHeader>

      <S.ChartWrapper ref={containerRef}>{renderChartContent()}</S.ChartWrapper>
    </S.Container>
  );
};

export default Chart;

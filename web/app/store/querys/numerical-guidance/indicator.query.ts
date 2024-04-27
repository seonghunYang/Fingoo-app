import useSWR from 'swr';
import { API_PATH } from '../api-path';
import { fetchIndicatorsValue } from '../fetcher';
import { Interval } from '../../stores/numerical-guidance/indicator-board.store';

export type IndicatorType = 'customForecastIndicator' | 'k-stock';

export type IndicatorsValueResponse = {
  indicatorsValue: IndicatorValueResponse[];
};

export type IndicatorValueResponse = {
  indicatorId: string;
  ticker: string;
  market: string;
  type: IndicatorType;
  values: IndicatorValueItemResponse[];
};

export type IndicatorValueItemResponse = {
  date: string;
  value: number | string;
};

export const useFetchLiveIndicatorsValue = (indicatorIds: string[] | undefined, interval: Interval = 'day') => {
  // fix: type에 따라 url 변경 필요
  const key = indicatorIds ? [`${API_PATH.liveIndicatorValue}/k-stock`, interval, ...indicatorIds] : null;

  return useSWR<IndicatorsValueResponse, any, string[] | null>(key, fetchIndicatorsValue);
};

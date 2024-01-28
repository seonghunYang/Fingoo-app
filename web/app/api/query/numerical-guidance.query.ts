import useSWR from 'swr';
import { API_PATH } from '../api-path';

export type IndicatorResponse = {
  ticker: string;
  name: string;
};

type IndicatorBoardMetadataResponse = {
  id: string;
  name: string;
  indicators: IndicatorResponse[];
};

export type IndicatorBoardMetadataListResponse = {
  metadataList: IndicatorBoardMetadataResponse[];
};

export const useFetchIndicatorBoardMetadataList = () =>
  useSWR<IndicatorBoardMetadataListResponse>(API_PATH.metadataList);

// Risk: 중복된 응답 타입을 가져가는게 옳은 선택일까?
export type IndicatorListResponse = {
  indicatorList: IndicatorResponse[];
};

export const useFetchIndicatorList = () => useSWR<IndicatorListResponse>(API_PATH.indicatorList);

import { create } from 'zustand';
import { storeResetFns } from '../reset-store';

export const indicatorTypes = [
  'stocks',
  'forex_pairs',
  'cryptocurrencies',
  'etf',
  'indices',
  'customForecastIndicator',
  'funds',
  'bonds',
] as const;
export type IndicatorType = (typeof indicatorTypes)[number];

type IndicatorListState = {
  selectedIndicatorType: IndicatorType;
};

type IndicatorListAction = {
  selectIndicatorType: (indicatorType: IndicatorType) => void;
};

type IndicatorListStore = IndicatorListState & {
  actions: IndicatorListAction;
};

const initialIndicatorListState: IndicatorListState = {
  selectedIndicatorType: 'stocks',
};

export const useIndicatorListStore = create<IndicatorListStore>((set) => {
  storeResetFns.add(() => set(initialIndicatorListState));
  return {
    ...initialIndicatorListState,
    actions: {
      selectIndicatorType: (indicatorType) => set({ selectedIndicatorType: indicatorType }),
    },
  };
});

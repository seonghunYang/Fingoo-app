import {
  CustomForecastIndicatorResponse,
  CustomForecastIndicatorValueResponse,
  ForecastType,
} from '@/app/store/querys/numerical-guidance/custom-forecast-indicator.query';
import { FormatOptions, FormattedItem, IndicatorValue, IndicatorValueItem } from './indicator-value-view-model.service';
import { HistoryIndicatorValueResponse } from '@/app/store/querys/numerical-guidance/history-indicator.query';

type CustomForecastIndicator = {
  customForecastIndicatorName: string;
};

export class CustomForecastIndicatorValue extends IndicatorValue {
  readonly customForecastIndicatorId: string;
  readonly targetIndicatorId: string;
  readonly ticker: string;
  readonly market: string;
  readonly type: string;
  readonly customForecastIndicatorValues: IndicatorValueItem[];
  readonly customForecastIndicatorName: string;
  readonly targetIndicatorValues: IndicatorValueItem[];
  readonly forecastType: ForecastType;

  constructor({
    customForecastIndicatorId,
    targetIndicatorId,
    ticker,
    market,
    type,
    customForecastIndicatorName,
    customForecastIndicatorValues,
    targetIndicatorValues,
    forecastType,
  }: CustomForecastIndicatorValueResponse & CustomForecastIndicator) {
    const customForecastIndicatorValueItems = customForecastIndicatorValues.map((item) => new IndicatorValueItem(item));
    const targetIndicatorValueItems = targetIndicatorValues.map((item) => new IndicatorValueItem(item));
    const mergedValueItems = [...targetIndicatorValueItems, ...customForecastIndicatorValueItems];
    super(customForecastIndicatorId, mergedValueItems);
    this.customForecastIndicatorId = customForecastIndicatorId;
    this.targetIndicatorId = targetIndicatorId;
    this.ticker = ticker;
    this.market = market;
    this.type = type;
    this.customForecastIndicatorName = customForecastIndicatorName;
    this.customForecastIndicatorValues = customForecastIndicatorValueItems;
    this.targetIndicatorValues = targetIndicatorValueItems;
    this.forecastType = forecastType;
  }

  formatItemsByDate(options?: FormatOptions): FormattedItem {
    const { isValueWithIndexUnit } = options || { isValueWithIndexUnit: false };
    return this.caculateItemsValue(isValueWithIndexUnit ?? false).reduce<FormattedItem>((acc, item) => {
      return {
        ...acc,
        [item.date]: {
          [this.customForecastIndicatorName]: {
            value: item.value,
            displayValue: item.displayValue,
          },
        },
      };
    }, {});
  }

  get identifier() {
    return this.customForecastIndicatorName;
  }
}

export const convertCustomForecastIndicatorsValue = (
  customForecastIndicatorsValue: (CustomForecastIndicatorValueResponse & { customForecastIndicatorName: string })[],
) => {
  return customForecastIndicatorsValue.map((item) => new CustomForecastIndicatorValue(item));
};

export const convertCustomForecastHistoryIndicatorsValueViewModel = (
  customForecastHistoryIndicatorsValue: HistoryIndicatorValueResponse[],
  selectedCustomForeacastIndicators: CustomForecastIndicatorResponse[],
) => {
  let memorizedCustomForecastIndicators = [...selectedCustomForeacastIndicators];
  return customForecastHistoryIndicatorsValue.reduce<CustomForecastIndicatorValue[]>((acc, item) => {
    const index = memorizedCustomForecastIndicators.findIndex(
      (customForecastIndicator) => customForecastIndicator.targetIndicatorId === item.indicator.id,
    );

    if (index === -1) return acc;
    const customForecastIndicator = memorizedCustomForecastIndicators[index];
    memorizedCustomForecastIndicators.splice(index, 1);

    return [
      ...acc,
      new CustomForecastIndicatorValue({
        customForecastIndicatorId: customForecastIndicator.id,
        targetIndicatorId: customForecastIndicator.targetIndicatorId,
        ticker: item.indicator.ticker,
        market: item.indicator.market,
        type: item.indicator.type,
        customForecastIndicatorName: customForecastIndicator.customForecastIndicatorName,
        customForecastIndicatorValues: [],
        targetIndicatorValues: item.values,
        name: item.indicator.name,
        forecastType: 'multi',
      }),
    ];
  }, []);
};

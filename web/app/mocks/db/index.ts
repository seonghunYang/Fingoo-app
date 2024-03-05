import { IndicatorsValueResponse } from '../../store/querys/numerical-guidance/indicator.query';
import { IndicatorBoardMetadataListResponse } from '../../store/querys/numerical-guidance/indicator-board-metadata.query';
import { IndicatorListResponse } from '../../store/querys/numerical-guidance/indicator.query';
import { indicatorsValueMockData } from '../mock-data/indicators-value.mock';
import { CustomForecastIndicatorListResponse } from '../../store/querys/numerical-guidance/custom-forecast-indicator.query';
import { historyIndicatorsValueMockData } from '../mock-data/history-indicators-value.mock';
import {
  MockIndicatorBoardMetadataAction,
  mockIndicatorBoardMetadataAction,
} from './indicator-board-metadata-action.mock';
import { MockIndicatorAction, mockIndicatorAction } from './indicator-action.mock';
import {
  MockCustomForecastIndicatorAction,
  mockCustomForecastIndicatorAction,
} from './custom-forecast-indicator-action.mock';

type MockDatabase = IndicatorBoardMetadataListResponse &
  IndicatorListResponse &
  IndicatorsValueResponse &
  CustomForecastIndicatorListResponse & {
    historyIndicatorsValue: historyIndicatorsValueMockData;
  };

type MockDatabaseAction = MockCustomForecastIndicatorAction & MockIndicatorBoardMetadataAction & MockIndicatorAction;

export const mockDB: MockDatabaseAction = {
  ...mockIndicatorBoardMetadataAction,
  ...mockIndicatorAction,
  ...mockCustomForecastIndicatorAction,
};

const initialState: MockDatabase = {
  metadataList: [
    {
      id: '1',
      name: 'metadata1',
      indicatorIds: [],
      customForecastIndicatorIds: [],
    },
    {
      id: '2',
      name: 'metadata2',
      indicatorIds: [],
      customForecastIndicatorIds: [],
    },
    {
      id: '3',
      name: 'metadata3',
      indicatorIds: [],
      customForecastIndicatorIds: [],
    },
  ],
  indicatorList: [
    {
      id: '1',
      ticker: 'AAPL',
      name: 'Apple Inc.',
    },
    {
      id: '2',
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
    },
    {
      id: '3',
      ticker: 'GOOG',
      name: 'Alphabet Inc.',
    },
    {
      id: '9785ba85-c924-4269-8238-e1f10b404177',
      name: '삼성전자',
      ticker: '005930',
    },
  ],
  indicatorsValue: indicatorsValueMockData,
  historyIndicatorsValue: historyIndicatorsValueMockData,
  customForecastIndicatorList: [
    {
      id: '1',
      name: 'customForecastIndicator1',
      targetIndicatorId: '1',
      sourceIndicatorIdsAndweights: [
        {
          id: '2',
          weight: 0.5,
        },
        {
          id: '3',
          weight: 0.5,
        },
      ],
    },
    {
      id: '2',
      name: 'customForecastIndicator2',
      targetIndicatorId: '2',
      sourceIndicatorIdsAndweights: [
        {
          id: '1',
          weight: 0.5,
        },
        {
          id: '3',
          weight: 0.5,
        },
      ],
    },
    {
      id: '3',
      name: 'customForecastIndicator3',
      targetIndicatorId: '3',
      sourceIndicatorIdsAndweights: [
        {
          id: '1',
          weight: 0.5,
        },
        {
          id: '2',
          weight: 0.5,
        },
      ],
    },
  ],
};

// mock이라 성능상의 문제가 필요 없음으로 사용
function initStore(): MockDatabase {
  return JSON.parse(JSON.stringify(initialState));
}

export let mockDatabaseStore = initStore();

export const resetMockDB = () => {
  mockDatabaseStore = initStore();
};
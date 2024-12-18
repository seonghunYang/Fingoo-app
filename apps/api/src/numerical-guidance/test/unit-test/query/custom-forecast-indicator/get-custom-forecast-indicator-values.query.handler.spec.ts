import { Test } from '@nestjs/testing';
import { GetCustomForecastIndicatorValuesQuery } from 'src/numerical-guidance/application/query/custom-forecast-indicator/get-custom-forecast-indicator-values/get-custom-forecast-indicator-values.query';
import { GetCustomForecastIndicatorValuesQueryHandler } from 'src/numerical-guidance/application/query/custom-forecast-indicator/get-custom-forecast-indicator-values/get-custom-forecast-indicator-values.query.handler';
import { CustomForecastIndicator } from 'src/numerical-guidance/domain/custom-forecast-indicator';
import { CustomForecastIndicatorValuesResponse } from 'src/commons/type/type-definition';
import { LoadIndicatorPort } from 'src/numerical-guidance/application/port/persistence/indicator/load-indicator.port';
import { LoadCustomForecastIndicatorValuesPort } from 'src/numerical-guidance/application/port/persistence/custom-forecast-indicator/load-custom-forecast-indicator-values.port';
import { LoadCustomForecastIndicatorPort } from 'src/numerical-guidance/application/port/persistence/custom-forecast-indicator/load-custom-forecast-indicator.port';
import { StockDto } from '../../../../application/query/indicator/get-indicator-list/dto/stock.dto';

const testForecastResponseData: CustomForecastIndicatorValuesResponse = {
  customForecastIndicatorId: '2c9846d1-d496-4d6d-96c5-d3b065708573',
  targetIndicatorId: '2c9846d1-d496-4d6d-96c5-d3b065708573',
  type: 'stocks',
  ticker: '373220',
  name: 'LG에너지솔루션',
  exchange: 'KOSPI',
  forecastType: 'single',
  customForecastIndicatorValues: [
    {
      value: '50328.131',
      date: '20230101',
    },
  ],
};

const indicatorDto: StockDto = {
  id: '5776afe3-6a3f-42e9-83ec-cb634b76f958',
  index: 1,
  symbol: 'AAPL',
  indicatorType: 'stocks',
  name: 'Apple Inc',
  currency: 'USD',
  exchange: 'NASDAQ',
  mic_code: 'XNGS',
  country: 'United States',
  type: 'Common Stock',
};

describe('GetCustomForecastIndicatorValuesQueryHandler', () => {
  let getCustomForecastIndicatorValuesQueryHandler: GetCustomForecastIndicatorValuesQueryHandler;
  let loadCustomForecastIndicatorValuesPort: LoadCustomForecastIndicatorValuesPort;
  let loadCustomForecastIndicatorPort: LoadCustomForecastIndicatorPort;
  let loadIndicatorPort: LoadIndicatorPort;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetCustomForecastIndicatorValuesQueryHandler,
        {
          provide: 'LoadIndicatorPort',
          useValue: {
            loadIndicator: jest.fn().mockImplementation(() => {
              return indicatorDto;
            }),
          },
        },
        {
          provide: 'LoadCustomForecastIndicatorPort',
          useValue: {
            loadCustomForecastIndicator: jest.fn().mockImplementation(() => {
              const customForecastIndicator: CustomForecastIndicator = new CustomForecastIndicator(
                '0d2bd0a1-3211-4f8c-8ed5-2a90fea30b1a',
                '예측지표',
                'customForecastIndicator',
                {
                  id: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf1',
                  name: '타켓지표',
                  type: 'Common Stock',
                  index: 1234,
                  country: 'KOREA',
                  currency: 'KRW',
                  mic_code: 'PINX',
                  indicatorType: 'stocks',
                  exchange: 'KOSPI',
                  symbol: 'PPAL',
                },
                [],
                [],
                [],
                [],
              );
              return customForecastIndicator;
            }),
          },
        },
        {
          provide: 'LoadCustomForecastIndicatorValuesPort',
          useValue: {
            loadCustomForecastIndicatorValues: jest.fn().mockImplementation(() => {
              const data: CustomForecastIndicatorValuesResponse = testForecastResponseData;
              return data;
            }),
          },
        },
      ],
    }).compile();
    getCustomForecastIndicatorValuesQueryHandler = module.get(GetCustomForecastIndicatorValuesQueryHandler);
    loadCustomForecastIndicatorValuesPort = module.get('LoadCustomForecastIndicatorValuesPort');
    loadCustomForecastIndicatorPort = module.get('LoadCustomForecastIndicatorPort');
    loadIndicatorPort = module.get('LoadIndicatorPort');
  }, 10000);

  it('예측지표 id를 가지고 예측지표의 예측값을 불러온다.', async () => {
    // given
    const testQuery = new GetCustomForecastIndicatorValuesQuery('0d2bd0a1-3211-4f8c-8ed5-2a90fea30b1a');

    // when
    await getCustomForecastIndicatorValuesQueryHandler.execute(testQuery);

    //then
    expect(loadCustomForecastIndicatorPort.loadCustomForecastIndicator).toHaveBeenCalledTimes(1);
    expect(loadCustomForecastIndicatorValuesPort.loadCustomForecastIndicatorValues).toHaveBeenCalledTimes(1);
    expect(loadIndicatorPort.loadIndicator).toHaveBeenCalledTimes(1);
  });
});

import { CustomForecastIndicator } from 'src/numerical-guidance/domain/custom-forecast-indicator';
import { CustomForecastIndicatorNameShouldNotEmptyRule } from 'src/numerical-guidance/domain/rule/CustomForecastIndicatorNameShouldNotEmpty.rule';
import { SourceIndicatorCountShouldNotExceedLimitRule } from 'src/numerical-guidance/domain/rule/SourceIndicatorCountShouldNotBeExeedLimit.rule';
import { SourceIndicatorsShouldNotDuplicateRule } from 'src/numerical-guidance/domain/rule/SourceIndicatorsShouldNotDuplicate.rule';
import { TargetIndicatorShouldNotBeIncludedInSourceIndicatorsRule } from 'src/numerical-guidance/domain/rule/TargetIndicatorShouldNotBeIncludedInSourceIndicators.rule';
import { BusinessRuleValidationException } from 'src/commons/domain/business-rule-validation.exception';
import { IndicatorType, SourceIndicatorInformation } from 'src/commons/type/type-definition';

describe('예측지표', () => {
  it('예측 지표 생성', () => {
    // given

    // when
    const customForecastIndicator = CustomForecastIndicator.createNew('예측지표 이름', {
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
    });

    // then
    const type: IndicatorType = 'customForecastIndicator';
    const expected = new CustomForecastIndicator(
      'uuid',
      '예측지표 이름',
      type,
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
    expect(expected.customForecastIndicatorName).toEqual(customForecastIndicator.customForecastIndicatorName);
    expect(expected.targetIndicator).toEqual(customForecastIndicator.targetIndicator);
  });

  it('예측지표 생성-지표이름이 빈 값일 경우 - 빈 문자열일 경우', () => {
    // given
    const content = '';
    // when
    function createNewCustomForecastIndicator() {
      CustomForecastIndicator.createNew(content, {
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
      });
    }
    const rule = new CustomForecastIndicatorNameShouldNotEmptyRule(content);

    // then
    expect(createNewCustomForecastIndicator).toThrow(BusinessRuleValidationException);
    expect(createNewCustomForecastIndicator).toThrow(rule.Message);
  });

  it('예측지표 생성-지표이름이 빈 값일 경우 - 공백일 경우', () => {
    // given
    const content = '      ';
    // when
    function createNewCustomForecastIndicator() {
      CustomForecastIndicator.createNew(content, {
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
      });
    }
    const rule = new CustomForecastIndicatorNameShouldNotEmptyRule(content);

    // then
    expect(createNewCustomForecastIndicator).toThrow(BusinessRuleValidationException);
    expect(createNewCustomForecastIndicator).toThrow(rule.Message);
  });

  it('예측지표 업데이트', () => {
    // given
    const customForecastIndicator = CustomForecastIndicator.createNew('예측지표 이름', {
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
    });

    const sourceIndicatorsInformation: SourceIndicatorInformation[] = [
      {
        sourceIndicatorId: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf2',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf3',
        indicatorType: 'stocks',
        weight: 20,
      },
    ];

    // when
    customForecastIndicator.updateSourceIndicatorsInformation(sourceIndicatorsInformation);

    // then
    const expected = sourceIndicatorsInformation;
    expect(customForecastIndicator.sourceIndicatorsInformation).toEqual(expected);
  });

  it('예측지표 업데이트 - 재료지표와 가중치 없는 상태로 업데이트', () => {
    // given
    const customForecastIndicator = new CustomForecastIndicator(
      '26929514-237c-11ed-861d-0242ac120011',
      'updatedCustomForecastIndicator',
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
      [
        {
          indicatorId: '26929514-237c-11ed-861d-0242ac120013',
          verification: 'True',
        },
      ],
      [
        {
          indicatorId: '26929514-237c-11ed-861d-0242ac120013',
          verification: 'True',
        },
      ],
      [
        {
          sourceIndicatorId: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf2',
          indicatorType: 'stocks',
          weight: 20,
        },
      ],
      [
        {
          id: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf2',
          name: '재료지표',
          type: 'Common Stock',
          index: 1234,
          country: 'KOREA',
          currency: 'KRW',
          mic_code: 'PINX',
          indicatorType: 'stocks',
          exchange: 'KOSPI',
          symbol: 'PPAL',
        },
      ],
    );

    const sourceIndicatorsInformation: SourceIndicatorInformation[] = [];

    // when
    customForecastIndicator.updateSourceIndicatorsInformation(sourceIndicatorsInformation);

    // then
    const expected = [];
    expect(customForecastIndicator.sourceIndicatorsInformation).toEqual(expected);
  });

  it('예측지표 업데이트 - 재료 지표가 중복될 때', () => {
    // given
    const customForecastIndicator = CustomForecastIndicator.createNew('예측지표 이름', {
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
    });

    const sourceIndicatorInformation: SourceIndicatorInformation[] = [
      {
        sourceIndicatorId: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf2',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf2',
        indicatorType: 'stocks',
        weight: 20,
      },
    ];

    // when
    function updateSourceIndicatorsAndWeights() {
      customForecastIndicator.updateSourceIndicatorsInformation(sourceIndicatorInformation);
    }
    const rule = new SourceIndicatorsShouldNotDuplicateRule(sourceIndicatorInformation);

    // then
    expect(updateSourceIndicatorsAndWeights).toThrow(BusinessRuleValidationException);
    expect(updateSourceIndicatorsAndWeights).toThrow(rule.Message);
  });

  it('예측지표 업데이트 - 타겟 지표가 재료지표 안에 포함될 경우', () => {
    // given
    const targetIndicatorId = '26929514-237c-11ed-861d-0242ac120012';
    const customForecastIndicator = new CustomForecastIndicator(
      '26929514-237c-11ed-861d-0242ac120012',
      'updatedCustomForecastIndicator',
      'customForecastIndicator',
      {
        id: '26929514-237c-11ed-861d-0242ac120012',
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
      [
        {
          indicatorId: '26929514-237c-11ed-861d-0242ac120012',
          verification: 'True',
        },
      ],
      [
        {
          indicatorId: '26929514-237c-11ed-861d-0242ac120012',
          verification: 'True',
        },
      ],
      [
        {
          sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120012',
          indicatorType: 'stocks',
          weight: 20,
        },
      ],
      [
        {
          id: '26929514-237c-11ed-861d-0242ac120012',
          name: '재료지표',
          type: 'Common Stock',
          index: 1234,
          country: 'KOREA',
          currency: 'KRW',
          mic_code: 'PINX',
          indicatorType: 'stocks',
          exchange: 'KOSPI',
          symbol: 'PPAL',
        },
      ],
    );

    const sourceIndicatorInformation: SourceIndicatorInformation[] = [
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120012',
        indicatorType: 'stocks',
        weight: 10,
      },
    ];

    // when
    function updateSourceIndicatorsAndWeights() {
      customForecastIndicator.updateSourceIndicatorsInformation(sourceIndicatorInformation);
    }
    const rule = new TargetIndicatorShouldNotBeIncludedInSourceIndicatorsRule(
      sourceIndicatorInformation,
      targetIndicatorId,
    );

    // then
    expect(updateSourceIndicatorsAndWeights).toThrow(BusinessRuleValidationException);
    expect(updateSourceIndicatorsAndWeights).toThrow(rule.Message);
  });

  it('예측지표 업데이트 - 재료 지표가 10개가 넘어갈 경우', () => {
    // given
    const customForecastIndicator = CustomForecastIndicator.createNew('예측지표 이름', {
      id: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf0',
      name: '타켓지표',
      type: 'Common Stock',
      index: 1234,
      country: 'KOREA',
      currency: 'KRW',
      mic_code: 'PINX',
      indicatorType: 'stocks',
      exchange: 'KOSPI',
      symbol: 'PPAL',
    });

    const sourceIndicatorIdsAndWeights: SourceIndicatorInformation[] = [
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120001',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120002',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120003',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120004',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120005',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120006',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120007',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120008',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120009',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120010',
        indicatorType: 'stocks',
        weight: 20,
      },
      {
        sourceIndicatorId: '26929514-237c-11ed-861d-0242ac120011',
        indicatorType: 'stocks',
        weight: 20,
      },
    ];

    // when
    function updateSourceIndicatorsAndWeights() {
      customForecastIndicator.updateSourceIndicatorsInformation(sourceIndicatorIdsAndWeights);
    }
    const rule = new SourceIndicatorCountShouldNotExceedLimitRule(sourceIndicatorIdsAndWeights);

    // then
    expect(updateSourceIndicatorsAndWeights).toThrow(BusinessRuleValidationException);
    expect(updateSourceIndicatorsAndWeights).toThrow(rule.Message);
  });

  it('예측지표 이름을 수정한다.', () => {
    // given
    const customForecastIndicator = new CustomForecastIndicator(
      'f5206520-da94-11ee-b91b-3551e6db3bbd',
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

    // when
    customForecastIndicator.updateCustomForecastIndicatorName('수정한 이름');
    const expected = '수정한 이름';

    // then
    expect(expected).toEqual(customForecastIndicator.customForecastIndicatorName);
  });

  it('예측지표 이름을 수정한다. - 이름이 비었을 때', () => {
    // given
    const customForecastIndicator = new CustomForecastIndicator(
      'f5206520-da94-11ee-b91b-3551e6db3bbd',
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

    const content = '';

    // when
    function updateCustomForecastIndicatorName() {
      customForecastIndicator.updateCustomForecastIndicatorName(content);
    }
    const rule = new CustomForecastIndicatorNameShouldNotEmptyRule(content);

    // then
    expect(updateCustomForecastIndicatorName).toThrow(BusinessRuleValidationException);
    expect(updateCustomForecastIndicatorName).toThrow(rule.Message);
  });
});

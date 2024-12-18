import { AggregateRoot } from 'src/commons/domain/aggregate-root';
import { CustomForecastIndicatorNameShouldNotEmptyRule } from './rule/CustomForecastIndicatorNameShouldNotEmpty.rule';
import {
  IndicatorDtoType,
  IndicatorType,
  SourceIndicatorInformation,
  Verification,
} from 'src/commons/type/type-definition';
import { ApiProperty } from '@nestjs/swagger';
import { SourceIndicatorsShouldNotDuplicateRule } from './rule/SourceIndicatorsShouldNotDuplicate.rule';
import { SourceIndicatorCountShouldNotExceedLimitRule } from './rule/SourceIndicatorCountShouldNotBeExeedLimit.rule';
import { TargetIndicatorShouldNotBeIncludedInSourceIndicatorsRule } from './rule/TargetIndicatorShouldNotBeIncludedInSourceIndicators.rule';

export class CustomForecastIndicator extends AggregateRoot {
  @ApiProperty({
    example: 'c6a99067-27d0-4358-b3d5-e63a64b604c0',
    description: '예측지표 id',
  })
  readonly id: string;

  @ApiProperty({
    example: 'my first custom forecast indicator',
    description: '예측지표 이름',
  })
  customForecastIndicatorName: string;

  @ApiProperty({
    example: 'customForecastIndicator',
    description: '예측지표 타입',
  })
  type: IndicatorType;

  @ApiProperty({
    example: {
      targetIndicatorId: 'c6a99067-27d0-4358-b3d5-e63a64b604c0',
      targetIndicatorName: '타겟지표 이름',
      name: '예측지표',
      exchange: 'KOSPI',
      symbol: 'PPAL',
    },
    description: '타켓지표 정보',
  })
  targetIndicator: IndicatorDtoType;

  @ApiProperty({
    example: [],
    description: '그레인저 검정결과',
  })
  grangerVerification: Verification[];

  @ApiProperty({
    example: [],
    description: '공적분 검정결과',
  })
  cointJohansenVerification: Verification[];

  @ApiProperty({
    example: [],
    description: '재료지표 id, type 가중치',
  })
  sourceIndicatorsInformation: SourceIndicatorInformation[];

  @ApiProperty({
    example: [],
    description: '재료지표 리스트',
  })
  sourceIndicators: IndicatorDtoType[];

  @ApiProperty({
    example: '2024-03-08T02:34:57.630Z',
    description: '예측지표 생성 날짜',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-08T02:34:57.630Z',
    description: '예측지표 업데이트 날짜',
  })
  updatedAt: Date;

  constructor(
    id: string,
    customForecastIndicatorName: string,
    type: IndicatorType,
    targetIndicator: IndicatorDtoType,
    grangerVerification: Verification[],
    cointJohansenVerification: Verification[],
    sourceIndicatorsInformation: SourceIndicatorInformation[],
    sourceIndicators: IndicatorDtoType[],
  ) {
    super();
    this.checkRule(new CustomForecastIndicatorNameShouldNotEmptyRule(customForecastIndicatorName));
    this.id = id;
    this.customForecastIndicatorName = customForecastIndicatorName;
    this.type = type;
    this.targetIndicator = targetIndicator;
    this.grangerVerification = grangerVerification;
    this.cointJohansenVerification = cointJohansenVerification;
    this.sourceIndicatorsInformation = sourceIndicatorsInformation;
    this.sourceIndicators = sourceIndicators;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static createNew(customForecastIndicatorName: string, targetIndicator: IndicatorDtoType): CustomForecastIndicator {
    const grangerVerification: Verification[] = [];
    const cointJohansenVerification: Verification[] = [];
    const sourceIndicatorsInformation: SourceIndicatorInformation[] = [];
    const sourceIndicators: IndicatorDtoType[] = [];

    const type: IndicatorType = 'customForecastIndicator';
    return new CustomForecastIndicator(
      null,
      customForecastIndicatorName,
      type,
      targetIndicator,
      grangerVerification,
      cointJohansenVerification,
      sourceIndicatorsInformation,
      sourceIndicators,
    );
  }

  public updateSourceIndicatorsInformation(updateSourceIndicatorsInformation: SourceIndicatorInformation[]) {
    this.checkRule(new SourceIndicatorsShouldNotDuplicateRule(updateSourceIndicatorsInformation));
    this.checkRule(new SourceIndicatorCountShouldNotExceedLimitRule(updateSourceIndicatorsInformation));
    this.checkRule(
      new TargetIndicatorShouldNotBeIncludedInSourceIndicatorsRule(
        updateSourceIndicatorsInformation,
        this.targetIndicator.id,
      ),
    );

    if (updateSourceIndicatorsInformation.length == 0) {
      this.sourceIndicatorsInformation = [];
    } else {
      this.sourceIndicatorsInformation = updateSourceIndicatorsInformation.slice();
    }
    this.updatedAt = new Date();
  }

  public updateSourceIndicators(updateSourceIndicators: IndicatorDtoType[]) {
    if (updateSourceIndicators.length == 0) {
      this.sourceIndicators = [];
    } else {
      this.sourceIndicators = updateSourceIndicators.slice();
    }
  }

  public updateCustomForecastIndicatorName(name: string) {
    this.checkRule(new CustomForecastIndicatorNameShouldNotEmptyRule(name));
    this.customForecastIndicatorName = name;
    this.updatedAt = new Date();
  }
}

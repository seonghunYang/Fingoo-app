import { HttpModule } from '@nestjs/axios';
import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { UserMetadataEntity } from 'src/user/infrastructure/adapter/persistence/entity/user-metadata.entity';
import { CustomForecastIndicator } from 'src/numerical-guidance/domain/custom-forecast-indicator';
import { CustomForecastIndicatorPersistentAdapter } from 'src/numerical-guidance/infrastructure/adapter/persistence/custom-forecast-indicator/custom-forecast-indicator.persistent.adapter';
import { CustomForecastIndicatorEntity } from 'src/numerical-guidance/infrastructure/adapter/persistence/custom-forecast-indicator/entity/custom-forecast-indicator.entity';
import { DataSource } from 'typeorm';
import { IndicatorEntity } from 'src/numerical-guidance/infrastructure/adapter/persistence/indicator/entity/indicator.entity';
import { IndicatorBoardMetadataEntity } from 'src/numerical-guidance/infrastructure/adapter/persistence/indicator-board-metadata/entity/indicator-board-metadata.entity';
import { IndicatorBoardMetadataPersistentAdapter } from 'src/numerical-guidance/infrastructure/adapter/persistence/indicator-board-metadata/indicator-board-metadata.persistent.adapter';

jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
}));

describe('CustomForecastIndicatorPersistentAdapter', () => {
  let environment;
  let dataSource: DataSource;
  let customForecastIndicatorPersistentAdapter: CustomForecastIndicatorPersistentAdapter;
  let indicatorBoardMetadataPersistentAdapter: IndicatorBoardMetadataPersistentAdapter;
  const seeding = async () => {
    const memberRepository = dataSource.getRepository(UserMetadataEntity);
    await memberRepository.insert({
      userId: '11111111-1111-1111-1111-111111111111',
      email: 'example@gmail.com',
      username: 'testname',
    });
    const member = await memberRepository.findOneBy({ userId: '11111111-1111-1111-1111-111111111111' });

    const customForecastIndicatorRepository = dataSource.getRepository(CustomForecastIndicatorEntity);
    const indicatorBoardMetadataRepository = dataSource.getRepository(IndicatorBoardMetadataEntity);

    await customForecastIndicatorRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba94',
      customForecastIndicatorName: '메타데이터 내 지표삭제 테스트',
      type: 'customForecastIndicator',
      targetIndicator: {
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
      grangerVerification: [],
      cointJohansenVerification: [],
      sourceIndicatorsInformation: [],
      sourceIndicators: [],
      member: member,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba84',
      indicatorBoardMetadataName: '지표보드메타데이터',
      indicatorInfos: [],
      customForecastIndicatorIds: ['0d73cea1-35a5-432f-bcd1-27ae3541ba94'],
      sections: { section1: ['0d73cea1-35a5-432f-bcd1-27ae3541ba94'] },
      member: member,
    });

    await customForecastIndicatorRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
      customForecastIndicatorName: '예측지표',
      type: 'customForecastIndicator',
      targetIndicator: {
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
      grangerVerification: [],
      cointJohansenVerification: [],
      sourceIndicatorsInformation: [],
      sourceIndicators: [],
      member: member,
    });

    await customForecastIndicatorRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
      customForecastIndicatorName: '삭제용예측지표',
      type: 'customForecastIndicator',
      targetIndicator: {
        id: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf2',
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
      grangerVerification: [],
      cointJohansenVerification: [],
      sourceIndicatorsInformation: [],
      sourceIndicators: [],
      member: member,
    });

    await customForecastIndicatorRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba75',
      customForecastIndicatorName: '수정전예측지표이름',
      type: 'customForecastIndicator',
      targetIndicator: {
        id: '008628f5-4dbd-4c3b-b793-ca0fa22b3cf3',
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
      grangerVerification: [],
      cointJohansenVerification: [],
      sourceIndicatorsInformation: [],
      sourceIndicators: [],
      member: member,
    });

    const indicatorRepository = dataSource.getRepository(IndicatorEntity);
    await indicatorRepository.insert({
      id: '26929514-237c-11ed-861d-0242ac120011',
      name: 'LG전자',
      ticker: '066570',
      type: 'stocks',
      exchange: 'KOSPI',
    });
    await indicatorRepository.insert({
      id: '26929514-237c-11ed-861d-0242ac120012',
      name: '삼성SDI',
      ticker: '006400',
      type: 'stocks',
      exchange: 'KOSPI',
    });
  };

  beforeEach(async () => {
    environment = await new PostgreSqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        HttpModule.registerAsync({
          useFactory: () => ({
            timeout: 10000,
            maxRedirects: 5,
          }),
        }),
        TypeOrmModule.forFeature([
          CustomForecastIndicatorEntity,
          UserMetadataEntity,
          IndicatorEntity,
          IndicatorBoardMetadataEntity,
        ]),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: () => ({
            type: 'postgres',
            retryAttempts: 20,
            retryDelay: 5000,
            host: environment.getHost(),
            port: environment.getPort(),
            username: environment.getUsername(),
            password: environment.getPassword(),
            database: environment.getDatabase(),
            entities: [
              CustomForecastIndicatorEntity,
              UserMetadataEntity,
              IndicatorEntity,
              IndicatorBoardMetadataEntity,
            ],
            synchronize: true,
          }),
        }),
      ],
      providers: [CustomForecastIndicatorPersistentAdapter, IndicatorBoardMetadataPersistentAdapter],
    }).compile();
    customForecastIndicatorPersistentAdapter = module.get(CustomForecastIndicatorPersistentAdapter);
    indicatorBoardMetadataPersistentAdapter = module.get(IndicatorBoardMetadataPersistentAdapter);
    dataSource = module.get<DataSource>(DataSource);
    await seeding();
  }, 100000);

  afterAll(async () => {
    await environment.stop();
  });

  it('예측지표 생성하고 생성한 id로 예측지표 확인', async () => {
    // given
    const customForecastIndicator: CustomForecastIndicator = CustomForecastIndicator.createNew('예측지표 이름', {
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
    const memberId: string = '11111111-1111-1111-1111-111111111111';

    // when
    const resultId = await customForecastIndicatorPersistentAdapter.createCustomForecastIndicator(
      customForecastIndicator,
      memberId,
    );
    const resultCustomForecastIndicator: CustomForecastIndicator =
      await customForecastIndicatorPersistentAdapter.loadCustomForecastIndicator(resultId);

    // then
    expect(customForecastIndicator.customForecastIndicatorName).toEqual(
      resultCustomForecastIndicator.customForecastIndicatorName,
    );
  });

  it('예측지표 생성 - 회원을 찾지 못한 경우', async () => {
    // given
    const customForecastIndicator: CustomForecastIndicator = CustomForecastIndicator.createNew('예측지표 이름', {
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
    const invalidMemberId = '100';

    // when
    // then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.createCustomForecastIndicator(
        customForecastIndicator,
        invalidMemberId,
      );
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        error: `[ERROR] memberId: ${invalidMemberId} 해당 회원을 찾을 수 없습니다.`,
        message: '서버에 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });

  it('예측지표 id로 예측지표 불러오기 - db에 존재하지 않을 경우', async () => {
    // given
    const invalidId = 'a46240d3-7d15-48e7-a9b7-f490bf9ca6e3';

    //when
    //then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.loadCustomForecastIndicator(invalidId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        error: `[ERROR] 해당 예측지표를 찾을 수 없습니다.`,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });

  it('예측지표 삭제하기 - 예측지표 객체 삭제 확인', async () => {
    // given
    const customForecastIndicatorId: string = '0d73cea1-35a5-432f-bcd1-27ae3541ba74';

    // when
    await customForecastIndicatorPersistentAdapter.deleteCustomForecastIndicator(customForecastIndicatorId);

    // then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.loadCustomForecastIndicator(customForecastIndicatorId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        error: `[ERROR] customForecastIndicatorId: ${customForecastIndicatorId} 해당 예측지표를 찾을 수 없습니다.`,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });

  it('예측지표 삭제하기 - 지표보드메타데이터 내 예측지표 삭제 확인', async () => {
    // given
    const customForecastIndicatorId: string = '0d73cea1-35a5-432f-bcd1-27ae3541ba94';

    // when
    await customForecastIndicatorPersistentAdapter.deleteCustomForecastIndicator(customForecastIndicatorId);
    const indicatorBoardMetadata = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba84',
    );

    // then
    expect(indicatorBoardMetadata.customForecastIndicatorIds.length).toEqual(0);
    expect(indicatorBoardMetadata.sections['section1'].length).toEqual(0);
  });

  it('예측지표 삭제하기 - DB에 삭제할 데이터가 없는 경우', async () => {
    // given
    const invalidId: string = '0d73cea1-35a5-432f-bcd1-27ae3541b100';

    // when // then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.deleteCustomForecastIndicator(invalidId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        error: `[ERROR] customForecastIndicatorId: ${invalidId} 해당 예측지표를 찾을 수 없습니다.`,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });

  it('예측지표 삭제하기 - id 형식이 올바르지 않은 경우', async () => {
    // given
    const invalidId: string = 'notUUID';

    // when // then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.deleteCustomForecastIndicator(invalidId);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        error: `[ERROR] 예측지표를 삭제하는 도중에 entity 오류가 발생했습니다.
        1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });

  it('예측지표 이름 수정하기', async () => {
    // given
    const customForecastIndicator = new CustomForecastIndicator(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba75',
      '수정한예측지표이름',
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
    await customForecastIndicatorPersistentAdapter.updateCustomForecastIndicatorName(customForecastIndicator);
    const updatedCustomForecastIndicator = await customForecastIndicatorPersistentAdapter.loadCustomForecastIndicator(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba75',
    );

    // then
    const expected = '수정한예측지표이름';
    expect(expected).toEqual(updatedCustomForecastIndicator.customForecastIndicatorName);
  });

  it('예측지표 이름 수정하기 - DB에 예측지표가 존재하지 않을 경우', async () => {
    // given
    const customForecastIndicator = new CustomForecastIndicator(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba57',
      '수정한예측지표이름',
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

    // when // then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.updateCustomForecastIndicatorName(customForecastIndicator);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        error: `[ERROR] customForecastIndicatorId: ${customForecastIndicator.id} 해당 예측지표를 찾을 수 없습니다.`,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });

  it('예측지표 이름 수정하기 - id 형식이 올바르지 않은 경우', async () => {
    // given
    const customForecastIndicator = new CustomForecastIndicator(
      'invail-id',
      '수정한예측지표이름',
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

    // when // then
    await expect(async () => {
      await customForecastIndicatorPersistentAdapter.updateCustomForecastIndicatorName(customForecastIndicator);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        error: `[ERROR] 예측지표의 이름을 수정하는 도중에 entity 오류가 발생했습니다.
      1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
        message: '서버에 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
        cause: Error,
      }),
    );
  });
});

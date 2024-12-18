import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IndicatorBoardMetadataPersistentAdapter } from '../../../../infrastructure/adapter/persistence/indicator-board-metadata/indicator-board-metadata.persistent.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorBoardMetadata } from '../../../../domain/indicator-board-metadata';
import { IndicatorBoardMetadataEntity } from '../../../../infrastructure/adapter/persistence/indicator-board-metadata/entity/indicator-board-metadata.entity';
import { UserMetadataEntity } from '../../../../../user/infrastructure/adapter/persistence/entity/user-metadata.entity';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { mockUserMetadataData1 } from '../../../../../user/test/data/mock-user.metadata.data1';
import { mockUserMetadataData2 } from '../../../../../user/test/data/mock-user.metadata.data2';
import { mockUserMetadataData3 } from '../../../../../user/test/data/mock-user.metadata.data3';
import { mockUserMetadataData4 } from '../../../../../user/test/data/mock-user.metadata.data4';

jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
}));

describe('IndicatorBoardMetadataPersistentAdapter', () => {
  let environment;
  let dataSource: DataSource;
  let indicatorBoardMetadataPersistentAdapter: IndicatorBoardMetadataPersistentAdapter;
  const seeding = async () => {
    const memberRepository = dataSource.getRepository(UserMetadataEntity);
    await memberRepository.insert(mockUserMetadataData1);
    await memberRepository.insert(mockUserMetadataData2);
    await memberRepository.insert(mockUserMetadataData3);
    await memberRepository.insert(mockUserMetadataData4);
    memberRepository.save;

    const indicatorBoardMetadataRepository = dataSource.getRepository(IndicatorBoardMetadataEntity);
    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
      indicatorBoardMetadataName: 'name',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData1,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba72',
      indicatorBoardMetadataName: 'name',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData2,
    });

    await indicatorBoardMetadataRepository.insert({
      id: 'f2be45ee-d73b-43b6-9344-a8f2264bee40',
      indicatorBoardMetadataName: 'name',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData2,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba60',
      indicatorBoardMetadataName: 'name',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData2,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba10',
      indicatorBoardMetadataName: 'memberTest',
      indicatorInfos: [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      customForecastIndicatorIds: ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      sections: {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      member: mockUserMetadataData3,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba11',
      indicatorBoardMetadataName: 'memberTest',
      indicatorInfos: [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      customForecastIndicatorIds: ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      sections: {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      member: mockUserMetadataData3,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba12',
      indicatorBoardMetadataName: 'memberTest',
      indicatorInfos: [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      customForecastIndicatorIds: ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      sections: {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      member: mockUserMetadataData3,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
      indicatorBoardMetadataName: 'name',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData4,
    });

    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541b010',
      indicatorBoardMetadataName: '예측지표 삭제 테스트',
      indicatorInfos: [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      customForecastIndicatorIds: [
        'customForecastIndicatorId1',
        'customForecastIndicatorId2',
        'customForecastIndicatorId3',
      ],
      sections: {
        section1: [
          'indicatorId1',
          'indicatorId2',
          'customForecastIndicatorId1',
          'customForecastIndicatorId2',
          'customForecastIndicatorId3',
        ],
      },
      member: mockUserMetadataData4,
    });
  };

  beforeAll(async () => {
    environment = await new PostgreSqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forFeature([UserMetadataEntity, IndicatorBoardMetadataEntity]),
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
            entities: [IndicatorBoardMetadataEntity, UserMetadataEntity],
            synchronize: true,
          }),
        }),
      ],
      providers: [IndicatorBoardMetadataPersistentAdapter],
    }).compile();
    indicatorBoardMetadataPersistentAdapter = module.get(IndicatorBoardMetadataPersistentAdapter);
    dataSource = module.get<DataSource>(DataSource);
    await seeding();
  }, 80000);

  afterAll(async () => {
    await environment.stop();
  });

  it('지표보드 메타데이터 생성 확인', async () => {
    // given
    const memberId = mockUserMetadataData1.userId;
    const indicatorBoardMetaData: IndicatorBoardMetadata = IndicatorBoardMetadata.createNew('메타 데이터');

    // when
    const resultId = await indicatorBoardMetadataPersistentAdapter.createIndicatorBoardMetadata(
      indicatorBoardMetaData,
      memberId,
    );
    const resultIndicatorBoardMetaData: IndicatorBoardMetadata =
      await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(resultId);

    // then
    expect(resultIndicatorBoardMetaData.indicatorBoardMetadataName).toEqual('메타 데이터');
  });

  it('지표보드 메타데이터 생성 - 회원을 찾지 못한 경우', async () => {
    const invalidMemberId = '11';
    const indicatorBoardMetaData: IndicatorBoardMetadata = IndicatorBoardMetadata.createNew('메타 데이터');

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.createIndicatorBoardMetadata(
        indicatorBoardMetaData,
        invalidMemberId,
      );
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        error: `[ERROR] memberId: ${invalidMemberId} 해당 회원을 찾을 수 없습니다.`,
        message: '회원 정보가 올바른지 확인해주세요.',
        cause: Error,
      }),
    );
  });

  it('생성한 지표보드 메타데이터 id로 메타데이터 가져오기', async () => {
    // given
    const indicatorBoardMetaData: IndicatorBoardMetadata = IndicatorBoardMetadata.createNew('메타 데이터');

    // when
    const resultId = await indicatorBoardMetadataPersistentAdapter.createIndicatorBoardMetadata(
      indicatorBoardMetaData,
      mockUserMetadataData1.userId,
    );
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(resultId);

    // then
    const expectedName = '메타 데이터';
    const expectedIndicatorId = [];

    expect(result.indicatorBoardMetadataName).toEqual(expectedName);
    expect(result.indicatorInfos).toEqual(expectedIndicatorId);
  });

  it('생성한 지표보드 메타데이터 id로 메타데이터 가져오기 - DB에 존재하지 않는 경우', async () => {
    // given
    const invalidId = 'a46240d3-7d15-48e7-a9b7-f490bf9ca6e3';

    // when
    // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(invalidId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${invalidId} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('생성한 지표보드 메타데이터 id로 메타데이터 가져오기 - id 형식이 맞지 않는 경우', async () => {
    // given
    const invalidId = 'invalidUUID';

    // when
    // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(invalidId);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] 지표보드 메타데이터를 불러오는 도중에 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터에 새로운 지표 id 추가하기.', async () => {
    // given
    const currentDate: Date = new Date();
    const newIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
      'name',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      [],
      {
        section1: ['indicatorId1', 'indicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when
    await indicatorBoardMetadataPersistentAdapter.addIndicatorId(newIndicatorBoardMetadata);
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
    );

    // then
    expect(result.indicatorBoardMetadataName).toEqual('name');
    expect(result.indicatorInfos).toEqual([
      {
        exchange: 'NASDAQ',
        id: 'indicatorId1',
        symbol: 'AAPL',
        indicatorType: 'stocks',
        name: 'Apple Inc',
      },
      {
        exchange: 'NYSE',
        id: 'indicatorId2',
        symbol: 'AAPL',
        indicatorType: 'stocks',
        name: 'Advance Auto Parts Inc',
      },
    ]);
    const expectedSectionsLength = 2;
    expect(Object.values(result.sections).reduce((acc, values) => acc + values.length, 0)).toEqual(
      expectedSectionsLength,
    );
  });

  it('사용자 id로 메타데이터 리스트 가져오기.', async () => {
    // given
    const memberId = mockUserMetadataData3.userId;

    // when
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadataList(memberId);

    // then
    const expected = 3;
    expect(result.length).toEqual(expected);
  });

  it('사용자 id로 메타데이터 리스트를 가져오기 - 해당 회원이 없을 경우', async () => {
    // given
    const invalidId = 111;
    // when
    // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadataList(invalidId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] memberId: ${invalidId} 해당 회원을 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('사용자 id로 메타데이터 리스트를 가져오기 - 유효하지 않은 member id값일 경우', async () => {
    // given
    const id = 'invalid id';

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadataList(id);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: '[ERROR] 메타데이터 리스트를 불러오는 중 오류가 발생했습니다. member id값이 number인지 확인하세요.',
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터에 새로운 지표 id 추가하기. - DB에 존재하지 않는 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const newIndicatorBoardMetaData: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      'f2be45ee-d73b-43b6-9344-a8f2264bee41',
      'name',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.addIndicatorId(newIndicatorBoardMetaData);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${newIndicatorBoardMetaData.id} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터에서 지표 삭제하기.', async () => {
    // given
    const currentDate: Date = new Date();
    const deleteIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
      'name',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      [],
      {
        section1: ['indicatorId1', 'indicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when
    await indicatorBoardMetadataPersistentAdapter.deleteIndicatorId(deleteIndicatorBoardMetadata);
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
    );

    // then
    expect(result.indicatorBoardMetadataName).toEqual('name');
    expect(result.indicatorInfos).toEqual([
      {
        exchange: 'NASDAQ',
        id: 'indicatorId1',
        symbol: 'AAPL',
        indicatorType: 'stocks',
        name: 'Apple Inc',
      },
      {
        exchange: 'NYSE',
        id: 'indicatorId2',
        symbol: 'AAPL',
        indicatorType: 'stocks',
        name: 'Advance Auto Parts Inc',
      },
    ]);
    const expectedSectionsLength = 2;
    expect(Object.values(result.sections).reduce((acc, values) => acc + values.length, 0)).toEqual(
      expectedSectionsLength,
    );
  });

  it('지표보드 메타데이터에서 지표 id 삭제하기. - DB에 존재하지 않는 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const deleteIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      'e46240d3-7d15-48e7-a9b7-f490bf9ca6e0',
      'name',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.deleteIndicatorId(deleteIndicatorBoardMetadata);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${deleteIndicatorBoardMetadata.id} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터에서 예측지표 id 삭제하기', async () => {
    // given
    const currentDate: Date = new Date();
    const indicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541b010',
      '예측지표 삭제 테스트',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when
    await indicatorBoardMetadataPersistentAdapter.deleteCustomForecastIndicatorId(indicatorBoardMetadata);

    // then
    expect(indicatorBoardMetadata.indicatorBoardMetadataName).toEqual('예측지표 삭제 테스트');
    expect(indicatorBoardMetadata.customForecastIndicatorIds).toEqual([
      'customForecastIndicatorId1',
      'customForecastIndicatorId2',
    ]);
    const expectedSectionsLength = 4;
    expect(Object.values(indicatorBoardMetadata.sections).reduce((acc, values) => acc + values.length, 0)).toEqual(
      expectedSectionsLength,
    );
  });

  it('지표보드 메타데이터에서 예측 지표 id 삭제하기 - DB에 존재하지 않을 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const indicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae35419999',
      '예측지표 삭제 테스트',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.deleteCustomForecastIndicatorId(indicatorBoardMetadata);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${indicatorBoardMetadata.id} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터 삭제하기.', async () => {
    // given
    const deleteIndicatorBoardMetadataId: string = '0d73cea1-35a5-432f-bcd1-27ae3541ba72';

    // when
    await indicatorBoardMetadataPersistentAdapter.deleteIndicatorBoardMetadata(deleteIndicatorBoardMetadataId);

    // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(deleteIndicatorBoardMetadataId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${deleteIndicatorBoardMetadataId} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터 삭제하기. - DB에 존재하지 않는 경우', async () => {
    // given
    const invalidId: string = 'e46240d3-7d15-48e7-a9b7-f490bf9ca6e0';

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.deleteIndicatorBoardMetadata(invalidId);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${invalidId} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터 삭제하기. - id 형식이 올바르지 않은 경우', async () => {
    // given
    const invalidId: string = 'invalidId';

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.deleteIndicatorBoardMetadata(invalidId);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] 지표보드 메타데이터를 삭제하는 도중에 entity 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터 이름 수정하기.', async () => {
    // given
    const currentDate: Date = new Date();
    const updateIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba60',
      'updateName',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );
    // when
    await indicatorBoardMetadataPersistentAdapter.updateIndicatorBoardMetadataName(updateIndicatorBoardMetadata);
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba60',
    );

    // then
    expect(result.indicatorBoardMetadataName).toEqual('updateName');
  });

  it('지표보드 메타데이터 이름 수정하기. - DB에 존재하지 않는 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const invalidIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      'e46240d3-7d15-48e7-a9b7-f490bf9ca6e0',
      'updateName',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.updateIndicatorBoardMetadataName(invalidIndicatorBoardMetadata);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${invalidIndicatorBoardMetadata.id} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('지표보드 메타데이터 이름 수정하기. - id 형식이 올바르지 않은 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const invalidIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      'invalidId',
      'updateName',
      [
        {
          id: 'indicatorId1',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Apple Inc',
          exchange: 'NASDAQ',
        },
        {
          id: 'indicatorId2',
          symbol: 'AAPL',
          indicatorType: 'stocks',
          name: 'Advance Auto Parts Inc',
          exchange: 'NYSE',
        },
      ],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['indicatorId1', 'indicatorId2', 'customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.updateIndicatorBoardMetadataName(invalidIndicatorBoardMetadata);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        message: '서버에 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
        error: `[ERROR] 지표보드 메타데이터의 이름을 수정하는 도중에 entity 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
        cause: Error,
      }),
    );
  });

  it('지표보드에 메타데이터에 새로운 예측지표 id 추가하기.', async () => {
    // given
    const currentDate: Date = new Date();
    const newIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
      'name',
      [],
      ['customForecastIndicatorId1'],
      {
        section1: ['customForecastIndicatorId1'],
      },
      currentDate,
      currentDate,
    );

    // when
    await indicatorBoardMetadataPersistentAdapter.addCustomForecastIndicatorId(newIndicatorBoardMetadata);
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
    );

    // then
    expect(result.indicatorBoardMetadataName).toEqual('name');
    expect(result.customForecastIndicatorIds).toEqual(['customForecastIndicatorId1']);
    const expectedSectionsLength = 1;
    expect(Object.values(result.sections).reduce((acc, values) => acc + values.length, 0)).toEqual(
      expectedSectionsLength,
    );
  });

  it('지표보드 메타데이터에 새로운 예측지표 id를 추가하기. - 메타데이터가 DB에 존재하지 않는 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const newIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      'f2be45ee-d73b-43b6-9344-a8f2264bee41',
      'name',
      [],
      ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      {
        section1: ['customForecastIndicatorId1', 'customForecastIndicatorId2'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.addCustomForecastIndicatorId(newIndicatorBoardMetadata);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${newIndicatorBoardMetadata.id} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });

  it('축(section)을 변경한다.', async () => {
    // given
    const currentDate: Date = new Date();
    const newIndicatorBoardMetadata: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
      'name',
      [],
      ['customForecastIndicatorId1'],
      {
        section1: ['customForecastIndicatorId1'],
      },
      currentDate,
      currentDate,
    );

    // when
    await indicatorBoardMetadataPersistentAdapter.updateSections(newIndicatorBoardMetadata);
    const result = await indicatorBoardMetadataPersistentAdapter.loadIndicatorBoardMetadata(
      '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
    );

    // then
    expect(result.indicatorBoardMetadataName).toEqual('name');
    expect(result.sections).toEqual({
      section1: ['customForecastIndicatorId1'],
    });
  });

  it('축(section)을 변경한다. - DB에 없는 경우', async () => {
    // given
    const currentDate: Date = new Date();
    const newIndicatorBoardMetaData: IndicatorBoardMetadata = new IndicatorBoardMetadata(
      'f2be45ee-d73b-43b6-9344-a8f2264bee41',
      'name',
      [],
      ['customForecastIndicatorId1'],
      {
        section1: ['customForecastIndicatorId1'],
      },
      currentDate,
      currentDate,
    );

    // when // then
    await expect(async () => {
      await indicatorBoardMetadataPersistentAdapter.updateSections(newIndicatorBoardMetaData);
    }).rejects.toThrow(
      new NotFoundException({
        HttpStatus: HttpStatus.NOT_FOUND,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: `[ERROR] indicatorBoardMetadataId: ${newIndicatorBoardMetaData.id} 해당 지표보드 메타데이터를 찾을 수 없습니다.`,
        cause: Error,
      }),
    );
  });
});

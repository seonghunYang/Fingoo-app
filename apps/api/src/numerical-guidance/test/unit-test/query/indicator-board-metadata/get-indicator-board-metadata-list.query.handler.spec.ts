import { Test } from '@nestjs/testing';
import { GetIndicatorBoardMetadataListQuery } from 'src/numerical-guidance/application/query/indicator-board-metadata/get-indicator-board-metadata-list/get-indicator-board-metadata-list.query';
import { GetIndicatorBoardMetadataListQueryHandler } from 'src/numerical-guidance/application/query/indicator-board-metadata/get-indicator-board-metadata-list/get-indicator-board-metadata-list.query.handler';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMetadataEntity } from '../../../../../user/infrastructure/adapter/persistence/entity/user-metadata.entity';
import { IndicatorBoardMetadataEntity } from '../../../../infrastructure/adapter/persistence/indicator-board-metadata/entity/indicator-board-metadata.entity';
import { DataSource } from 'typeorm';
import { BadRequestException, HttpStatus, NotFoundException } from '@nestjs/common';
import { mockUserMetadataData1 } from '../../../../../user/test/data/mock-user.metadata.data1';
import { mockUserMetadataData3 } from '../../../../../user/test/data/mock-user.metadata.data3';
import { mockUserMetadataData2 } from '../../../../../user/test/data/mock-user.metadata.data2';

jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
}));

describe('GetIndicatorBoardMetadataListQueryHandler', () => {
  let getIndicatorBoardMetadataListQueryHandler: GetIndicatorBoardMetadataListQueryHandler;
  let environment;
  let dataSource: DataSource;

  const seeding = async () => {
    const memberRepository = dataSource.getRepository(UserMetadataEntity);
    await memberRepository.insert(mockUserMetadataData1);
    await memberRepository.insert(mockUserMetadataData2);
    await memberRepository.insert(mockUserMetadataData3);

    const indicatorBoardMetadataRepository = dataSource.getRepository(IndicatorBoardMetadataEntity);
    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba73',
      indicatorBoardMetadataName: '메타데이터',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData1,
    });
    await indicatorBoardMetadataRepository.insert({
      id: '0d73cea1-35a5-432f-bcd1-27ae3541ba74',
      indicatorBoardMetadataName: '메타데이터',
      indicatorInfos: [],
      customForecastIndicatorIds: [],
      sections: { section1: [] },
      member: mockUserMetadataData1,
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
      providers: [GetIndicatorBoardMetadataListQueryHandler],
    }).compile();
    getIndicatorBoardMetadataListQueryHandler = module.get(GetIndicatorBoardMetadataListQueryHandler);
    dataSource = module.get<DataSource>(DataSource);
    await seeding();
  }, 80000);

  afterAll(async () => {
    await environment.stop();
  });

  it('사용자 id로 메타데이터 리스트 가져오기.', async () => {
    // given
    const memberId = mockUserMetadataData1.userId;
    const testQuery = new GetIndicatorBoardMetadataListQuery(memberId);

    // when
    const result = await getIndicatorBoardMetadataListQueryHandler.execute(testQuery);

    // then
    const expected = 2;
    expect(result.length).toEqual(expected);
  });

  it('사용자 id로 메타데이터 리스트를 가져오기 - 해당 회원이 없을 경우', async () => {
    // given
    const invalidId = '111';
    const testQuery = new GetIndicatorBoardMetadataListQuery(invalidId);

    // when // then
    await expect(async () => {
      await getIndicatorBoardMetadataListQueryHandler.execute(testQuery);
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
    const invalidId = '10.112';
    const testQuery = new GetIndicatorBoardMetadataListQuery(invalidId);

    // when // then
    await expect(async () => {
      await getIndicatorBoardMetadataListQueryHandler.execute(testQuery);
    }).rejects.toThrow(
      new BadRequestException({
        HttpStatus: HttpStatus.BAD_REQUEST,
        message: '정보를 불러오는 중에 문제가 발생했습니다. 다시 시도해주세요.',
        error: '[ERROR] 메타데이터 리스트를 불러오는 중 오류가 발생했습니다. member id값이 number인지 확인하세요.',
        cause: Error,
      }),
    );
  });
});

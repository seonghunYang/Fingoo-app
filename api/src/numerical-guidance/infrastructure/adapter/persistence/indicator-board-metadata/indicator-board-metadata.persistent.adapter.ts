import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateIndicatorBoardMetadataPort } from '../../../../application/port/persistence/create-indicator-board-metadata.port';
import { IndicatorBoardMetadata } from '../../../../domain/indicator-board-metadata';

import { IndicatorBoardMetadataEntity } from './entity/indicator-board-metadata.entity';
import { IndicatorBoardMetadataMapper } from './mapper/indicator-board-metadata.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthService } from '../../../../../auth/auth.service';
import { LoadIndicatorBoardMetadataPort } from 'src/numerical-guidance/application/port/persistence/load-indiactor-board-metadata.port';
import { InsertIndicatorTickerPort } from '../../../../application/port/persistence/insert-indicator-ticker.port';
import { TypeORMError } from 'typeorm/error/TypeORMError';
import { LoadMemberIndicatorBoardMetadataListPort } from 'src/numerical-guidance/application/port/persistence/load-member-indicator-board-metadata-list.port';
import { DeleteIndicatorTickerPort } from '../../../../application/port/persistence/delete-indicator-ticker.port';
import { DeleteIndicatorBoardMetadataPort } from '../../../../application/port/persistence/delete-indicator-board-metadata.port';

import { UpdateIndicatorBoardMetadataNamePort } from '../../../../application/port/persistence/update-indicator-board-metadata-name.port';

@Injectable()
export class IndicatorBoardMetadataPersistentAdapter
  implements
    CreateIndicatorBoardMetadataPort,
    LoadIndicatorBoardMetadataPort,
    InsertIndicatorTickerPort,
    LoadMemberIndicatorBoardMetadataListPort,
    DeleteIndicatorTickerPort,
    DeleteIndicatorBoardMetadataPort,
    UpdateIndicatorBoardMetadataNamePort
{
  constructor(
    @InjectRepository(IndicatorBoardMetadataEntity)
    private readonly indicatorBoardMetadataRepository: Repository<IndicatorBoardMetadataEntity>,
    private readonly authService: AuthService,
  ) {}

  async createIndicatorBoardMetaData(
    indicatorBoardMetaData: IndicatorBoardMetadata,
    memberId: number,
  ): Promise<string> {
    try {
      const member = await this.authService.findById(memberId);
      this.nullCheckForEntity(member);

      const indicatorBoardMetaDataEntity: IndicatorBoardMetadataEntity = IndicatorBoardMetadataMapper.mapDomainToEntity(
        indicatorBoardMetaData,
        member,
      );
      await this.indicatorBoardMetadataRepository.save(indicatorBoardMetaDataEntity);
      return indicatorBoardMetaDataEntity.id;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 회원을 찾을 수 없습니다.',
          error: error,
          HttpStatus: HttpStatus.NOT_FOUND,
        });
      } else {
        throw new InternalServerErrorException({
          message: `[ERROR] 지표보드 메타데이터를 생성하는 도중에 오류가 발생했습니다. 다음과 같은 상황을 확인해보세요.
          1. indicatorBoardMetaData 값 중 비어있는 값이 있는지 확인해주세요.`,
          error: error,
          HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  async loadIndicatorBoardMetaData(id: string): Promise<IndicatorBoardMetadata> {
    try {
      const indicatorBoardMetaDataEntity = await this.indicatorBoardMetadataRepository.findOneBy({ id });
      this.nullCheckForEntity(indicatorBoardMetaDataEntity);
      return IndicatorBoardMetadataMapper.mapEntityToDomain(indicatorBoardMetaDataEntity);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 지표보드 메타데이터를 찾을 수 없습니다.',
          error: error,
          HttpStatus: HttpStatus.NOT_FOUND,
        });
      } else if (error instanceof TypeORMError) {
        throw new BadRequestException({
          message: `[ERROR] 지표보드 메타데이터를 불러오는 도중에 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
          error: error,
          HttpStatus: HttpStatus.BAD_REQUEST,
        });
      } else {
        throw new InternalServerErrorException({
          message: '[ERROR] 지표를 불러오는 중에 예상치 못한 문제가 발생했습니다.',
          error: error,
          HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  async loadMemberIndicatorBoardMetadataList(memberId): Promise<IndicatorBoardMetadata[]> {
    try {
      const memberEntity = await this.authService.findById(memberId);
      this.nullCheckForEntity(memberEntity);

      const query = this.indicatorBoardMetadataRepository.createQueryBuilder('IndicatorBoardMetadataEntity');
      query.where('IndicatorBoardMetadataEntity.memberId = :memberId', { memberId: memberEntity.id });

      const userIndicatorBoardMetadataEntityList = await query.getMany();
      const userIndicatorBoardMetadataList = userIndicatorBoardMetadataEntityList.map((entity) => {
        return IndicatorBoardMetadataMapper.mapEntityToDomain(entity);
      });

      return userIndicatorBoardMetadataList;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 회원을 찾을 수 없습니다.',
          error: error,
        });
      }
      if (error instanceof QueryFailedError) {
        throw new BadRequestException({
          message: '[ERROR] 메타데이터 리스트를 불러오는 중 오류가 발생했습니다. member id값이 number인지 확인하세요.',
          error: error,
        });
      } else {
        throw new InternalServerErrorException({
          message: '[ERROR] 지표를 불러오는 중에 예상치 못한 문제가 발생했습니다.',
          error: error,
        });
      }
    }
  }

  async addIndicatorTicker(indicatorBoardMetaData: IndicatorBoardMetadata): Promise<void> {
    try {
      const id = indicatorBoardMetaData.id;

      const indicatorBoardMetaDataEntity: IndicatorBoardMetadataEntity =
        await this.indicatorBoardMetadataRepository.findOneBy({ id });
      this.nullCheckForEntity(indicatorBoardMetaDataEntity);

      indicatorBoardMetaDataEntity.tickers = indicatorBoardMetaData.tickers;

      await this.indicatorBoardMetadataRepository.save(indicatorBoardMetaDataEntity);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 지표보드 메타데이터를 찾을 수 없습니다.',
          error: error,
          HttpStatus: HttpStatus.NOT_FOUND,
        });
      } else if (error instanceof TypeORMError) {
        throw new BadRequestException({
          message: '[ERROR] 지표보드 메타데이터를 업데이트하는 도중에 entity 오류가 발생했습니다.',
          error: error,
          HttpStatus: HttpStatus.BAD_REQUEST,
        });
      } else {
        throw new InternalServerErrorException({
          message: '[ERROR] 새로운 지표를 추가하는 중에 예상치 못한 문제가 발생했습니다.',
          error: error,
          HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  async deleteIndicatorTicker(indicatorBoardMetaData: IndicatorBoardMetadata): Promise<void> {
    try {
      const id = indicatorBoardMetaData.id;

      const indicatorBoardMetaDataEntity: IndicatorBoardMetadataEntity =
        await this.indicatorBoardMetadataRepository.findOneBy({ id });
      this.nullCheckForEntity(indicatorBoardMetaDataEntity);

      indicatorBoardMetaDataEntity.tickers = indicatorBoardMetaData.tickers;

      await this.indicatorBoardMetadataRepository.save(indicatorBoardMetaDataEntity);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 지표보드 메타데이터를 찾을 수 없습니다.',
          error: error,
          HttpStatus: HttpStatus.NOT_FOUND,
        });
      } else if (error instanceof TypeORMError) {
        throw new BadRequestException({
          message: `[ERROR] 지표보드 메타데이터 지표 ticker를 삭제하는 도중에 entity 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
          error: error,
          HttpStatus: HttpStatus.BAD_REQUEST,
        });
      } else {
        throw new InternalServerErrorException({
          message: '[ERROR] 새로운 지표를 추가하는 중에 예상치 못한 문제가 발생했습니다.',
          error: error,
          HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  async deleteIndicatorBoardMetadata(id: string) {
    try {
      const indicatorBoardMetaDataEntity: IndicatorBoardMetadataEntity =
        await this.indicatorBoardMetadataRepository.findOneBy({ id });
      this.nullCheckForEntity(indicatorBoardMetaDataEntity);

      await this.indicatorBoardMetadataRepository.remove(indicatorBoardMetaDataEntity);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 지표보드 메타데이터를 찾을 수 없습니다.',
          error: error,
        });
      } else if (error instanceof TypeORMError) {
        throw new BadRequestException({
          message: `[ERROR] 지표보드 메타데이터를 삭제하는 도중에 entity 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
          error: error,
        });
      } else {
        throw new InternalServerErrorException({
          message: '[ERROR] 지표보드 메타데이터를 삭제하는 도중에 예상치 못한 문제가 발생했습니다.',
          error: error,
        });
      }
    }
  }

  async updateIndicatorBoardMetadataName(indicatorBoardMetaData: IndicatorBoardMetadata): Promise<void> {
    try {
      const id = indicatorBoardMetaData.id;

      const indicatorBoardMetaDataEntity: IndicatorBoardMetadataEntity =
        await this.indicatorBoardMetadataRepository.findOneBy({ id });
      this.nullCheckForEntity(indicatorBoardMetaDataEntity);

      indicatorBoardMetaDataEntity.indicatorBoardMetadataName = indicatorBoardMetaData.indicatorBoardMetadataName;

      await this.indicatorBoardMetadataRepository.save(indicatorBoardMetaDataEntity);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          message: '[ERROR] 해당 지표보드 메타데이터를 찾을 수 없습니다.',
          error: error,
          HttpStatus: HttpStatus.NOT_FOUND,
        });
      } else if (error instanceof TypeORMError) {
        throw new BadRequestException({
          message: `[ERROR] 지표보드 메타데이터의 이름을 수정하는 도중에 entity 오류가 발생했습니다.
          1. id 값이 uuid 형식을 잘 따르고 있는지 확인해주세요.`,
          error: error,
          HttpStatus: HttpStatus.BAD_REQUEST,
        });
      } else {
        throw new InternalServerErrorException({
          message: '[ERROR] 지표보드 메타데이터의 이름을 수정하는 중에 예상치 못한 문제가 발생했습니다.',
          error: error,
          HttpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  private nullCheckForEntity(entity) {
    if (entity == null) throw new NotFoundException();
  }
}

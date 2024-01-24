import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FluctuatingIndicatorsDto } from 'src/numerical-guidance/application/query/get-fluctuatingIndicators/fluctuatingIndicators.dto';
import { LoadFluctuatingIndicatorPort } from 'src/numerical-guidance/application/port/external/load-fluctuatingIndicator.port';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FluctuatingIndicatorKrxAdapter implements LoadFluctuatingIndicatorPort {
  constructor(
    private readonly api: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async loadFluctuatingIndicator(dataCount: number, ticker: string, market: string): Promise<FluctuatingIndicatorsDto> {
    // KRX API 통신
    const serviceKey = this.configService.get<string>('SERVICE_KEY');
    const request_url: string = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${serviceKey}&numOfRows=${dataCount}&pageNo=1&resultType=json&likeSrtnCd=${ticker}&mrktCls=${market.toUpperCase()}`;
    const res = await this.api.axiosRef.get(request_url);
    const responseData: FluctuatingIndicatorsDto = res.data.response.body;

    if (!responseData) {
      throw new Error('API response body is undefined');
    }

    return responseData;
  }
}

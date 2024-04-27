import { EtfIndicatorResponse } from '@/app/store/querys/numerical-guidance/indicator-list.query';
import { Indicator } from './indicator.service';

export class EtfIndicator extends Indicator {
  readonly symbol: string;
  readonly name: string;
  readonly country: string;
  readonly currency: string;
  readonly exchange: string;

  constructor({ id, indicatorType, symbol, name, country, currency, exchange }: EtfIndicatorResponse) {
    super(id, indicatorType);
    this.symbol = symbol;
    this.name = name;
    this.country = country;
    this.currency = currency;
    this.exchange = exchange;
  }
}

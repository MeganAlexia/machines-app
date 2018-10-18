import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public format(value): string {
    const duration = this.duration(value);
    return `${duration.hours()}h ${duration.minutes()}mn ${duration.seconds()}s`;
  }

  private duration(value: number): any {
    return moment.duration(value, 'seconds');
  }
}

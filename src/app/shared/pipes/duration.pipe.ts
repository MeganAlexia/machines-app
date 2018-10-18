import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/date.service';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor(private dateService: DateService) {}

  transform(value: number, args?: any): any {
    return this.dateService.format(value);
  }

}

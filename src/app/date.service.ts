import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
 
@Injectable()
export class DateService {
 
  // Observable string sources
  private dateResetSource = new Subject<Date>();
  private dateChangeSource = new Subject<number>();
 
  // Observable string streams
  dateResetted$ = this.dateResetSource.asObservable();
  dateChanged$ = this.dateChangeSource.asObservable();
 
  // Service message commands
  resetDate(date: Date) {
    this.dateResetSource.next(date);
  }
 
  changeDate(date: number) {
    this.dateChangeSource.next(date);
  }
}
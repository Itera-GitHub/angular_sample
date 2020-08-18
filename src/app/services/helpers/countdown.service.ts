import { Injectable } from '@angular/core';
import { Subject, interval } from 'rxjs';
import * as moment from 'moment';
import { takeUntil, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  period: any;
  leftDays: number = 0;
  leftHours: number = 0;
  leftMinutes: number = 0;
  leftSeconds: number = 0;
  shouldStopCountdown = new Subject<boolean>();
  updatedTime = new Subject<any>();
  updatedTimeValue = this.updatedTime.asObservable();

  startCounting(dateTime) {
		this.period = interval(1000);
    return this.period.pipe(takeUntil(this.shouldStopCountdown), startWith(0)).subscribe(()=> {
      this.updatedTime.next(this.countdown(dateTime))
    }) 
  }

  countdown(dateTime) {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    let d = moment.duration(dateTime.diff(currentTime));
    this.leftDays = dateTime.diff(currentTime, 'days');
    this.leftHours = d.hours();
    this.leftMinutes = d.minutes();
    this.leftSeconds = d.seconds();
    if((this.leftDays === 0 && this.leftHours === 0 && this.leftMinutes === 0 && this.leftSeconds === 0) || this.leftSeconds <= -1) {
      this.shouldStopCountdown.next(true);
      return [{'time': 0, 'value': 'Days'} , {'time': 0, 'value': 'Hours'} , {'time': 0, 'value': 'Minutes'}, {'time': 0, 'value': 'Seconds'}];
    } else {
      return [{'time': this.leftDays, 'value': 'Days'}, {'time': this.leftHours, 'value': 'Hours'}, {'time': this.leftMinutes, 'value': 'Minutes'}, {'time': this.leftSeconds, 'value': 'Seconds'}];
    }
  }
}
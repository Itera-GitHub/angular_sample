import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentYearService {

  constructor() {}

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getNextYear() {
    return this.getCurrentYear() + 1;
  }

  getSummerYear() {
    let now = Date.now();
    let year = this.getCurrentYear();

    let currentSemesterStart  = Date.parse('January 01 '+year);
    let currentSemesterEnd  = Date.parse('September 30 '+year);

    if((now <= currentSemesterEnd && now >= currentSemesterStart)) {
      return this.getCurrentYear();
    } else {
      return this.getCurrentYear() + 1;
    }
  }

  getCurrentDateFormatted() {
    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();

    return curr_year + "-" + curr_month + "-" + curr_date;
  }

}

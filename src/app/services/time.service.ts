import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  toSeconds(timeStr: any) {
    const [hours, minuts, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minuts * 60 + seconds;
  }

  calculateSumOfElements(totalseconds: any) {
    /*let totalminutes = Math.floor(totalseconds / 60);

    let seconds = totalseconds % 60;
    let hours = Math.floor(totalminutes / 60);
    let minutes = totalminutes % 60;
    //let days = Math.floor(hours % 24);
    let days: number = 0;

    if(hours / 24) {
      days++;
      hours = hours - 24;
    }



    //let time = hours + ':' + minutes + ':' + seconds;
    let time = {d: days, h: hours, m: minutes, s: seconds}
    return time;*/
    let minutes = Math.floor(totalseconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);

    let remainingHours = hours % 24;
    let remainingMinutes = minutes % 60;
    let remainingSeconds = totalseconds % 60;

    return {
      weeks,
      days,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds
    };
  }
}

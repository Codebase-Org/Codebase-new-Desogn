import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  rewriteDate(dateString: any) {
    if(!dateString) return '';

    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.toLocaleString('default', {month: 'long'});
    let newDate = month +', ' + day;
    return newDate;
  }

}

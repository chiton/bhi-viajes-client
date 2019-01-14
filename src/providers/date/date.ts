import { Injectable } from '@angular/core';

@Injectable()
export class DateProvider {

  constructor() {
  }

  public convertISO8601toDate(dtstr : string) : Date {
    
      // replace anything but numbers by spaces
      dtstr = dtstr.replace(/\D/g," ");
    
      // trim any hanging white space
      dtstr = dtstr.replace(/\s+$/,"");
    
      // split on space
      let dtcomps : number[] = dtstr.split(" ").map(Number);
        
      // modify month between 1 based ISO 8601 and zero based Date
      dtcomps[1]--;

      var convdt = new Date(dtcomps[0], dtcomps[1], dtcomps[2]);
    
      return convdt;
    }
}

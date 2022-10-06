import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(iAssignmentName:string, iAction:string) {
    console.log(`Assignement ${iAssignmentName} ${iAction}`)
  }
}

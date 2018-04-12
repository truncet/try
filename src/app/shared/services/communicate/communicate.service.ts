import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CommunicateService {

	private messageSource = new BehaviorSubject<string>("");
	currentMessage = this.messageSource.asObservable();

	private serviceSource = new Array<string>();


  constructor() { }

  changeMessage(message: string){
  	this.messageSource.next(message);
  }
}

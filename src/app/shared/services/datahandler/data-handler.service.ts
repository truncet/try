import { Injectable } from '@angular/core';
import{ Details} from '../../../details';
import { Routes, RouterModule, Router} from '@angular/router';

@Injectable()
export class DataHandlerService {

	private  data: Details[];

  constructor(
  	public router: Router) { }

  public set_data(data:Details[]):void{
  	this.data = data;

  }


  public get_process_name():Array<string>{
  	var main_process = new Set();
  	var main_process_name : any;
  	var process_name;
  	for(let i= 0; i < this.data.length; i++){
  		main_process_name = this.data[i].Job_Name.split('_')[0];
  		main_process.add(main_process_name);

  	}
  	process_name = Array.from(main_process);

  	return process_name;
  }

  public get_process_list(process_name:Array<any>):Array<any>{
  	var process_list: any[] = [];
  	let n = process_name.length;
  	for(let i= 0 ; i< n; i++){
  		process_list.push([]);
  	}

  	for(let i = 0; i< this.data.length; i++){
  		for(let j =0; j < process_name.length; j++){
  			if(this.data[i].Job_Name.startsWith(process_name[j])){
               	process_list[j].push(this.data[i]);
                break;
              }
          }
  		}

  		return process_list;
	}


	public navigate_to(dept_name:string):void{
		this.router.navigate([dept_name])
	}

	get_data_to_be_loaded(service:string, process_name:Array<string>, process_list:Array<string>):Array<string>{
		var data_to_be_loaded :any;
		for(let i = 0; i<process_name.length; i++)
			if(service == process_name[i]){
				data_to_be_loaded = process_list[i];
			}

			return data_to_be_loaded;
	}

	get_counts(data_to_be_loaded:Array<any>):Array<number>{
		let count_pos = 0;
		let count_neg = 0;
		let count_pro = 0;
		var counts:Array<number>;
		for(let i = 0; i< data_to_be_loaded.length; i++){
			status = data_to_be_loaded[i].Status;
			if(status =="Success"){
				count_pos+=1;
			}
			else if (status =="Failed"){
				count_neg+=1;
			}
			else{
				count_pro+=1;
			}
		}
		counts = [count_pos, count_pro, count_neg];
		return counts;

	}
}

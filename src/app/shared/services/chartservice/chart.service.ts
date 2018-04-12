import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

	private chartLabels = ['Success','Progress','Failed'];
	private chartType = 'doughnut';

	public chartClicked(e:any):void{
		console.log(e);

	}

	public chartHovered(e:any):void{
		console.log(e);
	}

	getChartLabels():Array<string>{
		return this.chartLabels;
	}


	getChartType():string{
		return this.chartType;
		
	}

  constructor() { }




}

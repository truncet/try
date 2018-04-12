import { Component, OnInit, ViewEncapsulation, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { WebService } from '../shared/services/webservice/web.service';
import { CommunicateService } from '../shared/services/communicate/communicate.service';
import { Details } from '../details';
import { HttpClientModule } from '@angular/common/http';
import { ChartService } from '../shared/services/chartservice/chart.service';
import { Settings } from '../settings';
import { DataHandlerService } from '../shared/services/datahandler/data-handler.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { RouterLink } from '@angular/router';
//import { DataHandlerService } from '../shared/services/datahandler/data-handler.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

})
export class HomeComponent {

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {}
    public service: string
    public service_names: any;
    public counts = Array<number>(4);
    public data_to_be_loaded: any;
    public clicked_button: any;
    public clicked = 0;
    public chartLabels = this.chartService.getChartLabels();
    public chartType = this.chartService.getChartType();

    public pieChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false
    };


    constructor(private communicate: CommunicateService, private webService: WebService, private chartService: ChartService,

        private dataHandlerService: DataHandlerService,
        private route: ActivatedRoute,
      private router:Router) {


    }

    public services;
    public service1;
    public process;
    public process_list: any[] = [];
    public process_name;
    public data: any;
    public req_service;
    public Total = 0;
    private sectionScroll: string;
    private dist: string;
    public sub: Subscription;
    dtTrigger: Subject<any> = new Subject();


    getPosts() {
        this.counts = [0, 0, 0];
        this.service1 = "PRM";
       this.process = 0;
        console.log(this.counts)
        this.webService.setUrl(environment.api_base+'get/services');
        console.log(environment.api_base)
        console.log('');
        this.sub = this.webService.getPosts().subscribe(
            resultArray => {
                this.services = resultArray;
                console.log(this.services)
                this.communicate.changeMessage(this.services[0]);

            },
            error => console.log("Error: " + error)
        )
        this.webService.setUrl(environment.api_base+ 'get/data/PRM');
        this.sub = this.webService.getPosts().subscribe(
            resultArray => {
                this.data = resultArray;
                console.log(this.data)
                this.set_data();

                this.getdetails()
                //this.set_data()

                //this.Total = this.data.length
                //this.counts = this.dataHandlerService.get_counts(this.data);
                //this.rerendeer()
                console.log(this.counts)

            },
            error => console.log("Error: " + error)
        )
        {
            console.log(this.services)
            return this.services;

        }
    }

    doScroll() {


        if (!this.sectionScroll) {
            this.sectionScroll = this.dist;
            return;
        }

        try {
            var elements = document.getElementById(this.sectionScroll);

            elements.scrollIntoView();
        }
        finally {
            this.sectionScroll = null;
            this.router.navigate(['']);
        }
    }



    getPosts1(service): Details[] {
        /*
        if (!service) {
            service = "PRM"
            console.log(service)
        }
        */
        var i;

        var url = environment.api_base+'get/data/' + service;
        this.webService.setUrl(url);
        this.sub = this.webService.getPosts().subscribe(
            resultArray => {
                this.data = resultArray;
                console.log(this.data)
               this.getdetails()
                /*
                this.set_data();
                this.Total=this.data.length
                this.counts = this.dataHandlerService.get_counts(this.data);
                this.rerendeer()
                */
                console.log("In this get service data function");
                console.log(this.services)

            },
            error => console.log("Error: " + error)

        )
        {
            console.log(this.data)
            console.log(this.service)

            return this.data;

        }
    }

    getdetails() {

        this.set_data();
        this.Total = this.data.length
        this.counts = this.dataHandlerService.get_counts(this.data);
        this.rerendeer()

    }

    internalRoute(page,dst){
    this.sectionScroll=dst;
    this.router.navigate([page], {fragment: dst});
}



    ngOnInit() {
        this.dtOptions = {
            pageLength: 10,
            lengthChange: false,
            paging: true,
            searching: true,
            info: false
        }
        this.communicate.currentMessage.subscribe(message => { this.req_service = message });
        console.log(this.req_service);
        this.getPosts();
        //this.getposts2();
        this.router.events.subscribe((evt) => {
         if (!(evt instanceof NavigationEnd)) {
           return;
         }
         this.doScroll();
         this.sectionScroll = null;

        });

    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
        this.rerendeer();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    rerendeer(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next()
        }
        );
    }
    set_data(): void {
        this.dataHandlerService.set_data(this.data);
        this.process_name = this.dataHandlerService.get_process_name();
        console.log(this.process_name)
        this.process_list = this.dataHandlerService.get_process_list(this.process_name);
        console.log(this.process_list)
    }
    set_service(service) {
        this.service1 = service;
        this.process = 1;
        console.log(this.service1)
        this.communicate.changeMessage(service);
        //this.set_data();
        //this.getPosts();
        this.getPosts1(service);



        //this.router.navigate(['/home']);
        //this.router.navigate(['/']);
    }


    public chClicked(e: any): void {
        this.chartService.chartClicked(e);
    }

    public chHovered(e: any): void {
        this.chartService.chartHovered(e);
    }

    public try(process): void {
        console.log("In try service")
        console.log(process)
        this.clicked = 1;
        if (process != "--select--")
            this.clicked_button = process;
        this.data_to_be_loaded = this.dataHandlerService.get_data_to_be_loaded(process, this.process_name, this.process_list)
        this.data = this.data_to_be_loaded
        console.log(this.data_to_be_loaded)
        this.counts = this.dataHandlerService.get_counts(this.data_to_be_loaded);
        console.log(this.counts)
        this.Total = this.data_to_be_loaded.length;
        this.rerendeer();
    }
}

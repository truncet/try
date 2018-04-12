import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


import { FooterComponent } from './shared/footer/footer.component';


import { HomeComponent } from './home/home.component';
import { WebService } from './shared/services/webservice/web.service';


import { ChartService } from './shared/services/chartservice/chart.service';
import { DataHandlerService } from './shared/services/datahandler/data-handler.service';
import { CommunicateService } from './shared/services/communicate/communicate.service';
//import { ConnectionsComponent } from './connections/connections.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

//const routes: Routes = [
//  { path: 'app', component:'AppComponent' }
//];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    DataTablesModule,
    //RouterModule.forRoot(routes)
   
  ],
  
  //exports: [RouterModule],

  providers: [WebService, HttpClientModule, ChartService, DataHandlerService, CommunicateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

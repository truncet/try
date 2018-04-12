import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { Error404Component } from './responses/error404/error404.component';
// import { AboutComponent } from './about/about.component';
// import { BulletinBoardComponent} from './bulletin-board/bulletin-board.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import{FormComponent} from './form/form.component';
import {Chart} from 'chart.js';
//import {ConnectionsComponent} from './connections/connections.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'form',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

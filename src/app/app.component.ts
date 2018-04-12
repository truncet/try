import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
}


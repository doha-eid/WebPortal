import { Component } from '@angular/core';
import { ShipmentsComponent } from './components/shipments/shipments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ShipmentsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}

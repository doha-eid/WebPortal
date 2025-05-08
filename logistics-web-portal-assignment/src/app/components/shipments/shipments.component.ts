import { Component, OnInit } from '@angular/core';
import { ShipmentService, Shipment } from '../../services/shipment.service';
import { CommonModule } from '@angular/common';
import { AddShipmentComponent } from '../add-shipment/add-shipment.component'; 

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, AddShipmentComponent],  
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})

export class ShipmentsComponent implements OnInit {
  shipments: Shipment[] = [];
  loading = false;
  selectedTab: string = 'addShipment';

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments() {
    this.loading = true;
    this.shipmentService.getShipments().subscribe({
      next: (data) => {
        this.shipments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  onCheckout(id: string) {
    this.shipmentService.checkoutShipment(id).subscribe(() => this.loadShipments());
  }

  onDeliver(id: string) {
    this.shipmentService.deliverShipment(id).subscribe(() => this.loadShipments());
  }

  onDelete(id: string) {
    this.shipmentService.deleteShipment(id).subscribe(() => this.loadShipments());
  }

  
  changeTab(tab: string) {
    this.selectedTab = tab;
  }
}

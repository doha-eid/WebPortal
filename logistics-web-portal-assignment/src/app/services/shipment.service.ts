import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model'; 
 
export interface Shipment {
  id: string;
  trackingId: string;
  phoneNumber: string;
  description: string;
  status: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private baseUrl = 'http://localhost:3000/shipments';

  constructor(private http: HttpClient) {}

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.baseUrl);
  }
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>('http://localhost:3000/statuses');
  }


  addShipment(data: Partial<Shipment>): Observable<Shipment> {
    return this.http.post<Shipment>(this.baseUrl, data);
  }

  checkoutShipment(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/checkout`, {});
  }

  deliverShipment(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/deliver`, {});
  }

  deleteShipment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

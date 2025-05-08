import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../models/status.model';

@Component({
  selector: 'app-add-shipment',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  providers: [ShipmentService],
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.scss'],
})
export class AddShipmentComponent implements OnInit {
  shipmentForm: FormGroup;
  submitting = false;
  errorMsg = '';
  successMsg = '';
  statuses: Status[] = []; // Array to hold the available statuses

  // @Output to emit the event when a shipment is added
  @Output() shipmentAdded = new EventEmitter<void>(); 
  

  constructor(private fb: FormBuilder, private shipmentService: ShipmentService) {
    this.shipmentForm = this.fb.group({
      trackingId: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      description: ['', Validators.required],
      status: ['', Validators.required], // Add status as a form control
    });
  }

  ngOnInit(): void {
    // Fetch statuses when component initializes
    this.shipmentService.getStatuses().subscribe({
      next: (data) => {
        this.statuses = data; // Populate the statuses array
      },
      error: (err) => {
        this.errorMsg = 'Error loading statuses: ' + (err?.error?.message || 'Unknown error');
      },
    });
  }

  onSubmit(): void {
    if (this.shipmentForm.invalid) return;

    this.submitting = true;
    this.errorMsg = '';

    // Pass the status value along with other form data
    this.shipmentService.addShipment(this.shipmentForm.value).subscribe({
      next: (response) => {
        this.shipmentForm.reset();
        this.submitting = false;
        // Emit the event to notify the parent component
        this.shipmentAdded.emit(); 
      },
      error: (err) => {
        this.errorMsg = 'Error adding shipment: ' + (err?.error?.message || 'Unknown error');
        this.submitting = false;
      },
    });
  }
}
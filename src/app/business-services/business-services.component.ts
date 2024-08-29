import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Business, Service, Size } from '../shared/firestore.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-business-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-services.component.html',
  styleUrls: ['./business-services.component.scss']
})
export class BusinessServicesComponent implements OnInit {
  auth = inject(AuthService);
  @Input() business!: Business;
  services: Service[] = [];
  sizes: Size[] = [];
  newService: Service = { name: '', price: 0, isLengthBased: false };
  newSize: Size = { name: '', minPrice: 0, maxPrice: 0 };
  editingService: string | null = null;
  editingSize: string | null = null;

  ngOnInit(): void {
    this.services = this.business.services;
    this.sizes = this.business.sizes;
    // this.services = [
    //   { name: 'Manicure', price: 30, isLengthBased: false },
    //   { name: 'Pedicure', price: 40, isLengthBased: false },
    //   { name: 'Acrylic Nails', price: 50, isLengthBased: true }
    // ];

    // this.sizes = [
    //   { name: 'Short', minPrice: 10, maxPrice: 20 },
    //   { name: 'Medium', minPrice: 20, maxPrice: 30 },
    //   { name: 'Long', minPrice: 30, maxPrice: 40 }
    // ];

  }

  startEditingService(name: string, price: number, isLengthBased: boolean): void {
    this.editingService = name;
    this.newService = { name, price, isLengthBased };
  }

  saveServiceEdit(): void {
    const index = this.services.findIndex(service => service.name === this.editingService);
    if (index !== -1) {
      this.services[index] = { ...this.newService };
      this.editingService = null;
    }
  }

  cancelServiceEdit(): void {
    this.editingService = null;
    console.log(this.business.services)
  }

  startEditingSize(name: string, minPrice: number, maxPrice: number): void {
    this.editingSize = name;
    this.newSize = { name, minPrice, maxPrice };
  }

  saveSizeEdit(): void {
    const index = this.sizes.findIndex(size => size.name === this.editingSize);
    if (index !== -1) {
      this.sizes[index] = { ...this.newSize };
      this.editingSize = null;
    }
  }

  cancelSizeEdit(): void {
    this.editingSize = null;
  }

  addNewService(): void {
    this.services.push({ ...this.newService });
    this.newService = { name: '', price: 0, isLengthBased: false };
  }

  addNewSize(): void {
    this.sizes.push({ ...this.newSize });
    this.newSize = { name: '', minPrice: 0, maxPrice: 0 };
  }
}


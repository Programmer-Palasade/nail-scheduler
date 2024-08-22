import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Business } from '../shared/firestore.service';
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
  newService: Service = { id: 0, name: '', price: 0, lengthBased: false };
  newSize: Size = { id: 0, size: '', minPrice: 0, maxPrice: 0 };
  editingService: Service | null = null;
  editingSize: Size | null = null;

  ngOnInit(): void {
    this.services = [
      { id: 1, name: 'Manicure', price: 20, lengthBased: false },
      { id: 2, name: 'Pedicure', price: 30, lengthBased: true }
    ];
    this.sizes = [
      { id: 1, size: 'Small', minPrice: 5, maxPrice: 10 },
      { id: 2, size: 'Medium', minPrice: 10, maxPrice: 15 },
      { id: 3, size: 'Large', minPrice: 15, maxPrice: 20 }
    ];
  }

  addService(form: NgForm): void {
    if (form.valid) {
      const newServiceId = this.services.length ? Math.max(...this.services.map(service => service.id)) + 1 : 1;
      this.newService.id = newServiceId;
      this.services.push({ ...this.newService });
      this.resetServiceForm();
      form.resetForm();
    }
  }

  addSize(form: NgForm): void {
    if (form.valid) {
      const newSizeId = this.sizes.length ? Math.max(...this.sizes.map(size => size.id)) + 1 : 1;
      this.newSize.id = newSizeId;
      this.sizes.push({ ...this.newSize });
      this.resetSizeForm();
      form.resetForm();
    }
  }

  editService(service: Service): void {
    this.editingService = { ...service };
  }

  saveService(form: NgForm): void {
    if (form.valid && this.editingService) {
      const index = this.services.findIndex(service => service.id === this.editingService?.id);
      if (index > -1) {
        this.services[index] = this.editingService;
      }
      this.resetServiceForm();
      form.resetForm();
    }
  }

  editSize(size: Size): void {
    this.editingSize = { ...size };
  }

  saveSize(form: NgForm): void {
    if (form.valid && this.editingSize) {
      const index = this.sizes.findIndex(size => size.id === this.editingSize?.id);
      if (index > -1) {
        this.sizes[index] = this.editingSize;
      }
      this.resetSizeForm();
      form.resetForm();
    }
  }

  removeService(serviceId: number): void {
    this.services = this.services.filter(service => service.id !== serviceId);
  }

  removeSize(sizeId: number): void {
    this.sizes = this.sizes.filter(size => size.id !== sizeId);
  }

  resetServiceForm(): void {
    this.newService = { id: 0, name: '', price: 0, lengthBased: false };
    this.editingService = null;
  }

  resetSizeForm(): void {
    this.newSize = { id: 0, size: '', minPrice: 0, maxPrice: 0 };
    this.editingSize = null;
  }

  get serviceName(): string {
    return this.editingService?.name || this.newService.name;
  }

  set serviceName(value: string) {
    if (this.editingService) {
      this.editingService.name = value;
    } else {
      this.newService.name = value;
    }
  }

  get servicePrice(): number {
    return this.editingService?.price || this.newService.price;
  }

  set servicePrice(value: number) {
    if (this.editingService) {
      this.editingService.price = value;
    } else {
      this.newService.price = value;
    }
  }

  get serviceLengthBased(): boolean {
    return this.editingService?.lengthBased || this.newService.lengthBased;
  }

  set serviceLengthBased(value: boolean) {
    if (this.editingService) {
      this.editingService.lengthBased = value;
    } else {
      this.newService.lengthBased = value;
    }
  }

  get sizeName(): string {
    return this.editingSize?.size || this.newSize.size;
  }

  set sizeName(value: string) {
    if (this.editingSize) {
      this.editingSize.size = value;
    } else {
      this.newSize.size = value;
    }
  }

  get sizeMinPrice(): number {
    return this.editingSize?.minPrice || this.newSize.minPrice;
  }

  set sizeMinPrice(value: number) {
    if (this.editingSize) {
      this.editingSize.minPrice = value;
    } else {
      this.newSize.minPrice = value;
    }
  }

  get sizeMaxPrice(): number {
    return this.editingSize?.maxPrice || this.newSize.maxPrice;
  }

  set sizeMaxPrice(value: number) {
    if (this.editingSize) {
      this.editingSize.maxPrice = value;
    } else {
      this.newSize.maxPrice = value;
    }
  }
}

export interface Service {
  id: number;
  name: string;
  price: number; // Static price or base price
  lengthBased: boolean; // Indicates if the service has additional cost based on length size
}

export interface Size {
  id: number;
  size: string;
  minPrice: number; // Minimum price for the size
  maxPrice: number; // Maximum price for the size
}

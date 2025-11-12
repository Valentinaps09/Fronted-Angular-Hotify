import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Accommodation {
  id: number;
  title: string;
  imageUrl: string;
  pricePerNight: number;
  rating?: number;
  reviewsCount?: number;
}

interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  maxPrice: string;
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './index.html',
  styleUrls: ['./index.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  accommodations: Accommodation[] = [];
  loading: boolean = false;
  pageTitle: string = 'Alojamientos';
  showCheckInCalendar: boolean = false;
  showCheckOutCalendar: boolean = false;
  currentCalendarMonth: Date = new Date();
  calendarDays: any[] = [];
  
  searchFilters: SearchFilters = {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    maxPrice: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.loadAccommodations();
    this.generateCalendar();
  }

  loadAccommodations(): void {
    this.loading = true;
    
    setTimeout(() => {
      this.accommodations = [];
      this.loading = false;
    }, 1000);
  }

  searchAccommodations(): void {
    console.log('Buscando con filtros:', this.searchFilters);
    this.loadAccommodations();
  }

  generateCalendar(): void {
    const year = this.currentCalendarMonth.getFullYear();
    const month = this.currentCalendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    this.calendarDays = [];
    
    // Días vacíos del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push(null);
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push(new Date(year, month, i));
    }
  }

  toggleCheckInCalendar(): void {
    this.showCheckInCalendar = !this.showCheckInCalendar;
    this.showCheckOutCalendar = false;
  }

  toggleCheckOutCalendar(): void {
    this.showCheckOutCalendar = !this.showCheckOutCalendar;
    this.showCheckInCalendar = false;
  }

  selectCheckInDate(date: Date): void {
    if (date) {
      this.searchFilters.checkIn = date.toISOString().split('T')[0];
      this.showCheckInCalendar = false;
    }
  }

  selectCheckOutDate(date: Date): void {
    if (date) {
      this.searchFilters.checkOut = date.toISOString().split('T')[0];
      this.showCheckOutCalendar = false;
    }
  }

  previousMonth(): void {
    this.currentCalendarMonth = new Date(
      this.currentCalendarMonth.getFullYear(),
      this.currentCalendarMonth.getMonth() - 1
    );
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentCalendarMonth = new Date(
      this.currentCalendarMonth.getFullYear(),
      this.currentCalendarMonth.getMonth() + 1
    );
    this.generateCalendar();
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-hotel.jpg';
  }

  logout(): void {
    console.log('Cerrando sesión...');
  }

  closeCalendars(): void {
    this.showCheckInCalendar = false;
    this.showCheckOutCalendar = false;
  }
}
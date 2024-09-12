import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as countryData from './../../../../data.json';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchTerm: string = '';
  countries: any[] = [];
  selectedRegion: string = '';
  filteredCountries: any[] = [];
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.countries = (countryData as any).default;
    this.filteredCountries = this.countries;
  }
  viewCountryDetails(country: any) {
    this.router.navigate(['/country', country.alpha2Code]);
  }

  filterCountries(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter((country) => {
      const matchesRegion = this.selectedRegion
        ? country.region === this.selectedRegion
        : true;
      const matchesSearch =
        country.name.toLowerCase().includes(searchTermLower) ||
        country.region.toLowerCase().includes(searchTermLower);
      return matchesRegion && matchesSearch;
    });
  }
}

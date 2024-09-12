import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as countryData from './../../../../data.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.css',
})
export class CardDisplayComponent {
  countryCode: string | null = '';
  countryDetails: any = {};
  countries: any[] = [];
  countryBorder: any[] = [];
  noBordersMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.countries = (countryData as any).default;
    // console.log(this.countries);
    this.countryCode = this.route.snapshot.paramMap.get('countryCode');

    if (this.countryCode) {
      this.countryDetails = this.countries.find(
        (country) => country.alpha2Code === this.countryCode
      );

      if (this.countryDetails) {
        if (
          this.countryDetails.borders &&
          this.countryDetails.borders.length > 0
        ) {
          this.countryBorder = this.countryDetails.borders.map((_i: any) => {
            const borderCountry = this.countries.find(
              (country) => country.alpha3Code === _i
            );
            return borderCountry ? borderCountry.name : 'Unknown';
          });
        } else {
          this.noBordersMessage = 'This country has no border countries.';
        }
      } else {
        this.noBordersMessage = 'Country details not found.';
      }
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}

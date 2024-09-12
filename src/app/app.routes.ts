import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CardDisplayComponent } from './component/card-display/card-display.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'country/:countryCode', component: CardDisplayComponent },
];

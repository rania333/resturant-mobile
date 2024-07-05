import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from './services/restaurant.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';


const restaurantRoutes: Routes = [
  { path: '', redirectTo: 'restaurant', pathMatch: 'full' },
  { path: 'restaurant', children: [
    { path: '', component: HomeComponent },
    { path: ':id', component: RestaurantDetailsComponent}
  ]},
]

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(restaurantRoutes)
  ],
  providers: [RestaurantService]
})
export class RestaurantModule { }

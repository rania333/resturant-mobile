import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from './services/restaurant.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';


const restaurantRoutes: Routes = [
  { path: '', component: HomeComponent },
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

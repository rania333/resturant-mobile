import { Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IResturant } from '../../models/Restaurant.model';
import { SharedModule } from '../../../shared/shared.module';
import { cardType } from '../../../shared/components/models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Props
  protected resturants: IResturant[] = []
  protected cardType = cardType
  // Services
  private _router = inject(Router)
  private restaurantService = inject(RestaurantService)

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  getAllRestaurants() {
    this.restaurantService.getAllResturants().subscribe((res: IResturant[]) => {
      this.resturants = res
    })
  }
  navigateToRestaurantMenu(restaurant: IResturant) {
    this._router.navigate(['restaurant', restaurant.id], {state: restaurant.menus})
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { TitleComponent } from '../../../shared/components/title/title.component'
import { IResturant } from '../../models/Restaurant.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Props
  protected resturants: IResturant[] = []
  // Services
  private restaurantService = inject(RestaurantService)

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  getAllRestaurants() {
    this.restaurantService.getAllResturants().subscribe((res: IResturant[]) => {
      this.resturants = res
    })
  }
}

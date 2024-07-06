import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IResturant } from '../../models/Restaurant.model';
import { SharedModule } from '../../../shared/shared.module';
import { cardType } from '../../../shared/components/models/card.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  // Props
  protected resturants: IResturant[] = []
  protected cardType = cardType
  private destroy$: Subject<void> = new Subject<void>();
  // Services
  private _router = inject(Router)
  private restaurantService = inject(RestaurantService)

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  getAllRestaurants() {
    this.restaurantService.getAllResturants().pipe(takeUntil(this.destroy$)).subscribe((res: IResturant[]) => {
      this.resturants = res
    })
  }
  navigateToRestaurantMenu(restaurant: IResturant) {  
    localStorage.setItem('restId', String(restaurant.id))  
    this._router.navigate(['restaurant', restaurant.id], {state: { menus: restaurant.menus, name: restaurant.name}})
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

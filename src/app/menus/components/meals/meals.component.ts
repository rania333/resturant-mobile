import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

import { MenusService } from '../../services/menus.service';
import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { IMenu } from '../../models/menu.model';
import { CartService } from '../../../cart/services/cart.service';
import { ICart } from '../../../cart/models/cart.model';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [SharedModule, MatCardModule, MatIcon],
  templateUrl: './meals.component.html',  
  styleUrl: './meals.component.scss'
})
export class MealsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  protected title: string = ''
  protected meals: IMenu[] = []

  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)
  private menusService = inject(MenusService)
  protected cartService = inject(CartService)
  ngOnInit(): void {
    this.title = history.state.name;
    // get meals
    this._activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(res => {      
      this.getMeals(res.get('id') as unknown as number)
    })
  }

  getMeals(id: number) {
    this.menusService.getAllMeals(id).pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.meals = res
    })
  }

  myCart() {
    this._router.navigate(['cart'])
  }

  addToCart(item: IMenu) {
    // Mapping
    const cartItem: ICart = {id: item.id, name: item.name, price: item.price, 
      thumbnail: item.thumbnail, qnt: 1}
    this.cartService.addItemToCart(cartItem)
  }

  back() {
    history.back()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

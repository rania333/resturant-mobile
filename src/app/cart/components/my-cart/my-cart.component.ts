import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

import { SharedModule } from '../../../shared/shared.module';
import { CartService } from '../../services/cart.service';
import { ICart, IOrder } from '../../models/cart.model';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [SharedModule, MatCardModule, MatIcon ],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss',
})
export class MyCartComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  protected myCart: ICart[] = [] 
  private _router = inject(Router)
  protected cartService = inject(CartService)

  ngOnInit(): void {
      this.getMyCart()
  }

  getMyCart(){
    this.cartService.getMyCartData().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.myCart = res
    })
  }

  addToCart(item: ICart) {
    this.cartService.addItemToCart(item)
  }
  removeFromCart(cart: ICart) {
    this.cartService.removeItemFromCart(cart)
  }
  orderNow() {
    // Get my cart
    const payload: IOrder[] = this.myCart.map(el => {
      return { itemId: el.id, quantity: el.qnt } })
    this.cartService.makeOrder(Number(localStorage.getItem('restId')) ?? 1, payload).pipe(takeUntil(this.destroy$))
    .subscribe((res: any) => {
      if(res?.status == 'your order is being processed') {
        this.cartService.removeCart()
        this._router.navigate(['/'])
      }      
    }, err => {
      // It's not allowed to handle success status here, but the api returns ok and error at same time
      if(err.status == 200) {
        this.cartService.removeCart()
        this._router.navigate(['/'])
      }
    })
  }

  back() {
    history.back()
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

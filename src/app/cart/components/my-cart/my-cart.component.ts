import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

import { SharedModule } from '../../../shared/shared.module';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../models/cart.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [SharedModule, MatCardModule, MatIcon],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  protected myCart: ICart[] = [] 

  private cartService = inject(CartService)

  ngOnInit(): void {
      this.getMyCart()
  }

  getMyCart(){
    this.cartService.getMyCartData().pipe().subscribe(res => {
      this.myCart = res
    })
  }

  addToCart(item: ICart) {
    this.cartService.addItemToCart(item)
  }
  removeFromCart(cart: ICart) {
    this.cartService.removeItemFromCart(cart)
  }

  back() {
    history.back()
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../models/cart.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ICart[] = JSON.parse(localStorage.getItem('cart') as string) ?? [];
  private myCart: BehaviorSubject<ICart[]> = new BehaviorSubject<ICart[]>(this.cartItems)
  public cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(this.getTotalItemCount())

  getMyCartData(): Observable<ICart[]> {
    return this.myCart.asObservable()
  }

  getTotalItemCount(): number {
    return JSON.parse(localStorage.getItem('cart') as string)?.reduce((total: number, item: ICart) => total + (item.qnt || 0), 0) ?? 0;
  }
  
  addItemToCart(itemData: ICart) {    
    const existingItem = this.cartItems.find(item => item.id == itemData.id);
    if (existingItem) {
      existingItem.qnt += 1;
    } else {
      this.cartItems.push({ ...itemData, qnt: 1 });
    }    
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.myCart.next(this.cartItems)
    this.cartCount.next(this.cartCount.getValue() + 1)
  }

  removeItemFromCart(item: ICart): void {
    const index = this.cartItems.findIndex(cart => cart.id === item.id);
    if (index !== -1) {
      if (this.cartItems[index].qnt > 1) {
        this.cartItems[index].qnt -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
      this.myCart.next(this.cartItems)
      this.cartCount.next(this.cartCount.getValue() - 1)
    }
  }
}

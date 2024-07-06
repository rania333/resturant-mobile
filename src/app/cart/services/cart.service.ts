import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ICart, IOrder } from '../models/cart.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ICart[] = JSON.parse(localStorage.getItem('cart') as string) ?? [];
  private myCart: BehaviorSubject<ICart[]> = new BehaviorSubject<ICart[]>(this.cartItems)
  public cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(this.getTotalItemCount())
  private _httpClient = inject(HttpClient);

  getMyCartData(): Observable<ICart[]> {
    return this.myCart.asObservable()
  }

  getTotalItemCount(): number {    
    return this.cartItems.reduce((total: number, item: ICart) => total + (item.qnt || 0), 0) ?? 0;
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
    let crntVal = this.cartCount.getValue()      
    this.cartCount.next(++crntVal)
  }

  removeItemFromCart(item: ICart) {
    const index = this.cartItems.findIndex(cart => cart.id == item.id);
    if (index !== -1) {
      if (this.cartItems[index].qnt > 1) {
        this.cartItems[index].qnt -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
      this.myCart.next(this.cartItems)
      let crntVal = this.cartCount.getValue()      
      this.cartCount.next(--crntVal)
    }
  }

  makeOrder(restId: number, myCart: IOrder[]) {
    return this._httpClient.post(`https://api.mocki.io/v2/aqprm7yv/order/${restId}`, myCart)
  }

  getTotalPrice(): number {
    return this.myCart.getValue().reduce((total: number, item: ICart) => {
      return total + (item.price * item.qnt);
    }, 0);
  }

  removeCart() {
    localStorage.removeItem('cart');
    this.myCart.next([])
    this.cartItems = []
    this.cartCount.next(0)
  }
}

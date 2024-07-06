import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private cartItems: IMenu[] = [];
  public cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('cart') as string)?.length ?? 0)

  private _httpClient = inject(HttpClient);

  getAllMeals(id: number): Observable<IMenu[]> {
    return this._httpClient.get<IMenu[]>(`https://api.mocki.io/v2/aqprm7yv/menus/${id}`)
  }

  addItemToCart(itemData: IMenu) {
    const existingItem = this.cartItems.find(item => item.id == itemData.id);
    if (existingItem) {
      existingItem.qnt += 1;
    } else {
      this.cartItems.push({ ...itemData, qnt: 1 });
      this.cartCount.next(this.cartCount.getValue() + 1)
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}

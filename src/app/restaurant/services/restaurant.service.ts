import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResturant } from '../models/Restaurant.model';

@Injectable({
  providedIn: 'root' 
})
export class RestaurantService {
  private _httpClient = inject(HttpClient);

  getAllResturants(): Observable<IResturant[]> {
    return this._httpClient.get<IResturant[]>('https://api.mocki.io/v2/aqprm7yv/restaurants')
  }

}

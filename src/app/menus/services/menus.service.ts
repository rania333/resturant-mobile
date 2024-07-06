import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private _httpClient = inject(HttpClient);

  getAllMeals(id: number): Observable<IMenu[]> {
    return this._httpClient.get<IMenu[]>(`https://api.mocki.io/v2/aqprm7yv/menus/${id}`)
  }
}

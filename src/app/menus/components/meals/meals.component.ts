import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

import { MenusService } from '../../services/menus.service';
import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { IMenu } from '../../models/menu.model';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [SharedModule, MatListModule, MatCardModule, MatIcon],
  templateUrl: './meals.component.html',  
  styleUrl: './meals.component.scss'
})
export class MealsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  protected title: string = ''
  protected meals: IMenu[] = []

  private _activatedRoute = inject(ActivatedRoute)
  protected menusService = inject(MenusService)
  ngOnInit(): void {
    this.title = history.state.name;
    console.log('count', this.menusService.cartCount.getValue());
    // get meals
    this._activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(res => {      
      this.getMeals(res.get('id') as unknown as number)
    })
  }

  getMeals(id: number) {
    this.menusService.getAllMeals(id).pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.meals = res
      console.log('res api', res);
    })
  }

  myCart() {

  }

  addToCart(item: IMenu) {
    this.menusService.addItemToCart(item)
  }

  back() {
    history.back()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

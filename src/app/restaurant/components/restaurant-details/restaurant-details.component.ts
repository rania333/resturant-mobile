import { Component, inject, OnInit } from '@angular/core';
import { IMenu } from '../../models/Restaurant.model';
import { SharedModule } from '../../../shared/shared.module';
import { cardType } from '../../../shared/components/models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent implements OnInit {
  private _router = inject(Router)
  protected title: string = ''
  protected menus: IMenu[] = [];
  protected cardTypes = cardType
  ngOnInit(): void {
    this.title = history.state.name
    this.menus = history.state.menus    
  }

  back() {
    history.back()
  }

  navigateToMenu(id: number, name: string) {
    this._router.navigate(['menu', id], {state: {name}})

  }

}

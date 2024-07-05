import { Component, Input, OnChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { cardType } from '../models/card.model';
import { IResturant } from '../../../restaurant/models/Restaurant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {
  
  @Input() cardData : IResturant = {} as IResturant 
  @Input() cardType: cardType = cardType.restaurant
  protected imgUrl: string = ''
  protected types = cardType;
  ngOnChanges(): void {
    this.imgUrl = `url(${this.cardData?.restaurantBackground ?? this.cardData?.background})`
  }

  ngOnInit(): void {
    console.log('init', this.cardData);
    
  }
}

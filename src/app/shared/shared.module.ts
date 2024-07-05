import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent } from './components/title/title.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TitleComponent,
    CardComponent
  ],
  exports: [CommonModule, HttpClientModule, CardComponent, TitleComponent]
})
export class SharedModule { }

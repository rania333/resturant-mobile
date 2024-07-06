import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './components/meals/meals.component';
import { MenusService } from './services/menus.service';
import { SharedModule } from '../shared/shared.module';


const mealsRoutes: Routes = [
  { path: ':id', component: MealsComponent },
]

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(mealsRoutes)
  ],
  providers: [MenusService]
})
export class MenusModule { }

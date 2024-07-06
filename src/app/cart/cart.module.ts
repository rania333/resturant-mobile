import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { CartService } from './services/cart.service';
import { SharedModule } from '../shared/shared.module';



const cartRoutes: Routes = [
  { path: '', component: MyCartComponent },
]
@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(cartRoutes)
  ],
  providers: [CartService]
})
export class CartModule { }

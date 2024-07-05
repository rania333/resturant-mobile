import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: ()=> 
        import('./restaurant/restaurant.module').then(m => m.RestaurantModule)
    }
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { StatusCustomerComponent } from './store/status-customer/status-customer.component';
import { StatusMoneyComponent } from './store/status-money/status-money.component';
import { LoginStoreComponent } from './store/login-store/login-store.component';
import { RegisterStoreComponent } from './store/register-store/register-store.component';

import { MenuAdminComponent } from './home/menu-admin/menu-admin.component';
import { BikerComponent } from './admin/biker/biker.component';
import { LaundryServiceComponent } from './admin/laundry-service/laundry-service.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';

import { RegisterLaundryComponent } from './admin/register-laundry/register-laundry.component';
import { ListBikerComponent } from './admin/list-biker/list-biker.component';
import { ListLaundryComponent } from './admin/list-laundry/list-laundry.component';
import { TotalAmountComponent } from './admin/total-amount/total-amount.component';
import { TestfirebaseComponent } from './store/testfirebase/testfirebase.component';
import { EditStoreComponent } from './store/edit-store/edit-store.component';
import { TotalAmountBikerComponent } from './admin/total-amount-biker/total-amount-biker.component';
const routes: Routes = [
        { path: '', component: HomeComponent },
        //Store
        { path: 'checkorder', component: TestfirebaseComponent },
        { path: 'status-customer', component: StatusCustomerComponent },//status-customer
        { path: 'status-money', component: StatusMoneyComponent },
        { path: 'register-store', component: RegisterStoreComponent },

        { path: 'login-store', component: LoginStoreComponent },
        { path: 'home-content', component: HomeContentComponent },
        { path: 'edit-store', component: EditStoreComponent },




        //No one


        //Admin
        { path: 'menu-admin', component: MenuAdminComponent }, //template

        { path: 'biker', component: BikerComponent },    //d
        { path: 'list-biker', component: ListBikerComponent },

        { path: 'list-laundry', component: ListLaundryComponent },
        { path: 'register-laundry', component: RegisterLaundryComponent },
        { path: 'order-list', component: OrderListComponent },   //d

        { path: 'total-amount', component: TotalAmountComponent },   //d
        { path: 'total-amount-biker', component: TotalAmountBikerComponent },   //d

        { path: 'login-admin', component: LoginAdminComponent },

        // { path: 'de', component: DeleteComponent },//testfirebase

   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

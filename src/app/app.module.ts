import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MatSliderModule } from "@angular/material/slider";
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatStepperModule,
  MatToolbarModule,
  MatSidenavModule,
  MatBadgeModule,
  MatMenuModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatRadioModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatRippleModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatProgressBarModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatSortModule } from "@angular/material/sort";
import { MatTreeModule } from "@angular/material/tree";
import { MatTabsModule } from "@angular/material/tabs";
import { PortalModule } from "@angular/cdk/portal";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "@angular/cdk/layout";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HomeComponent } from "./home/home.component";
import { HomeContentComponent } from "./home/home-content/home-content.component";
import { StatusCustomerComponent } from "./store/status-customer/status-customer.component";
import { StatusMoneyComponent } from "./store/status-money/status-money.component";
import { LoginStoreComponent } from "./store/login-store/login-store.component";
import { RegisterStoreComponent } from "./store/register-store/register-store.component";
import { MenuAdminComponent } from "./home/menu-admin/menu-admin.component";
import { BikerComponent } from "./admin/biker/biker.component";
import { LaundryServiceComponent } from "./admin/laundry-service/laundry-service.component";
import { OrderListComponent } from "./admin/order-list/order-list.component";
import { LoginAdminComponent } from "./admin/login-admin/login-admin.component";
import { ListBikerComponent } from "./admin/list-biker/list-biker.component";
import { ListLaundryComponent } from "./admin/list-laundry/list-laundry.component";
import { TotalAmountComponent } from "./admin/total-amount/total-amount.component";
import { RegisterLaundryComponent } from "./admin/register-laundry/register-laundry.component";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import * as firebase from "firebase/app"
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { AgmCoreModule } from "@agm/core";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DialogRegisterLaundryComponent } from "./admin/list-laundry/dialog-register-laundry.component";
import { DialogBikerComponent } from "./admin/list-biker/dialog-biker.component";
import { TestfirebaseComponent } from "./store/testfirebase/testfirebase.component";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { EditStoreComponent } from "./store/edit-store/edit-store.component";
import { DialogTotalAmountLaundryComponent } from "./dialog-total-amount-laundry/dialog-total-amount-laundry.component";
import { DialogShowOrderComponent } from './store/dialog-show-order/dialog-show-order.component';
import { TotalAmountBikerComponent } from './admin/total-amount-biker/total-amount-biker.component';
import { DialogTotalAmountBikerComponent } from './dialog-total-amount-biker/dialog-total-amount-biker.component';

firebase.initializeApp(environment.firebase)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeContentComponent,
    StatusCustomerComponent,
    StatusMoneyComponent,
    LoginStoreComponent,
    RegisterStoreComponent,
    MenuAdminComponent,
    BikerComponent,
    LaundryServiceComponent,
    OrderListComponent,
    LoginAdminComponent,
    ListBikerComponent,
    ListLaundryComponent,
    TotalAmountComponent,
    RegisterLaundryComponent,
    DialogRegisterLaundryComponent,
    DialogBikerComponent,
    TestfirebaseComponent,
    EditStoreComponent,
    DialogTotalAmountLaundryComponent,
    DialogShowOrderComponent,
    TotalAmountBikerComponent,
    DialogTotalAmountBikerComponent
  ],
  // entryComponent: [DialogDeleteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    ScrollingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB1WyLAxe_8Wys7PTvVd3v6gHLZAdspcyU"
    })
  ],
  entryComponents: [
    DialogRegisterLaundryComponent,
    DialogBikerComponent,
    DialogTotalAmountLaundryComponent,
    DialogShowOrderComponent,
    DialogTotalAmountBikerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

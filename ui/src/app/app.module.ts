import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomeComponent } from './components/home/home.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { TopStonksComponent } from './components/top-stonks/top-stonks.component';
import { AllStonksComponent } from './components/all-stonks/all-stonks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MentionsTableComponent } from './components/mentions-table/mentions-table.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

PlotlyModule.plotlyjs = PlotlyJS;

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    TickerComponent,
    TopStonksComponent,
    AllStonksComponent,
    MentionsTableComponent,
    ToastContainerComponent,
    LoginComponent,
    WatchlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    PlotlyModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

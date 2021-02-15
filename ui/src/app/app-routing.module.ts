import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { LoginComponent } from './components/login/login.component';
import { AllStonksComponent } from './components/all-stonks/all-stonks.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './utils/auth.guard';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard]
},
{
  path: 'ticker',
  component: TickerComponent,
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard]
},
{
  path: 'stonks',
  component: AllStonksComponent,
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard]
},
{
  path: 'watchlist',
  component: WatchlistComponent,
  runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard]
},
{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

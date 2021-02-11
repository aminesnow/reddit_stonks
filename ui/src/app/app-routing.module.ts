import { AllStonksComponent } from './components/all-stonks/all-stonks.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'ticker',
  component: TickerComponent
},
{
  path: 'stonks',
  component: AllStonksComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

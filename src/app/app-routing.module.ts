import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { ResultComponent } from './components/result/result.component';
import { MapComponent } from './components/map/map.component';
import { VisaComponent } from './components/visa/visa.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {
    path: 'results',
    pathMatch: 'full',
    component: ResultsComponent,
  },
  { path: 'results/:id', component: ResultComponent },
  { path: 'map', pathMatch: 'full', component: MapComponent },
  { path: 'visa', pathMatch: 'full', component: VisaComponent },
  { path: 'home', pathMatch: 'full', component: HomepageComponent },
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: '**', component: ResultsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

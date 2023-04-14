import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { ResultComponent } from './components/result/result.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {
    path: 'results',
    component: ResultsComponent,
    // children: [{ path: ':id', component: ResultComponent }],
  },
  { path: 'results/:id', pathMatch: 'full', component: ResultComponent },
  { path: 'map', pathMatch: 'full', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
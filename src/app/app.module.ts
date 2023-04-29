import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { ResultComponent } from './components/result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BackButtonDirective } from './directives/backbutton.directive';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { MapComponent } from './components/map/map.component';
import { LoadScriptDirective } from './directives/load-script.directive';
import { VisaComponent } from './components/visa/visa.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ResultsComponent,
    ResultComponent,
    BackButtonDirective,
    AlphabetComponent,
    MapComponent,
    VisaComponent,
    ThemeSwitcherComponent,
    LoadScriptDirective,
    ReplacePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BackButtonDirective, LoadScriptDirective],
})
export class AppModule {}

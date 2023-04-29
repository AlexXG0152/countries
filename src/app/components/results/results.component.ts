import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Country } from 'src/app/interfaces/country.interface';
import { SearchService } from 'src/app/services/search.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(
    private router: Router,
    private searchService: SearchService,
    private themeService: ThemeService
  ) {}

  countries: Country[] = [];
  theme: string = ''

  ngOnInit(): void {
    this.searchService.buttonClickSubject.subscribe((searchText) => {
      if (searchText?.length! > 0 && searchText?.split('-')[0] === 'alpha') {
        this.showCountries(searchText?.split('-')[1], true);
      } else if (searchText?.length! > 0) {
        this.showCountries(searchText, false);
      } else if (searchText?.length === 0) {
        this.router.navigate([`/map`]);
      }
    });
  }

  showCountries(
    searchText: string,
    startsWith: boolean = false
  ): Subscription | undefined {
    this.theme = document.querySelector('html')?.getAttribute('data-bs-theme')!;

    return this.searchService.getCountries().subscribe((data: Country[]) => {
      this.countries = data.filter((country) => {
        if (startsWith) {
          return country.name.common.toLowerCase().startsWith(searchText);
        } else {
          return country.name.common.toLowerCase().includes(searchText);
        }
      });
    });
  }
}

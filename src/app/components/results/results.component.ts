import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Country } from 'src/app/interfaces/country.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(private router: Router, private searchService: SearchService) {}

  countries: Country[] = [];
  theme: string = '';

  ngOnInit(): void {
    this.searchService.buttonClickSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchText) => {
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
    if (typeof window !== 'undefined') {
      this.theme = window.document
        .querySelector('html')
        ?.getAttribute('data-bs-theme')!;
    } else {
    }

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

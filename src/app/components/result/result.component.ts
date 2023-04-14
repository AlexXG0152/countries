import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Country } from 'src/app/interfaces/country.interface';
import { SearchService } from 'src/app/services/search.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private navigation: NavigationService
  ) {}

  country?: Country;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id.length === 2) {
      this.getCountryInfoByCCA2(id);
    } else {
      this.getCountryInfoByCCA3(id);
    }
  }

  getCountryInfoByCCA3(id: string) {
    this.searchService.getCountry(id).subscribe((data) => {
      this.country = data!;
      this.router.navigate([`/results/${id}`]);
    });
  }

  getCountryInfoByCCA2(id: string) {
    this.searchService.getCountryByCCA2(id).subscribe((data) => {
      this.country = data!;
      this.router.navigate([`/results/${id}`]);
    });
  }

  goBack(): Promise<boolean> | undefined {
    // this.navigation.back();
    this.navigation.history.pop();
    if (this.navigation.history.at(-1) === undefined) {
      return this.router.navigate([`/results`]);
    }
    const id = this.navigation.history.at(-1)!.slice(-3);

    if (
      id === 'lts' ||
      this.navigation.history.at(-1)!.slice(-3) === undefined
    ) {
      return this.router.navigate([`/results`]);
    } else {
      this.navigation.history.pop();
      if (this.navigation.history.at(-1)!.slice(-3).length === 2) {
        this.getCountryInfoByCCA2(id);
      } else {
        this.getCountryInfoByCCA3(id);
      }
      // this.getCountryInfo(id);
      return;
    }
  }
}

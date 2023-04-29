import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Country } from 'src/app/interfaces/country.interface';
import { SearchService } from 'src/app/services/search.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { filter, pairwise } from 'rxjs/operators';

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
  ) {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
        this.previousURL = events[0].urlAfterRedirects;
      });
  }

  country?: Country;
  previousURL?: string;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id.length === 2) {
      this.getCountryInfoByCCA2(id);
    } else {
      this.getCountryInfoByCCA3(id);
    }
  }

  getCountryInfoByCCA3(id: string) {
    this.searchService.getCountryByCCA3(id).subscribe((data) => {
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

    // if (this.previousURL = '/visa') {
    //   return this.router.navigate([`/visa`]);
    // }

    const id = this.navigation.history.at(-1)!.slice(-3);

    if (
      id === 'lts' ||
      this.navigation.history.at(-1)!.slice(-3) === undefined
    ) {
      return this.router.navigate([`/results`]);
    } else {
      if (this.navigation.history.at(-1)!.slice(-3)!.startsWith('/')) {
        this.getCountryInfoByCCA2(this.navigation.history.at(-1)!.slice(-2)!);
        this.navigation.history.pop();
      } else {
        this.getCountryInfoByCCA3(id);
        this.navigation.history.pop();
      }
      return;
    }
  }
}

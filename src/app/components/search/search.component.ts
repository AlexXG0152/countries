import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private router: Router, private searchService: SearchService) {}

  search(text: any) {
    this.searchService.buttonClickSubject.next(text.trim());
    this.router.navigate([`results`]);
    // return text.pipe(debounceTime(500), distinctUntilChanged());
  }
}

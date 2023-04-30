import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private router: Router, private searhService: SearchService) {}

  search(text: any) {
    this.searhService.buttonClickSubject.next(text.trim());
    this.router.navigate([`results`]);

    // return text.pipe(debounceTime(500), distinctUntilChanged());
  }
}

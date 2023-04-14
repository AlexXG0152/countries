import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private router: Router, private searhService: SearchService) {}

  search(text: string) {
    this.searhService.buttonClickSubject.next(text);
    this.router.navigate([`results`]);
  }
}

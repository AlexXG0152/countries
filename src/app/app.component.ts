import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (typeof window !== 'undefined') {
      document
        .querySelector('html')
        ?.setAttribute('data-bs-theme', localStorage.getItem('theme')!);
    }
  }

  title = 'countries';
}

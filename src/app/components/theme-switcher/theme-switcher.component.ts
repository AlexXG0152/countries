import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  mode?: string;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (this.themeService.current === 'dark') {
        window.document.getElementById('button')!.className =
          'radio-inner active';
      } else {
        window.document.getElementById('button')!.className = 'radio-inner';
      }
    } else {
    }
  }

  public switchTheme(): void {
    this.mode = this.themeService.current;
    if (typeof window !== 'undefined') {
      if (this.themeService.current === 'light') {
        window.document
          .querySelector('html')
          ?.setAttribute('data-bs-theme', 'dark');
        window.document.getElementById('button')!.className =
          'radio-inner active';
        this.themeService.theme.next('dark');
        this.themeService.current = 'dark';
        this.mode = 'dark';
      } else {
        window.document
          .querySelector('html')
          ?.setAttribute('data-bs-theme', 'light');
        window.document.getElementById('button')!.className = 'radio-inner';
        this.themeService.theme.next('light');
        this.themeService.current = 'light';
        this.mode = 'light';
      }
    } else {
    }
  }
}

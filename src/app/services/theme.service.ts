import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public static default = 'light';
  // private _alphabet = new BehaviorSubject(localStorage.getItem('theme'));
  public theme: any;

  public get current() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') ?? ThemeService.default;
    } else {
      return '';
    }
  }

  public set current(value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', value);
    } else {
    }
  }

  // public getAlphabet(): Observable<any> {
  //   return this._alphabet$;
  // }

  constructor() {
    // if (localStorage.getItem('theme') !== undefined) {
      // this.style.href = `/${this.current}.css`;
    // }
    if (typeof window !== 'undefined') {
      this.theme = new BehaviorSubject(localStorage.getItem('theme'));
    } else {}
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public static default = 'light';
  // private _alphabet = new BehaviorSubject(localStorage.getItem('theme'));
  public theme = new BehaviorSubject(localStorage.getItem('theme'));
  // private _alphabet$ = this._alphabet.asObservable();

  public get current(): string {
    return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
    localStorage.setItem('theme', value);
  }

  // public getAlphabet(): Observable<any> {
  //   return this._alphabet$;
  // }

  constructor() {
    if (localStorage.getItem('theme') !== undefined) {
      // this.style.href = `/${this.current}.css`;
    }
  }
}

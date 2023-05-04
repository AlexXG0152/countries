import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { BehaviorSubject, catchError, map, retry, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  private countriesUrl =
    'https://github.com/hengkiardo/restcountries/blob/master/resources/countriesV1.json';

  // private countriesJSON = '../../assets/countries.json';
  private countriesJSON =
    'https://raw.githubusercontent.com/AlexXG0152/countries/start-app/src/assets/countries.json';

  public buttonClickSubject: BehaviorSubject<string> = new BehaviorSubject('');

  public getCountries() {
    return this.http
      .get<Country[]>(this.countriesJSON)
      .pipe(retry(2), catchError(this.errorHandler.bind(this)));
  }

  public getCountryByCCA3(id: string) {
    return this.http.get<Country[]>(this.countriesJSON).pipe(
      map((countries) => countries.find((country) => country.cca3 === id)),
      retry(2),
      catchError(this.errorHandler.bind(this))
    );
  }

  public getCountryByCCA2(id: string) {
    return this.http.get<Country[]>(this.countriesJSON).pipe(
      map((countries) => countries.find((country) => country.cca2 === id)),
      retry(2),
      catchError(this.errorHandler.bind(this))
    );
  }

  public getOnlyCountriesNames() {
    return this.http.get<Country[]>(this.countriesJSON).pipe(
      map((countries) =>
        countries.map((country) => {
          return [country.name.common, country.cca3];
        })
      ),
      retry(2),
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}

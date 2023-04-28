import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}
  private countriesUrl =
    'https://github.com/hengkiardo/restcountries/blob/master/resources/countriesV1.json';

  private countriesJSON = '../../assets/countries.json';

  public buttonClickSubject: BehaviorSubject<string> = new BehaviorSubject('');

  public getCountries() {
    return this.http.get<Country[]>(this.countriesJSON);
  }

  public getCountryByCCA3(id: string) {
    return this.http
      .get<Country[]>(this.countriesJSON)
      .pipe(
        map((countries) => countries.find((country) => country.cca3 === id))
      );
  }

  public getCountryByCCA2(id: string) {
    return this.http
      .get<Country[]>(this.countriesJSON)
      .pipe(
        map((countries) => countries.find((country) => country.cca2 === id))
      );
  }

  public getOnlyCountriesNames() {
    return this.http.get<Country[]>(this.countriesJSON).pipe(
      map((countries) =>
        countries.map((country) => {
          return [country.name.common, country.cca3]
        })
      )
    );
  }
}

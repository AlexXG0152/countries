import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  base_link_for_countries = `https://raw.githubusercontent.com/AlexXG0152/countries/visas/src/assets/links.json`;
  base_link_for_visa_data = `https://raw.githubusercontent.com/AlexXG0152/countries/visas/src/assets/json_data_files/`;

  getCountriesList() {
    return this.http.get(this.base_link_for_countries);
  }

  getDataByCode(code: string) {
    return this.http
      .get(`${this.base_link_for_visa_data}${code}.json`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getOneByCode(code: string) {
    return this.http
      .get(`${this.base_link_for_visa_data}${code}.json`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}

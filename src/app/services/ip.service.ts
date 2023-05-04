import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class IPService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getIPAddress() {
    return this.http
      .get('http://api.ipify.org/?format=json')
      // .pipe(catchError(this.errorHandler.bind(this)));
  }

  getCountry(ip: string) {
    return this.http
      .get(`https://api.iplocation.net/?cmd=ip-country&ip=${ip}`)
      // .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}

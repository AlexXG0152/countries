import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  constructor(private http: HttpClient) {}

  base_link_for_countries = `https://raw.githubusercontent.com/AlexXG0152/countries/visas/src/assets/links.json`;
  base_link_for_visa_data = `https://raw.githubusercontent.com/AlexXG0152/countries/visas/src/assets/json_data_files/`;

  getCountriesList() {
    return this.http.get(this.base_link_for_countries);
  }

  getDataByCode(code: string) {
    return this.http.get(`${this.base_link_for_visa_data}${code}.json`);
  }
}

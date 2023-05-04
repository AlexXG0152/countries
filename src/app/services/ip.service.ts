import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IPService {
  constructor(private http: HttpClient) {}

  getIPAddress() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  getCountry(ip: string) {
    return this.http.get(`https://api.iplocation.net/?cmd=ip-country&ip=${ip}`);
  }
}

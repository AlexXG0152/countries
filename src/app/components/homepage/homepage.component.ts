import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPService } from 'src/app/services/ip.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  ipAddress = '';
  country_code2: any;

  constructor(private IPService: IPService) {}

  ngOnInit() {
    this.IPService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.IPService.getCountry(res.ip).subscribe((res: any) => {
        this.country_code2 = res.country_code2;
      });
    });
  }
}

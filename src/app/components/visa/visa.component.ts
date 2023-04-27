import { Component, OnInit } from '@angular/core';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
})
export class VisaComponent implements OnInit {
  constructor(private visaService: VisaService) {}
  countriesList?: any = [];
  visaRequirementsData?: any = [];

  ngOnInit(): void {
    this.visaService.getCountriesList().subscribe((data) => {
      this.countriesList = data;
      console.log(this.countriesList);
    });
  }

  getDataByCode() {
    const code = 'BLR';
    this.visaService.getDataByCode(code).subscribe((data) => {
      this.visaRequirementsData = data;
      console.log(this.visaRequirementsData);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
})
export class VisaComponent implements OnInit {
  constructor(
    private visaService: VisaService,
    private searchService: SearchService
  ) {}
  countriesList?: any = [];
  visaRequirementsData?: any = [];
  tableColumnsName: any = [];
  citizenship? = 'Specify your citizenship';

  ngOnInit(): void {
    this.visaService.getCountriesList().subscribe((data) => {
      this.countriesList = data;
    });

    this.searchService.getOnlyCountriesNames().subscribe((data) => {
      for (const key in this.countriesList) {
        data.forEach((element) => {
          if (key === element[1]) {
            this.countriesList[key] = element[0];
          }
        });
      }
    });
  }

  getDataByCode(citizenship: any) {
    this.citizenship = citizenship.value;
    this.visaService.getDataByCode(citizenship.key).subscribe((data) => {
      this.visaRequirementsData = data;
      this.tableColumnsName = Object.keys(Object.values(data)[0]).sort();
    });
  }

  keepOrder = (a: any, b: any) => {
    return a;
  };
}

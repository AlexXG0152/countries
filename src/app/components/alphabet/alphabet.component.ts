import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent implements OnInit{
  constructor(private router: Router, private searhService: SearchService, private themeService: ThemeService) {}

  alphabet: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  theme?: string = ''

  ngOnInit(): void {
    this.themeService.theme.subscribe(current => {
      this.theme = current!
    })
  }

  filter(letter: string){
    this.searhService.buttonClickSubject.next(`alpha-${letter.toLowerCase()}`);
    this.router.navigate([`results`]);
  }
}

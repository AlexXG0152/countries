import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent {
  constructor(private router: Router, private searhService: SearchService) {}
  alphabet: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  filter(letter: string){
    this.searhService.buttonClickSubject.next(`alpha-${letter.toLowerCase()}`);
    this.router.navigate([`results`]);
  }
}

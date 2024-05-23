import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public isOpen: boolean[] = [false, false,false,false];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showOption(index: number){
    for (let inde = 0; inde < this.isOpen.length ; inde++) {
     if (inde!= index) {
      this.isOpen[inde] = false
     }
      
    }
    var temp = this.isOpen[index]
    this.isOpen[index] = !temp;


    // console.log(index)
    // console.log(this.isOpen[index])

  }

  goTo(ruta: string, action: number){
    this.router.navigate([`/${ruta}`]); 
  }

}

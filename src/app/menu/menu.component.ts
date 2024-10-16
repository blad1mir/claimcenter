import { ExpedientesComponent } from './../expedientes/expedientes.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../core/conexion/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public isOpen: boolean[] = [false, false,false,false];
  constructor(private router: Router, public service: DataService ) { }

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
  navigateTo(destination: string) {
    this.service.triggerShowModal(destination);
    this.service.setChange(true)
    this.service.setOptionChange(0)
  }

  goTo(ruta: string, action: number){
   // this.navigateTo(ruta)
     if (this.service.getOptionChange() == 1 ||  this.service.getOptionChange() == 3) {
      this.service.setChange(false)
      this.navigateTo(ruta)
     }else{
      this.service.setChange(true)
      this.router.navigate([`/${ruta}`]);
     }
    
      
    
    
    console.log("el cambio está en: "+this.service.getChange())
    // if (this.service.getChange()) {
    //   this.router.navigate([`/${ruta}`]); 
    // }else{
    //   this.navigateTo(ruta)
    // }

    
 
    // if (ruta == 'expedientes') {
      
    //  // this.service.setDestination('expedientes');

      
    // }else{
    //   this.router.navigate([`/${ruta}`]); 
    // }

     
  }

  logout(){
    this.service.logout().subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('user', '');  
        localStorage.setItem('token', '');  
        this.router.navigate(['/login']); 
     
       
      },
      error => {
        console.error('Error al cerrar sesión', error);
        // Manejar el error en el login
      });
  }
}

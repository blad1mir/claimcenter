import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/conexion/data.service';
import { Contacto, Usuario } from '../core/interfaces/company';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
   public option: boolean = false;
  public searchTerm: string = '';




public listado_usuarios: any[] = [];




public usuario: Contacto = {
  profile: {
    profile_id: 0,
    legal_document: "",
    second_last_name: "",
    phone: ""
  },
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    roles: ""
  }
};






  

  categories: any[] = [];

  constructor(public service: DataService) { }

  ngOnInit(): void {
  }

  
  changeVisibility(): void {
    this.option = !this.option
  }


  
  getListUsers() {
  
    

    this.service.getData('user_profiles/?is_active=true').subscribe(
      (response) => {
        console.log(response)
      this.listado_usuarios = response.results;
   
      console.log( this.listado_usuarios)
       
      },
      error => {
        console.error('Error al traer listado de usuarios:', error);
        // Manejar el error en el login
      });


  }

  

  registerUser(): void {

      this.service.postData('user_profiles/',this.usuario).subscribe(
        (response) => {
  
          if(response)
          console.log('Registro creado correctamente', response);
      
         
        },
        error => {
          console.error('El usuario no se pudo crear:', error);
          // Manejar el error en el login
        });
    }



  


}

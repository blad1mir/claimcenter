import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/conexion/data.service';
import { Contacto, User, Usuario } from '../core/interfaces/company';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public searchTerm: string = '';
  public nextPag: string = '';
  public previusPag: string = '';

  public option: number = 0;



public listado_usuarios: any[] = [];
filtered_users: any[] = [];

public contact: User = {
  profile: {
    profile_id: 0,
    finance_details: {
      accounting_code: ''
    },
    bank_details: {
      bank_name: '',
      bank_abbr: '',
      account_number: ''
    },
    phones_associated: [
      {
        phone_number: '',
        description: ''
      }
    ],
    emails_associated: [
      {
        email: '',
        description: ''
      }
    ],
    categories: [
      {
        category: '',
        description: ''
      }
    ],
    addresses: [
      {
        country: '',
        state: '',
        city: '',
        street: '',
        zip_code: ''
      }
    ],
    enterprise: '',
    created_by: '',
    modified_by: '',
    created_on: '',
    modified_on: '',
    legal_document: '',
    is_private: '',
    second_last_name: '',
    middle_name: '',
    profile_info: '',
    claims_handler: '',
    enable_professional_form: false
  },
  user: {
    id: 0,
    groups: [
      {
        id: 0,
        customrole: '',
        name: ''
      }
    ],
    last_login: '',
    is_superuser: false,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
    date_joined: '',
    is_verified: false,
    is_active: false,
    legal_document: '',
    enterprise: ''
  },
  edit_enable: false
};

public listado_contactos: any[] = [];
filtered_contacts: any[] = [];


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
  openTab = 1;


  constructor(public service: DataService) { 
    this.getListcontacts();
    this.getListUsers();
  }

  ngOnInit(): void {
  }

  
  changeVisibility(option: number): void {
    this.option = option
  }


  
  getListUsers() {
  
    

    this.service.getData('user_profiles/?is_active=true').subscribe(
      (response) => {
        console.log(response)
      this.listado_usuarios = response.results;
      this.filtered_users = response.results;
   
      console.log( this.listado_usuarios)
       
      },
      error => {
        console.error('Error al traer listado de usuarios:', error);
        // Manejar el error en el login
      });


  }
  getListcontacts() {
  
    

    this.service.getData('user_profiles/?is_active=false').subscribe(
      (response) => {
        console.log(response)
      this.listado_contactos = response.results;
      this.filtered_contacts = response.results;
   
      console.log( this.listado_contactos)
       
      },
      error => {
        console.error('Error al traer listado de usuarios:', error);
        // Manejar el error en el login
      });


  }

  
  nextPage(){


    if (this.nextPag != null) {

      const url = this.nextPag;
      const queryString = url.split('?')[1];
      console.log(queryString);
      this.service.getData('user_profiles/?'+queryString).subscribe(
        (response) => {
          console.log(response)
        this.listado_usuarios = response.results;
        this.nextPag = response.next;
       this.previusPag = response.previous;
        console.log( this.listado_usuarios)
         
        },
        error => {
          console.error('Error al traer listado de usuarios:', error);
          // Manejar el error en el login
        });
      
    }


  }
  previusPage(){
   
    if (this.previusPag != null) {
      const url = this.previusPag;
      const queryString = url.split('?')[1];
      console.log(queryString);
      this.service.getData('user_profiles/?'+queryString).subscribe(
        (response) => {
          console.log(response)
        this.listado_usuarios = response.results;
        this.nextPag = response.next;
       this.previusPag = response.previous;
        console.log( this.listado_usuarios)
         
        },
        error => {
          console.error('Error al traer listado de usuarios:', error);
          // Manejar el error en el login
        });
    }



  }

  

  registerUser(): void {

      this.service.postData('user_profiles/',this.usuario).subscribe(
        (response) => {
        console.log(response)
       // this.contact = response.results;
        },
        error => {
          console.error('El usuario no se pudo crear:', error);
          // Manejar el error en el login
        });
    }

    onSearch(isuser: boolean): void{
     
      if (this.searchTerm) { 
        this.service.getData(`enterprises/?is_active=${isuser}&search=${this.searchTerm}`).subscribe(
          (response) => {
            if (isuser) {
              this.listado_usuarios = response.results;
            this.filtered_users = response.results;
            }else{
              this.listado_contactos = response.results;
              this.filtered_contacts = response.results;
            }
            console.log(response)
            

            

         
       
         
           
          },
          error => {
            console.error('Error al traer listado de empresas:', error);
            // Manejar el error en el login
          });
        } 
    }

    // toggleTabs(value: number){
    //   if(value==1){
    //     this.option = 0
    //   }else{
    //     this.option = 5
    //   }

    // }

    toggleTabs(value: number,index: number ){
      console.log(value+ ":"+ index)
      if (index==1) {
        if(value == 0){
          this.option = value;
        }else{
          this.option = 5
        }
  
      }else{
        this.openTab = value;
      }
   
     
     
    }

    showUser(id: number, index:number){

      
      this.changeVisibility(index)
      console.log(id)
   // this.service.getData('user_profiles/?'+queryString).subscribe(
      this.service.getContacts('user_profiles/'+id+'/').subscribe(
        (response) => {
          console.log(response)
  
          if(response)
          console.log('Registro Obtenido correctamente', response);
          this.contact = response
      
         
        },
        error => {
          console.error('El usuario no se pudo Obtener:', error);
          // Manejar el error en el login
        });
    }

    editUser(){
      
    }

    



  


}




import { Component, OnInit } from '@angular/core';
import { Company } from '../core/interfaces/company';
import { DataService } from '../core/conexion/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
 public nextPag: string = '';
 public previusPag: string = '';
 public canElementos: number = 0;

 public option: number = 0;
 /* 
option 0 = listado
option 1 = crear empresa
option 2 = detalles de empresa 
option 3 = editar empresa

 */
 public searchTerm: string = '';
 public company: any;
  public empresa: Company = {
    enterprise_id: 1,
    created_on: "",
    modified_on: "",
    name: "",
    legal_document: "",
    is_private: true,
    web_page_url: "",
    active: true,
    finance_details: {accounting_code:"", fare:""},
    bank_details: {bank_name: "", account_number: "", bank_abbr: ""},
    created_by: null,
    modified_by: null,
    addresses: {
      street: "",
    city: "",
    zip_code: "",
    state: "",
    country: ""
    },
    emails_associated: [] = [
      { email: '', description: '' }
    ],
    phones_associated: [
      { number: '', description: '' }
    ],
    categories: []
};

public listado_empresas: any[] = [];
filtered_empresas: any[] = [];



  

  categories: any[] = [];
  constructor(public service: DataService, private http: HttpClient) { 
    this.categories = this.service.categories
    console.log(localStorage.getItem('token'))
    this.getListCompany()
    

   

  }

  ngOnInit(): void {
    console.log(this.empresa.emails_associated.length)
  }

  changeVisibility(value: number): void {
    this.option = value;
  }

  

  getListCompany() {

    this.service.getData('enterprises/').subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      this.canElementos = response.count;
      console.log( this.listado_empresas)
       
      },
      error => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      });


  }

  nextPage(){


    if (this.nextPag != null) {
      
    const url = this.nextPag;
    const queryString = url.split('?')[1];
    console.log(queryString);
          this.service.getData('enterprises/?'+queryString).subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      this.canElementos = response.count;
      console.log( this.listado_empresas)
       
      },
      error => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      });
    }


  }
  previusPage(){
   
    if (this.previusPag != null) {
      const url = this.previusPag;
      const queryString = url.split('?')[1];
      console.log(queryString);
          this.service.getData('enterprises/?'+queryString).subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      this.canElementos = response.count;
      console.log( this.listado_empresas)
       
      },
      error => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      });
    }



  }

  orderbyCategory(category: any){
    console.log(category.category)
    this.service.getData(`enterprises/?categories__category=${category.category}&ordering=name`).subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      this.canElementos = response.count;
      console.log( this.listado_empresas)
       
      },
      error => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      });
  }


  createCompany(): void {
    console.log(this.empresa)
    if (!this.empresa.name || !this.empresa.legal_document || !this.empresa.is_private || !this.empresa.bank_details.bank_name || !this.empresa.bank_details.account_number || !this.empresa.finance_details.accounting_code || !this.empresa.categories || !this.empresa.categories || !this.empresa.phones_associated || !this.empresa.emails_associated || !this.empresa.addresses || !this.empresa.web_page_url) {
      console.log("Por favor, complete todos los campos", "", {
        duration: 2000
      })
      
    }else{
      this.service.postData('enterprises/',this.empresa).subscribe(
        (response) => {
  
          if(response)
          console.log('Registro creado correctamente', response);
      
         
        },
        error => {
          console.error('La empresa no se pudo crear:', error);
          // Manejar el error en el login
        });
    }



  
}

addEmail() {
  if (this.empresa.emails_associated.length < 5) {
    this.empresa.emails_associated.push({ email: '', description: '' });
  }
  
}

removeEmail() {
  if (this.empresa.emails_associated.length  > 1) {
    this.empresa.emails_associated.pop();
  }
  
}

addPhone() {

  if (this.empresa.phones_associated.length < 5) {
    this.empresa.phones_associated.push({ number: '', description: '' });
  }
  
}

removePhone() {
  if (this.empresa.phones_associated.length  > 1) {
    this.empresa.phones_associated.pop();
  }
  
}

onSearch(): void {
  console.log(this.searchTerm)
  this.filtered_empresas = this.listado_empresas.filter((empresa: any) => {
    // Verificar que los campos sean strings válidos antes de llamar a toLowerCase()
    const nombre = empresa.nombre ? empresa.nombre : '';
    const email = empresa.email ? empresa.email : '';
    const telefono = empresa.telefono ? empresa.telefono : '';
    return nombre.includes(this.searchTerm) || 
           email.includes(this.searchTerm) || 
           telefono.includes(this.searchTerm);
  });
}

showEnterprise(option: number, idEmpresa: number){
this.option = option;

this.service.getEnterprise('enterprises/'+idEmpresa+'/').subscribe(
  (response) => {
    console.log(response)
 this.company = response;
   
  },
  error => {
    console.error('Error al traer listado de empresas:', error);
    // Manejar el error en el login
  });

  




}

truncateText(text: string, limit: number): string {
  if (text.length > limit) {
      return text.substring(0, limit) + '...';
  } else {
      return text;
  }
}




}



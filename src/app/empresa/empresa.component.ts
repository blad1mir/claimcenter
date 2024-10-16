import { Component, OnInit } from '@angular/core';
import { Company } from '../core/interfaces/company';
import { DataService } from '../core/conexion/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
 public nextPag: string = '';
 public previusPag: string = '';
 public canElementos: string = '';

 isModalOpen = false;
 public nextFunction: string = '';
 public nextFunctionValue: string = '';
 canChange: boolean = false;
 private navigationDestination: string = '';
 activeTab = 0;

 


 public option: number = 2;
 public shortPresent: string = '';
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
    addresses: [] = [{
      street: "",
    city: "",
    zip_code: "",
    state: "",
    country: ""
    }] ,
    emails_associated: [] = [
      { email: '', description: '' }
    ],
    phones_associated: [
      { number: '', description: '' }
    ],
    categories: []
};

expanded_item: any[] = [];
public listado_empresas: any[] = [];
filtered_empresas: any[] = [];

items = { title: 'Elemento 1', content: 'Contenido del elemento 1', expanded: false };
sortBy: string = '';
sortDirection: number = 1;
openTab = 1;
toggleTabs($tabNumber: number){
  this.openTab = $tabNumber;
}

toggleItem(index: any) {

  if(this.expanded_item[index]){
    this.expanded_item[index] = false;
  }else{
    this.expanded_item[index] = true;
  }
}



  

  categories: any[] = [];
  constructor(public service: DataService, private http: HttpClient, private router: Router) { 
    this.service.setOptionChange(this.option)
    this.service.showModal$.subscribe(destination => {
      this.navigationDestination = destination;
      this.showModal();
    });
    this.expanded_item[0] = true;
    this.categories = this.service.categories
    console.log(localStorage.getItem('token'))
    this.getListCompany()
    

   

  }

  ngOnInit(): void {
    console.log(this.empresa.emails_associated.length)
  }

  ngOnDestroy() {
    this.isModalOpen = true;
    console.log('El componente está a punto de destruirse');
    // Aquí puedes limpiar recursos o cancelar suscripciones
  }

  

  getListCompany() {

    this.service.getData('enterprises/').subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      if(response.count <= 10){
        if(response.count == 0){
          this.canElementos = '0';
        }else{
          this.canElementos = '1';
        }
        
      }else{
        this.canElementos = ((response.count)/10).toFixed(0);
      }
      
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
      if(response.count <= 10){
        if(response.count == 0){
          this.canElementos = '0';
        }else{
          this.canElementos = '1';
        }
        
      }else{
        this.canElementos = ((response.count)/10).toFixed(0);
      }
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
      if(response.count <= 10){
        if(response.count == 0){
          this.canElementos = '0';
        }else{
          this.canElementos = '1';
        }
        
      }else{
        this.canElementos = ((response.count)/10).toFixed(0);
      }
      console.log( this.listado_empresas)
       
      },
      error => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      });
    }



  }

  orderbyCategory(category: any){
    this.searchTerm = '';
    console.log(category.category)
    this.service.getData(`enterprises/?categories__category=${category.category}&ordering=name`).subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      if(response.count <= 10){
        if(response.count == 0){
          this.canElementos = '0';
        }else{
          this.canElementos = '1';
        }
        
      }else{
        this.canElementos = ((response.count)/10).toFixed(0);
      }
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
  if (this.searchTerm) {
    this.service.getData(`enterprises/?search=${this.searchTerm}`).subscribe(
      (response) => {
        console.log(response)
      this.listado_empresas = response.results;
      this.filtered_empresas = response.results;
      this.nextPag = response.next;
      this.previusPag = response.previous;
      if(response.count <= 10){
        if(response.count == 0){
          this.canElementos = '0';
        }else{
          this.canElementos = '1';
        }
        
      }else{
        this.canElementos = ((response.count)/10).toFixed(0);
      }
      console.log( this.listado_empresas)
       
      },
      error => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      });
    } 
  // console.log(this.searchTerm)
  // this.filtered_empresas = this.listado_empresas.filter((empresa: any) => {
  //   // Verificar que los campos sean strings válidos antes de llamar a toLowerCase()
  //   const nombre = empresa.nombre ? empresa.nombre : '';
  //   const email = empresa.email ? empresa.email : '';
  //   const telefono = empresa.telefono ? empresa.telefono : '';
  //   return nombre.includes(this.searchTerm) || 
  //          email.includes(this.searchTerm) || 
  //          telefono.includes(this.searchTerm);
  // });
}

showEnterprise(option: number, idEmpresa: number){
this.option = option;
this.service.setOptionChange(option);

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

saveChanges(id_company: string){
  
  this.service.putData('enterprises/'+id_company,JSON.stringify(this.empresa)).subscribe(
    (response) => {

      if(response)
      console.log('Registro creado correctamente', response);
  
     
    },
    error => {
      console.error('La empresa no se pudo modificar:', error);
      // Manejar el error en el login
    });

}


 
shortby(column: string) {
  if (this.sortBy === column) {
    this.sortDirection *= -1;
  } else {
    this.sortBy = column;
    this.sortDirection = 1;
  }
  this.sortTable();
}


setSort(column: string){
  var url = '';
  if (this.shortPresent == column) {
    url = 'enterprises/?ordering=-'
  }else{
    url = 'enterprises/?ordering='
  }

  this.service.getData(url+column).subscribe(
    (response) => {
      console.log(response)
    this.listado_empresas = response.results;
    this.filtered_empresas = response.results;
    this.nextPag = response.next;
    this.previusPag = response.previous;
    if(response.count <= 10){
      if(response.count == 0){
        this.canElementos = '0';
      }else{
        this.canElementos = '1';
      }
      
    }else{
      this.canElementos = ((response.count)/10).toFixed(0);
    }
    
    console.log( this.listado_empresas)
     
    },
    error => {
      console.error('Error al traer listado de empresas:', error);
      // Manejar el error en el login
    }
    
  );

  this.shortPresent = column;
  
}

sortTable() {
  this.filtered_empresas.sort((a, b) => {
    const isReversed = this.sortDirection === -1 ? -1 : 1;
    return isReversed * (a[this.sortBy] > b[this.sortBy] ? 1 : -1);
  });
}

openModal(funcion: string,valor: number) {
  this.nextFunction = funcion;
  this.nextFunctionValue =  (valor).toString();
  this.isModalOpen = true;
}

confirm() {
  if(this.nextFunctionValue == '8'){
    this.router.navigate([this.nextFunction]);
  }else{
    console.log('Confirmed');
    if (this.nextFunction == 'changeVisibility') {
      this.changeVisibility(parseInt(this.nextFunctionValue));
    }
  }
 

  this.isModalOpen = false;
  // Call your function here
}

cancel() {
  console.log('Cancelled');
  this.isModalOpen = false;
  // Handle cancellation here
}

setCanChange(value: boolean) {
  this.canChange = value;
}

navigateTo(destination: string) {
  if (this.canChange) {
    this.router.navigate([destination]);
  } else {
    this.isModalOpen = true;
    this.openModal(destination,8)
   // alert('No puedes salir de este componente hasta cumplir la condición.');
  }
}

  
showModal() {
  // Lógica para mostrar el modal
  this.openModal(this.navigationDestination,8)
}

onContinue() {
  // Lógica para cerrar el modal
  this.router.navigate([this.navigationDestination]);
}

onCancel() {
  // Lógica para cerrar el modal y permanecer en el componente actual
}

changeVisibility(value: number): void {
  this.option = value;
  this.service.setOptionChange(this.option)
  // if (this.option != 1 && this.option != 3 ) {
    
  //   this.service.setChange(true)
  // }else{
   
  //   this.service.setChange(false)
  // }
  console.log('El valor actual de option es: '+this.option)
  
  if (this.option == 3 || this.option ==1) {
    this.service.setChange(false)
  }

  


}

setActiveTab(index: number) {
  this.activeTab = index;
}







}



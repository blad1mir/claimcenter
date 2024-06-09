import { Component, OnInit } from '@angular/core';
import { Company } from '../core/interfaces/company';
import { DataService } from '../core/conexion/data.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
 public option: boolean = false;
 public searchTerm: string = '';
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



  

  categories: any[] = [];
  constructor(conection: DataService) { 
    this.categories = conection.getCategories();
  }

  ngOnInit(): void {
    console.log(this.empresa.emails_associated.length)
  }

  changeVisibility(): void {
    this.option = !this.option
  }

  registerCompany(): void {
    this.option = !this.option;
  }


  createCompany(): void {
    console.log(this.empresa)
  //   if (!this.companyName || !this.legalDocument || !this.isPrivate || !this.bankName || !this.accountNumber || !this.bankAbbr || !this.accountingCode || !this.category || !this.phoneNumber || !this.phoneDescription || !this.phoneType || !this.email || !this.emailDescription || !this.country || !this.state || !this.city || !this.street || !this.zipCode || !this.webPageUrl) {
  //     this.showWarningMessage('Por favor, complete todos los campos.');
  //     return;
  //   }
  //   const authToken = this.authService.getAuthToken();


  //   if (authToken) {
  //     const headers = new HttpHeaders({
  //       'Authorization': `Bearer ${authToken}`,
  //       'Content-Type': 'application/json'
  //     });

  //     const companyData = {
  //       name: this.companyName,
  //       legal_document: this.legalDocument,
  //       is_private: this.isPrivate,
  //       bank_details: {
  //         bank_name: this.bankName,
  //         account_number: this.accountNumber,
  //         bank_abbr: this.bankAbbr,
  //       },
  //       finance_details: {
  //         accounting_code: this.accountingCode,
  //       },
  //       categories: [this.category],
  //       phones_associated: [{
  //         phone_number: this.phoneNumber,
  //         description: this.phoneDescription,
  //         phone_type: this.phoneType,
  //       }],
  //       emails_associated: [{
  //         email: this.email,
  //         description: this.emailDescription,
  //       }],
  //       addresses: [{
  //         country: this.country,
  //         state: this.state,
  //         city: this.city,
  //         street: this.street,
  //         zip_code: this.zipCode,
  //       }],
  //       web_page_url: this.webPageUrl,
  //     };

  //     this.http.post(this.companyProfilesUrl, companyData, { headers }).subscribe(
  //       (response) => {
  //         console.log('Empresa creada exitosamente', response);
  //         this.showWarningMessage('Empresa creada exitosamente.');

  //       },
  //       (error) => {
  //         console.error('Error al crear la empresa', error);
  //       }
  //     );
  //   } else {
  //     console.error('No hay token de autorización disponible.');
  //   }

  // 
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


}

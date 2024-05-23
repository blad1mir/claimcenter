import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  companyName: string = '';
  legalDocument: string = '';
  isPrivate: boolean = false;
  bankName: string = '';
  accountNumber: string = '';
  bankAbbr: string = '';
  accountingCode: string = '';
  category: number = 1;
  phoneNumber: string = '';
  phoneDescription: string = '';
  phoneType: string = '';
  email: string = '';
  emailDescription: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  street: string = '';
  zipCode: string = '';
  webPageUrl: string = '';

  categories: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }


  createCompany(): void {
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

}

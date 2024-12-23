import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl: string = environment.apiUrl; // Utiliza el baseUrl desde el environment
  private showModalSubject = new Subject<string>();
  showModal$ = this.showModalSubject.asObservable();
  public canChange: boolean = true;
  public optionchange: number = 0;
  public role: string = '';

  triggerShowModal(destination: string) {
    this.showModalSubject.next(destination);
  }

  public token: string = '';
  public categories: Object[] = 
  [
    {
        id: 1,
        category: "Cliente",
        description: null
    },
    {
        id: 2,
        category: "Profesional",
        description: null
    },
    {
        id: 3,
        category: "Cliente Particular",
        description: null
    },
    {
        id: 4,
        category: "Proveedor",
        description: null
    },
    {
        id: 5,
        category: "Prescriptor",
        description: null
    },
    {
        id: 6,
        category: "Asistencia",
        description: null
    },
    {
        id: 7,
        category: "Reparador Alternativo",
        description: null
    },
    {
        id: 8,
        category: "Empresa Colaboradora",
        description: null
    },
    {
        id: 9,
        category: "Reparador AIDE",
        description: null
    },
    {
        id: 10,
        category: "Tramitador Compañía",
        description: null
    },
    {
        id: 11,
        category: "Tramitador externo",
        description: null
    }
 
]
  constructor(private http: HttpClient) {
   
   }

  public setToken(token: string): boolean{
    this.token = token;

    return token !== '';
  }

  public getToken(): string | null {
    const userData = localStorage.getItem('token');
    console.log(userData)
    if (userData) {
      return JSON.parse(userData).token;
    }
    return null;
  }

  public getUser(): any {
    const userData = localStorage.getItem('user');
    console.log(userData)
    if (userData) {
      return JSON.parse(userData).user;
    }
    return null;
  }
  

  public setCategories(categories: []){
    this.categories = categories;
  }

  public getCategories(): Object[]{
    return this.categories;
  }

  public get<T>(endpoint: string): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.get<T>(url);
  }

  // Función para realizar una solicitud PUT
  public put<T>(endpoint: string, data: any): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.put<T>(url, data);
  }

  // Función para realizar una solicitud DELETE
  public delete<T>(endpoint: string): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.delete<T>(url);
  }

  // Función para realizar una solicitud POST
  public async post<T>(endpoint: string, data: any): Promise<T> {
    //const url = this.buildUrl(endpoint);
    const response = this.http.post<T>(this.baseUrl + endpoint, data);
    return firstValueFrom(response);
  }
  public getContacts(endpoint: string){
    console.log('getContacts')
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
     console.log(this.baseUrl + endpoint)
     console.log(headers)
    
    return this.http.get<any>(this.baseUrl + endpoint, {headers: headers});


   
  }

  public  getData(endpoint: string) {
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
     console.log(this.baseUrl + endpoint)
     console.log(headers)
    
    return this.http.get<any>(this.baseUrl + endpoint, {headers: headers});
  }

  public  getExpedients(endpoint: string) {
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
     console.log(this.baseUrl + endpoint)
     console.log(headers)
    
    return this.http.get<any>(this.baseUrl + endpoint, {headers: headers});
  }

  public  getEnterprise(endpoint: string) {
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
     console.log(this.baseUrl + endpoint)
     console.log(headers)
    
    return this.http.get<any>(this.baseUrl + endpoint, {headers: headers});
  }

  public  getPaginated(endpoint: string) {
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
     console.log(this.baseUrl + endpoint)
     console.log(headers)
    
    return this.http.get<any>(endpoint, {headers: headers});
  }

  public  postData(endpoint: string, body: any) {
    console.log("la empresa es: "+ body)
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

     console.log(this.baseUrl + endpoint)
    return this.http.post<any>(this.baseUrl + endpoint,body, {headers});
  }

  public  putData(endpoint: string, body: any) {
    console.log("la empresa es: "+ body)
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
     // 'Content-Type': 'application/json'
    });

     console.log(this.baseUrl + endpoint)
    return this.http.put<any>(this.baseUrl + endpoint,body, {headers});
  }

  public login(username: string, password: string){
    const body = { "username":username, "password": password };
    return this.http.post<any>(this.baseUrl + 'user_profiles/login/', body);
  }

  public logout(){
    
    let token  = localStorage.getItem('token');
    if(token){
      token =  token.substring(1, token.length - 1);
    }
   
    console.log("el token es: " + token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
     
    return this.http.post<any>(this.baseUrl + 'user_profiles/logout/',{}, {headers});
  }

 



  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  public setChange(value: boolean){
    this.canChange = value;
  }

  public getChange(): boolean{
   return this.canChange;
  }

  public setOptionChange(value: number){
    this.optionchange = value;
  }

  public getOptionChange(): number{
   return this.optionchange;
  }


  public getRole(): string{
    return this.role
  }

  public setRole(value: string): boolean{
  this.role = value;
   return true;
  }

  
}

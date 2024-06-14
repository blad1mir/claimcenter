import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl: string = environment.apiUrl; // Utiliza el baseUrl desde el environment
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

  public  postData(endpoint: string, body: any) {
    
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
    return this.http.post(this.baseUrl + endpoint,body, { headers: headers });
  }

  public login(username: string, password: string){
    const body = { "username":username, "password": password };
    return this.http.post<any>(this.baseUrl + 'user_profiles/login/', body);
  }

  public  getData(endpoint: string) {
    //const url = this.buildUrl(endpoint);
    //const response = this.http.post(this.baseUrl + endpoint, data);
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
    
    return this.http.get<any>(this.baseUrl + endpoint, {headers});
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}

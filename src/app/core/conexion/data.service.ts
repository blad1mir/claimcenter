import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl: string = environment.apiUrl; // Utiliza el baseUrl desde el environment
  constructor(private http: HttpClient) { }

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

  public  postData(endpoint: string, data: any) {
    //const url = this.buildUrl(endpoint);
    //const response = this.http.post(this.baseUrl + endpoint, data);
    let header = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      withCredentials: true
     };
     console.log(this.baseUrl + endpoint)
    return this.http.post(this.baseUrl + endpoint, JSON.stringify(data),header);
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}

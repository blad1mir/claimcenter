import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../core/conexion/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;
  public username: string = '';
  public password: string = '';
  public visiblePassword: boolean = false; 
  public visiblePassworType: string = "password";
  constructor(public service: DataService,  private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitLoginForm() {
  

    console.log(this.username, this.password)
    this.service.login(this.username, this.password).subscribe(

      
      response => {
        console.log('Login successful:', response);
        // Manejar la respuesta del login correctamente
        // Redirigir al usuario o manejar la sesión
      },
      error => {
        console.error('Login failed:', error);
        // Manejar el error en el login
      });


    
    // return new Promise((resolve,reject)  => {
    //   this.service.postData('user_profiles/login/',{ username: this.username, password: this.password }).subscribe(data  =>{
    //     console.log(data)
    //     if(!data){
    //     reject(new Error('Error de conexión'));
    //    }else{
    //     resolve(true);
    //     this.router.navigate(['/home']); 
    //    }
       
    //   })
      
    // }).catch(error => {
    //   console.error(error); // Manejo del error, puede ser un registro en la consola
      
    //   throw error;
    // });;
    
        
    
    //this.service.post('user_profiles/login/',{ username: this.username, password: this.password })
    // this.service.post<any>(this.baseUrl + 'user_profiles/login/', { username: this.username, password: this.password })
    //   .subscribe(
    //     (response) => {
    //       //console.log(response);
    //       if (response && (response.message == "Inicio de Sesion Existoso")) {
           

    //         this.router.navigate(['/records']);
    //       }
    //     },
    //     (error) => {
    //       console.error('Error en la solicitud de inicio de sesión', error);
    //       this.showErrorMessage('Credenciales incorrectas.');
    //     }
    //   );
  }

  public changeVisibilityPassword(){
    if(this.visiblePassword){
      this.visiblePassword = false;
      this.visiblePassworType = "password";
    }else{
      this.visiblePassword = true;
      this.visiblePassworType = "text"
    }
  
  //alert("hi")
    

     
  }
  goHome(){
    //this.router.navigate(['/home']); 
    console.log("prueba")
    this.http.post('https://backend.claimcenter.com/api/user_profiles/login/', {
      "username": "root",
      "password": "ABCD_10000"
  }).subscribe(
      response => {
        console.log('Login successful:', response);
        // Manejar la respuesta del login correctamente
        // Redirigir al usuario o manejar la sesión
      },
      error => {
        console.error('Login failed:', error);
        // Manejar el error en el login
      }

    )
    
  }

  // getdata(){
  //   return new Promise((resolve,reject)  => {
  //     this.service.getData('https://httpbin.org/post').subscribe(data  =>{
  //       console.log(data)
  //       if(!data){
  //       reject(new Error('Error de conexión'));
  //      }else{
  //       resolve(true);
  //       this.router.navigate(['/home']); 
  //      }
       
  //     })
      
  //   }).catch(error => {
  //     console.error(error); // Manejo del error, puede ser un registro en la consola
      
  //     throw error;
  //   });;
  // }

}

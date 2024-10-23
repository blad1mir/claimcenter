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
  isModalInfo = false;
  isModalCargue = false;
  constructor(public service: DataService,  private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitLoginForm() {
  
    this.isModalCargue = true;
    console.log(this.username, this.password)
    this.service.login(this.username, this.password).subscribe(
    
      (response) => {
        this.isModalCargue = false;
        if(response)
        console.log('Login successful:', response);
        localStorage.setItem('user', JSON.stringify(response.user));  
        localStorage.setItem('token', JSON.stringify(response.token));  
        this.router.navigate(['/empresa']); 
      },
      error => {
        this.isModalCargue = false;
        console.error('Login failed:', error);
        // Manejar el error en el login
      });

      setTimeout(() => {
        this.isModalCargue = false;
        this.isModalInfo = true;
      }, 10000);


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
  //   console.log("prueba")
  //   this.http.post('https://backend.claimcenter.com/api/user_profiles/login/', {
  //     "username": "root",
  //     "password": "ABCD_10000"
  // }).subscribe(
  //     response => {
  //       console.log('Login successful:', response);
  //       // Manejar la respuesta del login correctamente
  //       // Redirigir al usuario o manejar la sesión
  //     },
  //     error => {
  //       console.error('Login failed:', error);
  //       // Manejar el error en el login
  //     }

  //   )
    
  }

  modalInfoClose(){
    this.isModalInfo = false;
     window.location.reload();

  }


  

}

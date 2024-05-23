import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../core/conexion/data.service';
import { Router } from '@angular/router';

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
  constructor(public service: DataService,  private router: Router) { }

  ngOnInit(): void {
  }

  submitLoginForm() {
    
    return new Promise((resolve,reject)  => {
      this.service.postData('user_profiles/login/',{ 'username': this.username, 'password': this.password }).subscribe(data  =>{
        console.log(data)
        if(!data){
        reject(new Error('Error de conexión'));
       }else{
        resolve(true);
        this.router.navigate(['/home']); 
       }
       
      })
      
    }).catch(error => {
      console.error(error); // Manejo del error, puede ser un registro en la consola
      
      throw error;
    });;
    
        
    
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
    this.router.navigate(['/home']); 
  }

}

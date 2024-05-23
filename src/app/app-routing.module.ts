import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'empresa', component: EmpresaComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'expedientes', component: ExpedientesComponent },
  //{ path: 'expedientes', component: ExpedientesComponent, canActivate: [AuthGuard] },
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

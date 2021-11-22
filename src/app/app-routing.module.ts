import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';

//configurar las rutas
//path: '' = Si estamos en la ruta con el slash vacío, va a direccionar a lo que indique el path dashboard
//path: '**' = Cualquier otro path que no esté definido acá, va a direccionar al No Page Found
//Esto requiere implementar el router outlet para mostrar el componente en base a la ruta, Revisar el app-component
//Las primeras son rutas protegidas (ya fue hecho el Login) y funcionarán como rutas hijas
const routes: Routes = [
  { path: '', component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'progress', component: ProgressComponent },
      { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  { path: '**', component: NopagefoundComponent}
]

//importar el router module y especificar las Rutas Principales
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

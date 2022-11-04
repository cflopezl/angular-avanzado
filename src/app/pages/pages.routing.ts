import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

/*las child routes necesitan un outlet independiente, 
porque cuando una ruta se convierte en "ruta madre", 
necesita ofrecer a sus rutas hijas un punto al que engancharse, 
y eso es el outlet que se colocó en pages.component.html.*/
const routes: Routes = [
    { 
      path: 'main',  
      component: PagesComponent,
      canActivate: [ AuthGuard ],
      children: [ 
        { path: 'dashboard', data:{ titulo: 'Dashboard'}, component: DashboardComponent },
        { path: 'progress', data:{ titulo: 'ProgressBar'}, component: ProgressComponent },
        { path: 'grafica1', data:{ titulo: 'Gráfica #1'}, component: Grafica1Component },
        { path: 'account-settings', data:{ titulo: 'Tema'}, component: AccountSettingsComponent },
        { path: 'promesa', data:{ titulo: 'Promesa'}, component: PromesaComponent },
        { path: 'rxjs', data:{ titulo: 'RxJs'}, component: RxjsComponent },
        { path: 'perfil', data:{ titulo: 'Perfil de Usuario'}, component: PerfilComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        
        // Mantenimientos
        { path: 'usuarios', data:{ titulo: 'Usuario de Aplicación'}, component: UsuariosComponent },
      ]
    },
  ];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }

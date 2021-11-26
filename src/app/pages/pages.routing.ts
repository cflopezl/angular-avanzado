import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

/*las child routes necesitan un outlet independiente, 
porque cuando una ruta se convierte en "ruta madre", 
necesita ofrecer a sus rutas hijas un punto al que engancharse, 
y eso es el outlet que se colocó en pages.component.html.*/
const routes: Routes = [
    { 
      path: 'main',  
      component: PagesComponent,
      children: [ 
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'grafica1', component: Grafica1Component },
        { path: 'account-settings', component: AccountSettingsComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
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

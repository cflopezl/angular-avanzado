import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  public menu: any[];
  constructor() { 
    this.menu = [
      {
        title: 'Main',
        icon: 'mdi mdi-gauge',
        options: [
          {
            title: 'Dashboard',
            url: 'dashboard'
          },
          {
            title: 'Progress Bar',
            url: 'progress'
          },
          {
            title: 'Gráfica 1',
            url: 'grafica1'
          },
          {
            title: 'Promesa',
            url: 'promesa'
          },
          {
            title: 'RxJS',
            url: 'rxjs'
          },
        ]
      },
      {
        title: 'Mantenimientos',
        icon: 'mdi mdi-folder-lock-open',
        options: [
          {
            title: 'Usuarios',
            url: 'usuarios'
          },
          {
            title: 'Hospitales',
            url: 'hospitales'
          },
          {
            title: 'Médicos',
            url: 'medicos'
          },
        ]
      }
    ]
  }
}

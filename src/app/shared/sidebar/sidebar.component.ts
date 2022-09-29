import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SideBarService } from 'src/app/services/side-bar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  public menuPrincipal: any[];

  constructor(sideBarService: SideBarService,
              private usuarioService:UsuarioService) { 
    this.menuPrincipal = sideBarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}

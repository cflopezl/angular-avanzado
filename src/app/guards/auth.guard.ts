import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators'
import { UsuarioService } from '../services/usuario.service';

// se crea el Guard ng g guard guards/auth
// se asigna a las rutas que se desea proteger, ejemplo propiedad canActivate en pages.routing.ts
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router){ }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
    return this.usuarioService.validarToken()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ){
                    this.router.navigateByUrl('/login');
                  }
                })
              );
  }
  
}

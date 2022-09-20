import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form-interface';
import { RegisterForm } from '../interfaces/register-form-interfaces';

// clase 176: ejemplo para quitar el usuario logeado en Google Identity
declare const google: any;

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient, 
                private router: Router) { }

  logout(){
    localStorage.removeItem('token');
    // clase 176: ejemplo para quitar el usuario logeado en Google Identity
    google.accounts.id.revoke( 'clopezl@miumg.edu.gt', () => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get( `${ base_url }/login/renew`,{
      headers: {
        'x-token': token
      }
    } )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem( 'token', resp.token )
      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

  crearUsuario( formData: RegisterForm ){

    return this.http.post( `${ base_url }/usuarios`, formData )
                  .pipe(
                    tap( ( resp: any ) => {
                      localStorage.setItem( 'token', resp.token )
                    })
                  );    
  }

  login( formData: LoginForm ){

    return this.http.post( `${ base_url }/login`, formData )
                  .pipe(
                    tap( ( resp: any ) => {
                      localStorage.setItem( 'token', resp.token )
                    })
                  );

  }

  loginGoogle( token: string ){

    return this.http.post( `${ base_url }/login/google`, { token } )
                  .pipe(
                    tap( ( resp: any ) => {
                      localStorage.setItem( 'token', resp.token )
                    })
                  );

  }

}




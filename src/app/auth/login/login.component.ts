import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {

  //esta asociado a la referencia local que aparece en el div de la pagina
  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false; 
  
  public loginForm = this.fb.group({    
      email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required] ,
      remember: [true]
    }, 
  );

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {
      this.googleOnInit();
  }

  googleOnInit(){
    google.accounts.id.initialize({
      client_id: "258958550824-9fg0c5pr96kl0kicqjsfqefmt49ilq7r.apps.googleusercontent.com",
      callback: ( response: any ) =>  this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe( resp => {
        // Navegar al Dashboard
      this.router.navigateByUrl('/');
      } )
  }

  login(){
    this.formSubmitted = true;

    if( this.loginForm.invalid ){
      return;
    }
    
    //Realizar el post
    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {
      if( this.loginForm.get( 'remember').value ){ 
        localStorage.setItem( 'email', this.loginForm.get('email').value );
      }else{
        localStorage.removeItem( 'email' );
      }

      // Navegar al Dashboard
      this.router.navigateByUrl('/');

    }, ( err ) => {
      console.log(err);
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    } );
    
  }

}

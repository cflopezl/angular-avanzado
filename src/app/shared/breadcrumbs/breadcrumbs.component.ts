import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo : string;
  public tituloSub$ : Subscription;

  /*
  //De esta forma se puede visualizar que se generan varios eventos unicamente al ingresar
  //incluso algunos repetidos y esto es porque hay más de una ruta invocandose 
  constructor(private router: Router ) { 
    this.router.events.subscribe( evento => {
      console.log(evento);
    } );
  }*/

  //lo que corresponde es filtrarlos para tomar únicamente el que necesitamos 
  //ActivationEnd, snapshot.firstChild=null
  /*constructor(private router: Router ) { 
    this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento : ActivationEnd)  => evento.snapshot.firstChild === null ),
    )
    .subscribe( evento => {
      console.log(evento);
    } );
  }*/

  //De todo el objeto event solo queremos el atributo data, que es el objeto definido en pages.routing.ts
  /*
  constructor(private router: Router ) { 
    this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento : ActivationEnd)  => evento.snapshot.firstChild === null ),
      map( (evento : ActivationEnd)  => evento.snapshot.data ),
    )
    .subscribe( data => {
      this.titulo = data.titulo;
      console.log(data);
    } );
  }*/

  //Exactamente igual al anterior pero con desestructuración de objetos
  /*
  constructor(private router: Router ) { 
    this.getArgumentosRuta();
  }

  getArgumentosRuta(){
    this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento : ActivationEnd)  => evento.snapshot.firstChild === null ),
      map( (evento : ActivationEnd)  => evento.snapshot.data ),
    )
    .subscribe( ({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${ this.titulo }`;
    } );
  }
  */

  //Al hacer logout desuscribirse 
  constructor(private router: Router ) { 
    this.tituloSub$ = this.getArgumentosRuta()
          .subscribe( ({ titulo }) => {
            this.titulo = titulo;
            document.title = `AdminPro - ${ this.titulo }`;
          } );
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento : ActivationEnd)  => evento.snapshot.firstChild === null ),
      map( (evento : ActivationEnd)  => evento.snapshot.data ),
    );
  }

  //al hacer logout se ejecuta 
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

}

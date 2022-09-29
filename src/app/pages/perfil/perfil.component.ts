import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder, 
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    // clase 187: fue necesario importar el ReactiveFormsModule en pages.module
    // se definen los campos que va a manejar el formulario
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( resp => {
          const { nombre, email } = this.perfilForm.value;
          // clase 188: Considerando que todas las variables funcionan por referencia
          // y que los "service" son singleton
          // como this.usuario es una referencia a usuarioService.usuario
          // al modificar acá sus valores, estos afectan al usuarioService.usuario 
          // y por ende a todo lugar donde se hace referencia sobre este atributo
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');

        });
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if( !file ) return this.imgTemp = null;

    // Clase 190: Visualizar la imagen seleccionada aunque aún no se haya grabado en la DB. FileReader viene por defecto en js
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'La imagen fue guardada', 'success');
        }).catch( err => {
          Swal.fire('Error', 'No fue posible subir la imagen', 'error');
        });
  }

}

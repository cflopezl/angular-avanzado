import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo, id )
        .then( img => {
          Swal.fire('Guardado', 'La imagen fue guardada', 'success');
          // utilizamos la emisión de un mensaje por medio de un observable 
          // esto permitirá que otro componente (usuarios OnInit está la suscripción) pueda interceptar el mensaje 
          // para renderizar las imagenes actualizadas
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        }).catch( err => {
          Swal.fire('Error', 'No fue posible subir la imagen', 'error');
        });
  }

}

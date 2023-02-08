import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

    ngOnInit(): void {
    
      this.cargarMedicos();    
  
      // el delay fue necesario implementarlo como una solución paleativa 
      // porque no se renderizaba la imagen, esto quizá porque se ejecutaba más rápido que la grabación
      this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe( img => this.cargarMedicos() );
    }

    ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
    }

    cargarMedicos(){
    
      this.cargando = true;
      this.medicoService.cargarMedicos()
          .subscribe( medicos => {
            this.medicos = medicos;
            this.medicosTemp = medicos;
            this.cargando = false;
          } );
  
    }

    buscar( termino: string ){

      if( termino.length === 0 ){
        this.medicos = this.medicosTemp;
      }
  
      this.busquedasService.buscar( 'medicos', termino)
          .subscribe( resultados => {
            this.medicos = resultados;
          });
  
    }
  
    actualizarMedico( medico: Medico){
  /*
      this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });
  */
    }
  
    borrarMedico( medico: Medico ){
  
      Swal.fire({
        title: 'Borrar medico?',
        text: `Esta a punto de borrar a ${ medico.nombre }`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.medicoService.borrarMedico( medico._id )
              .subscribe( resp =>  {           
                  Swal.fire(
                  'Médico borrado!',
                  `${ medico.nombre } fue eliminado correctamente.`,
                  'success'
                  );
                  this.cargarMedicos();
              });
  
  
        }
      })
    }

  
    async abrirSweetAlert(){
      /*const { value = '' } = await Swal.fire<string>({
        title: 'Crear Hospital',
        text: 'Ingrese nombre del Hospital',
        input: 'text',
        inputPlaceholder: 'Nombre del Hospital',
        showCancelButton: true,
      });
  
      if( value.trim().length > 0 ){
        this.hospitalService.crearHospital( value )
          .subscribe( (resp:any) => {
            this.hospitales.push( resp.hospital);
          });
      }*/
  
    }
  
    abrirModal( medico: Medico ){
      this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img ); 
    } 


}

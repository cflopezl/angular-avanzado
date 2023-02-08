import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    
    this.cargarHospitales();    

    // el delay fue necesario implementarlo como una solución paleativa 
    // porque no se renderizaba la imagen, esto quizá porque se ejecutaba más rápido que la grabación
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarHospitales() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => {
          this.hospitales = hospitales;
          this.hospitalesTemp = hospitales;
          this.cargando = false;
        } );

  }

  buscar( termino: string ){

    if( termino.length === 0 ){
      this.hospitales = this.hospitalesTemp;
    }

    this.busquedasService.buscar( 'hospitales', termino)
        .subscribe( resultados => {
          this.hospitales = resultados;
        });

  }

  actualizarHospital( hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });

  }

  borrarHospital( hospital: Hospital ){

    this.hospitalService.borrarHospital( hospital._id )
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      });

  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
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
    }

  }

  abrirModal( hospital: Hospital ){
    this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img ); 
  } 

}

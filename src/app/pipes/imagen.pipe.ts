import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {

    const imagen = img ? img : 'no-image';
    if( img && img.includes('https') ){
        return img;
    }
    
    return `${base_url}/uploads/${ tipo }/${imagen}`;

  }

}

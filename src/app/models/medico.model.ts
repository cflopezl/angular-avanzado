import { environment } from "../../environments/environment";
import { Hospital } from "./hospital.model";

const base_url = environment.base_url;

interface _MedicoUser {
    nombre: string,
    _id: string,
    img: string
}

export class Medico {
    
    constructor(
        public nombre: string, 
        public _id?: string,
        public img?: string, 
        public usuario?: _MedicoUser, 
        public hospital?: Hospital, 
        
        ){}


    get imagenUrl() {
        const imagen = this.img ? this.img : 'no-image';
        if( this.img && this.img.includes('https') ){
            return this.img;
        }
        
        return `${base_url}/uploads/medicos/${imagen}`;

    }

}

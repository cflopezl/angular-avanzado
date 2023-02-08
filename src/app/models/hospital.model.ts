import { environment } from "../../environments/environment";

const base_url = environment.base_url;

interface _HospitalUser {
    nombre: string,
    _id: string,
    img: string
}

export class Hospital {
    
    constructor(
        public nombre: string, 
        public _id?: string,
        public img?: string, 
        public usuario?: _HospitalUser, 
        
        ){}


    get imagenUrl() {
        const imagen = this.img ? this.img : 'no-image';
        if( this.img && this.img.includes('https') ){
            return this.img;
        }
        
        return `${base_url}/uploads/hospitales/${imagen}`;

    }

}
import { environment } from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario {
    
    constructor(
        public nombre: string, 
        public email: string, 
        public password?: string, 
        public img?: string, 
        public google?: boolean, 
        public role?: string, 
        public uid?: string,
        ){}


    get imagenUrl() {
        const imagen = this.img ? this.img : 'no-image';
        if( this.img && this.img.includes('https') ){
            return this.img;
        }
        
        return `${base_url}/uploads/usuarios/${imagen}`;

    }

}
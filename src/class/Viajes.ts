import {User} from './user';

export class Viaje {

  key?: string;
  camion?: string;
  uid?: string;
  date?: Date;
  descripcion?: string;
  estrellas?: number;
  origen?: string;
  destino?: string;

  conductor?: User;

  carga?: {
    cantidad?: string;
    tipo?: string;
  };

  movimientos?: [{
    cantidad: string;
    descripcion: string;
    img: string;
    lat: number;
    lng: number
  }];

}

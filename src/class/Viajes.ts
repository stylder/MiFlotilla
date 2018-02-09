
export class Viaje {

  key?: string;
  camion?: string;
  uid?: string;
  date?: any;
  descripcion?: string;
  estrellas?: number;
  origen?: string;
  destino?: string;

  conductor?: string;

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

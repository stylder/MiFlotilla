export class Mantenimiento {

  key?: string;
  camion?: string;
  costo?: string;
  date?: any;
  descripcion?: string;
  img?: string;

  movimientos?: [{
    cantidad: string;
    descripcion: string;
    img: string;
    lat: number;
    lng: number
  }];

}

import {Injectable} from '@angular/core';

@Injectable()
export class CoordsService {

  constructor() {
  }

    public coordsSep : string = "%20";
    public latLongSep : string = "%2C";
  public epsg = "EPSG%3A3945";
  public longueurZone = 1200;


    public generateCoords(latMeters, lonMeters) {
        //var upperCornerLat = 1415127.000;
        //var upperCornerLong = 4184190.000;
        //[upperCornerLat, upperCornerLong] = this.meters2degrees(lonMeters, latMeters);     
        var upperCornerLat = 44.878932;   
        var upperCornerLong = -0.583404; 
        this.addCoords(upperCornerLat, upperCornerLong)
        +this.coordsSep
        +this.addCoords(upperCornerLat+this.longueurZone, upperCornerLong+this.longueurZone)
    }
    
    public addCoords(latit: number, longit : number) {
        return latit+this.latLongSep+longit;
    }

    public meters2degrees(x,y) {
            var lon = x *  180 / 20037508.34 ;
            var lat =Number(180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2));
            return [lon, lat];
    }

}


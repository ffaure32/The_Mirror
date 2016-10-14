declare var X2JS: any;

import {Injectable} from '@angular/core';
import {Http,Headers,URLSearchParams} from '@angular/http';
import {ApikeyService} from './../apikey/apikey.service';


@Injectable()
export class VcubService {
  public api_url : String = "https://data.bordeaux-metropole.fr/wfs";
  public http : any;
  public apikeyService: any;
  private metropoleKey: any;

  constructor(http : Http,  apikeyService: ApikeyService) {
    this.http = http;
    this.apikeyService = apikeyService;
    this.metropoleKey = this.apikeyService.getKey('metropole');
  }

  getBorneData(){
    return this.http
      .get(this.api_url, {search: this.getParams()}) 
      .map(function(res){
          var x2js = new X2JS();
          var aftCnv = x2js.xml_str2json(res.text());
          return aftCnv.FeatureCollection.featureMember;
      }).flatMap((res: any) => {return res;});
  }

  getParams() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('key', this.metropoleKey);
        params.set('PropertyName', "NOM,NBPLACES,NBVELOS,HEURE,TYPE");
        params.set('REQUEST', "GetFeature");
        params.set('SERVICE', "WFS");
        params.set('SRSNAME', this.epsg);
        params.set('TYPENAME', "CI_VCUB_P");
        params.set('VERSION', "1.1.0");
        params.set('Filter', this.buildFilter());
        return params;
  }

  public epsg = "EPSG%3A3945";
  public upperCornerLat = 1415127.000;
  public upperCornerLong = 4184190.000;
  public longueurZone = 1200;

  buildFilter() {
    var filter = this.addChevrons("Filter")+this.addChevrons("BBOX")+this.addChevrons("PropertyName")
        +"NAME"+this.addCloseChevrons("PropertyName")+this.addChevrons("Box%20srsName%3D%27"+this.epsg+"%27")
        +this.addChevrons("coordinates")+this.addCoords(this.upperCornerLat, this.upperCornerLong)+this.coordsSep+this.addCoords(this.upperCornerLat+this.longueurZone, this.upperCornerLong+this.longueurZone)
        +this.addCloseChevrons("coordinates")+this.addCloseChevrons("Box")+this.addCloseChevrons("BBOX")+this.addCloseChevrons("Filter");
    console.log(filter);
    return filter;
  }

    public open : string = "<";
    public close : string = ">";
    public slash : string = "%2F";
    public coordsSep : string = "%20";
    public latLongSep : string = "%2C";

    private onGetStationComplete() {
      console.log("Requête terminée");
    }

    private addCoords(latit: number, longit : number) {
      return latit+this.latLongSep+longit;
    }
    private addChevrons(text : String) {
      return this.open+text+this.close;
    }

    private addCloseChevrons(text : String) {
      return this.open+this.slash+text+this.close;
    }


}

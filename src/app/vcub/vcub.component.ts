import {Component, OnInit, ElementRef} from "@angular/core";
import {ViewEncapsulation} from '@angular/core';
import {NgStyle} from '@angular/common';
import {XmlParsePipe} from '../pipes/xmlparse.pipe';
import {VcubService} from './vcub.service';
import {Observable}       from 'rxjs/Rx';
import {Http, Headers, Jsonp} from '@angular/http';


@Component({
  selector: "vcub",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./app/vcub/vcub.html",
  styleUrls: ["./app/vcub/vcub.css"],
  providers: [VcubService],
  pipes: [XmlParsePipe]
})

export class VcubComponent implements OnInit {

  public stations: any[] = [];
  public http: Http;

  constructor(private vcubservice: VcubService) {
  }

  ngOnInit() {
    console.log('Init vcub');
    this.recupererEtatStationsInitiale();
    this.recupererEtatStations();
  }

  recupererEtatStationsInitiale() {
    Observable
      .from(this.vcubservice.getBorneData())
      .flatMap(function (res: any) {
        return res;
      }
      )
      .subscribe((o: any) => {
        this.stations.push(o.CI_VCUB_P);      
      });
  }

  recupererEtatStations() {
    Observable
      .from(this.polling())
      .flatMap(function (res: any) {
        return res;
      }
      )
      .subscribe((o: any) => {
        this.miseAJourStations(o);      
      });
  }

  miseAJourStations(infosStation : any) {
        var trouve = false;

        var station : any;
        for (station of this.stations) {
          if (station.NOM.__text == infosStation.CI_VCUB_P.NOM.__text) {
            station.NBVELOS = infosStation.CI_VCUB_P.NBVELOS;
            station.NBPLACES = infosStation.CI_VCUB_P.NBPLACES;
            trouve = true;

          }
        }
        if (!trouve) {
          this.stations.push(infosStation.CI_VCUB_P);
        }
  }

  polling() {
    console.log("on demarre le polling");
    return Observable
      .interval(60000)
      .flatMap(() => {
        console.log("on appelle la requete HTTP");
        return this.vcubservice.getBorneData();
      });

  }
}

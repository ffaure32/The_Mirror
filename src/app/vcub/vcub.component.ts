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
    this.recupererEtatStationsParIntervalle();
  }

  recupererEtatStationsInitiale() {
    Observable
      .from(this.getBorneData())
      .flatMap(function (res: any) {
        return res;
      })
      .subscribe((infosStation: any) => {
        this.ajoutNouvelleStation(infosStation);
      });
  }

  recupererEtatStationsParIntervalle() {
    Observable
      .from(this.polling())
      .flatMap(function (res: any) {
        return res;
      }
      )
      .subscribe((o: any) => {
        this.miseAJourStation(o);
      });
  }

  miseAJourStation(infosStation: any) {
    for (var station of this.stations) {
      if (station.NOM.__text == infosStation.CI_VCUB_P.NOM.__text) {
        this.miseAJourDonneesStation(station, infosStation);
      }
    }
  }

  polling() {
    return Observable
      .interval(60000)
      .flatMap(() => {
        return this.getBorneData();
      });
  }

  ajoutNouvelleStation(station : any) {
      this.stations.push(station.CI_VCUB_P);
  }

  miseAJourDonneesStation(station : any, nouvellesDonnees : any) {
        station.NBVELOS = nouvellesDonnees.CI_VCUB_P.NBVELOS;
        station.NBPLACES = nouvellesDonnees.CI_VCUB_P.NBPLACES;
        
  }
  getBorneData() {
    return this.vcubservice.getBorneData();
  }
}

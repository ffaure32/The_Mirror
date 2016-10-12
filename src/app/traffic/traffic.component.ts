declare var google: any;

import {Component, OnInit,ElementRef} from "@angular/core";
import {ViewEncapsulation} from '@angular/core';
import {NgStyle} from '@angular/common';
import {TrafficService} from './traffic.service';
import {Observable} from 'rxjs/Rx';
import {ApikeyService} from './../apikey/apikey.service';

@Component({
    selector: "traffic",
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./app/traffic/traffic.html",
    styleUrls:["./app/traffic/traffic.css"],
    directives: [],
    providers: [TrafficService,ApikeyService]
})
export class TrafficComponent implements OnInit{

  public latMapCenter:number;
  public lngMapCenter:number;
  public latMarker:number;
  public lngMarker:number;
  public zoom:number;
  public map:any;
  public styles:any;

  constructor(public elementRef:ElementRef,private trafficService : TrafficService, private apikeyService : ApikeyService) {
    this.latMapCenter = 44.8404400;
    this.lngMapCenter = -0.5805000;
    this.latMarker = 44.807260;
    this.lngMarker = -0.605569;
    this.zoom = 10;
    this.styles = [
      {"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},
      {"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
      {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},
      {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},
      {"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},
      {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ed5929"},{"lightness":"0"}]},
      {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},
      {"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
      {"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#ed5929"}]},
      {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},
      {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},
      {"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
      {"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},
      {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},
      {"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},
      {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},
      {"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
    console.log(this.map);
  }

  ngOnInit(){
    var mapProp = {
            center: new google.maps.LatLng(this.latMapCenter, this.lngMapCenter),
            zoom: 11,
            disableZoom: true,
            disableDefaultUI: true,
            //libraries: "places",
            backgroundColor: 'hsla(0, 0%, 0%, 0)',
            styles: this.styles
        };
      console.log(this.styles);

      this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(this.map);
      var myLatLng = {lat: this.latMarker, lng: this.lngMarker};
      var marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: 'ENSEIRB',
          label: 'IO'
      });

  }

}

import {Component, OnInit,ElementRef} from "@angular/core";
import {ViewEncapsulation} from '@angular/core';
import {NgStyle} from '@angular/common';
import {XmlParsePipe} from '../pipes/xmlparse.pipe';
import {VcubService} from './vcub.service';
import {Observable}       from 'rxjs/Rx';
import {Http,Headers,Jsonp} from '@angular/http';


@Component({
    selector: "vcub",
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./app/vcub/vcub.html",
    styleUrls:["./app/vcub/vcub.css"],
    providers: [VcubService],
    pipes : [XmlParsePipe]
})

export class VcubComponent implements OnInit{

  public stations : any[] = [];
  public http : Http;

  constructor(private vcubservice: VcubService) {
  }

  ngOnInit(){
    console.log('Init vcub');
    Observable
      .from(this.vcubservice.getBorneData())
      .flatMap(function(res : any){
          return res;
          }
      )
      .subscribe((o : any) => {
        this.stations.push(o.CI_VCUB_P);
      });
  }

}

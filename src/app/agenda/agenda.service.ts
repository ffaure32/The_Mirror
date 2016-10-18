import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class AgendaService {
  public api_url : String = "http://appv2.voxxr.in/api/events/bdxio16/presentations";
  public http : any;

  constructor(http : Http) {
    this.http = http;
  }

  getZenikaSessions(){
    return this.http
      .get(this.api_url) 
        .map(res => res.json())
        .flatMap((x) => x)
        .map((x) => x)
        .map((x) => x)
         .filter(session => session["speakers"].length > 0)
         .filter(session => session["speakers"][0].company == 'Zenika');
  }


}

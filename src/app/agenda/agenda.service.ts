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
        .map(function (x) {
            console.log(x);
            return x;
          })
         .filter(session => session["speakers"].length > 0)
         .filter(function(session) {
           console.log(session);
           return session["speakers"][0].company == 'Zenika';
         }); 
  }


}

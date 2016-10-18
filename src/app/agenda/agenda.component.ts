import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable}       from 'rxjs/Rx';
import {AgendaService} from './agenda.service';
import {ConstantsService} from '../constants.service';
import {TimePipe} from './agenda.pipe';



@Component({
  selector: 'agenda',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app/agenda/agenda.html',
  styleUrls: ["./app/agenda/agenda.css"],
  providers: [AgendaService, ConstantsService],
  pipes : [TimePipe]
  
})


export class AgendaComponent implements OnInit {
  public sessions: any[] = [];
  private className: String;

  constructor(private agendaService: AgendaService, private constants : ConstantsService) {
  }


  public ngOnInit() {
    console.log('Init agenda');
    Observable
      .from(this.agendaService.getZenikaSessions())
        .subscribe((lastSession: any) => {
        this.publishLastSession(lastSession);
      });
  }

  private publishLastSession(lastSession : any) {
        var trouve = false;
        for(var session of this.sessions) {
          if(session.id == lastSession.id) {
            trouve = true;
          }
        }
        if(!trouve) {
          this.sessions = [];
          this.sessions.push(lastSession);
        }

  }
}
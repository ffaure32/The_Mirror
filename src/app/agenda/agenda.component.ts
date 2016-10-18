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
  private sessionsToDisplay: any[] = [];
  private className: String;
  private isToFadeOut = false;

  constructor(private agendaService: AgendaService, private constants : ConstantsService) {
  }


  public ngOnInit() {
    console.log('Init agenda');
    Observable
      .from(this.agendaService.getZenikaSessions())
        .subscribe((session: any) => {
          console.log(session);
          this.saveSession(session);
      });

      var count : number = 0;
      setInterval(() => {
        this.displaySession(this.sessionsToDisplay[count]);
        count++;
        if(count>=this.sessionsToDisplay.length) {
          count = 0;
        }
      }, this.constants.agenda_refresh_interval);
  }

  private saveSession(session : any) {
          this.sessionsToDisplay.push(session);
  }

  private displaySession(session : any) {
    this.isToFadeOut = true;
    setTimeout(() => {
      this.isToFadeOut = false;
      this.sessions = [];
      this.sessions.push(session);
    }, 1000);
  }
}
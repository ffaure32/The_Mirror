import {Component, OnInit,ElementRef} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

import {WeatherComponent} from './weather/weather.component';
import {WeatherIconComponent} from './weather_icon/weather_icon.component';
import {ClockComponent} from './clock/clock.component';
import {TrafficComponent} from './traffic/traffic.component';
import {VcubComponent} from './vcub/vcub.component';
import {DateTimeComponent} from './datetime/datetime.component';
import {MessageComponent} from './message/message.component';
import {HomeComponent} from './home/home.component';
import {TweetlineComponent} from './tweetline/tweetline.component';
import {AgendaComponent} from './agenda/agenda.component';

import {ConstantsService} from './constants.service';
import {ApikeyService} from './apikey/apikey.service';

@Component({
    selector: 'app',
    templateUrl: './app/app.html',
    styleUrls: ['./app/app.css'],
    encapsulation: ViewEncapsulation.None,
    directives : [
      WeatherComponent,
      ClockComponent,
      WeatherIconComponent,
      TrafficComponent,
      DateTimeComponent,
      VcubComponent,
      MessageComponent,
      HomeComponent,
      TweetlineComponent,
      AgendaComponent
    ],
    providers: [ApikeyService, ConstantsService]
})

export class AppComponent implements OnInit {
    ngOnInit() {
        console.log('Application component initialized ...');
    }
}

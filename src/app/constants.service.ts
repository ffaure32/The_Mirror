import {Injectable} from '@angular/core';

@Injectable()
export class ConstantsService {
  vcub_refresh_interval: number;
  weather_refresh_interval: number;
  agenda_refresh_interval: number;
  tweets_refresh_interval: number;
  tweets_hashtag: string;

  constructor(){
    this.vcub_refresh_interval = 60000;
    this.weather_refresh_interval = 1800000;
    this.agenda_refresh_interval = 8000;
    this.tweets_refresh_interval = 10000;
    this.tweets_hashtag = '#zenika';
  }
}
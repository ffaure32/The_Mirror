declare var Pusher: any;

import {
  Component,
  Input,
  AfterViewChecked,
  OnInit,
  OnChanges,
  OnDestroy
} from '@angular/core';

import {TweetlineService} from './tweetline.service';


@Component({
  selector: 'tweetline',
  templateUrl: './app/tweetline/tweetline.html',
  providers : [TweetlineService]
})
export class TweetlineComponent implements OnInit {
  public tweets : any;
  private hashtag: string = "#bdxio";
  private className: String;
  private tweetlineService : TweetlineService;
  private token : any;

  constructor(tweetlineService : TweetlineService) {
    console.log("on init bien le composant tweet line");
    this.tweets = [];
    this.tweetlineService = tweetlineService;
  }


  public ngOnInit() {
    console.log("on recupere le token");
    this.token = this.tweetlineService.getAuthorization();
    console.log("token body:"+this.token);
    this.tweets = this.tweetlineService.getTweets(this.token);
    console.log("tweets :"+this.tweets);
  }
}
declare var Pusher: any;

import {Component, Input, AfterViewChecked, OnInit, OnChanges, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable}       from 'rxjs/Rx';
import {TweetlineService} from './tweetline.service';


@Component({
  selector: 'tweetline',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app/tweetline/tweetline.html',
  styleUrls: ["./app/tweetline/tweetline.css"],
  providers: [TweetlineService]
})


export class TweetlineComponent implements OnInit {
  public tweets: any[] = [];
  private hashtag: string = "#bdxio";
  private className: String;
  private tweetlineService: TweetlineService;
  private token: any;

  constructor(tweetlineService: TweetlineService) {
    this.tweetlineService = tweetlineService;
  }


  public ngOnInit() {
    console.log('Init tweetline');
    Observable
      .from(this.tweetlineService.getAuthorization())
      .subscribe((o: any) => {
        this.token = o;
        this.getTweets(this.token);
      });
  }

  private getTweets(jsonResponse: any) {
    Observable
      .from(this.tweetlineService.getTweets(this.token))
      .map((res: any) => res)
      .flatMap((res: any) => res)
      .subscribe((o: any) => {
        console.log(o);
        this.tweets.push(o);
      });

  }
}
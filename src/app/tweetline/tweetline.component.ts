import {Component, Input, AfterViewChecked, OnInit, OnChanges, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable}       from 'rxjs/Rx';
import {TweetlineService} from './tweetline.service';
import {ConstantsService} from '../constants.service';


@Component({
  selector: 'tweetline',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app/tweetline/tweetline.html',
  styleUrls: ["./app/tweetline/tweetline.css"],
  providers: [TweetlineService, ConstantsService]
  
})


export class TweetlineComponent implements OnInit {
  public tweets: any[] = [];
  private className: String;
  private token: any;
  private isToFadeOut = false;

  constructor(private tweetlineService: TweetlineService, private constants : ConstantsService) {
  }


  public ngOnInit() {
    console.log('Init tweetline');
    Observable
      .from(this.tweetlineService.getAuthorization())
      .subscribe((o: any) => {
        this.token = o;
        this.getTweets(); 
        this.getTweetsByInterval(this.token);
      });
  }

  private getTweetsByInterval(jsonResponse : any) {
        setInterval(() => {
      this.getTweets();
      }, this.constants.tweets_refresh_interval);
  }

  private getTweets() {
    Observable
      .from(this.tweetlineService.getTweets(this.token))
      .map((res: any) => res)
      .flatMap((res: any) => res)
      .subscribe((lastTweet: any) => {
        this.publishLastTweet(lastTweet);
      });
  }

  private publishLastTweet(lastTweet : any) {
        var trouve = false;
        for(var tweet of this.tweets) {
          if(tweet.id == lastTweet.id) {
            trouve = true;
          }
        }
        if(!trouve) {
          this.isToFadeOut = true;
          setTimeout(() => {
            this.isToFadeOut = false;
            this.tweets = [];
            this.tweets.push(lastTweet);
          }, 1000);
        }

  }
}
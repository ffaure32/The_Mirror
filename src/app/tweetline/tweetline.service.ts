import {Injectable} from '@angular/core';
import {Http, Headers, Jsonp, RequestOptions} from '@angular/http';
import {ApikeyService} from './../apikey/apikey.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TweetlineService {

  public api_url: String = "https://api.twitter.com/";
  public oauth_url = "oauth2/token";
  public search_url = "1.1/search/tweets.json?q=";
  public http: any;

  public consumerkey: any;
  public consumersecret: any;
  public apikeyService : any;

  public token : any;
  constructor(http: Http, apikeyService:ApikeyService) {
    this.http = http;
    this.apikeyService = apikeyService;
    this.consumerkey = this.apikeyService.getKey('twitter');
    this.consumersecret = this.apikeyService.getKey('twecret');

  }

  getAuthorization() {
    let options = this.getTokenRequestOptions();
    let body = 'grant_type=client_credentials';
    var result = this.http.post(this.api_url + this.oauth_url, body, options)
      .map(
        function(res){
          this.token = res.json().access_token;
          console.log("result1:"+this.token); 
          return res.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(); //...errors if any
      console.log("result2:"+this.token);
      return this.token;
  }

  getTweets(token : any) {
        var encsearchquery = encodeURIComponent("#bdxio");
        var bearerheader = 'Bearer ' + token;
        this.http.get(this.api_url + this.search_url + encsearchquery +
         '&result_type=recent', {headers: {Authorization: bearerheader}})
        .map(res => res.json());
  }

  private getTokenRequestOptions() {
    let header = this.consumerkey + ':' + this.consumersecret;
    let encheader = new Buffer(header).toString('base64');
    let finalheader = 'Basic ' + encheader;

    let headers = new Headers({ 'Authorization': finalheader });
    headers.append('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return new RequestOptions({ headers: headers });

  }
}

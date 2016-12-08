import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Observable <any>;
  errorMessage: string = "nope";
  url: string = "https://www.googleapis.com/books/v1/volumes?q=";
  test: Book;
  name: string;


  constructor(public navCtrl: NavController, public http: Http) {
    this.getHeroes();
  }
  getHeroes() {
    this.getBook()
      .subscribe(
        heroes => this.success(heroes),
        error =>  this.errorMessage = <any>error);

  }

  success(data){
    this.data = data;
    this.test = new Book();
    this.name = data.items[0].volumeInfo.title;
  }

  getBook(){
    return this.http.get(this.url+9783800092079)
      .map((resp:Response) => resp.json())
      .catch(this.handleError);

  }
  /*private extractData(res: Response){
    console.log(" Response"+res);
    let body = res.json();
    return body || { };
  }*/

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

export class Book{
  private _title: string;

  getTitle(): string {
    return this._title;
  }

  setTitle(value: string) {
    this._title = value;
  }

}

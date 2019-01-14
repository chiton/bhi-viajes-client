import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Viaje } from '../../models/viaje';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs';
import { DataProvider } from '../../providers/data/data';
import { TriviaPage } from '../trivia/trivia';
import { Trivia } from '../../models/trivia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private viajes : Observable<any[]>;
  private trivia : Trivia;
  private searchTerm : string = "";
    
  constructor(private navCtrl: NavController, 
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.viajes = this.dataProvider.getViajes();
    this.dataProvider.getTrivias().subscribe(items => { 
      let trivias = items as Trivia[];
      this.trivia = trivias ? trivias[0] : undefined;
    });
  }

  private selectViaje(viaje : Viaje)  {
    this.navCtrl.push(DetailsPage, {
      viaje: viaje});
  }

  private displayEnCuro(viaje : Viaje) : boolean {
    let currentDate : Date = new Date();
    let departureDate : Date = viaje.departureDate.toDate();
    let returnDate : Date = viaje.returnDate.toDate();
    departureDate.setHours(0, 0);
    returnDate.setHours(23, 59);

    return  (currentDate >= departureDate) &&  (currentDate <= returnDate);
  }

  private showTrivia()  {
    this.navCtrl.push(TriviaPage, {
      trivia: this.trivia});
  }
}
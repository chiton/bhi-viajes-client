import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Viaje } from '../../models/viaje';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs';
import { DataProvider } from '../../providers/data/data';
import { AdsProvider } from "../../providers/ads/ads";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private viajes : Observable<any[]>;
    private searchTerm : string = "";
    
  constructor(private navCtrl: NavController, 
    private dataProvider: DataProvider,
    private adsProvider: AdsProvider) {
  }

  ionViewDidLoad() {
    this.viajes = this.dataProvider.getViajes();
  }

  private selectViaje(viaje : Viaje)
  {
    this.adsProvider.showInterstitial();
    this.navCtrl.push(DetailsPage, {
      viaje: viaje});
  }
}
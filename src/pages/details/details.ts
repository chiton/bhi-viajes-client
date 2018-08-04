import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Viaje } from '../../models/viaje';

// We MUST import both the firebase AND firestore modules like so
import { MapProvider } from '../../providers/map/map';
import { AdsProvider } from "../../providers/ads/ads";

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  
  private viaje : Viaje;

  constructor(public navCtrl: NavController, 
    private navParams: NavParams,
    private mapProvider: MapProvider,
    private adsProvider: AdsProvider) {
    this.viaje = this.navParams.get('viaje');
  }

  ionViewDidLoad() {
    this.mapProvider.loadMap(this.viaje.coord.latitude, this.viaje.coord.longitude);
    this.adsProvider.showInterstitial();
  }
}

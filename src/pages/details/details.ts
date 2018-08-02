import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Viaje } from '../../models/viaje';

// We MUST import both the firebase AND firestore modules like so
import { MapProvider } from '../../providers/map/map';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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
    private admob: AdMobFree) {
    this.viaje = this.navParams.get('viaje');
  }

  ionViewDidLoad() {
    this.mapProvider.loadMap(this.viaje.coord.latitude, this.viaje.coord.longitude);

    this.showBanner();
  }

    showBanner() {
      let bannerConfig: AdMobFreeBannerConfig = {
          isTesting: true, // Remove in production
          autoShow: true
          //id: Your Ad Unit ID goes here
      };

      this.admob.banner.config(bannerConfig);

      this.admob.banner.prepare().then(() => {
          // success
      }).catch(e => console.log(e));

    }
}

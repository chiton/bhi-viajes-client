import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig} from '@ionic-native/admob-free';

@Injectable()
export class AdsProvider {
  private bannerConfig : AdMobFreeBannerConfig = {
          isTesting: true, // Remove in production
          autoShow: false
          //id: Your Ad Unit ID goes here
      };
  
  private interstitialConfig  : AdMobFreeInterstitialConfig  = {
          isTesting: true, // Remove in production
          autoShow: false
          //id: Your Ad Unit ID goes here
      };
  

  constructor(private admob: AdMobFree) {
    this.admob.banner.config(this.bannerConfig);
    this.admob.interstitial.config(this.interstitialConfig);

    this.admob.banner.prepare().then(() => {
          // success
      }).catch(e => console.log(e));


    this.admob.interstitial.prepare().then(() => {
          // success
      }).catch(e => console.log(e));

  }

  public showBanner() {
    this.admob.banner.show();
  }

  public showInterstitial() {
    this.admob.interstitial.show();
  }
}

import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig} from '@ionic-native/admob-free';

@Injectable()
export class AdsProvider {
  private bannerConfig : AdMobFreeBannerConfig = {
          isTesting: false, // Remove in production
          autoShow: true,
          id: "ca-app-pub-6893674503689163/5130073760"
      };
  
  private interstitialConfig  : AdMobFreeInterstitialConfig  = {
          isTesting: false, // Remove in production
          autoShow: true,
          id: "ca-app-pub-6893674503689163/9441488329"
      };
  

  constructor(private admob: AdMobFree) {
    this.admob.banner.config(this.bannerConfig);
    this.admob.interstitial.config(this.interstitialConfig);
  }

  public showBanner() {
    this.admob.banner.prepare().then(() => {
          // success
      }).catch(e => console.log(e));
  }

  public showInterstitial() {
    this.admob.interstitial.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }
}

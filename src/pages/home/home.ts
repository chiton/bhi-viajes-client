import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Viaje } from '../../models/viaje';
import { DetailsPage } from '../details/details';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { DataProvider } from '../../providers/data/data';
import { EditorPage } from '../editor/editor';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private viajes : Observable<any[]>;
    private searchTerm : string = "";
    
  constructor(private navCtrl: NavController, 
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.viajes = this.dataProvider.getViajes();
  }

  private selectViaje(viaje : Viaje)
  {
    this.navCtrl.push(DetailsPage, {
      viaje: viaje});
  }

  private addViaje() {
      this.navCtrl.push(EditorPage);
  }
}
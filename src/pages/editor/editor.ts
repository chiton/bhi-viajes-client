import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Viaje } from '../../models/viaje';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html',
})
export class EditorPage {
  private title : string = "Agregar un nuevo viaje";
  private viaje : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb : FormBuilder,
    private dataProvider : DataProvider,
    private geolocation: Geolocation) {
      let viajeToEdit : Viaje = this.navParams.get('viaje');
      if(viajeToEdit){
        this.title = "Editar viaje";
      }

      this.viaje = this.fb.group({
        id: [viajeToEdit ? viajeToEdit.id : ''],
        name: [viajeToEdit ? viajeToEdit.name : '', Validators.required],
        departureDate: [viajeToEdit ? viajeToEdit.departureDate.toDate().toISOString() : new Date().toISOString(), Validators.required],
        returnDate: [viajeToEdit ? viajeToEdit.returnDate.toDate().toISOString() : new Date().toISOString(), Validators.required],
        lastEntry: [viajeToEdit ? viajeToEdit.lastEntry : firebase.firestore.Timestamp.fromDate(new Date())],
        details: [viajeToEdit ? viajeToEdit.details : '', Validators.required],
        image: [viajeToEdit ? viajeToEdit.image : ''],
      });
  }

  ionViewDidLoad() {
    
  }

  submit() : any {
    let item : Viaje = this.viaje.value as Viaje;
    let departureDate = firebase.firestore.Timestamp.fromDate(new Date(this.viaje.value.departureDate));
    let returnDate = firebase.firestore.Timestamp.fromDate(new Date(this.viaje.value.returnDate));

    item.departureDate = departureDate;
    item.returnDate = returnDate;

    if (item.id) { // Editing
      this.dataProvider.updateViaje(item);
      this.navCtrl.pop();
    }
    else { // Adding

      this.geolocation.getCurrentPosition()
      .then((response) => {

        item.coord = new firebase.firestore.GeoPoint(response.coords.latitude, response.coords.longitude);
        delete item.id; 

        this.dataProvider.addViaje(item);
        this.navCtrl.pop();
      })
      .catch((error) =>{
        console.log(error);
      })
    }
  }
}


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Trivia } from '../../models/trivia';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Respuesta } from '../../models/respuesta';
import * as firebase from 'firebase';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html',
})
export class TriviaPage {
  private respuesta : FormGroup;
  private trivia : Trivia;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private fb : FormBuilder,
    private dataProvider : DataProvider) {
      this.trivia = this.navParams.get('trivia');
      this.initializeForm();
  }

  ionViewDidLoad() {
  }

  private initializeForm(){
    this.respuesta = this.fb.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      response: ['',Validators.required],
      date: [firebase.firestore.Timestamp.fromDate(new Date())],
      trivia: [this.trivia.trivia]
    });
  }

  private submit() {
    let item : Respuesta = this.respuesta.value as Respuesta;
    this.dataProvider.addRespuesta(item);
    this.navCtrl.pop();
  }
}

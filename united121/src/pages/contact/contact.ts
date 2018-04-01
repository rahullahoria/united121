import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  chat(){
    this.navCtrl
          .push(ChatPage, {
            user: null
          })
          .then(() => {
           // const index = this.viewCtrl.index;
            //this.navCtrl.remove(index);
          });
  }

}

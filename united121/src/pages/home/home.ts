import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../providers/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab = "home";
  private newGroup : FormGroup;
  private newPost : FormGroup;
  private newMember : FormGroup;
  public groupIds = "";

  
  constructor(public navCtrl: NavController,private formBuilder: FormBuilder,public user:User ) {
    this.newGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.newPost = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });

    this.newMember = this.formBuilder.group({
      mobileNumber: ['', Validators.required]
    });


    this.loadPost();
  }
  oneGroupId = "";
  loadPost(){
    if(this.oneGroupId == ""){
    this.groupIds = "";
    this.user.getGroups().then(r=>{
      for(var i=0;i<this.user.groups.length;i++){
        this.groupIds += this.user.groups[i].group._id+",";
      }
      this.user.getPosts(this.groupIds.substring(0, this.groupIds.length - 1));
    });
  
  }else{
    this.user.getPosts(this.oneGroupId);
  }

  }


  addPost(){
    /**
     * {
  "post":{
  "userId": "5ac0cf8c849a881b0d1070f0",
    "name": "fhkirst Post",
    "location": {"lat":23.23,"lng":123.23},
    "img": "5ac094ce2b3c7a64307587b6"
  }
}
     */
    console.log(this.newPost.value);
    this.newPost.value['userId'] = "5ac0cf8c849a881b0d1070f0";
    this.newPost.value['location'] = {"lat":23.23,"lng":123.23};
    this.newPost.value['img'] = "5ac094ce2b3c7a64307587b6";
    this.newPost.value['groupId'] = "5ac9eedb3e5c7327166ab0bd";
    this.user.createPost(this.newPost.value).then(r=>{
      this.newPost = this.formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required]
      });
      this.loadPost();
      this.tab='home';
    }).catch(e=>{console.log(e)})
  }

  addMember(){
    /**
     * {
  "group":{
  "userId": "5ac0cf8c849a881b0d1070f0",
    "name": "fhkirst Group",
    "location": {"lat":23.23,"lng":123.23},
    "img": "5ac094ce2b3c7a64307587b6"
  }
}
     */
    console.log(this.newMember.value);
    this.newMember.value['userId'] = "5ac0cf8c849a881b0d1070f0";
    this.newMember.value['location'] = {"lat":23.23,"lng":123.23};
    this.newMember.value['img'] = "5ac094ce2b3c7a64307587b6";
    this.user.createMember(this.newMember.value).then(r=>{
      this.newMember = this.formBuilder.group({
        mobileNumber: ['', Validators.required]
      });
      this.tab='home';
    }).catch(e=>{console.log(e)})
  }

 
  addGroup(){
    /**
     * {
  "group":{
  "userId": "5ac0cf8c849a881b0d1070f0",
    "name": "fhkirst Group",
    "location": {"lat":23.23,"lng":123.23},
    "img": "5ac094ce2b3c7a64307587b6"
  }
}
     */
    console.log(this.newGroup.value);
    this.newGroup.value['userId'] = "5ac0cf8c849a881b0d1070f0";
    this.newGroup.value['location'] = {"lat":23.23,"lng":123.23};
    this.newGroup.value['img'] = "5ac094ce2b3c7a64307587b6";
    this.user.createGroup(this.newGroup.value).then(r=>{
      this.newGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
      });
      this.tab='group';
    }).catch(e=>{console.log(e)})
  }

}

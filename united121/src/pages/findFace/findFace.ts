import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

const cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  };

  const pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

@Component({
  selector: 'page-find-face',
  templateUrl: 'findFace.html'
})


export class FindFacePage {

    

  constructor(public navCtrl: NavController,private cameraPreview: CameraPreview) {

  }

  startCamera(){
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
  }

  public picture;

  takePic(){
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
        this.picture = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err);
        this.picture = 'assets/img/test.jpg';
      }); 
  }

  switchCamera(){
    this.cameraPreview.switchCamera();
  }

  stopCamera(){
    this.cameraPreview.stopCamera();
  }

}

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Media, MediaObject } from "@ionic-native/media";
import { File } from "@ionic-native/file";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaProvider {
  public currentMedia;

  constructor(public http: Http, public media: Media, public file: File) {}

  createMedia(fileName) {
    this.currentMedia = this.media.create(fileName );
    console.log("media >>>>>>" , JSON.stringify(this.currentMedia))
  }
  getMedia() {
    return this.currentMedia._objectInstance.src;
  }
  deleteMedia() {}
  startRecording() {
    this.currentMedia.startRecord();
  }
  stopRecording() {
    this.currentMedia.stopRecord();
    console.log(this.currentMedia.getDuration());
  }
  startPlayBack() {
    this.currentMedia.play();
  }
  stopPlayBack() {
    this.currentMedia.stop();
  }
  pausePlayBack() {
    this.currentMedia.pause();
  }
  seekToTime(time) {
    this.currentMedia.seekTo(time * 1000);
  }
  getCurrentPosition(){
    var pos = this.currentMedia.getCurrentPosition().then((position) => {
      return position;
    });
    return pos;
  }
  getDurationn(){
    return (this.currentMedia.getDuration());
  }
}

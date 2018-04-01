import { timestamp } from 'rxjs/operator/timestamp';
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import {
  NavController,
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
  Loading
} from "ionic-angular";

import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";

import 'rxjs/add/operator/map';
import { contentHeaders, apiBaseUrl } from '../components/config/config'

let apiUrl = apiBaseUrl + "file_dog/";

declare var cordova: any;
@Injectable()
export class FileDog {
  lastImage: string = null;
  loading: Loading;
  public localFileLocation: any;
  public fileDogId: any;
  public location: any;
  public appKey = null;
  public mobile = null;
  public res: any;

  public user: any;

  constructor(
    public http: Http,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.location = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.location = cordova.file.dataDirectory
          ? cordova.file.dataDirectory
          : "file:///storage/emulated/0/Android/data/com.ionicframework.testcamerapreview592650/files/";
      }
    });
    console.log("Hello FileDog Provider");
    this.localFileLocation = [];
    this.res = { data: { fileId: "" } };
  }

  public getVehicleImg(type) {
    if (this.platform.is('ios')) {
      return this.location.replace(/file:\/\//g, '') + type + ".jpg";
    } else if (this.platform.is('android')) {
      return this.location + type + ".jpg";
    }
  }

  public saveFile(user, imageData, fileName, sensorData, d) {

    console.log(JSON.stringify(sensorData));
    this.user = user;

    const bytes: string = atob(imageData);
    const byteNumbers = new Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      byteNumbers[i] = bytes.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    var temp = fileName.split(".");

    const blob: Blob = new Blob([byteArray], { type: "image/" + temp[1] });
    //const fileName: string = this.docs[this.picNo].imgName+'.jpg';
    //alert(location + fileName);

    //this.file.removeFile(this.location, fileName);

    this.file.writeFile(this.location, fileName, blob, { replace: true }).then(
      (res: any) => {
        console.log("DONE WRITING", this.location, fileName);

        console.log(res);

        //alert(this.file.applicationStorageDirectory + "file writen");
        this.localFileLocation = this.location + fileName;

        user.fileCount++;

        this.user.fileUploadMonitor.push({ location: location, filename: fileName, sensorData: sensorData, d: d, timestamp: new Date(), i: this.user.fileUploadMonitor.length, status: "s" });

        this.uploadImage(this.location, fileName, sensorData, d);

        setTimeout(() => {
          this.monitorUploadImage();
        }, 3000);
      },
      error => {
        console.error(
          this.file.applicationStorageDirectory +
          JSON.stringify(error) +
          "Error while saving image"
        );
        //alert(this.file.applicationStorageDirectory + JSON.stringify(error) + "Error while saving image");
        console.log(error);
      }
    );
  }
  public filename = "";
  public monitorUploadImage() {

    //this.uploadImage(location, filename,sensorData,d);
    //settimecout case can be improved
    var t = new Date().getTime();
    for (var i = 0; i < this.user.fileUploadMonitor; i++) {
      if (this.user.fileUploadMonitor[i].status == "w" && (t - this.user.fileUploadMonitor[i].timestamp > 5000)) {

        this.user.fileDogBusy--;
        this.user.fileUploadMonitor[i].status = "s";
        this.user.fileUploadMonitor[i].timestamp = t;
        this.uploadImage(
          this.user.fileUploadMonitor[i].location,
          this.user.fileUploadMonitor[i].fileName,
          this.user.fileUploadMonitor[i].sensorData,
          this.user.fileUploadMonitor[i].d
        );
        setTimeout(() => {
          this.monitorUploadImage();
        }, 3000);

        break;
      }
      //if(this.user.fileUploadMonitor[i].status == "d" ) flag = false;
    }




  }



  public uploadImage(location, filename, sensorData, d) {

    if (this.user.fileDogBusy > 4) {
      console.log(filename, "filedog found busy");
      var t = Math.floor((Math.random() * 5) + 3) * 1000;
      setTimeout(() => {
        this.uploadImage(location, filename, sensorData, d);
      }, t);

    }
    else {

      var objIndex = this.user.fileUploadMonitor.findIndex(obj => obj.filename == filename);
      console.log("objIndex ===>>>", filename, this.user.fileUploadMonitor, objIndex, this.user.fileUploadMonitor[objIndex]);
      this.user.fileUploadMonitor[objIndex].status = "w";

      this.user.fileDogBusy++;
      this.filename = filename;

      t = Math.floor((Math.random() * 100) + 1);
      var temp = filename.split(".");
      //var filenameN = temp[0];
      //var d = new Date();
      var n = d.getTime();
      var newFileName = temp[0] + "_" + this.user.mobile + "_" + t + "_" + n + "." + temp[1];

      console.log("file name with data", newFileName);
      this.user.mobile = this.user.mobile + "";
      if (this.user.mobile.length <= 10)
        this.user.mobile = "91" + this.user.mobile;

      var options = {
        fileKey: "uplfiles",
        fileName: newFileName,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { fileName: newFileName },
        timeout: 120000,
        headers: {
          'mobile': this.user.mobile,
          'app-key': this.user.appKey
        }
      };

      var fileTransfer: TransferObject = this.transfer.create();


      fileTransfer.upload(location + filename, apiUrl, options).then(
        data => {


          var objIndex = this.user.fileUploadMonitor.findIndex((obj => obj.filename == filename));
          this.user.fileUploadMonitor[objIndex].status = "d";

          this.user.fileDogBusy ? this.user.fileDogBusy-- : this.user.fileDogBusy;
          console.log(JSON.stringify(data.response));
          this.res = JSON.parse(data.response);
          //this.presentToast("Image succesful uploaded.");

          this.user.vehicleSideImg.push({
            fileId: this.res.data.fileId,
            filename: filename,
            sensorData: sensorData,
            timestamp: n


          });
          this.user.localFiles.push({ location: location, filename: filename });
        },
        err => {
          var objIndex = this.user.fileUploadMonitor.findIndex((obj => obj.filename == filename));
          this.user.fileUploadMonitor[objIndex].status = "s";

          this.user.fileDogBusy ? this.user.fileDogBusy-- : this.user.fileDogBusy;
          console.log("file dog error ---->>>>>>> :( :( :(", JSON.stringify(err));
          this.uploadImage(location, filename, sensorData, d);
          console.log("trying again");
          //this.presentToast("trying again");
        }
      );
    }
  }

  checkDirectory(root, dir) {
    return new Promise((resolve, reject) => {
      this.file.checkDir(root, dir)
      .then((files) => {
        //this.checkFile();
        resolve(true);
      }).catch((err) => {
        console.log("error in creating directory",err);
        if (err.code == 1) {
          this.file.createDir(root, dir, true).then(() => { console.log('Created'); }, (err) => { console.log('Error Occured in directory'); });
          resolve(true);
        }
        reject(false);
      });
    })
  }

  createUserInfoTextFile(user) {
    this.checkDirectory(this.file.externalRootDirectory, 'userData')
    .then(
      t => {
        if (t) {
          console.log('Creating file ', this.file.externalRootDirectory);
          this.file.checkFile(this.file.externalRootDirectory + '/userData/', 'user.txt')
            .then((files) => {
              console.log('Files :', files);
              this.file.writeExistingFile(this.file.externalRootDirectory + '/userData/', 'user.txt', JSON.stringify(user)).then(() => { })
                .catch((err) => { console.log(err); })

            }).catch((err) => {
              console.log('Error :', err);
              if (err.code == 1) {
                this.file.createFile(this.file.externalRootDirectory + '/userData/', 'user.txt', true).then(() => { 
                  this.file.writeExistingFile(this.file.externalRootDirectory + '/userData/', 'user.txt', JSON.stringify(user)).then((r) => { console.log("file ceated successfully",r);})
                  .catch((err) => { console.log(err); });
  
                  console.log('Created'); }, (err) => { console.log('Error Occured'); });
               
              }
            });

        }
      }
    );


  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  private removeFile(dir,file){
    this.file.removeFile(dir, file).then(m => { console.log(m) })
      .catch(m => { console.log(m);
          //this.removeFile(dir,file.substring(file.indexOf('s')));
      });
    
  }

  public removeFiles(arr) {


    for (var i = 0; i < arr.length; i++) {

      console.log(arr[i].location, arr[i].filename);

      if ("file" != arr[i].location.substring(0, 4)) arr[i].location = "file://" + arr[i].location;
      this.removeFile(arr[i].location,arr[i].filename);
      
      
      console.log(arr[i].location, arr[i].filename);
    }
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
      success => {
        this.lastImage = newFileName;
      },
      error => {
        //this.presentToast("Error while storing file.");
      }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
}

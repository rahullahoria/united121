import { NativeStorage } from "@ionic-native/native-storage";
import { Component, ViewChild } from "@angular/core";
import { Nav, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { User } from "../../providers/user";
import { Raven } from "../../providers/raven";
//import { AndroidPermissions } from '@ionic-native/android-permissions';

//import { AppVersion } from '@ionic-native/app-version';

//import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
//import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ToastController } from 'ionic-angular';
import { FileDog } from '../../providers/file-dog';
import { HomePage } from "../home/home";

//declare var cordova;
declare var OTPAutoVerification: any

/*
  Generated class for the Auth page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-auth",
  templateUrl: "auth.html"
})
export class AuthPage {
  @ViewChild(Nav) nav: Nav;
  private perms: any;
  public mobile: String = "";
  public mobileSet: any;
  public otp: any;
  public error: any;
  public submited = true;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toaster: ToastController,
    public user: User,
    public raven: Raven,
    private viewCtrl: ViewController,
    private nativeStorage: NativeStorage,
   // private androidPermissions: AndroidPermissions,
    public loadingCtrl: LoadingController,
   // private diagnostic: Diagnostic,
    public platform: Platform,
   // private openNativeSettings: OpenNativeSettings,
    public fileDog: FileDog
  ) {


    this.submited = false;
  
    
    this.platform.ready().then(() => {

      //this.checkLocation();
      //this.getAllPermissions();
      // this.checkCameraPermissions().then(permissionOk => {
      //   if (permissionOk) {
      //     //alert('awesome!');
      //   }
      //   else {
      //     //alert('You can\'t go further please try again!');
      //   }
      // });



    });





  //   try {
  //     if (this.screenOrientation.unlock())
  //       this.screenOrientation.lock(
  //         this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
  //       ).catch();
  //   } catch (e) { }
  // }

  // checkCameraPermissions(): Promise<boolean> {
  //   return new Promise(resolve => {
  //     if (this.platform.is("ios")) {
  //       this.diagnostic.getCameraAuthorizationStatus().then(status => {
  //         if (status == this.diagnostic.permissionStatus.GRANTED) {
  //           resolve(true);
  //         }
  //         else if (status == this.diagnostic.permissionStatus.DENIED) {
  //           resolve(false);
  //         }
  //         else if (status == this.diagnostic.permissionStatus.NOT_REQUESTED || status.toLowerCase() == 'not_determined') {
  //           this.diagnostic.requestCameraAuthorization().then(authorisation => {
  //             resolve(authorisation == this.diagnostic.permissionStatus.GRANTED);
  //           });
  //         }
  //       });
  //     }
  //     else if (this.platform.is("android")) {
  //       this.diagnostic.isCameraAuthorized().then(authorised => {
  //         if (authorised) {
  //           resolve(true);
  //         }
  //         else {
  //           this.diagnostic.requestCameraAuthorization().then(authorisation => {
  //             resolve(authorisation == this.diagnostic.permissionStatus.GRANTED);
  //           });
  //         }
  //       });
  //     }
  //   });
   }
  //private count = 0;
  // getAllPermissions() {

  //   this.perms = [
  //     this.androidPermissions.PERMISSION.CAMERA,
  //     this.androidPermissions.PERMISSION.INTERNET,
  //     this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
  //     this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
  //     this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
  //     this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
  //     this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
  //     //this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS,
  //     this.androidPermissions.PERMISSION.RECORD_AUDIO,
  //     this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
  //     this.androidPermissions.PERMISSION.RECORD_VIDEO
  //     //this.androidPermissions.PERMISSION.AUTHENTICATE_ACCOUNTS,
  //     //this.androidPermissions.PERMISSION.GET_ACCOUNTS,
  //     //this.androidPermissions.PERMISSION.READ_SYNC_SETTINGS,
  //     //this.androidPermissions.PERMISSION.WRITE_SYNC_SETTINGS,
  //     //this.androidPermissions.PERMISSION.RECEIVE_BOOT_COMPLETED,
  //     //this.androidPermissions.PERMISSION.ACTIVITY_RECOGNITION,
  //     //this.androidPermissions.PERMISSION.WAKE_LOCK,
  //     //this.androidPermissions.PERMISSION.READ_PHONE_STATE,
  //     //this.androidPermissions.PERMISSION.RECEIVE_SMS,
  //     //this.androidPermissions.PERMISSION.READ_SMS
  //   ];
  //   this.androidPermissions.requestPermissions(this.perms).then((ape) => {
  //     console.log("ape", ape);

  //     var flag;
  //     for (var i = 0; i < this.perms.length; i++) {
  //       console.log("this.perms[i] ==>", this.perms.length, i, this.perms[i]);
  //       if (this.perms[i]) {
  //         this.androidPermissions.checkPermission(this.perms[i]).then(
  //           (s) => {
  //             console.log("s==> ", s.hasPermission);
  //             this.count++;
  //             if (s.hasPermission == false && this.count >= 4) {
  //               this.count = 0;
  //               flag = true;
  //               alert("Please find the app and give all permissions, for using the app.");
  //               this.openNativeSettings.open("manage_applications");
  //             }
  //             else if (s.hasPermission == false) {
  //               this.count = 0;
  //               this.getAllPermissions();
  //               flag = true;

  //             }
  //             else {
  //               this.haveAllPre = true;
  //             }

  //             console.log("success", s);
  //             //if(s.hasPermission && s.hasPermission == false)this.getAllPermissions();
  //           },
  //           err => { this.getAllPermissions(); console.log("err", err); }
  //         ).catch((e) => { console.log("permission catch") });
  //         if (flag) {
  //           break;
  //         }
  //       }
  //     }
  //   });


  // }

  private haveAllPre = false;
  // checkLocation() {
  //   //this.diagnostic.requestLocationAuthorization().then((t)=>{console.log("then",t)}).catch(t=>{console.log("lcoatin catch",t)});
  //   this.diagnostic.isLocationEnabled()
  //     .then((isAvailable) => {
  //       console.log("LOCATION AVAILABLE ==> ", isAvailable);
  //       if (!isAvailable) this.openNativeSettings.open("location");

  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       this.openNativeSettings.open("location");
  //       //alert(JSON.stringify(e));
  //     }
  //     );

  // }

  private presentToast(text) {
    this.toaster.create({
      message: text,
      duration: 3000,
      position: "top"
    }).present();
  }


  ionViewDidLoad() {
    console.log("ionViewDidLoad AuthPage");


  }
  public loader: any;

  auth() {
    // if (!this.haveAllPre) {
    //   this.getAllPermissions();
    //   return false;
    // }
    this.sentTime = 30;
    this.resendActive();
    this.submited = true;
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.user
      .auth({
        mobileNumber: this.mobile
      })
      .then(res => {
        console.log(res, "done");
        this.loader.dismiss().catch(() => { });

        if (this.user.res.status && this.user.res.status.code == 200) {
          console.log("inside if : ");

          // var options = {
          //   delimiter: "Hey!",
          //   length: 6,
          //   origin: "MD-LIVCHK"
          // };
          // var t = this;
          // var success = function (otp) {
          //   console.log("GOT OTP", otp);
          //   t.otp = otp;
          //   console.log("t.otp ==> ", t.otp);
          //   OTPAutoVerification.stopOTPListener();

          //   t.checkOtp();
          // }

          // var failure = function (e) {
          //   console.log(e);
          //   OTPAutoVerification.stopOTPListener();
          //   console.log("Problem in listening OTP");
          // }

          // console.log("cordova.plugins.OTPAutoVerification ==> ", OTPAutoVerification);
          // OTPAutoVerification.startOTPListener(options, success, failure);

          this.mobileSet = true;
          this.submited = false;
        } else {
          this.presentToast(this.user.res.status.message)

        }
      }).catch(err => {
        this.submited = false;
        this.presentToast("Sorry, Unable to connect to server. Please try again");

      });
  }
  public password;

  public sentTime = 30;

  resendActive() {
    setTimeout(() => {
      this.sentTime--;
      this.sentTime > 0 ? this.resendActive() : '';
    }, 1000);
  }

  // login() {

  //   if (!this.haveAllPre) {
  //     this.getAllPermissions();
  //     return false;
  //   }

  //   this.submited = true;

  //   this.loader = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });

  //   this.user
  //     .login({
  //       mobile: this.mobile,
  //       password: this.password
  //     })
  //     .then(res => {
  //       this.loader.dismiss().catch(() => { });

  //       if (this.user.res.status && this.user.res.status.code == 200) {
  //         //this.user.appState = "AgentPage";
  //         this.user.mobile = this.mobile;
  //         if (this.user.appType == 'SIT')
  //           this.user.companyId = this.user.userInfo.companyId;
  //         if (this.user.appType == 'AIP')
  //           this.user.companyId = this.user.agentData.companyId;
  //         this.user.appState = this.appConfig.appStates[this.user.appType].auth;
  //         this.saveToNativeStorage();

  //         this.mobileSet = true;
  //         this.submited = false;
  //         this.user.mobile = this.mobile;

  //         this.goToState(this.possibleStates[this.appConfig.appStates[this.user.appType].auth]);


  //       }
  //       else {
  //         this.submited = false;
  //         this.presentToast("Invalid Details, Try Again!!!");
  //       }
  //     })
  //     .catch(err => {
  //       console.log("inside login errir:::::::::::", err);
  //       this.submited = false;
  //       if (this.user.appType == 'SIT' || this.user.appType == 'AIP')
  //         this.presentToast("Invalid Details, Try Again!!!");
  //       else
  //         this.presentToast("Internet Connection Problem, Try Again");
  //     });
  // }

  saveToNativeStorage() {
    var data = {
      mobile: this.user.mobile,
    //  appState: this.user.appState,
     // agentData: this.user.agentData,
      appKey: this.user.appKey,
      otp: this.user.otp,
      userInfo: this.user.userInfo,
      appType: this.user.appType
    };
    this.fileDog.createUserInfoTextFile(data);
    this.nativeStorage.setItem("user", data).then(
      () => console.log("Stored item!"),
      error => {
        console.error("Error storing item", error);
      }
    );

  }



  checkOtp() {
    this.submited = true;
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.user
      .verifyOTP({
        mobile: this.mobile,
        otp: this.otp + ""
      })
      .then(res => {
        this.user.otp = this.otp;
        this.loader.dismiss().catch(() => { });
        console.log(JSON.stringify(res));
        console.log("this.user.res ==>", this.user.res);
        if (this.user.res.status && this.user.res.status.code == 200) {
          console.log("this.user.res.data.appKey ==> ", this.user.res.data);
     //     this.user.appState = this.appConfig.appStates[this.user.appType].final;

          console.log("this.user.res.data.appKey ==> ", this.user.appType/*, 
          this.user.res.data[0].vehicle, this.user.res.data[0].vehicle.user.appKey['hash']*/);

          

          this.saveToNativeStorage();

          this.mobileSet = true;
          this.submited = false;
          this.user.mobile = this.mobile;
       
          // var nextState = this.possibleStates[this.appConfig.appStates[this.user.appType].auth];
          // if (!this.user.inspectionId && this.user.appType == "PIT")
          //   nextState = this.possibleStates[this.appConfig.appStates[this.user.appType].final];

          this.goToState(HomePage);

        } else {
          this.error = "Wrong OTP";
          this.submited = false;
        }
      })
      .catch(err => {
        this.submited = false;
        console.error(err);
        this.presentToast("Sorry, Unable to connect to server. Please try again");

      });
  }

  goToState(nextState) {
    this.navCtrl
      .push(nextState, {
        user: this.user
      })
      .then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });

  }

}

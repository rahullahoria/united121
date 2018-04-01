import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat-service';
import { EmojiProvider } from '../providers/emoji';
import { RelativeTime } from '../pipes/relative-time';
import { HttpClientModule } from '@angular/common/http';
import { AuthPage } from '../pages/auth/auth';
import { User } from '../providers/user';
import { HttpModule } from "@angular/http";
import { NativeStorage } from '@ionic-native/native-storage';
import { Raven } from '../providers/raven';
import { FileDog } from '../providers/file-dog';
import { Transfer } from '@ionic-native/transfer';
import { File } from "@ionic-native/file";
import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    MyApp,
    RelativeTime,
    AboutPage,
    ContactPage,
    AuthPage,
    HomePage,
    ChatPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    EmojiPickerModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    AuthPage,
    HomePage,
    ChatPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    EmojiProvider,
    NativeStorage,
    User,
    Raven,
    FileDog,
    Transfer,
    File,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AndroidPermissionsService, CoreModule, ionicConfig, PushService } from '@espm/core';
import { localeIdFactory, localeInitializer, LocaleService } from '@espm/core/locale/LocaleService';
import { ImageLoaderModule, MenuModule } from '@espm/shared';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AppAvailability } from '@ionic-native/app-availability';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Geolocation } from '@ionic-native/geolocation';
import { GooglePlus } from '@ionic-native/google-plus';
import { HaversineService } from 'ng2-haversine';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push } from '@ionic-native/push';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as moment from 'moment';

import { AboutProviders } from './about/providers';
import { ESPMComponent } from './app.component';
import { CalendarProviders } from './calendar/providers';
import { CeturbProviders } from './ceturb/transcol-lines/providers';
import { TranscolOnlineProviders } from './ceturb/transcol-online/providers';
import { DetranProviders } from './detran/providers';
import { DioProviders } from './dio/providers';
import { EDocsProviders } from './edocs/state';
import { OportunidadesProviders } from './oportunidades/concurso/providers';
import { AlunosProviders } from './oportunidades/alunos/providers';
import { NewsProviders } from './news/providers';
import { TransparencyProviders } from './secont/transparency/providers';
import { SepProviders } from './sep/providers';

import { TranscolOnlineStores } from './ceturb/transcol-online/state';
import { MenusProviders } from './navegacao/providers';

moment.locale('pt-br');

registerLocaleData(ptBr);

@NgModule({
  declarations: [ESPMComponent],
  imports: [
    BrowserModule,
    CoreModule,
    MenuModule,
    IonicStorageModule.forRoot({
      name: 'espm',
      driverOrder: ['localstorage']
    }),
    IonicModule.forRoot(ESPMComponent, ionicConfig),
    ImageLoaderModule.forRoot({
      fallbackUrl: 'assets/imgs/no-img.png',
      fallbackAsPlaceholder: false,
      spinnerEnabled: true,
      spinnerName: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [ESPMComponent],
  providers: [
    AndroidPermissions,
    AndroidPermissionsService,
    AppAvailability,
    BarcodeScanner,
    Device,
    Facebook,
    Geolocation,
    GooglePlus,
    HaversineService,
    InAppBrowser,
    LocaleService,
    LocalNotifications,
    Push,
    PushService,
    StatusBar,
    Clipboard,
    FileOpener,
    File,
    SplashScreen,
    SocialSharing,
    ...AboutProviders,
    ...CalendarProviders,
    ...CeturbProviders,
    ...DetranProviders,
    ...DioProviders,
    ...MenusProviders,
    ...NewsProviders,
    ...SepProviders,
    ...TranscolOnlineProviders,
    ...TransparencyProviders,
    ...EDocsProviders,
    ...OportunidadesProviders,
    ...AlunosProviders,
    ...TranscolOnlineStores,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: LOCALE_ID,
      useFactory: localeIdFactory,
      deps: [LocaleService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: localeInitializer,
      deps: [LOCALE_ID]
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}

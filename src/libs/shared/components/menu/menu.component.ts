import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthQuery, AuthService } from '@espm/core';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { App, MenuController, Platform } from 'ionic-angular';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

const menus = [
  {
    name: 'Principal ',
    items: [
      {
        title: 'Meus Serviços',
        icon: 'custom-menu-meus-servicos',
        component: 'MyServicesPage',
        order: 1
      },

    {
      id: 15,
      title: 'Sobre',
      icon: 'information-circle',
      component: 'AboutPage',
      isChecked: false
    }
      
    ]
  }
];

@Component({
  selector: 'espm-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
  menus = menus;
  rootPage: any = 'MyServicesPage';
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();

  /**
   *
   */
  constructor(
    private iab: InAppBrowser,
    private appAvailability: AppAvailability,
    private authNeeded: AuthNeededService,
    private authQuery: AuthQuery,
    private auth: AuthService,
    private menuCtrl: MenuController,
    private appCtrl: App,
    private cd: ChangeDetectorRef,
    private platform: Platform
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.authQuery.authChanged$
      .pipe(tap(() => this.cd.markForCheck()), takeUntil(this.destroyed$))
      .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   *
   */
  openPage = (route: any, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      if (route.deepLink) {
        if (this.platform.is('ios')) {
          // TODO: Verificar como fazer para ios
          this.appAvailability.check(route.uriScheme).then((yes: boolean) => console.log(yes), (no: any) => console.log(no));
        } else {
          this.appAvailability
            .check(route.package)
            .then(
              () => this.iab.create(route.url, '_system'),
              () => this.iab.create('market://details?id=' + route.package, '_system')
            );
        }
      } else {
        this.appCtrl.getRootNav().push(route.component);
        this.menuCtrl.close();
      }
    }
  };
  /*
   *
   */
  login = () => {
    this.openPage({ component: 'LoginPage' });
  };
  /**
   *
   */
  logout = () => {
    this.auth.logout().then(() => this.appCtrl.getRootNav().setRoot('MyServicesPage'));
  };
  
}

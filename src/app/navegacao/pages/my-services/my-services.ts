import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, App, NavParams } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';

type Favorite = {
  title: string;
  icon: string;
  component: string;
  isChecked: boolean;
  secure?: boolean;
  url?: string;
  name?: string;
  deepLink?: boolean;
  package?: string;
  uriScheme?: string;
}

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html',
})
export class MyServicesPage{
  @ViewChild('slideswrapper') slidesWrapper: any;
  private servicosSelecionados:Array<Favorite>;
  private serveSelect:Array<Favorite[]> = [];
  
  
  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    private navParams: NavParams) {
    
    this.servicosSelecionados = this.navParams.data; 
  }

  ionViewDidEnter() {
    this.serveSelect.splice(0, this.serveSelect.length);
    this.servicosSelecionados.map((elemento: Favorite, index: number) => {
      if (index % this.itemsPerPage() === 0) {
        this.serveSelect.push([])
      }
      this.serveSelect[this.serveSelect.length-1].push(elemento);
    });
  }

  itemsPerPage(): number {
    console.log(this.slidesWrapper);
    let list = this.slidesWrapper.nativeElement;
    console.log(`${list.clientWidth} / ${list.clientHeight}`);
    let rows = Math.floor((list.clientHeight - 40) / 140);
    let columns = Math.floor((list.clientWidth - 10) / 140);
    return rows * columns;
  }

  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };
  goToSelectFavorites(){
    this.navCtrl.push('SelectFavoritePage')
  }
}
  
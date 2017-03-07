import { Component , ViewChild} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { deepLinkConfig } from './app.module';
import { Dashboard } from '../pages/dashboard/dashboard';

//import { Menu } from '../pages/menu/menu';
//import { MenuItem } from '../pages/menu/menu-item';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController;

  rootPage = Dashboard;
  //menu: MenuItem[];

  menu: Array<{component: any, name: string, segment: string}>;

  constructor(platform: Platform, /*private menuService : Menu*/) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      //this.getMenu();

      this.menu = deepLinkConfig.links;
    });
  }

  /*getMenu(): void {
    this.menu = this.menuService.getMenu();
  }*/


  open(url){
    this.nav.push(url);
  }

}

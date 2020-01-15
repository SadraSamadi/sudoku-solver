import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public constructor(private platform: Platform,
                     private splashScreen: SplashScreen,
                     private statusBar: StatusBar) {
  }

  public ngOnInit(): void {
    this.platform.ready()
      .then(() => {
        this.statusBar.backgroundColorByHexString('#3182ce');
        this.splashScreen.hide();
        this.platform.backButton.subscribe(() => {
          let app = navigator['app'];
          app.exitApp();
        });
      });
  }

}

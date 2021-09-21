import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cryptoPortfolio';
  
  itemsMenu: Array<{ icon: string, route: string[], title: string }> = [
    {icon: 'description', route: ['/portfolios'], title: 'Portfolios'},
    {icon: 'monetization_on', route: ['/currencies'], title: 'Criptomonedas'},
  ];

  constructor(private router: Router, public loading: LoadingService) { }

  ngOnInit() {
    this.router.events.subscribe((route: any) => {
      if (route instanceof NavigationEnd) {
        this.loading.loading = false;
      } else if (route instanceof NavigationStart) {
        this.loading.loading = true;
      } else if (route instanceof NavigationCancel) {
        this.loading.loading = false;
      }
    });
  }
}

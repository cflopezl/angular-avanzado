import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuPrincipal: any[];
  constructor(sideBarService: SideBarService) { 
    this.menuPrincipal = sideBarService.menu;
    console.log(this.menuPrincipal);
  }

  ngOnInit(): void {
  }

}

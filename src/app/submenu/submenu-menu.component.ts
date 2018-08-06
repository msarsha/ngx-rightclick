import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { ContextMenuService } from '../../lib/context-menu.service';
import { MenuPackage } from '../../lib/context-menu-injector';
import { MenuComponent } from '../../lib/menu.component';
import { SubSubmenuMenuComponent } from './subsubmenu-menu.component';

@Component({
  selector: 'animated-menu',
  template: `
  <div class="dropdown-menu show" style="position: relative;">
    <button class="dropdown-item" (click)="handleClick()">Another action</button>
    <button class="dropdown-item disabled">Disabled link</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" (click)="handleClick()">Separated link</button>
    <div class="dropdown-submenu">
      <button [contextSubmenuTrigger]="submenu" class="dropdown-item dropdown-toggle">Submenu</button>
    </div>
  </div>
  `,
  animations: [
    trigger('menu', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => *', animate(100)),
    ]),
  ],
  host: {
    '[@menu]': '_state',
    '(@menu.done)': '_onAnimationDone($event)',
  },
})
export class SubmenuMenuComponent extends MenuComponent {
  submenu = SubSubmenuMenuComponent;
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
  }

  handleClick() {
    // tell the menu to close
    this.contextMenuService.closeAll();
  }
}

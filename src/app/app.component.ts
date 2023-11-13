import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}

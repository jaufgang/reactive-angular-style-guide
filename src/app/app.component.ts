import { Component, ViewEncapsulation } from '@angular/core';
import { guide } from './guide';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  styleGuide = guide;
}

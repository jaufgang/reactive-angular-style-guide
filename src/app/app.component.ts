import { Component, ViewEncapsulation } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { isCodeSample, isMultiFileCodeSample } from './contentful-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  readonly isMultiFileCodeSample = isMultiFileCodeSample;
  readonly isCodeSample = isCodeSample;

  readonly styleGuides$ = this.contentfulService.getStyleGuides();

  constructor(private contentfulService: ContentfulService) {}
}

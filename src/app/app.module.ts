import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentfulService } from './contentful.service';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrettierPipe } from './prettier.pipe';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { GuardTypePipe } from './guard-type.pipe';

@NgModule({
  declarations: [AppComponent, PrettierPipe, GuardTypePipe],
  imports: [
    BrowserModule,
    HighlightModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    FlexLayoutModule,
    NgxContentfulRichTextModule,
    MarkdownToHtmlModule,
  ],
  providers: [
    ContentfulService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

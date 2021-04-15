import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

import { PrettierPipe } from './prettier.pipe';
import { DiscussionComponent } from './discussion/discussion.component';
import { RulesComponent } from './rules/rules.component';
import { SamplesComponent } from './samples/samples.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [AppComponent, PrettierPipe, DiscussionComponent, RulesComponent, SamplesComponent, TitleComponent],
  imports: [
    BrowserModule,
    HighlightModule,
    BrowserAnimationsModule,
    NgxContentfulRichTextModule,
    MarkdownToHtmlModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

import { PrettierPipe } from './prettier.pipe';
import { DiscussionComponent } from './discussion/discussion.component';
import { RulesComponent } from './rules/rules.component';
import { SamplesComponent } from './samples/samples.component';
import { TitleComponent } from './title/title.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [AppComponent, PrettierPipe, DiscussionComponent, RulesComponent, SamplesComponent, TitleComponent, NavComponent],
  imports: [
    BrowserModule,
    HighlightModule,
    BrowserAnimationsModule,
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

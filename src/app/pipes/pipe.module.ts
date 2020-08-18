import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { TimeTransform } from './time-transform.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SafeUrlPipe,
    SafeHtmlPipe,
    TimeTransform
  ],
  declarations: [
    SafeUrlPipe,
    SafeHtmlPipe,
    TimeTransform
  ]
})
export class PipeModule { }
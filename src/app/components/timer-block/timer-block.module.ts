import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { TimerBlockComponent } from './timer-block.component';

@NgModule({
  declarations: [
    TimerBlockComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [
    TimerBlockComponent
  ],
})
export class TimerBlockModule {}

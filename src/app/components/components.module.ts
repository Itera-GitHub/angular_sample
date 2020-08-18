import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PipeModule } from '../pipes/pipe.module';
import { FaIconsModule } from './fa-icons.module';

import { FormInputComponent } from './fields/form-input.component';
import { FormSelectComponent } from './fields/form-select.component';
import { FormGroupedSelectComponent } from './fields/form-grouped-select.component';
import { FormTextareaComponent } from './fields/form-textarea.component';
import { FormMultiselectComponent } from './fields/form-multiselect.component';
import { FormRadioComponent } from './fields/form-radio.component';

import { LoadingComponent } from './loading/loading.component';
import { AskQuestionModalComponent } from './ask-question-modal/ask-question-modal.component';
import { JsonLdComponent } from './json-ld/json-ld.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    FormInputComponent,
    FormSelectComponent,
    FormGroupedSelectComponent,
    FormMultiselectComponent,
    LoadingComponent,
    JsonLdComponent,
    FormTextareaComponent,
    FormRadioComponent,
    AskQuestionModalComponent,
    ImageComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    MaterialModule,
    CommonModule,
    RouterModule,
    FaIconsModule,
    NgxMatSelectSearchModule,
  ],
  entryComponents: [
    AskQuestionModalComponent,
  ],
  exports: [
    LoadingComponent,
    FormInputComponent,
    FormSelectComponent,
    FormGroupedSelectComponent,
    FormRadioComponent,
    FormMultiselectComponent,
    FormTextareaComponent,
    AskQuestionModalComponent,
    JsonLdComponent,
		ImageComponent
  ],
})
export class ComponentsModule {}

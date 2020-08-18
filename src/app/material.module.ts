import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatInputModule,
		MatProgressSpinnerModule,
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
		MatProgressSpinnerModule,
  ]
})
export class MaterialModule {}

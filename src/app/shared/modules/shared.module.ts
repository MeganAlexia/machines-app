import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSlideToggleModule,
  MatCardModule,
  MatBadgeModule,
} from '@angular/material';
import { NgLetModule } from '@ngrx-utils/store';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSlideToggleModule,
  MatCardModule,
  MatBadgeModule,
  NgLetModule,
];

const sharedImportsExports = [CommonModule, RouterModule, ...materialModules];

@NgModule({
  imports: sharedImportsExports,
  exports: sharedImportsExports,
})
export class SharedModule {}

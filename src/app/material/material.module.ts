import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";

import{MatSidenavModule} from "@angular/material/sidenav"
import{MatMenuModule} from "@angular/material/menu"
import{MatDividerModule} from "@angular/material/divider"
import{MatListModule} from "@angular/material/list"
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";



const modules = [
  FlexLayoutModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatSnackBarModule,
  MatSelectModule,
  MatExpansionModule,
  MatListModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule
]

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialModule { }

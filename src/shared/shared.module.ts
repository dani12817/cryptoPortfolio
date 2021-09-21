import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        MatAutocompleteModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        MatAutocompleteModule
    ],
    providers: [
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
    ]
})

export class SharedModule {
    constructor() {}
}

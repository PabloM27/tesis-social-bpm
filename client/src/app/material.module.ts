import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule, MatFormFieldModule, MatDatepickerModule, MatRadioModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({

    imports: [MatButtonModule, MatCheckboxModule,MatInputModule,MatIconModule,MatSelectModule,BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatTabsModule],
    exports: [MatButtonModule, MatCheckboxModule,MatInputModule,MatIconModule,MatSelectModule,BrowserAnimationsModule,MatCardModule,MatFormFieldModule,MatTabsModule]

})

export class MaterialModule { }

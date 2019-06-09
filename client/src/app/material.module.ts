import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({

    imports: [MatButtonModule, MatCheckboxModule,MatInputModule,MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule,MatInputModule,MatIconModule]

})

export class MaterialModule { }

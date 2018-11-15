import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MessageComponent],
  exports: [RouterModule, MessageComponent]
})
export class SharedModule {}

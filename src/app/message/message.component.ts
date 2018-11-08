import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="possuiErro()" class="ui-messages ui-messages-error">
      {{ text }}.
    </div>
  `,
  styles: [`
    .ui-messages-error {
      padding: 5px !important;
      margin: 0px !important;
      margin-top: 4px !important;
    }
  `]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  possuiErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}

import { Component, Input } from '@angular/core';
import { NotasComponent } from '../../pages/notas/notas.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-ssubj',
  standalone: true,
  imports: [NotasComponent, CommonModule],
  templateUrl: './card-ssubj.component.html',
  styleUrl: './card-ssubj.component.css'
})

export class CardSsubjComponent {

  @Input() public first_name: string = "";
  @Input() public last_name: string = "";
  @Input() public subject: string = "";
  @Input() public avg!: any;

}

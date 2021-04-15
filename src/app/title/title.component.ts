import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  @Input() title = undefined;
  @Input() sectionTitle = undefined;
  @Input() sectionIndex = undefined;
  @Input() ruleTitle = undefined;
  @Input() ruleIndex = undefined;

}

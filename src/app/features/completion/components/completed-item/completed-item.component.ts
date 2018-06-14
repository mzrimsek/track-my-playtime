import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completion-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedItemComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}

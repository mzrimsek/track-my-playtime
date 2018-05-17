import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { LibraryEntry } from '../../models';

@Component({
  selector: 'app-library-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

  @Input() item: LibraryEntry;
  constructor() { }

  ngOnInit() { }
}

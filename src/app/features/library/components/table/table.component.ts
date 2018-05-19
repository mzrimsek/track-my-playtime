import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { LibraryEntry } from '../../models';

@Component({
  selector: 'app-library-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() data: LibraryEntry[];
  constructor() { }

  ngOnInit() { }
}

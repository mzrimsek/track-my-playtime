import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-edit-display-name',
  templateUrl: './edit-display-name.component.html',
  styleUrls: ['./edit-display-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDisplayNameComponent implements OnInit {

  icons = {
    confirm: faCheck,
    cancel: faTimes
  };
  constructor() { }

  ngOnInit() { }
}

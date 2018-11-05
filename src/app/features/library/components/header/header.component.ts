import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-library-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() gameCount = 0;
}

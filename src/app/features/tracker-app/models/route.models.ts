import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface RouteEntry {
  caption: string;
  router: any[] | string;
  exact?: boolean;
  icon?: IconDefinition;
  trackingCategory: string;
}

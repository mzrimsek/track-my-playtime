import { environment } from '../../../environments/environment';

import * as uuidv5 from 'uuid/v5';

export const getUUID = (userId: string, modifier = 0): string => {
  const name = environment.uuid.domain + userId + new Date().getTime() + modifier;
  return uuidv5(name, environment.uuid.namespace);
};

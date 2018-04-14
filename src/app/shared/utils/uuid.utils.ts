import { environment } from '../../../environments/environment';

import uuidv5 = require('uuid/v5');

export const getUUID = (userId: string, modifier = 0): string => {
  const name = environment.uuid.domain + userId + new Date().getTime() + modifier;
  return uuidv5(name, environment.uuid.namespace);
};

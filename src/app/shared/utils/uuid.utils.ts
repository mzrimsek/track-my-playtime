import { environment } from '../../../environments/environment';

import uuidv5 = require('uuid/v5');

export const getUUID = (userId: string): string => {
  const name = environment.uuid.domain + userId + new Date().getTime();
  return uuidv5(name, environment.uuid.namespace);
};

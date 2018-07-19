export interface IHasId {
  id: string;
}

export interface Dictionary<T extends IHasId> {
  [id: string]: T;
}

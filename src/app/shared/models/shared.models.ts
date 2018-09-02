export interface IHasId {
  id: string;
}

export interface Dictionary<T extends IHasId> {
  [id: string]: T;
}

export interface NgSelectValue {
  label?: string | null;
}

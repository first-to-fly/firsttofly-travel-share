/** Convert underlying type to json compatible data */
export type JSONData<T> = T extends Date
  ? string
  : {
    [K in keyof T]: JSONData<T[K]>;
  };

export type Keys<T> = keyof T;
export type DistributiveKeys<T> = T extends unknown ? Keys<T> : never;

/**  Pick properties to all types in union. */
export type DistributivePick<T, K extends DistributiveKeys<T>> = T extends unknown
  ? { [P in keyof Pick_<T, K>]: Pick_<T, K>[P] }
  : never;

type Pick_<T, K> = Pick<T, Extract<keyof T, K>>;

/**  Omit properties to all types in union. */
export type DistributiveOmit<T, K extends DistributiveKeys<T>> = T extends unknown
  ? { [P in keyof Omit_<T, K>]: Omit_<T, K>[P] }
  : never;

type Omit_<T, K> = Omit<T, Extract<keyof T, K>>;

type UndefinedProperties<T> = {
  [P in keyof T]-?: undefined extends T[P] ? P : never;
}[keyof T];

/**  Convert undefined properties to optional. */
export type ToOptional<T> = Partial<Pick<T, UndefinedProperties<T>>> &
Pick<T, Exclude<keyof T, UndefinedProperties<T>>>;

/** expands object types one level deep. */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/** expands object types recursively. */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T;

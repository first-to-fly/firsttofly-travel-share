import { ToOptional } from "./utils";


type CommonKeys<T extends object> = keyof T;

/** Get all keys in type in union. */
export type AllKeys<T> = (T extends unknown ? keyof T : never) | keyof T
type Subtract<A, C> = A extends C ? never : A;
type NonCommonKeys<T extends object> = Subtract<AllKeys<T>, CommonKeys<T>>;

type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: unknown } ? T[K] : undefined;

/** Merge union type to one type */
export type UnionMerge<T extends object> = {
  [k in CommonKeys<T>]: PickTypeOf<T, k>;
} &
{
  [k in NonCommonKeys<T>]?: PickTypeOf<T, k>;
};

/** Merge union type to one type with uncommon keys being optional */
export type UnionMergeRelax<T extends object> = ToOptional<{
  [k in AllKeys<T>]: PickType<T, k>;
}>;

type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T> ? PickType<T, K> : never;

type RemapInput<T> = { [k in keyof T]?: Record<string, unknown> };
type CanRemap<T, M extends RemapInput<T>> = keyof M extends AllKeys<T> ? unknown : never;

/** Remap key to new key and value */
export type RemapKey<T, M extends RemapInput<T>> = T extends CanRemap<T, M> ? Omit<T, keyof M> & M[keyof M] : T;

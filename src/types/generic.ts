import {FC} from 'react';

export interface ClassName {
  className?: string;
}

export interface Dict<T> {
  [key: string]: T;
}

export type GenericFunction = GenericFunctionConstructor<any>;

type GenericFunctionConstructor<T> = (...args: any[]) => T;

export type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>;

export type SFC<P = Record<string, unknown>> = FC<P & ClassName>;

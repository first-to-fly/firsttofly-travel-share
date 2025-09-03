import type {
  ApiFetcher,
  ApiFetcherArgs,
  AppRoute,
  AppRouteMutation,
  AppRouter,
  AreAllPropertiesOptional,
  ClientArgs,
  ExtractExtraParametersFromClientArgs,
  OptionalIfAllOptional,
  PathParamsFromUrl,
  Prettify,
  Without,
  ZodInferOrType,
  ZodInputOrType,
} from "@ts-rest/core";
import {
  initClient as baseInitClient,
  tsRestFetchApi,
} from "@ts-rest/core";

import { apiContract } from "./contract";

/**
 * Override types
 */
type AppRouteMutationType<T> = ZodInputOrType<T>;

type AppRouteBodyOrFormData<T extends AppRouteMutation> = T["contentType"] extends "multipart/form-data"
  ? FormData | AppRouteMutationType<T["body"]>
  : AppRouteMutationType<T["body"]>;

type DataReturnArgsBase<TRoute extends AppRoute, TClientArgs extends ClientArgs> = {
  body: TRoute extends AppRouteMutation ? AppRouteBodyOrFormData<TRoute> : never;
  params: PathParamsFromUrl<TRoute>;
  query: "query" extends keyof TRoute ? AppRouteMutationType<TRoute["query"]> : never;
  /**
   * Additional headers to send with the request, merged over baseHeaders,
   *
   * Unset a header by setting it to undefined
   */
  headers?: Record<string, string>;
  signal?: AbortSignal;
  mode?: "stream"; // use for streaming response
} & ExtractExtraParametersFromClientArgs<TClientArgs>;

type DataReturnArgs<TRoute extends AppRoute, TClientArgs extends ClientArgs> = OptionalIfAllOptional<
DataReturnArgsBase<TRoute, TClientArgs>
>;

type ApiRouteResponse<T> = {
  [K in keyof T]: ZodInferOrType<T[K]>;
}[keyof T];

type AppRouteFunction<TRoute extends AppRoute, TClientArgs extends ClientArgs> = AreAllPropertiesOptional<
Without<DataReturnArgs<TRoute, TClientArgs>, never>
> extends true
  ? (
    args?: Prettify<Without<DataReturnArgs<TRoute, TClientArgs>, never>>,
  ) => Promise<Prettify<ApiRouteResponse<TRoute["responses"]>>>
  : (
    args: Prettify<Without<DataReturnArgs<TRoute, TClientArgs>, never>>,
  ) => Promise<Prettify<ApiRouteResponse<TRoute["responses"]>>>;

type RecursiveProxyObj<T extends AppRouter, TClientArgs extends ClientArgs> = {
  [TKey in keyof T]: T[TKey] extends AppRoute
    ? AppRouteFunction<T[TKey], TClientArgs>
    : T[TKey] extends AppRouter
      ? RecursiveProxyObj<T[TKey], TClientArgs>
      : never;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomClient = RecursiveProxyObj<typeof apiContract, any>;

/**
 * Custom client
 */

export function initClient(
  baseUrl: string,
  baseHeaders?: () => Record<string, string> | Promise<Record<string, string>>,
) {
  return baseInitClient(apiContract, {
    baseUrl: baseUrl,
    baseHeaders: {
      "Content-Type": "application/json",
    },
    api: async (args) => {
      if (baseHeaders) {
        args.headers = {
          ...(await baseHeaders()),
          ...args.headers,
        };
      }

      if ("mode" in args && args.mode === "stream") {

        delete args.mode;
        if (!("mode" in args)) {
          const _args = args as ApiFetcherArgs;
          return await fetch(_args.path, {
            ..._args,
            redirect: "follow",
          }) as unknown as ReturnType<ApiFetcher>;
        }
      }

      const result = await tsRestFetchApi(args);
      const body = result.body as {
        code: number;
        data: unknown;
        message: unknown;
      };

      if (result.status < 200 || result.status > 300 || body.code !== 0) {

        if ("data" in body && Array.isArray(body.data)) {
          if ("message" in body && typeof body.message === "string") {
            throw new Error(`${body.message}: ${body.data.join(", ")}`);
          } else {
            throw new Error(`${body.data.join(", ")}`);
          }
        }

        if ("message" in body && typeof body.message === "string") throw new Error(body.message);
        if ("message" in body && body.message instanceof Array) throw new Error(body.message.join(", "));

        throw new Error("Something went wrong");
      }

      return body.data as ReturnType<ApiFetcher>;
    },
  }) as unknown as CustomClient;
}

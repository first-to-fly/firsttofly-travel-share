export const ResponseCode = {
  SUCCESS: {
    code: 200,
    message: "OK",
  },
  CREATED: {
    code: 201,
    message: "Created",
  },
  ACCEPTED: {
    code: 202,
    message: "Accepted",
  },
  NO_CONTENT: {
    code: 204,
    message: "No Content",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not Found",
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: "Method Not Allowed",
  },
  CONFLICT: {
    code: 409,
    message: "Conflict",
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: "Unprocessable Entity",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    message: "Too Many Requests",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
  NOT_IMPLEMENTED: {
    code: 501,
    message: "Not Implemented",
  },
  BAD_GATEWAY: {
    code: 502,
    message: "Bad Gateway",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: "Service Unavailable",
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    message: "Gateway Timeout",
  },
};

export enum ApiCode {
  SUCCESS = 0,
  VALIDATION_ERROR = 1,
  NOT_FOUND_ERROR = 2,
  ENTITIES_NOT_RELATED = 3,
  DUPLICATED_RESOURCES = 4,
  FORBIDDEN = 5,
  UNAUTHORIZED = 6,
  TOKEN_EXPIRED = 7,
  FAILED_TO_CREATE_RESOURCE = 8,
  RESOURCE_DELETED = 9,
  UNKNOWN_ERROR = 500,
}

export const ApiMessages: Record<ApiCode, string> = {
  [ApiCode.SUCCESS]: "Ok",
  [ApiCode.VALIDATION_ERROR]: "Validation error",
  [ApiCode.NOT_FOUND_ERROR]: "Not found error",
  [ApiCode.UNKNOWN_ERROR]: "Unknown error",
  [ApiCode.TOKEN_EXPIRED]: "Your token is expired",
  [ApiCode.ENTITIES_NOT_RELATED]: "Your request entities are not related",
  [ApiCode.DUPLICATED_RESOURCES]: "Your request include field duplicated with existed data",
  [ApiCode.FORBIDDEN]: "You are not allowed to do this",
  [ApiCode.UNAUTHORIZED]: "We don't know who you are",
  [ApiCode.FAILED_TO_CREATE_RESOURCE]: "Failed to create new resource",
  [ApiCode.RESOURCE_DELETED]: "Resource is deleted",
};

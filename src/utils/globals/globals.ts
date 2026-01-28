const statusCode = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
} as const;

export type StatusCodeKey = keyof typeof statusCode;

export default statusCode;

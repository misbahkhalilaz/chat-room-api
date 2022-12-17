import { ErrorResponse, SuccessResponse } from "../types/response";

export const getSuccessResponse = <T>(
  data: T,
  message = "Success",
  statusCode = 200
): SuccessResponse<T> => ({
  success: {
    code: statusCode,
    data,
    message,
  },
  error: null,
});

export const getErrorResponse = <T>(
  message = "Something went wrong",
  statusCode = 500
): ErrorResponse<T | null> => ({
  error: {
    data: null,
    code: statusCode,
    message,
  },
  success: null,
});

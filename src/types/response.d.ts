import { AnyObject } from "./index";

interface ResponseShape<T = AnyObject> {
  code: number;
  message: string;
  data: T;
}

interface SuccessResponse<T = AnyObject> {
  success: ResponseShape<T>;
  error: null;
}

interface ErrorResponse<T = null> {
  error: ResponseShape<T>;
  success?: null;
}

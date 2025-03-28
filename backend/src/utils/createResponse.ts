import { ApiResponse } from "@/types/response";

export const createResponse = <T>(
  success: boolean,
  message: string,
  data?: T
): ApiResponse<T> => {
  return { success, message, data };
};

import { Request } from "express";

export interface AuthenticatedRequest<
  Params = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = qs.ParsedQs
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: { id: number };
}

export interface SignupParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email?: string;
  password?: string;
}

export interface CreateWorkflowParams {
  name: string;
  description: string;
}

export interface SearchWorkflowsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface DeleteWorkspaceParams {
  workspaceId: number;
}

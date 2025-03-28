import { Response } from "express";
import {
  AuthenticatedRequest,
  CreateWorkflowParams,
  SearchWorkflowsParams,
} from "../types/requests";
import { createResponse } from "../utils/createResponse";
import { createNewWorkflow } from "../services/workflow/createWorkflow";
import { fetchUserWorkflows } from "../services/workflow/fetchWorkflows";
import { deleteWorkflow } from "../services/workflow/deleteWorkflow";
import { updateWorkflowPinStatus } from "../services/workflow/updateWorkflowPinStatus";

export const createWorkflowController = async (
  req: AuthenticatedRequest<{}, {}, CreateWorkflowParams>,
  res: Response
) => {
  const { name, description } = req.body;
  const user = req.user;

  if (!name || !description) {
    res
      .status(400)
      .json(createResponse(false, "Name and Description are required"));
    return;
  }

  try {
    // Create the new user
    await createNewWorkflow({
      name,
      description,
      created_by: user?.id as number,
    });

    res.status(201).json(createResponse(true, "Workflow created successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(createResponse(false, "Error creating workflow"));
  }
};

export const getWorkflowsController = async (
  req: AuthenticatedRequest<{}, {}, {}, SearchWorkflowsParams>,
  res: Response
) => {
  const user = req.user;
  const search = (req.query.search || "").toString().trim();
  const { page, limit } = req.query;

  try {
    const workflows = await fetchUserWorkflows(
      user?.id as number,
      {
        id: /^\d+$/.test(search) ? parseInt(search, 10) : undefined,
        name: search && isNaN(Number(search)) ? search : undefined,
      },
      page,
      limit
    );

    res
      .status(200)
      .json(createResponse(true, "Workflows fetched successfully", workflows));
  } catch (error) {
    console.error(error);
    res.status(500).json(createResponse(false, "Error fetching workflows"));
  }
};

export const deleteWorkflowController = async (
  req: AuthenticatedRequest<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json(createResponse(false, "Workspace ID is required"));
    return;
  }

  try {
    await deleteWorkflow(Number(id));

    res.status(201).json(createResponse(true, "Workflow deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(createResponse(false, "Error deleting workflow"));
  }
};

export const pinWorkflowController = async (
  req: AuthenticatedRequest<{ id: string }, {}, { pinned: boolean }>,
  res: Response
) => {
  const user = req.user;
  const { id } = req.params;
  const { pinned } = req.body;

  try {
    await updateWorkflowPinStatus(user?.id as number, parseInt(id, 10), pinned);

    res
      .status(200)
      .json(
        createResponse(
          true,
          `Workflow ${pinned ? "pinned" : "unpinned"} successfully`
        )
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(createResponse(false, "Error updating pin status"));
  }
};

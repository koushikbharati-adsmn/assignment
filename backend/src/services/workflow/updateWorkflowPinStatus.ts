import { supabase } from "../../configs/supabaseClient";

export const updateWorkflowPinStatus = async (
  user_id: number,
  workflow_id: number,
  pinned: boolean
) => {
  const { data, error } = await supabase
    .from("workflows")
    .update({ pinned })
    .eq("id", workflow_id)
    .eq("created_by", user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

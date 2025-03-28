import { supabase } from "@/configs/supabaseClient";

export const createNewWorkflow = async (workflow: {
  name: string;
  description: string;
  created_by: number;
}) => {
  const { error } = await supabase
    .from("workflows")
    .insert([workflow])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

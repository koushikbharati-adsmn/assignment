import { supabase } from "@/configs/supabaseClient";

export const deleteWorkflow = async (id: number) => {
  const { error } = await supabase.from("workflows").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

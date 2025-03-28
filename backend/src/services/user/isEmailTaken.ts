import { supabase } from "@/configs/supabaseClient";

export const isEmailTaken = async (email: string): Promise<boolean> => {
  const { data: users, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email);

  if (error) {
    throw new Error(error.message);
  }

  return users && users.length > 0;
};

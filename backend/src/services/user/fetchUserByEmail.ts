import { supabase } from "@/configs/supabaseClient";

export const fetchUserByEmail = async (email: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, name, hashed_password")
    .eq("email", email)
    .single();

  if (error || !user) throw error;

  return user;
};

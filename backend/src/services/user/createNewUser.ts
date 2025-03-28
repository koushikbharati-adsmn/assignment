import { supabase } from "../../configs/supabaseClient";

export const createUser = async (user: {
  name: string;
  email: string;
  hashed_password: string;
}) => {
  const { data: createdUser, error } = await supabase
    .from("users")
    .insert([user])
    .select("id, name, email")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return createdUser;
};

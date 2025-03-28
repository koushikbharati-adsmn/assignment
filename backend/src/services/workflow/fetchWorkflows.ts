import { supabase } from "@/configs/supabaseClient";

export const fetchUserWorkflows = async (
  user_id: number,
  filters: { name?: string; id?: number },
  page: number = 1,
  limit: number = 10
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("workflows")
    .select("*, users(name)", { count: "exact" })
    .eq("created_by", user_id)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.name) {
    query = query.ilike("name", `%${filters.name}%`);
  }

  if (filters.id) {
    query = query.eq("id", filters.id);
  }

  const { data: workflows, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { workflows, count };
};

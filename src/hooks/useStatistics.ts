import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "./useAuth"

export const useStatistics = () => {
  const { user } = useAuth()

  const fetchStudySessions = async () => {
    if (!user) throw new Error("User not authenticated")
    
    const { data: sessions, error } = await supabase
      .from("study_sessions")
      .select(`
        *,
        reviews (*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
    
    if (error) throw error
    return sessions
  }

  return useQuery({
    queryKey: ["statistics", user?.id],
    queryFn: fetchStudySessions,
    enabled: !!user,
  })
}
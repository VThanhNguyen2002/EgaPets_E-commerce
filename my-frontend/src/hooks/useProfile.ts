// src/hooks/useProfile.ts
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  import {
    getProfile,
    updateProfile,
    Profile,
  } from "@/services/customerApi";
  
  export default function useProfile() {
    const qc = useQueryClient();
  
    /* 1️⃣  lấy profile */
    const profileQuery = useQuery<Profile>({
      queryKey: ["profile"],
      queryFn : getProfile,
    });
  
    /* 2️⃣  cập-nhật profile */
    const save = useMutation({
      mutationFn: updateProfile,
      onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
    });
  
    return { ...profileQuery, save };
  }
  
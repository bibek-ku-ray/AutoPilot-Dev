import { createProject } from "@/modules/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: string) => createProject(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });
};

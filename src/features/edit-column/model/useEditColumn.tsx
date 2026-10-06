import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editColumn } from "../../../entities/column/api/columnApi";

const useEditColumn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      title,
      order,
    }: {
      id: string;
      title?: string;
      order: number;
    }) => editColumn(id, order, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
      queryClient.invalidateQueries({ queryKey: ["column"] });
    },
  });
};

export default useEditColumn;

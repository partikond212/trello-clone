import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumn } from '../../../entities/column/api/columnApi';

const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, order }: { title: string; order?: number }) =>
      createColumn(title, boardId, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', boardId] });
    },
  });
};

export default useCreateColumn;
import { editCard } from '@/entities/card/api/cardApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useMoveCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editCard,
  });
};

export default useMoveCard;

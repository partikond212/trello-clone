import { editCard } from '@/entities/card/api/cardApi';
import { useMutation } from '@tanstack/react-query';

const useMoveCard = () => {
  return useMutation({
    mutationFn: editCard,
  });
};

export default useMoveCard;

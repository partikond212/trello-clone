import { useAuth } from "@/app/context/AuthContext";
import { joinBoardByToken } from "@/entities/board/api/boardApi";
import { useMutation } from "@tanstack/react-query";

const useJoinBoard = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: (inviteToken: string) => joinBoardByToken(inviteToken, token),
  });
};

export default useJoinBoard;

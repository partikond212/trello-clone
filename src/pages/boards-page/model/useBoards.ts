import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../../../entities/board/api/boardApi";
import { useAuth } from "@/app/context/AuthContext";

export type BoardType = {
    title:string,
    id:string
}

const useBoards = () => {
const { token } = useAuth();
return useQuery({
  queryFn: () => fetchBoards(token),
  queryKey: ['boards'],
  enabled:!!token,
});
};

export default useBoards;
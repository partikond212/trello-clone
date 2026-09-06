import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../../../entities/board/api/boardApi";

export type BoardType = {
    title:string,
    id:string
}

const useBoards = () => {
return useQuery({
    queryKey: ['boards'],
    queryFn:fetchBoards
})
};

export default useBoards;
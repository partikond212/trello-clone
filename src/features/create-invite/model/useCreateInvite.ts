import { generateInviteToken } from '@/entities/board/api/boardApi';
import { useMutation } from '@tanstack/react-query';


const useCreateInvite = () => {
return useMutation({
    mutationFn:({id,token}:{id:string,token:string}) => generateInviteToken(id,token)
})
};
export default useCreateInvite;
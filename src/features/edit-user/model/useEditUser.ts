import { useAuth } from '@/app/context/AuthContext';
import {  editUserInfo } from '@/entities/user/api/userApi';
import { useMutation } from '@tanstack/react-query';


const useEditUser = () => {
    const{updateUser,token} = useAuth()
return useMutation({
    mutationFn:({avatar,email,name}:{avatar?:string,email?:string,name?:string}) =>editUserInfo(token,avatar,email,name),
    onSuccess:(newUser) => {
        updateUser(newUser)
    } 
})
};

export default useEditUser;
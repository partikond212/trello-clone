import { useAuth } from '@/app/context/AuthContext';
import { loginUser } from '@/entities/user/api/userApi';
import {  useMutation} from '@tanstack/react-query';


type vars = {
    email:string,
    password:string,
    avatar?:string,
}
const useLogin = () => {
    const {login} = useAuth()
    return useMutation({
        mutationFn:({email,password,avatar}:vars) => loginUser(email,password,avatar),
        onSuccess:(data) => {
            login(data)
        }
    })
};

export default useLogin;
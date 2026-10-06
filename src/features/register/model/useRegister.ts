import { useAuth } from '@/app/context/AuthContext';
import { registUser } from '@/entities/user/api/userApi';
import { useMutation } from '@tanstack/react-query';
type vars = {
    name: string, email: string, password: string,avatar?:string
}
const useRegister = () => {
    const {login} = useAuth()
return useMutation({
    mutationFn:({name,email,password,avatar}:vars) => registUser(name,email,password,avatar),
    onSuccess:(data) => {
        login(data)
    },
    onError:(error:Error)  => {
        return error
    }
})
};

export default useRegister;
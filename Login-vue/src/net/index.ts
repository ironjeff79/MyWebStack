import axios from "axios";
import { ElMessage } from "element-plus";
import router from '@/router';

const defaultError = ()=>ElMessage.error('发生了一些错误，请联系管理员')
const defaultFailure = (message:string,status:object)=>ElMessage.warning(message)


function post(url:string,datas:object,message:object,failure=defaultFailure,error = defaultError){
    axios.post(url,datas,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        withCredentials :true
    }).then(({data}) => {
        if(data.code===20000){
            localStorage.setItem("token",data.data.token)
            ElMessage.success("登录成功");
            router.push({ path: '/', query: { loginState:"true" } })
            if(datas.username === "admin"){
                router.push("/admin")
            }
        }
        else
            failure(data.message,data.status)
    }).catch(error)
}


function get(url:string,token:string,failure=defaultFailure,error = defaultError){
    axios.get(url,{
        headers: {
            'Content-Type':'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials :true
    }).then(({data}) => {
        console.log('data='+data);
        return data;
    }).catch(error)
}


export { get,post }
import { LoginGoogle } from "../components/users/LoginGoogle"
import { RegisterForm } from "../components/users/RegisterForm"


export function RegisterPage() {
    return <div className="pt-28">
        <RegisterForm />
        <div className='text-center py-6 font-extralight text-2xl'>
            Or register using google:
        </div>
        <LoginGoogle />
    </div>
}
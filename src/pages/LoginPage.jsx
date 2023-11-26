import { LoginForm } from "../components/users/LoginForm"
import { LoginGoogle } from "../components/users/LoginGoogle"


export function LoginPage() {
    return <div className="pt-28">
        <LoginForm />
        <div className='text-center py-6 font-extralight text-2xl'>
            Or login using google:
        </div>
        <LoginGoogle />
    </div>
}
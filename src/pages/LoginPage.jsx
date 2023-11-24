import { LoginForm } from "../components/users/LoginForm"
import { LoginGoogle } from "../components/users/LoginGoogle"


export function LoginPage() {
    return <div className="pt-28">
        <LoginForm />
        <LoginGoogle />
    </div>
}
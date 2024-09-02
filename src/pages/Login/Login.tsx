import { FormEvent, useRef } from "react";
import { Button, Input } from "../../components"

export const Login = () => {
    const formRef = useRef<HTMLFormElement>(null)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert('Our system is down, please try again later')
    }

    return (
        <form className="flex flex-col items-center justify-center gap-4 w-1/5 h-4/5" ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" placeholder="Username" className="outline-none border-none w-full leading-[18px] sm:leading-5" required />
            <Input type="password" placeholder="Password" className="outline-none border-none w-full leading-[18px] sm:leading-5" required />
            <Button fullSize>Login</Button>
        </form>
    )
}
import { FormEvent, useRef } from "react"
import { Button, Input } from "../../components"

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        formRef?.current?.reset();
        alert('Thank you for reaching out to us, we will get back to you as soon as possible.')
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-4">
            <h1 className="text-4xl font-bold leading-7 text-center">Contact us</h1>
            <Input type="email" name="email" placeholder="Your email" required className="outline-none border-none w-full leading-[18px] sm:leading-5" />
            <textarea name="message" placeholder="Tell us how we can help you" required className="outline-none border border-[#8A94A4] h-40 resize-none p-4 rounded-md" />
            <Button>Send</Button>
        </form>
    )
}
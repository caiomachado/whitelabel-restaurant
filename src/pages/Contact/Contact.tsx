import { FormEvent, useRef } from "react"
import { Button, Input } from "../../components"
import { useTranslation } from "react-i18next"

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const { t } = useTranslation('translation');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        formRef?.current?.reset();
        alert('Thank you for reaching out to us, we will get back to you as soon as possible.')
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:w-3/5 md:w-2/5">
            <h1 className="text-4xl font-bold leading-7 text-center">{t('contact.title')}</h1>
            <Input type="email" name="email" placeholder={t('contact.email-placeholder')} required className="outline-none border-none w-full leading-[18px] sm:leading-5" />
            <textarea name="message" placeholder={t('contact.textarea-placeholder')} required className="outline-none border border-[#8A94A4] h-40 resize-none p-4 rounded-md" />
            <Button>{t('button.send')}</Button>
        </form>
    )
}
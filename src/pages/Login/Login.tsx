import { FormEvent, useRef } from "react";
import { Button, Input } from "../../components"
import { useTranslation } from "react-i18next";

export const Login = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const { t } = useTranslation();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert('Our system is down, please try again later')
    }

    return (
        <form className="flex flex-col items-center justify-center gap-4 w-full h-4/5 sm:w-3/5" ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" placeholder={t('login.username-placeholder')} className="outline-none border-none w-full leading-[18px] sm:leading-5" required />
            <Input type="password" placeholder={t('login.password-placeholder')} className="outline-none border-none w-full leading-[18px] sm:leading-5" required />
            <Button fullSize className="max-w-[204px]">{t('button.login')}</Button>
        </form>
    )
}
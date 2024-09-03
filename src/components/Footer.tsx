import { useTranslation } from "react-i18next"

const languages = [
    {
        flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg',
        countryUnicode: 'EN',
    },
    {
        flagUrl: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg',
        countryUnicode: 'PT',
    }
]

export const Footer = () => {
    const { t, i18n } = useTranslation()

    function changeLanguage(language: string) {
        i18n.changeLanguage(language).then().catch()
    }

    return (
        <footer className="flex items-center justify-center gap-2 w-full h-10 bg-[#4F372F] p-2 text-white sm:px-4 sm:gap-4">
            {t('footer.all-rights')} &copy;
            <div className="flex items-center gap-2">
                {languages.map((language) => {
                    return (
                        <button
                            key={language.countryUnicode}
                            className="outline-none border-none w-6 h-6"
                            type="button"
                            onClick={() => {
                                if (i18n.language === language.countryUnicode.toLowerCase()) return

                                changeLanguage(language.countryUnicode.toLowerCase())
                            }}
                        >
                            <img src={language.flagUrl} alt={language.countryUnicode} />
                        </button>
                    )
                })}
            </div>
        </footer>
    )
}
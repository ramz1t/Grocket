import { useTranslation } from 'react-i18next'
import { parse } from 'twemoji-parser'

const NoChatPlaceholder = () => {
    const iconId = parse('📭')[0]?.url.split('/').at(-1)
    const { t } = useTranslation()

    return (
        <span className="my-auto flex flex-col items-center gap-5 text-xl">
            <img
                className="w-20 brightness-90 dark:brightness-150"
                src={'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' + iconId}
            />
            {t('no_chat')}
        </span>
    )
}

export default NoChatPlaceholder

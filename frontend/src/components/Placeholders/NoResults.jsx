import React from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { parse } from 'twemoji-parser'

const NoResults = ({ className }) => {
    const { t } = useTranslation()
    const iconId = parse('🔍')[0]?.url.split('/').at(-1)

    return (
        <div
            className={cn(
                className,
                'col-span-full flex min-h-full w-full flex-col items-center justify-center gap-5 text-xl font-bold lg:text-2xl'
            )}
        >
            <img className="w-16" src={'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' + iconId} />
            <p className="flex items-center gap-3">{t('no_results_found')}</p>
        </div>
    )
}

export default NoResults

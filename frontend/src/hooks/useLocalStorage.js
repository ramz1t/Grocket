import {useState, useEffect, useCallback} from 'react'

const APP_STORAGE_KEY = import.meta.env.VITE_APP_NAME

const getSavedValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))

    if (savedValue !== null) return savedValue
    if (initialValue instanceof Function) return initialValue()

    return initialValue
}

const useLocalStorage = (key, initialValue) => {
    const storageKey = `${APP_STORAGE_KEY}_${key}`
    const [value, setValue] = useState(() => {
        return getSavedValue(storageKey, initialValue)
    })

    const clear = useCallback(() => {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith(APP_STORAGE_KEY)) {
                localStorage.removeItem(key);
            }
        }
    }, [APP_STORAGE_KEY])

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value))
    }, [value])

    return [value, setValue, clear]
}

export default useLocalStorage

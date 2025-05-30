import axios from 'axios'
import { useContext } from 'react'
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import AuthContext from '../contexts/AuthProvider'
import api from '../api/api'
import { useTranslation } from 'react-i18next'
import localizations from '../assets/json/localization.json'
import { useNavigate } from 'react-router-dom'

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext)
    const { i18n } = useTranslation()
    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL || '',
        headers: {
            Authorization: authTokens ? `Bearer ${authTokens?.access}` : null,
            'Accept-Language':
                localizations[i18n.resolvedLanguage.toLocaleUpperCase()]
                    .codeForAPI,
        },
    })

    axiosInstance.interceptors.request.use(async (req) => {
        if (!authTokens) return req
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (!isExpired) return req
        const response = await api.post(`/api/v1/auth/jwt/refresh/`, {
            refresh: authTokens.refresh,
        })

        if (response.status === 401) {
            logoutUser()
            navigate('/login')
            return
        }

        setAuthTokens({ ...authTokens, access: response.data.access })
        setUser(jwt_decode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios

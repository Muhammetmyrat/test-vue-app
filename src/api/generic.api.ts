import axios, { type AxiosResponse, type AxiosProgressEvent } from 'axios'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const API_URL = import.meta.env.VITE_APP_API_URL as string
const API_KEY = import.meta.env.VITE_APP_API_KEY as string
const FILE_URL = import.meta.env.VITE_APP_FILE_URL || API_URL

interface Tokens {
	accessToken: string | null
	refreshToken: string | null
}

function getTokens(): Tokens {
	const { cookies } = useCookies()
	return {
		accessToken: cookies.get('accT'),
		refreshToken: cookies.get('rshT')
	}
}

function saveTokens(accessToken: string, refreshToken: string): void {
	const { cookies } = useCookies()
	cookies.set('accT', accessToken)
	cookies.set('rshT', refreshToken)
}

function clearTokens(): void {
	const { cookies } = useCookies()
	cookies.remove('accT')
	cookies.remove('rshT')
}

async function refreshAccessToken(): Promise<string | null> {
	const router = useRouter()
	const { refreshToken } = getTokens()

	try {
		const response: AxiosResponse<{ access: string }> = await axios.post(
			`${API_URL}/token/refresh/`,
			{
				refresh: refreshToken
			}
		)
		const { access } = response.data
		saveTokens(access, refreshToken!)
		return access
	} catch (error) {
		console.error('Unable to refresh access token', error)
		clearTokens()
		router.push('/admin/login')
		return null
	}
}

interface RequestOptions {
	url: string
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
	headers?: Record<string, string>
	params?: Record<string, any>
	data?: Record<string, any>
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
	file?: boolean
}

export async function request<T = any>(options: RequestOptions): Promise<AxiosResponse<T>> {
	const {
		url,
		method = 'POST',
		headers = {},
		params = {},
		data = {},
		onUploadProgress,
		file = false
	} = options

	let requestData: Record<string, any> | FormData = data
	const updatedHeaders = { ...headers }

	if (file) {
		updatedHeaders['Accept'] = 'application/json'
		updatedHeaders['Content-Type'] = 'multipart/form-data'

		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (Array.isArray(value)) {
				value.forEach(item => formData.append(key, item))
			} else {
				formData.append(key, value)
			}
		}
		requestData = formData
	}

	const { accessToken } = getTokens()
	if (accessToken) {
		updatedHeaders['Authorization'] = `Bearer ${accessToken}`
	}

	const updatedParams = {
		...params,
		key: params.key || API_KEY
	}

	const axiosConfig = {
		url: `${file ? FILE_URL : API_URL}/${url}`,
		method,
		headers: updatedHeaders,
		params: updatedParams,
		data: requestData,
		onUploadProgress
	}

	try {
		const response = await axios(axiosConfig)
		return response as AxiosResponse<T>
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			const newAccessToken = await refreshAccessToken()
			if (newAccessToken) {
				updatedHeaders['Authorization'] = `Bearer ${newAccessToken}`

				const retryResponse = await axios({
					...axiosConfig,
					headers: updatedHeaders
				})

				return retryResponse as AxiosResponse<T>
			}
		}

		throw error
	}
}

import axios from 'axios'

// Satu-satunya pengaturan untuk memilih backend: VITE_API_BACKEND=laravel|fiber
const backendTerpilih = (import.meta.env.VITE_API_BACKEND ?? 'fiber').toLowerCase()

const baseURL = backendTerpilih === 'laravel'
  ? import.meta.env.VITE_API_LARAVEL
  : import.meta.env.VITE_API_FIBER

const klien = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

klien.interceptors.request.use((konfigurasi) => {
  const token = sessionStorage.getItem('token')

  if (token) {
    konfigurasi.headers.Authorization = `Bearer ${token}`
  }

  return konfigurasi
})

klien.interceptors.response.use(
  (respons) => respons,
  (galat) => {
    const endpointLogin = (galat.config?.url ?? '').includes('/auth/login')

    // Jangan redirect saat login gagal, agar pesan galat tetap tampil.
    if (galat.response && galat.response.status === 401 && !endpointLogin) {
      sessionStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(galat)
  }
)

export default klien
export { backendTerpilih }

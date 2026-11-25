import { fiber } from './fiber'
import { laravel } from './laravel'

// Satu pengaturan untuk berpindah backend: VITE_API_BACKEND=laravel|fiber
const backendTerpilih = (import.meta.env.VITE_API_BACKEND ?? 'fiber').toLowerCase()

export const backend = backendTerpilih === 'laravel' ? laravel : fiber
export const namaBackend = backend.nama

export { GalatApi } from './normalisasi'

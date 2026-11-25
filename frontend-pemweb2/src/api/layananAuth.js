import { backend } from './backend'

export function login(email, kataSandi) {
  return backend.login(email, kataSandi)
}

export function ambilProfil() {
  return backend.ambilProfil()
}

export function logout() {
  return backend.logout()
}

export { namaBackend } from './backend'

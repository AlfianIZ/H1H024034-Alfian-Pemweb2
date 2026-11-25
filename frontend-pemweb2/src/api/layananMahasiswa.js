import { backend } from './backend'

export function ambilDaftarMahasiswa(parameter) {
  return backend.daftarMahasiswa(parameter)
}

export function ambilDetailMahasiswa(id) {
  return backend.detailMahasiswa(id)
}

export function simpanMahasiswa(data) {
  return backend.simpanMahasiswa(data)
}

export function hapusMahasiswa(id) {
  return backend.hapusMahasiswa(id)
}

export function ambilDaftarProgramStudi() {
  return backend.daftarProgramStudi()
}

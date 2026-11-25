import klien from '../klien'
import { jalankanPermintaan, normalisasiMeta } from './normalisasi'

/**
 * Adapter untuk backend Fiber (Go).
 * Kontrak asli: login memakai `kata_sandi`, paginasi memakai `halaman`.
 */
export const fiber = {
  nama: 'Fiber (Go)',

  async login(email, kataSandi) {
    const { data } = await jalankanPermintaan(() =>
      klien.post('/auth/login', { email, kata_sandi: kataSandi })
    )

    return {
      pengguna: data.data.pengguna,
      token: data.data.token,
    }
  },

  async ambilProfil() {
    const { data } = await jalankanPermintaan(() => klien.get('/auth/profil'))

    return data.data
  },

  async logout() {
    const { data } = await jalankanPermintaan(() => klien.post('/auth/logout'))

    return { pesan: data.pesan }
  },

  async daftarMahasiswa({ halaman = 1, cari = '', perHalaman = 10 } = {}) {
    const { data } = await jalankanPermintaan(() =>
      klien.get('/mahasiswa', {
        params: { halaman, cari, per_halaman: perHalaman },
      })
    )

    return {
      data: data.data ?? [],
      meta: normalisasiMeta(data.meta),
    }
  },

  async detailMahasiswa(id) {
    const { data } = await jalankanPermintaan(() => klien.get(`/mahasiswa/${id}`))

    return data.data
  },

  async simpanMahasiswa(payload) {
    const { data } = await jalankanPermintaan(() => klien.post('/mahasiswa', payload))

    return data.data
  },

  async hapusMahasiswa(id) {
    const { data } = await jalankanPermintaan(() => klien.delete(`/mahasiswa/${id}`))

    return { pesan: data.pesan }
  },

  async daftarProgramStudi() {
    const { data } = await jalankanPermintaan(() => klien.get('/program-studi'))

    return (data.data ?? []).map((prodi) => ({
      id: prodi.id,
      kode: prodi.kode,
      nama: prodi.nama,
      jenjang: prodi.jenjang,
    }))
  },
}

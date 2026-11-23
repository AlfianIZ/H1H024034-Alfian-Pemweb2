import klien from './klien'

export async function ambilDaftarMahasiswa(parameter) {
  const respons = await klien.get('/mahasiswa', { params: parameter })

  return respons.data
}

export async function ambilDetailMahasiswa(id) {
  const respons = await klien.get(`/mahasiswa/${id}`)

  return respons.data
}

export async function simpanMahasiswa(data) {
  const respons = await klien.post('/mahasiswa', data)

  return respons.data
}

export async function hapusMahasiswa(id) {
  const respons = await klien.delete(`/mahasiswa/${id}`)

  return respons.data
}
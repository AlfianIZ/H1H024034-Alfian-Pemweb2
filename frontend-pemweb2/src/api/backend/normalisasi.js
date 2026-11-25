/**
 * Utilitas untuk menyeragamkan perbedaan kontrak Laravel dan Fiber.
 */

export class GalatApi extends Error {
  constructor(pesan, galat = {}, status = 0) {
    super(pesan)
    this.name = 'GalatApi'
    this.pesan = pesan
    this.galat = galat
    this.status = status
  }
}

// Fiber mengembalikan nama field Go (PascalCase), bukan nama field JSON.
const PETA_FIELD_FIBER = {
  ProgramStudiID: 'program_studi_id',
  Nim: 'nim',
  Nama: 'nama',
  Email: 'email',
  Angkatan: 'angkatan',
  Ipk: 'ipk',
  Aktif: 'aktif',
  KataSandi: 'kata_sandi',
}

/**
 * Menyeragamkan galat dari kedua backend menjadi GalatApi.
 * - Laravel : { sukses, pesan, galat: { field: [pesan] } } atau { message }
 * - Fiber   : { sukses, pesan, galat: [{ field, pesan }] }
 */
export function normalisasiGalat(error) {
  if (error instanceof GalatApi) {
    return error
  }

  if (!error.response) {
    return new GalatApi('Tidak dapat menghubungi server', {}, 0)
  }

  const status = error.response.status
  const data = error.response.data ?? {}
  let pesan = data.pesan ?? data.message ?? 'Terjadi kesalahan pada server'
  const galat = {}

  if (data.galat && !Array.isArray(data.galat) && typeof data.galat === 'object') {
    for (const [field, nilai] of Object.entries(data.galat)) {
      galat[field] = Array.isArray(nilai) ? nilai[0] : String(nilai)
    }
  }

  if (Array.isArray(data.galat)) {
    for (const item of data.galat) {
      const field = PETA_FIELD_FIBER[item.field] ?? item.field
      galat[field] = item.pesan
    }
  }

  if (Object.keys(galat).length > 0 && !data.pesan) {
    pesan = 'Data yang dikirim tidak valid'
  }

  return new GalatApi(pesan, galat, status)
}

/**
 * Menyeragamkan meta paginasi.
 * - Laravel : { current_page, per_page, total, last_page }
 * - Fiber   : { halaman, per_halaman, total, total_halaman }
 */
export function normalisasiMeta(meta = {}) {
  return {
    halaman: Number(meta.halaman ?? meta.current_page ?? 1),
    perHalaman: Number(meta.per_halaman ?? meta.per_page ?? 10),
    total: Number(meta.total ?? 0),
    totalHalaman: Math.max(1, Number(meta.total_halaman ?? meta.last_page ?? 1)),
  }
}

export async function jalankanPermintaan(permintaan) {
  try {
    return await permintaan()
  } catch (galat) {
    throw normalisasiGalat(galat)
  }
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ambilDaftarProgramStudi,
  simpanMahasiswa,
} from '../api/layananMahasiswa'

const FORM_AWAL = {
  program_studi_id: '',
  nim: '',
  nama: '',
  email: '',
  angkatan: '',
  ipk: '',
  aktif: true,
}

function keAngka(nilai) {
  if (nilai === '' || nilai === null || nilai === undefined) {
    return 0
  }

  const angka = Number(String(nilai).replace(',', '.'))

  return Number.isFinite(angka) ? angka : 0
}

export default function TambahMahasiswa() {
  const navigasi = useNavigate()
  const [form, setForm] = useState(FORM_AWAL)
  const [daftarProdi, setDaftarProdi] = useState([])
  const [galatField, setGalatField] = useState({})
  const [pesanGalat, setPesanGalat] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const [memuatProdi, setMemuatProdi] = useState(true)

  useEffect(() => {
    let dibatalkan = false

    async function muatProdi() {
      try {
        const hasil = await ambilDaftarProgramStudi()

        if (dibatalkan === false) {
          setDaftarProdi(hasil)
        }
      } catch (galat) {
        if (dibatalkan === false) {
          setPesanGalat(galat.pesan ?? 'Gagal memuat program studi')
        }
      } finally {
        if (dibatalkan === false) {
          setMemuatProdi(false)
        }
      }
    }

    muatProdi()

    return () => {
      dibatalkan = true
    }
  }, [])

  function ubah(field, nilai) {
    setForm((sebelumnya) => ({ ...sebelumnya, [field]: nilai }))
  }

  function pesanField(field) {
    if (!galatField[field]) {
      return null
    }

    return (
      <small style={{ color: 'crimson', display: 'block' }}>{galatField[field]}</small>
    )
  }

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()

    setGalatField({})
    setPesanGalat('')
    setSedangMemuat(true)

    const payload = {
      program_studi_id: keAngka(form.program_studi_id),
      nim: form.nim.trim(),
      nama: form.nama.trim(),
      email: form.email.trim(),
      angkatan: keAngka(form.angkatan),
      ipk: keAngka(form.ipk),
      aktif: form.aktif,
    }

    try {
      await simpanMahasiswa(payload)

      navigasi('/mahasiswa', {
        state: { pesan: 'Data mahasiswa berhasil ditambahkan' },
      })
    } catch (galat) {
      setPesanGalat(galat.pesan ?? 'Gagal menyimpan data mahasiswa')
      setGalatField(galat.galat ?? {})
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto' }}>
      <h1>Tambah Mahasiswa</h1>

      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}

      <form onSubmit={tanganiKirim} noValidate autoComplete="off">
        <div>
          <label htmlFor="program-studi">Program Studi</label>
          <select
            id="program-studi"
            value={form.program_studi_id}
            onChange={(peristiwa) => ubah('program_studi_id', peristiwa.target.value)}
            disabled={memuatProdi}
          >
            <option value="">
              {memuatProdi ? 'Memuat program studi...' : '-- Pilih program studi --'}
            </option>
            {daftarProdi.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.kode} - {prodi.nama}
              </option>
            ))}
          </select>
          {pesanField('program_studi_id')}
        </div>

        <div>
          <label htmlFor="nim">NIM</label>
          <input
            id="nim"
            type="text"
            placeholder="Contoh: H1A024001"
            value={form.nim}
            onChange={(peristiwa) => ubah('nim', peristiwa.target.value)}
          />
          {pesanField('nim')}
        </div>

        <div>
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            type="text"
            value={form.nama}
            onChange={(peristiwa) => ubah('nama', peristiwa.target.value)}
          />
          {pesanField('nama')}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(peristiwa) => ubah('email', peristiwa.target.value)}
          />
          {pesanField('email')}
        </div>

        <div>
          <label htmlFor="angkatan">Angkatan</label>
          <input
            id="angkatan"
            type="number"
            placeholder="Contoh: 2024"
            value={form.angkatan}
            onChange={(peristiwa) => ubah('angkatan', peristiwa.target.value)}
          />
          {pesanField('angkatan')}
        </div>

        <div>
          <label htmlFor="ipk">IPK</label>
          <input
            id="ipk"
            type="number"
            step="0.01"
            min="0"
            max="4"
            placeholder="Contoh: 3.50"
            value={form.ipk}
            onChange={(peristiwa) => ubah('ipk', peristiwa.target.value)}
          />
          {pesanField('ipk')}
        </div>

        <div>
          <label htmlFor="aktif">
            <input
              id="aktif"
              type="checkbox"
              checked={form.aktif}
              onChange={(peristiwa) => ubah('aktif', peristiwa.target.checked)}
            />{' '}
            Mahasiswa aktif
          </label>
          {pesanField('aktif')}
        </div>

        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={sedangMemuat}>
            {sedangMemuat ? 'Menyimpan...' : 'Simpan'}
          </button>

          <button
            type="button"
            style={{ marginLeft: 8 }}
            onClick={() => navigasi('/mahasiswa')}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

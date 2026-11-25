import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ambilDaftarMahasiswa, hapusMahasiswa } from '../api/layananMahasiswa'
import { namaBackend } from '../api/layananAuth'

export default function DaftarMahasiswa() {
  const lokasi = useLocation()
  const [daftar, setDaftar] = useState([])
  const [meta, setMeta] = useState(null)
  const [halaman, setHalaman] = useState(1)
  const [cari, setCari] = useState('')
  const [versi, setVersi] = useState(0)
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const [pesanGalat, setPesanGalat] = useState('')
  const [pesanSukses, setPesanSukses] = useState(lokasi.state?.pesan ?? '')
  const [idMenghapus, setIdMenghapus] = useState(null)

  useEffect(() => {
    if (!pesanSukses) {
      return undefined
    }

    const penunda = setTimeout(() => setPesanSukses(''), 4000)

    return () => clearTimeout(penunda)
  }, [pesanSukses])

  useEffect(() => {
    let dibatalkan = false

    async function muatData() {
      setSedangMemuat(true)
      setPesanGalat('')

      try {
        const hasil = await ambilDaftarMahasiswa({
          halaman: halaman,
          cari: cari,
          perHalaman: 10,
        })

        if (dibatalkan === false) {
          setDaftar(hasil.data)
          setMeta(hasil.meta)
        }
      } catch (galat) {
        if (dibatalkan === false) {
          setPesanGalat(galat.pesan ?? 'Gagal memuat data mahasiswa')
        }
      } finally {
        if (dibatalkan === false) {
          setSedangMemuat(false)
        }
      }
    }

    const penunda = setTimeout(muatData, 400)

    return () => {
      dibatalkan = true
      clearTimeout(penunda)
    }
  }, [halaman, cari, versi])

  async function tanganiHapus(mahasiswa) {
    const setuju = window.confirm(
      `Hapus data mahasiswa "${mahasiswa.nama}" (${mahasiswa.nim})? Tindakan ini tidak dapat dibatalkan.`
    )

    if (!setuju) {
      return
    }

    setPesanGalat('')
    setPesanSukses('')
    setIdMenghapus(mahasiswa.id)

    try {
      const hasil = await hapusMahasiswa(mahasiswa.id)

      setPesanSukses(hasil.pesan ?? 'Data mahasiswa berhasil dihapus')

      if (daftar.length === 1 && halaman > 1) {
        setHalaman(halaman - 1)
      } else {
        setVersi((nilai) => nilai + 1)
      }
    } catch (galat) {
      setPesanGalat(galat.pesan ?? 'Gagal menghapus data mahasiswa')
    } finally {
      setIdMenghapus(null)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ marginBottom: 4 }}>Daftar Mahasiswa</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
            Backend aktif: {namaBackend}
          </p>
        </div>
        <Link to="/mahasiswa/tambah">+ Tambah Mahasiswa</Link>
      </div>

      <input
        type="search"
        placeholder="Cari nama atau NIM"
        value={cari}
        onChange={(peristiwa) => {
          setHalaman(1)
          setCari(peristiwa.target.value)
        }}
      />

      {pesanSukses && <p style={{ color: 'green' }}>{pesanSukses}</p>}

      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}

      {sedangMemuat && <p>Memuat data</p>}

      {sedangMemuat === false && daftar.length === 0 && pesanGalat === '' && (
        <p>Data tidak ditemukan</p>
      )}

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Angkatan</th>
            <th>IPK</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((mahasiswa) => (
            <tr key={mahasiswa.id}>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.angkatan}</td>
              <td>{mahasiswa.ipk}</td>
              <td>
                <button
                  type="button"
                  onClick={() => tanganiHapus(mahasiswa)}
                  disabled={idMenghapus === mahasiswa.id}
                >
                  {idMenghapus === mahasiswa.id ? 'Menghapus...' : 'Hapus'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {meta && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => setHalaman(halaman - 1)} disabled={halaman <= 1}>
            Sebelumnya
          </button>

          <span style={{ margin: '0 12px' }}>
            Halaman {meta.halaman} dari {meta.totalHalaman} ({meta.total} data)
          </span>

          <button
            onClick={() => setHalaman(halaman + 1)}
            disabled={meta.halaman >= meta.totalHalaman}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  )
}

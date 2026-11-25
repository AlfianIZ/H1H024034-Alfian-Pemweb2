import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './halaman/Login'
import DaftarMahasiswa from './halaman/DaftarMahasiswa'
import TambahMahasiswa from './halaman/TambahMahasiswa'
import RuteTerlindungi from './komponen/RuteTerlindungi'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mahasiswa" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mahasiswa/tambah"
          element={
            <RuteTerlindungi>
              <TambahMahasiswa />
            </RuteTerlindungi>
          }
        />
        <Route
          path="/mahasiswa"
          element={
            <RuteTerlindungi>
              <DaftarMahasiswa />
            </RuteTerlindungi>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
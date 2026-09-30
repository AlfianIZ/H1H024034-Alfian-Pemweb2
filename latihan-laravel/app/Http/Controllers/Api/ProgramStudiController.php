<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MahasiswaResource;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;

class ProgramStudiController extends Controller
{
    /**
     * Mendapatkan daftar mahasiswa berdasarkan program studi dengan pagination.
     */
    public function mahasiswa(Request $request, $id)
    {
        $programStudi = ProgramStudi::findOrFail($id);

        $kueri = $programStudi->mahasiswa()->with('programStudi');

        if ($request->filled('cari')) {
            $kataKunci = $request->query('cari');
            $kueri->where(function ($sub) use ($kataKunci) {
                $sub->where('nama', 'like', '%' . $kataKunci . '%')
                    ->orWhere('nim', 'like', '%' . $kataKunci . '%');
            });
        }

        if ($request->filled('angkatan')) {
            $kueri->where('angkatan', $request->integer('angkatan'));
        }

        $urutan = $request->query('urut', 'nama');
        $arah = $request->query('arah', 'asc');
        $kolomDiizinkan = ['nama', 'nim', 'angkatan', 'ipk'];

        if (in_array($urutan, $kolomDiizinkan, true)) {
            $kueri->orderBy($urutan, $arah === 'desc' ? 'desc' : 'asc');
        }

        if ($request->filled('fields')) {
            $kolomDiminta = is_array($request->query('fields'))
                ? $request->query('fields')
                : array_map('trim', explode(',', (string) $request->query('fields')));

            $kolomTabel = ['id', 'program_studi_id', 'nim', 'nama', 'email', 'angkatan', 'ipk', 'aktif', 'created_at', 'updated_at'];
            $kolomPilih = array_values(array_intersect($kolomDiminta, $kolomTabel));

            if (!empty($kolomPilih)) {
                if (!in_array('id', $kolomPilih, true)) {
                    $kolomPilih[] = 'id';
                }
                if (!in_array('program_studi_id', $kolomPilih, true)) {
                    $kolomPilih[] = 'program_studi_id';
                }
                $kueri->select($kolomPilih);
            }
        }


        $perHalaman = min($request->integer('per_halaman', 10), 100);

        return MahasiswaResource::collection($kueri->paginate($perHalaman));
    }
}
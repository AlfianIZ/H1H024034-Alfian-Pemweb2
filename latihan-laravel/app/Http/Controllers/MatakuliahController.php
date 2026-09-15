<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MatakuliahController extends Controller
{
    private function dataMatakuliah(): array
    {
        return [
            ['kode' => 'MK001', 'nama' => 'Pemrograman Web II',          'sks' => 3],
            ['kode' => 'MK002', 'nama' => 'Keamanan Jaringan',                   'sks' => 3],
            ['kode' => 'MK003', 'nama' => 'Internet of Things',     'sks' => 4],
            ['kode' => 'MK004', 'nama' => 'Sistem Kendali',            'sks' => 2],
            ['kode' => 'MK005', 'nama' => 'Metode Numerik',            'sks' => 4],
        ];
    }

    public function index(Request $request)
    {
        $keyword = $request->query('q', '');

        $daftarMatakuliah = collect($this->dataMatakuliah())
            ->when($keyword, function ($collection) use ($keyword) {
                return $collection->filter(function ($mk) use ($keyword) {
                    return str_contains(strtolower($mk['nama']), strtolower($keyword))
                        || str_contains(strtolower($mk['kode']), strtolower($keyword));
                });
            })
            ->values()
            ->all();

        return view('matakuliah.index', compact('daftarMatakuliah', 'keyword'));
    }

    public function show(string $kode)
    {
        $matakuliah = collect($this->dataMatakuliah())
            ->firstWhere('kode', strtoupper($kode));

        if (!$matakuliah) {
            abort(404, "Matakuliah dengan kode '$kode' tidak ditemukan.");
        }

        return view('matakuliah.show', compact('matakuliah'));
    }

    public function cari(Request $request)
    {
        $kataKunci = $request->query('q', '');

        return response()->json([
            'kata_kunci' => $kataKunci,
            'metode'     => $request->method(),
            'path'       => $request->path(),
        ]);
    }
}
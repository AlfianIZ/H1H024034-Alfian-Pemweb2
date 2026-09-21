<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Matakuliah;

class MatakuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matakuliahs = [
            ['kode' => 'MK001', 'nama' => 'Pemrograman Web II', 'sks' => 3, 'semester' => 5],
            ['kode' => 'MK002', 'nama' => 'Basis Data Lanjut', 'sks' => 3, 'semester' => 3],
            ['kode' => 'MK003', 'nama' => 'Struktur Data dan Algoritma', 'sks' => 4, 'semester' => 2],
            ['kode' => 'MK004', 'nama' => 'Kecerdasan Buatan', 'sks' => 3, 'semester' => 5],
            ['kode' => 'MK005', 'nama' => 'Jaringan Komputer', 'sks' => 3, 'semester' => 4],
        ];

        foreach ($matakuliahs as $mk) {
            Matakuliah::create($mk);
        }
    }
}
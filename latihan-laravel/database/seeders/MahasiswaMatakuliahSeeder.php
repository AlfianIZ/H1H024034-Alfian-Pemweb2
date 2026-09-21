<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Mahasiswa;
use App\Models\Matakuliah;

class MahasiswaMatakuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mahasiswas = Mahasiswa::all();
        $matakuliahs = Matakuliah::all();
        $grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

        if ($matakuliahs->isEmpty() || $mahasiswas->isEmpty()) {
            return;
        }

        foreach ($mahasiswas as $mhs) {
            // Berikan 2 sampai 4 matakuliah secara acak dengan nilai
            $selectedMks = $matakuliahs->random(min(3, $matakuliahs->count()));
            $syncData = [];
            foreach ($selectedMks as $mk) {
                $syncData[$mk->id] = ['nilai' => $grades[array_rand($grades)]];
            }
            $mhs->matakuliahs()->syncWithoutDetaching($syncData);
        }
    }
}

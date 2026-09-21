@extends('layouts.app')
@section('judul', 'Detail Mahasiswa - ' . ($mahasiswa->nama ?? 'Mahasiswa'))
@section('konten')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">Detail Mahasiswa</h1>
        <a href="{{ route('mahasiswa.data') }}" class="btn btn-secondary">Kembali</a>
    </div>

    {{-- Informasi Mahasiswa --}}
    <div class="card mb-4 shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="card-title mb-0">Biodata Mahasiswa</h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <strong>NIM:</strong> {{ $mahasiswa->nim }}
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Nama:</strong> {{ $mahasiswa->nama }}
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Program Studi:</strong> {{ $mahasiswa->programStudi->nama ?? '-' }} ({{ $mahasiswa->programStudi->jenjang ?? '' }})
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Email:</strong> {{ $mahasiswa->email }}
                </div>
                <div class="col-md-6 mb-2">
                    <strong>Angkatan:</strong> {{ $mahasiswa->angkatan }}
                </div>
                <div class="col-md-6 mb-2">
                    <strong>IPK:</strong> {{ $mahasiswa->ipk }}
                </div>
            </div>
        </div>
    </div>

    {{-- Daftar Matakuliah yang Diambil --}}
    <div class="card shadow-sm">
        <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">Mata Kuliah yang Diambil</h5>
            <span class="badge bg-primary">{{ $mahasiswa->matakuliahs->count() }} Mata Kuliah</span>
        </div>
        <div class="card-body p-0">
            <table class="table table-hover table-striped mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-3">No</th>
                        <th>Kode MK</th>
                        <th>Nama Mata Kuliah</th>
                        <th>SKS</th>
                        <th>Semester</th>
                        <th class="text-center">Nilai</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($mahasiswa->matakuliahs as $index => $mk)
                        <tr>
                            <td class="ps-3">{{ $index + 1 }}</td>
                            <td><span class="badge bg-secondary">{{ $mk->kode }}</span></td>
                            <td>{{ $mk->nama }}</td>
                            <td>{{ $mk->sks }}</td>
                            <td>{{ $mk->semester }}</td>
                            <td class="text-center">
                                @if ($mk->pivot->nilai)
                                    <span class="badge bg-success fs-6">{{ $mk->pivot->nilai }}</span>
                                @else
                                    <span class="text-muted fst-italic">Belum ada nilai</span>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center py-4 text-muted">
                                <em>Mahasiswa ini belum mengambil mata kuliah apa pun.</em>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
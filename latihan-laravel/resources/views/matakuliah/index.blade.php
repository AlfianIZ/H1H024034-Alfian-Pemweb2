@extends('layouts.app')
@section('judul', 'Daftar Matakuliah')
@section('konten')
    <h1 class="h3 mb-4">Daftar Matakuliah</h1>

    <x-kartu-info judul="Informasi">
        Data pada halaman ini masih berupa array statis. Pada modul berikutnya data akan diambil dari basis data.
    </x-kartu-info>

    <form method="GET" action="{{ route('matakuliah.index') }}" class="mb-3">
        <div class="input-group">
            <input
                type="text"
                name="q"
                class="form-control"
                placeholder="Cari berdasarkan kode atau nama matakuliah..."
                value="{{ $keyword }}"
            >
            <button class="btn btn-primary" type="submit">Cari</button>
            @if ($keyword)
                <a href="{{ route('matakuliah.index') }}" class="btn btn-outline-secondary">Reset</a>
            @endif
        </div>
    </form>

    @if ($keyword)
        <p class="text-muted small mb-2">
            Menampilkan hasil pencarian untuk: <strong>{{ $keyword }}</strong>
            ({{ count($daftarMatakuliah) }} ditemukan)
        </p>
    @endif

    <table class="table table-bordered bg-white">
        <thead>
            <tr>
                <th>Kode</th>
                <th>Nama Matakuliah</th>
                <th>SKS</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($daftarMatakuliah as $matakuliah)
                <tr>
                    <td>{{ $matakuliah['kode'] }}</td>
                    <td>{{ $matakuliah['nama'] }}</td>
                    <td><x-badge-sks :sks="$matakuliah['sks']" /></td>
                    <td>
                        <a href="{{ route('matakuliah.show', $matakuliah['kode']) }}" class="btn btn-sm btn-primary">
                            Detail
                        </a>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" class="text-center text-muted">
                        @if ($keyword)
                            Tidak ada matakuliah yang cocok dengan "<strong>{{ $keyword }}</strong>".
                        @else
                            Data belum tersedia.
                        @endif
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
@endsection


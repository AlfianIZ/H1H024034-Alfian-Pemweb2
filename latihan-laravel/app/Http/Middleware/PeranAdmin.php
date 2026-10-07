<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PeranAdmin
{
    /**
     * Tolak permintaan jika pengguna yang sedang login bukan admin.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->peran !== 'admin') {
            return response()->json([
                'sukses' => false,
                'pesan'  => 'Akses ditolak: hanya admin yang diizinkan',
            ], 403);
        }

        return $next($request);
    }
}

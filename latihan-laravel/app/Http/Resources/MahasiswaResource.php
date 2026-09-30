<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MahasiswaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'nim' => $this->nim,
            'nama' => $this->nama,
            'email' => $this->email,
            'angkatan' => $this->angkatan,
            'ipk' => $this->ipk !== null ? (float) $this->ipk : null,
            'aktif' => $this->aktif !== null ? (bool) $this->aktif : null,
            'program_studi' => $this->whenLoaded('programStudi', function () {
                return [
                    'id' => $this->programStudi->id,
                    'kode' => $this->programStudi->kode,
                    'nama' => $this->programStudi->nama,
                ];
            }),
            'dibuat_pada' => $this->created_at?->toIso8601String(),
        ];

        if ($request->filled('fields')) {
            $fieldsParam = $request->query('fields');
            $fields = is_array($fieldsParam)
                ? $fieldsParam
                : array_map('trim', explode(',', (string) $fieldsParam));

            if (in_array('created_at', $fields, true) && !in_array('dibuat_pada', $fields, true)) {
                $fields[] = 'dibuat_pada';
            }

            return array_filter($data, function ($key) use ($fields) {
                return in_array($key, $fields, true);
            }, ARRAY_FILTER_USE_KEY);
        }

        return $data;
    }

}
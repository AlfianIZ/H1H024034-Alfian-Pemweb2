<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMatakuliahRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'kode' => ['required', 'string', 'max:10', 'unique:matakuliahs,kode'],
            'nama' => ['required', 'string', 'max:100'],
            'sks' => ['required', 'integer', 'min:1', 'max:10'],
            'semester' => ['required', 'integer', 'min:1', 'max:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'kode.required' => 'Kode matakuliah wajib diisi',
            'kode.unique' => 'Kode matakuliah tersebut sudah terdaftar',
            'nama.required' => 'Nama matakuliah wajib diisi',
            'sks.required' => 'Jumlah SKS wajib diisi',
            'sks.min' => 'Jumlah SKS minimal 1',
            'semester.required' => 'Semester wajib diisi',
            'semester.min' => 'Semester minimal 1',
        ];
    }
}

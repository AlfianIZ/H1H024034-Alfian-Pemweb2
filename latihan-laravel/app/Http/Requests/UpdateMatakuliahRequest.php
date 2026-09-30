<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMatakuliahRequest extends FormRequest
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
        $matakuliah = $this->route('matakuliah');
        $id = is_object($matakuliah) ? $matakuliah->id : $matakuliah;

        return [
            'kode' => ['sometimes', 'string', 'max:10', 'unique:matakuliahs,kode,' . $id],
            'nama' => ['sometimes', 'string', 'max:100'],
            'sks' => ['sometimes', 'integer', 'min:1', 'max:10'],
            'semester' => ['sometimes', 'integer', 'min:1', 'max:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'kode.unique' => 'Kode matakuliah tersebut sudah terdaftar',
            'kode.max' => 'Kode matakuliah maksimal 10 karakter',
            'sks.min' => 'Jumlah SKS minimal 1',
            'semester.min' => 'Semester minimal 1',
        ];
    }
}

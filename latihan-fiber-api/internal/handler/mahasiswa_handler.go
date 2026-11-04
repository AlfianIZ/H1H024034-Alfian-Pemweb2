package handler

import (
	"sort"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/model"
)

func DaftarMahasiswa(c fiber.Ctx) error {
	hasil := make([]model.Mahasiswa, 0, len(model.Daftar))

	angkatan := c.Query("angkatan", "")
	if angkatan != "" {
		nilaiAngkatan, err := strconv.Atoi(angkatan)
		if err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "Parameter angkatan harus berupa angka")
		}

		for _, m := range model.Daftar {
			if m.Angkatan == nilaiAngkatan {
				hasil = append(hasil, m)
			}
		}
	} else {
		hasil = append(hasil, model.Daftar...)
	}

	urut := strings.ToLower(c.Query("urut", ""))
	switch urut {
	case "nama":
		sort.Slice(hasil, func(i, j int) bool {
			return strings.ToLower(hasil[i].Nama) < strings.ToLower(hasil[j].Nama)
		})
	case "ipk":
		sort.Slice(hasil, func(i, j int) bool {
			return hasil[i].Ipk > hasil[j].Ipk
		})
	case "":
		// tidak ada pengurutan khusus
	default:
		return fiber.NewError(fiber.StatusBadRequest, "Parameter urut hanya boleh bernilai 'nama' atau 'ipk'")
	}

	return c.JSON(fiber.Map{
		"sukses": true,
		"data":   hasil,
	})
}

func DetailMahasiswa(c fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "ID harus berupa angka")
	}

	for _, m := range model.Daftar {
		if m.ID == id {
			return c.JSON(fiber.Map{
				"sukses": true,
				"data":   m,
			})
		}
	}

	return fiber.NewError(fiber.StatusNotFound, "Mahasiswa tidak ditemukan")
}

func DetailMahasiswaByNim(c fiber.Ctx) error {
	nim := c.Params("nim")

	for _, m := range model.Daftar {
		if strings.EqualFold(m.Nim, nim) {
			return c.JSON(fiber.Map{
				"sukses": true,
				"data":   m,
			})
		}
	}

	return fiber.NewError(fiber.StatusNotFound, "Mahasiswa dengan NIM tersebut tidak ditemukan")
}

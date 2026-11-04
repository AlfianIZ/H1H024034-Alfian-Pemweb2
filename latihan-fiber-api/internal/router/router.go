package router

import (
	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/config"
	"latihan-fiber-api/internal/handler"
	"latihan-fiber-api/internal/middleware"
)

func Daftarkan(app *fiber.App, konf config.Konfigurasi) {
	api := app.Group("/api")

	api.Get("/status", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"sukses": true,
			"pesan":  "API Fiber aktif",
		})
	})

	mahasiswa := api.Group("/mahasiswa", middleware.KunciApi(konf.KunciApi))
	mahasiswa.Get("/", handler.DaftarMahasiswa)
	mahasiswa.Get("/nim/:nim", handler.DetailMahasiswaByNim)
	mahasiswa.Get("/:id", handler.DetailMahasiswa)
}

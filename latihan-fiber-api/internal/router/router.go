package router

import (
	"github.com/gofiber/fiber/v3"

	"latihan-fiber-api/internal/handler"
	"latihan-fiber-api/internal/middleware"
)

func Daftarkan(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/status", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"sukses": true,
			"pesan":  "API Fiber aktif",
		})
	})

	api.Post("/auth/registrasi", handler.Registrasi)
	api.Post("/auth/login", handler.Login)

	terlindungi := api.Group("", middleware.Autentikasi())

	terlindungi.Get("/auth/profil", handler.Profil)

	mahasiswa := terlindungi.Group("/mahasiswa")

	mahasiswa.Get("/", handler.DaftarMahasiswa)
	mahasiswa.Get("/:id", handler.DetailMahasiswa)

	mahasiswa.Post("/", handler.BuatMahasiswa, middleware.HanyaPeran("admin", "dosen"))
	mahasiswa.Put("/:id", handler.PerbaruiMahasiswa, middleware.HanyaPeran("admin", "dosen"))
	mahasiswa.Delete("/:id", handler.HapusMahasiswa, middleware.HanyaPeran("admin"))
	mahasiswa.Post("/:id/pulihkan", handler.PulihkanMahasiswa, middleware.HanyaPeran("admin"))

	// Matakuliah CRUD
	matakuliah := terlindungi.Group("/matakuliah")
	matakuliah.Get("/", handler.DaftarMatakuliah)
	matakuliah.Post("/", handler.BuatMatakuliah, middleware.HanyaPeran("admin", "dosen"))
	matakuliah.Get("/:id", handler.DetailMatakuliah)
	matakuliah.Put("/:id", handler.PerbaruiMatakuliah, middleware.HanyaPeran("admin", "dosen"))
	matakuliah.Delete("/:id", handler.HapusMatakuliah, middleware.HanyaPeran("admin"))

	// Program Studi
	api.Get("/program-studi", handler.DaftarProgramStudi)
}

package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Halo Pemrograman Web II")
	})

	app.Get("/api/mahasiswa", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"NIM": "H1H024034",
			"Nama": "Alfian Iskandar Zulkarnain",
			"Program Studi": "Teknik Komputer",
		})
	})

	log.Fatal(app.Listen(":3000"))

}

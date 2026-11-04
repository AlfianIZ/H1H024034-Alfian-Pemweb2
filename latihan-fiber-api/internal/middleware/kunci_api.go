package middleware

import (
	"github.com/gofiber/fiber/v3"
)

func KunciApi(kunciRahasia string) fiber.Handler {
	return func(c fiber.Ctx) error {
		kunciMasuk := c.Get("X-Api-Key")

		if kunciMasuk == "" || kunciMasuk != kunciRahasia {
			return fiber.NewError(fiber.StatusUnauthorized, "Kunci API tidak valid atau tidak disertakan")
		}

		return c.Next()
	}
}


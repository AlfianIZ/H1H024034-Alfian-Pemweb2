package model

import "time"

type DaftarHitamToken struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Token       string    `gorm:"type:varchar(512);index;not null" json:"token"`
	Kedaluwarsa time.Time `json:"kedaluwarsa"`
	CreatedAt   time.Time `json:"dibuat_pada"`
}

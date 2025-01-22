package env

import (
	"os"

	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
}

func GetString(key, fallback string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	return val
}

func IsDevelopment() bool {
	e := GetString("ENVIRONMENT", "development")
	return e == "development"
}

func IsProduction() bool {
	return !IsDevelopment()
}

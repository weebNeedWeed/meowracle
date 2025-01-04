package main

import (
	"encoding/json"
	"log"
	"os"
)

func getCertificationProgramBadges() *badgeCollection {
	r, err := os.ReadFile("./assets/aws-certification-program.json")
	if err != nil {
		log.Fatalf("error occured when read aws-certification-program.json, %v", err)
	}

	c := new(badgeCollection)
	err = json.Unmarshal(r, c)
	if err != nil {
		log.Fatalf("error occured when unmarshalling, %v", err)
	}

	return c
}

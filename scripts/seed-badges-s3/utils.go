package main

import (
	"encoding/json"
	"log"
	"os"
)

type badgeCollection struct {
	Data []badge `json:"data"`
}

type badge struct {
	Name       string `json:"name"`
	ImageUrl   string `json:"image_url"`
	VanitySlug string `json:"vanity_slug"`
}

// get cert program badges from predefined json file
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

// get knowledge badges from predefined json file
func getKnowledgeBadges() *badgeCollection {
	r, err := os.ReadFile("./assets/aws-knowledge.json")
	if err != nil {
		log.Fatalf("error occured when read aws-knowledge.json, %v", err)
	}

	c := new(badgeCollection)
	err = json.Unmarshal(r, c)
	if err != nil {
		log.Fatalf("error occured when unmarshalling, %v", err)
	}

	return c
}

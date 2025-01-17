package main

import (
	"strings"

	"github.com/google/uuid"
)

func getUUIDs(n int) []string {
	res := []string{}

	for i := 1; i <= n; i++ {
		res = append(res, uuid.NewString())
	}

	return res
}

func getBadgeLevelByName(name string) int {
	l := strings.ToLower(name)
	if strings.Contains(l, "practitioner") {
		return 0
	} else if strings.Contains(l, "associate") {
		return 1
	} else if strings.Contains(l, "professional") {
		return 2
	} else if strings.Contains(l, "specialty") {
		return 3
	} else {
		return -1
	}
}

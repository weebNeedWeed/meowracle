package main

import (
	"github.com/google/uuid"
	"github.com/weebNeedWeed/meowracle/internal/definition"
)

func getUuidList(numOfIds int) []string {
	uuids := []string{}
	for i := 0; i < numOfIds; i++ {
		uuids = append(uuids, uuid.New().String())
	}
	return uuids
}

func getBagdes() (badges []definition.DynamoDBBadge) {
	uuids := getUuidList(12)

	badges = []definition.DynamoDBBadge{
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[0],
			Title: "Cloud Practitioner",
			Path:  "/badges/cloud-practitioner.png",
			Level: 0,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[1],
			Title: "AI Practitioner",
			Path:  "/badges/ai-practitioner.png",
			Level: 0,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[2],
			Title: "Solutions Architect – Associate",
			Path:  "/badges/solutions-architect-associate.png",
			Level: 1,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[3],
			Title: "Data Engineer – Associate",
			Path:  "/badges/data-engineer-associate.png",
			Level: 1,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[4],
			Title: "DevOps Engineer – Professional",
			Path:  "/badges/devops-engineer-professional.png",
			Level: 2,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[5],
			Title: "Solutions Architect – Professional",
			Path:  "/badges/solutions-architect-professional.png",
			Level: 2,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[6],
			Title: "Machine Learning – Specialty",
			Path:  "/badges/machine-learning-specialty.png",
			Level: 3,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[7],
			Title: "Security – Specialty",
			Path:  "/badges/security-specialty.png",
			Level: 3,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[8],
			Title: "Machine Learning – Specialty",
			Path:  "/badges/machine-learning-specialty.png",
			Level: 3,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[9],
			Title: "Advanced Networking – Specialty",
			Path:  "/badges/advanced-networking-specialty.png",
			Level: 3,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[10],
			Title: "Machine Learning – Associate",
			Path:  "/badges/machine-learning-associate.png",
			Level: 1,
		},
		{
			Pk:    "BADGE",
			Sk:    "BADGE#" + uuids[11],
			Title: "SysOps Administrator – Associate",
			Path:  "/badges/sysops-administrator-associate.png",
			Level: 1,
		},
	}

	return
}

func getTemplatesAndSlots() (templates []definition.DynamoDBTemplate, slots []definition.DynamoDBSlot) {
	uuids := getUuidList(2)

	templates = []definition.DynamoDBTemplate{
		{
			Pk:    "TEMPLATE#" + uuids[0],
			Sk:    "METADATA#" + uuids[0],
			Title: "Template 01 - 1 Slots",
			Path:  "/templates/template-1.png",
		},
		{
			Pk:    "TEMPLATE#" + uuids[1],
			Sk:    "METADATA#" + uuids[1],
			Title: "Template 02 (with a cat) - 12 Slots",
			Path:  "/templates/template-2.png",
		},
	}

	slots = []definition.DynamoDBSlot{
		{
			Pk:     "TEMPLATE#" + uuids[0], // template 1
			Sk:     "SLOT#1",
			X:      1053,
			Y:      70,
			Width:  218,
			Height: 250,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1], // template 2
			Sk:     "SLOT#1",
			X:      1416,
			Y:      70,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#2",
			X:      1266,
			Y:      70,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#3",
			X:      1108,
			Y:      70,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#4",
			X:      949,
			Y:      70,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#5",
			X:      782,
			Y:      70,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#6",
			X:      616,
			Y:      70,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#7",
			X:      1335,
			Y:      229,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#8",
			X:      1186,
			Y:      229,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#9",
			X:      1029,
			Y:      229,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#10",
			X:      870,
			Y:      229,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#11",
			X:      705,
			Y:      229,
			Width:  82,
			Height: 94.15,
		},
		{
			Pk:     "TEMPLATE#" + uuids[1],
			Sk:     "SLOT#12",
			X:      536,
			Y:      229,
			Width:  82,
			Height: 94.15,
		},
	}

	return
}

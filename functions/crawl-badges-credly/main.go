package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

// for checking if the profile does exists
var credlyBaseUrl = "https://www.credly.com/users/{profile-name}"

// for getting all badges
var credlyBadgesBaseUrl = "https://www.credly.com/users/{profile-name}/badges?page=1&page_size=60&sort=rank"

type body struct {
	ProfileName string `json:"profileName"`
}

type issuedBadges struct {
	Data []badge `json:"data"`
}

type badge struct {
	BadgeTemplate struct {
		Name string `json:"name"`
	} `json:"badge_template"`
	Issuer struct {
		Summary string `json:"summary"`
	} `json:"issuer"`
}

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	buf := bytes.NewBuffer([]byte(event.Body))

	b := new(body)
	err := json.NewDecoder(buf).Decode(b)
	if err != nil {
		fmt.Println("error occured when parsing body", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	profileValid, err := checkIfProfileExists(b.ProfileName)
	if err != nil {
		fmt.Println("error occured when checking profile", err)
		return utils.WriteError(err, http.StatusBadRequest), nil
	}

	if !profileValid {
		return utils.WriteError(fmt.Errorf("input profile is invalid, %s", b.ProfileName), http.StatusBadRequest), nil
	}

	badges, err := fetchAllIssuedBadges(b.ProfileName)
	if err != nil {
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	j, _ := json.Marshal(badges)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func checkIfProfileExists(profileName string) (bool, error) {
	url := strings.Replace(credlyBaseUrl, "{profile-name}", profileName, 1)
	res, err := http.Get(url)
	if err != nil {
		return false, err
	}
	defer res.Body.Close()

	return res.StatusCode == http.StatusOK, nil
}

func fetchAllIssuedBadges(profileName string) (*issuedBadges, error) {
	url := strings.Replace(credlyBadgesBaseUrl, "{profile-name}", profileName, 1)
	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	b, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	r, _ := regexp.Compile(`"a":"((?:[^"\\]|\\.)*)"`)
	raw := r.FindAllStringSubmatch(string(b), -1)[1][1]

	raw = fmt.Sprintf(`"%s"`, raw)
	raw, err = strconv.Unquote(raw)
	if err != nil {
		return nil, err
	}

	fmt.Printf("raw data: %s\n", raw)

	data := new(issuedBadges)
	err = json.Unmarshal([]byte(raw), &data)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func main() {
	lambda.Start(handler)
}

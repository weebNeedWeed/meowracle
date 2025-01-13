package badgeCategories

import (
	"net/http"

	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

func GetAllBadgeCategories(store *Store) (*definition.Response[[]definition.BadgeCategory], error) {
	ddbBadges, err := store.GetAllBadgeCategories()
	if err != nil {
		utils.LogError(err, "Get all ddb badge categories", definition.ErrInternalServer, definition.AppError_Debug_Severity)
		return nil, err
	}

	badges := []definition.BadgeCategory{}
	for _, b := range ddbBadges {
		badges = append(badges, b.ToBadgeCategory())
	}

	response := definition.NewResponse(badges, http.StatusOK)
	return &response, nil
}

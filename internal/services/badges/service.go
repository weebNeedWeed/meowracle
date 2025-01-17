package badges

import (
	"net/http"

	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

type GetAllBadgesRequest struct {
	Limit      int               `validate:"required,gte=1,lte=40"`
	Keyword    string            `validate:"omitempty,alphanum"`
	CategoryId string            `validate:"omitempty,ascii"`
	Cursor     definition.Cursor `validate:"omitnil"`
}

func GetAllBadges(p *GetAllBadgesRequest, store *Store) (*definition.Response[[]definition.Badge], error) {
	getAllBadgesRes, err := store.GetAllBadges(p.Limit, p.Keyword, p.CategoryId, p.Cursor)
	if err != nil {
		utils.LogError(err, "Get all badges", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		return nil, err
	}

	badges := []definition.Badge{}
	for _, b := range getAllBadgesRes.Badges {
		badges = append(badges, b.ToBadge())
	}

	totalRows, err := store.CountNumberOfBadges(p.Keyword, p.CategoryId)
	if err != nil {
		utils.LogError(err, "Get number of rows", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		return nil, err
	}

	response := definition.NewResponse[[]definition.Badge](badges, http.StatusOK)
	response.WithPagination(getAllBadgesRes.Cursor, getAllBadgesRes.Cursor != nil, totalRows)

	return &response, nil
}

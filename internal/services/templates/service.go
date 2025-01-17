package templates

import (
	"net/http"

	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

type GetAllTemplatesRequest struct {
	Limit      int               `validate:"required,gte=1,lte=40"`
	Keyword    string            `validate:"omitempty,alphanum"`
	CategoryId string            `validate:"omitempty,alphanum"`
	Slots      *int              `validate:"omitnil,gte=0,lte=12"`
	Cursor     definition.Cursor `validate:"omitnil"`
}

func GetAllTemplates(req *GetAllTemplatesRequest, store *Store) (*definition.Response[[]definition.Template], error) {
	res, err := store.GetAllTemplates(req.Limit, req.Keyword, req.CategoryId, req.Slots, req.Cursor)
	if err != nil {
		utils.LogError(err, "get all templates", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		return nil, err
	}

	numberOfRows, err := store.CountAllTemplates(req.Keyword, req.CategoryId, req.Slots)
	if err != nil {
		utils.LogError(err, "count all templates", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		return nil, err
	}

	templates := []definition.Template{}
	for _, t := range res.Templates {
		templates = append(templates, t.ToTemplate())
	}

	response := definition.NewResponse(templates, http.StatusOK)
	response.WithPagination(res.Cursor, res.Cursor != nil, numberOfRows)

	return &response, nil
}

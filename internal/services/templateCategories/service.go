package templateCategories

import (
	"net/http"

	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

func GetAllTemplateCategories(store *Store) (*definition.Response[[]definition.TemplateCategory], error) {
	ddbTempCats, err := store.GetAllTemplateCategories()
	if err != nil {
		utils.LogError(err, "get all template categories", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		return nil, err
	}

	data := []definition.TemplateCategory{}
	for _, c := range ddbTempCats {
		data = append(data, c.ToTemplateCategory())
	}

	res := definition.NewResponse(data, http.StatusOK)

	return &res, nil
}

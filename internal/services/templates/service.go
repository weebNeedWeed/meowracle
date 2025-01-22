package templates

import (
	"net/http"

	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

type GetAllTemplatesRequest struct {
	Limit      int               `validate:"required,gte=1,lte=40"`
	Keyword    string            `validate:"omitempty,ascii"`
	CategoryId string            `validate:"omitempty,ascii"`
	Slots      *int              `validate:"omitnil,gte=0,lte=12"`
	Cursor     definition.Cursor `validate:"omitnil"`
}

func GetAllTemplates(req *GetAllTemplatesRequest, store *Store, imageBaseUrl string) (*definition.Response[[]definition.Template], error) {
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
		nt := t.ToTemplate()
		nt.PreviewPath = imageBaseUrl + nt.PreviewPath
		templates = append(templates, nt)
	}

	response := definition.NewResponse(templates, http.StatusOK)
	response.WithPagination(res.Cursor, res.Cursor != nil, numberOfRows)

	return &response, nil
}

type GetTemplatePathResponse struct {
	Path  definition.TemplatePath `json:"path"`
	Slots []definition.Slot       `json:"slots"`
	Texts []definition.Text       `json:"texts"`
}

func GetTemplatePath(id string, numberOfSlots int, store *Store, imageBaseUrl string) (*definition.Response[GetTemplatePathResponse], error) {
	res, err := store.getTemplatePath(id, numberOfSlots)
	if err != nil {
		utils.LogError(err, "get template path", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		return nil, err
	}

	p := res.Path.ToTemplatePath()
	p.Path = imageBaseUrl + p.Path

	slots := []definition.Slot{}
	for _, s := range res.Slots {
		slots = append(slots, s.ToSlot())
	}

	texts := []definition.Text{}
	for _, t := range res.Texts {
		texts = append(texts, t.ToText())
	}

	data := GetTemplatePathResponse{
		Path:  p,
		Slots: slots,
		Texts: texts,
	}
	response := definition.NewResponse(data, http.StatusOK)

	return &response, nil
}

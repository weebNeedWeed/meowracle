package definition

import (
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
)

type Cursor map[string]any

// for logging
type AppError struct {
	Err      error
	Message  string
	Code     ErrorCode
	Severity AppErrorSeverity
}

// error response returned by lambda
type APIError struct {
	Code      ErrorCode      `json:"code"`
	Message   string         `json:"message"`
	Timestamp time.Time      `json:"timestamp"`
	Status    int            `json:"-"`
	Details   map[string]any `json:"details,omitempty"`
}

type Response[T any] struct {
	Data     T         `json:"data"`
	PageInfo *PageInfo `json:"pageInfo"`
	Status   int       `json:"status"`
}

type PageInfo struct {
	Cursor    any  `json:"cursor,omitempty"`
	HasMore   bool `json:"hasMore"`
	TotalRows int  `json:"totalRows"`
}

type ErrorCode string
type AppErrorSeverity string

const (
	ErrBadRequest         ErrorCode = "BAD_REQUEST"
	ErrUnauthorized       ErrorCode = "UNAUTHORIZED"
	ErrForbidden          ErrorCode = "FORBIDDEN"
	ErrNotFound           ErrorCode = "NOT_FOUND"
	ErrInternalServer     ErrorCode = "INTERNAL_SERVER_ERROR"
	ErrValidation         ErrorCode = "VALIDATION_ERROR"
	ErrDatabaseOperation  ErrorCode = "DATABASE_ERROR"
	ErrInvalidCredentials ErrorCode = "INVALID_CREDENTIALS"
	ErrResourceNotFound   ErrorCode = "RESOURCE_NOT_FOUND"
	ErrDuplicateResource  ErrorCode = "DUPLICATE_RESOURCE"
	ErrRateLimit          ErrorCode = "RATE_LIMIT_EXCEEDED"
)

const (
	AppError_Error_Severity AppErrorSeverity = "ERROR"
	AppError_Info_Severity  AppErrorSeverity = "INFO"
	AppError_Debug_Severity AppErrorSeverity = "Debug"
)

func NewAPIError(code ErrorCode, msg string, status int) APIError {
	return APIError{
		Code:      code,
		Message:   msg,
		Timestamp: time.Now().UTC(),
		Status:    status,
	}
}

func NewAPIErrorFromValidationErrors(vErrs validator.ValidationErrors) APIError {
	e := NewAPIError(ErrBadRequest, "invalid request parameters", http.StatusBadRequest)
	errMap := map[string]any{}
	e.Details = errMap

	for _, err := range vErrs {
		if _, ok := errMap[err.StructField()]; !ok {
			errMap[err.StructField()] = []string{}
		}

		errList := errMap[err.StructField()].([]string)
		errList = append(errList, err.Error())
		errMap[err.StructField()] = errList
	}

	return e
}

func NewResponse[T any](data T, status int) Response[T] {
	return Response[T]{
		Data:   data,
		Status: status,
	}
}

func (r *Response[T]) WithPagination(cursor any, hasMore bool, totalRows int) *Response[T] {
	r.PageInfo = &PageInfo{
		Cursor:    cursor,
		HasMore:   hasMore,
		TotalRows: totalRows,
	}
	return r
}

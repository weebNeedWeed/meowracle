package definition

import "time"

type AppError struct {
	Err      error
	Message  string
	Code     ErrorCode
	Severity AppErrorSeverity
}

type APIError struct {
	Code      ErrorCode `json:"code"`
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
	Status    int       `json:"-"`
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

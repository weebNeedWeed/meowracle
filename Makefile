.PHONY: seed
seed:
	@go run cmd/seed/main.go cmd/seed/utils.go

.PHONY: seed-badges-s3
seed-badges-s3:
	@go run scripts/seed-badges-s3/main.go

.PHONY: seed-ddb
seed-ddb:
	@go run scripts/seed-dynamodb/main.go scripts/seed-dynamodb/seed-utils.go

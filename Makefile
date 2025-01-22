.PHONY: seed
seed:
	@go run cmd/seed/main.go cmd/seed/utils.go

.PHONY: seed-badges-s3
seed-badges-s3:
	@go run scripts/seed-badges-s3/main.go

.PHONY: seed-badges-ddb
seed-badges-ddb:
	@go run scripts/seed-badges-dynamodb/main.go scripts/seed-badges-dynamodb/seed-utils.go

.PHONY: seed-temps-ddb
seed-temps-ddb:
	@go run scripts/seed-templates-dynamodb/main.go

#!/bin/bash

# This script automates the generation of the API client for the frontend.
# It fetches the OpenAPI specification from the running backend,
# then uses openapi-typescript-codegen to generate the client.

# --- Configuration ---
API_URL="${EXTERNAL_API_BASE_URL}/api"
OPENAPI_SCHEMA_PATH="src/openapi.json"
OUTPUT_DIR="src/api-client"
CLIENT_TYPE="fetch"
CLIENT_NAME="ApiClient"

echo "Starting API client generation..."

# 1. Check for openapi-typescript-codegen
if ! npm list --depth 0 openapi-typescript-codegen &>/dev/null; then
  echo "Error: openapi-typescript-codegen is not installed."
  echo "Please install it as a dev dependency: npm install -D openapi-typescript-codegen"
  exit 1
fi

# 2. Create output directory
mkdir -p "$OUTPUT_DIR" || { echo "Error: Failed to create output directory $OUTPUT_DIR"; exit 1; }
echo "Ensured output directory $OUTPUT_DIR exists."

# 3. Fetch OpenAPI schema
echo "Fetching OpenAPI schema from $API_URL/openapi.json..."
curl "$API_URL/openapi.json" -o "$OPENAPI_SCHEMA_PATH" || { echo "Error: Failed to fetch OpenAPI schema."; exit 1; }
echo "OpenAPI schema saved to $OPENAPI_SCHEMA_PATH."

# 4. Generate API client
echo "Generating API client to $OUTPUT_DIR..."
npx openapi-typescript-codegen --input "$OPENAPI_SCHEMA_PATH" --output "$OUTPUT_DIR" --client "$CLIENT_TYPE" --name "$CLIENT_NAME" || { echo "Error: Failed to generate API client."; exit 1; }
echo "API client generated successfully."

# 5. Clean up temporary OpenAPI schema file
rm "$OPENAPI_SCHEMA_PATH" || { echo "Warning: Failed to remove temporary OpenAPI schema file $OPENAPI_SCHEMA_PATH."; }
echo "Cleaned up temporary OpenAPI schema file."

echo "API client generation script finished."

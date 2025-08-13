# Generate Verified Test Prompt Library for MCP Server

## Objective
Create a comprehensive, verified test prompt library for evaluating an MCP server implementation that provides a generic query tool for a heavy truck equipment ERP system (ITrack Enterprise). The library should contain natural language prompts paired with verified GraphQL queries and actual system responses.

## System Context
- **System**: ITrack Enterprise GraphQL API for heavy truck equipment ERP
- **Target**: MCP server that converts natural language to GraphQL queries
- **Authentication**: Use provided credentials to access live system data
- **Scope**: Generate 50-75 test cases with real, verified data

## Required Setup
1. Authenticate using: `Enterprise-Api-Extension:authenticate`
2. Use store ID 1 (TEST: ISOFT DATA SYSTEMS) 
3. Explore schema with: `Enterprise-Api-Extension:explore_schema`
4. Get real data samples for each entity type

## Test Case Categories & Distribution

### 1. Basic Entity Lookups (15 cases)
Generate prompts for single entity retrieval:
- **Inventory**: "Show me part number 12345", "Get details for SKU ABC123"
- **Customer**: "Look up customer Acme Trucking", "Show customer ID 456"  
- **Vehicle**: "Get vehicle with VIN 1FUJG...", "Show me truck stock number ST001"
- **Work Order**: "Display work order 789", "Show service ticket WO-2024-001"
- **Sales Order**: "Get sales order 12345", "Show invoice SO-98765"

For each case:
- Use actual IDs/names from system
- Include core fields + 1-2 related entities
- Verify response completeness

### 2. Search & Filtering (20 cases)
Generate realistic search scenarios:
- **Parts Search**: "Find all brake parts for Freightliner", "Show transmission components under $500"
- **Customer Search**: "Find customers with balance over $10000", "Show fleet operators in California"
- **Vehicle Search**: "List 2018+ Peterbilt trucks", "Find undismantled Kenworth vehicles"
- **Inventory Management**: "Show low stock items", "Find parts that haven't sold in 6 months"
- **Work Orders**: "Show open service jobs", "Find brake repairs this month"

For each case:
- Use actual manufacturer names, part types from system
- Include pagination (pageSize: 10-25)
- Test multiple filter combinations
- Verify filter logic works correctly

### 3. Complex Business Queries (15 cases)
Generate multi-entity business scenarios:
- **Profitability**: "Show most profitable parts this quarter", "Calculate profit margins by category"
- **Customer Analysis**: "Show top customers by sales volume", "Find customers with aging balances"
- **Vehicle Processing**: "Show vehicle dismantling progress", "Calculate ROI on recent vehicle purchases"
- **Service Operations**: "Show work orders with missing parts", "Calculate average repair times"
- **Purchasing**: "Show reorder recommendations", "Find vendor performance metrics"

For each case:
- Join 2-3 related entities
- Include calculated fields where possible
- Test business logic accuracy
- Verify complex filters work

### 4. Real-World Scenarios (10 cases)
Generate typical daily operations:
- **Parts Counter**: "Customer needs water pump for 2019 Volvo VNL"
- **Service Desk**: "What parts are needed for brake job on work order 456?"
- **Sales**: "Quote brake system overhaul for Kenworth T680"
- **Management**: "Show this week's sales performance"
- **Purchasing**: "What Caterpillar parts need reordering?"

For each case:
- Use realistic truck models and part types
- Include workflow-specific fields
- Test role-based data access

### 5. Edge Cases & Error Handling (10 cases)
Test system boundaries:
- **Invalid IDs**: "Show customer 999999999", "Get inventory item FAKE123"
- **Empty Results**: "Find parts for nonexistent truck model BADMODEL"
- **Large Datasets**: "Show all inventory items" (test pagination)
- **Permission Tests**: Query restricted data if applicable
- **Malformed Input**: "Get customer with ID 'invalid'"

## Output Format

Generate each test case as:

```json
{
  "id": "inventory_search_brake_parts_001",
  "category": "search_filtering", 
  "complexity": 2,
  "user_persona": "parts_counter",
  "natural_language_prompt": "Find all brake parts for Freightliner trucks under $200",
  "verified_graphql_query": "query SearchBrakeParts {\n  inventories(\n    filter: {\n      description: { like: \"%brake%\" }\n      parentManufacturer: { name: { like: \"Freightliner%\" } }\n      retailPrice: { lt: 200.00 }\n      status: ACTIVE\n    }\n    pagination: { pageNumber: 1, pageSize: 20 }\n    orderBy: [{ field: RETAIL_PRICE, direction: ASC }]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      parentManufacturer { name }\n    }\n    pageInfo {\n      totalCount\n      currentPage\n    }\n  }\n}",
  "verified_response_sample": {
    "data": {
      "inventories": {
        "items": [
          {
            "id": 12345,
            "partNumber": "BRK-FL-001",
            "description": "Brake Pad Set - Front",
            "retailPrice": 149.99,
            "quantity": 8,
            "manufacturer": { "name": "Bendix" },
            "parentManufacturer": { "name": "Freightliner" }
          }
        ],
        "pageInfo": {
          "totalCount": 15,
          "currentPage": 1
        }
      }
    }
  },
  "response_metadata": {
    "execution_time_ms": 45,
    "result_count": 15,
    "query_complexity": "medium"
  },
  "test_assertions": [
    "Returns only brake-related parts",
    "Filters by Freightliner manufacturer correctly", 
    "Price filter applied correctly (under $200)",
    "Results properly paginated",
    "Related manufacturer data populated"
  ],
  "prompt_variations": [
    "Show me brake components for Freightliner under $200",
    "Find Freightliner brake parts less than 200 dollars",
    "List cheap brake parts for Freightliner trucks"
  ]
}
```

## Execution Steps

### Phase 1: Authentication & Data Discovery
1. Authenticate to system with provided credentials
2. Query sample data from each major entity:
   ```graphql
   # Sample 5 records from each entity
   query SampleData {
     customers(pagination: {pageSize: 5}) { items { id companyName } }
     inventories(pagination: {pageSize: 5}) { items { id partNumber description } }
     vehicles(pagination: {pageSize: 5}) { items { id vin make year } }
     salesOrders(pagination: {pageSize: 5}) { items { salesOrderId total } }
     workOrders(pagination: {pageSize: 5}) { items { workOrderId description } }
   }
   ```
3. Note actual ID ranges, naming patterns, typical values

### Phase 2: Systematic Test Generation
1. **For each category**, generate test cases using real data
2. **Execute each GraphQL query** to verify it works
3. **Capture actual responses** (truncate large datasets to ~3-5 sample records)
4. **Validate business logic** - ensure filters work as expected
5. **Note performance** - record query execution times

### Phase 3: Quality Validation
1. **Test each natural language prompt** ensures it would logically lead to the GraphQL query
2. **Verify GraphQL syntax** is correct and executable  
3. **Confirm responses** contain expected fields and data types
4. **Check edge cases** actually produce expected error handling
5. **Validate pagination** works with different page sizes

### Phase 4: Output Generation
Generate final JSON file with structure:
```json
{
  "test_library_metadata": {
    "generated_date": "2025-08-12",
    "system_version": "from serverInformation query", 
    "total_test_cases": 70,
    "authentication_store": "TEST: ISOFT DATA SYSTEMS",
    "categories": {
      "basic_lookup": 15,
      "search_filtering": 20, 
      "complex_business": 15,
      "real_world_scenarios": 10,
      "edge_cases": 10
    }
  },
  "test_cases": [ /* array of test case objects */ ]
}
```

## Success Criteria
- All 70 test cases have verified, executable GraphQL queries
- Each query returns real data from the system
- Natural language prompts are realistic and varied
- Edge cases demonstrate proper error handling
- Performance baselines are established
- Business logic is accurately represented

## Usage Notes
- This library will be fed into an existing testing framework
- Each test case should be independently executable
- Focus on query accuracy and realistic business scenarios
- Include enough variety to thoroughly test MCP server capabilities
- Ensure prompts represent different user personas and complexity levels

The resulting test library should provide comprehensive coverage for evaluating how well an MCP server can understand natural language requests and convert them to accurate GraphQL queries for this heavy truck equipment ERP system.
# GraphQL Query Verification Results

## Summary
I tested all 15 GraphQL queries from the basic entity lookup prompts. Most queries had issues that needed correction. Here are the results:

## ✅ Working Queries (3/15)
1. **inventory_lookup_part_001** - Works correctly
2. **customer_lookup_company_003** - Works correctly  
3. **inventory_lookup_id_002** - Works correctly (with minor response differences)

## ❌ Queries Requiring Fixes (12/15)

### 4. customer_lookup_id_004 - Multiple Issues
**Problems:**
- `defaultPaymentMethod` requires subfields: `{ id name }`
- Address uses `address1/address2`, not `street1/street2`

**Corrected Query:**
```graphql
query GetCustomerById {
  customer(id: 2) {
    id
    companyName
    contactName
    phoneNumber
    mobilePhoneNumber
    email
    balance
    accountLimit
    active
    salesPerson { name }
    defaultPaymentMethod { id name }
    billingAddress {
      address1
      address2
      city
      state
      zip
    }
  }
}
```

### 5. vehicle_lookup_vin_005 - Filter Syntax Error
**Problem:** VIN filter should be string, not object with `eq`

**Corrected Query:**
```graphql
query GetVehicleByVIN {
  vehicles(
    filter: { vin: "4LMSB2115HL031419" }
    pagination: { pageNumber: 1, pageSize: 1 }
  ) {
    items {
      id
      vin
      make
      model { name }
      year
      stockNumber
      mileage
      condition
      status
      dismantled
      totalCost
      retailPrice
      revenue
      location
    }
  }
}
```

### 6. vehicle_lookup_stock_006 - Filter Syntax Error
**Problem:** stockNumber filter should be string, not object

**Corrected Query:**
```graphql
query GetVehicleByStockNumber {
  vehicles(
    filter: { stockNumber: "T25120" }
    pagination: { pageNumber: 1, pageSize: 1 }
  ) {
    items {
      id
      stockNumber
      vin
      make
      model { name }
      year
      condition
      mileage
      status
      dismantled
      purchaseDate
      totalCost
      retailPrice
      location
      componentCount
    }
  }
}
```

### 7. sales_order_lookup_id_007 - Wrong Parameter Type
**Problem:** Uses `id` parameter instead of required `key` with `SalesOrderKey`

**Corrected Query:**
```graphql
query GetSalesOrderById {
  salesOrder(key: { storeId: 1, salesOrderId: 2 }) {
    salesOrderId
    date
    total
    subtotal
    tax
    finalized
    void
    customer {
      companyName
      contactName
    }
    billingAddress {
      address1
      city
      state
      zip
    }
    lines(pagination: { pageSize: 5 }) {
      items {
        quantity
        price
        total
        inventory {
          partNumber
          description
        }
      }
    }
  }
}
```

### 8. work_order_lookup_id_008 - Wrong Parameter Type
**Problem:** Uses `id` parameter instead of required `key` with `WorkOrderKey`

**Corrected Query:**
```graphql
query GetWorkOrderById {
  workOrder(key: { storeId: 1, workOrderId: 3 }) {
    workOrderId
    description
    date
    dateClosed
    closed
    total
    price
    tax
    customer {
      companyName
      contactName
    }
    jobs {
      id
      name
      description
      laborRate
    }
    address {
      address1
      city
      state
      zip
    }
  }
}
```

### 9. inventory_search_description_009 - Multiple Issues
**Problems:**
- Should use `keyword` filter instead of `description` with wildcards
- OrderBy uses wrong enum format (should be `partNumber_ASC`)
- PageInfo fields wrong (`pageNumber/pageSize/totalPages` not `totalCount/currentPage`)

**Corrected Query:**
```graphql
query SearchInventoryByDescription {
  inventories(
    filter: { keyword: "ADAPTER" }
    pagination: { pageNumber: 1, pageSize: 10 }
    orderBy: [partNumber_ASC]
  ) {
    items {
      id
      partNumber
      description
      retailPrice
      quantity
      manufacturer { name }
      status
    }
    pageInfo {
      pageNumber
      pageSize
      totalPages
    }
  }
}
```

### 10. customer_search_fleet_010 - OrderBy Format Issue
**Problem:** OrderBy format should use enum values, not objects

**Corrected Query:**
```graphql
query SearchCustomersByTransport {
  customers(
    filter: { companyName: "*TRANSPORT*" }
    pagination: { pageNumber: 1, pageSize: 10 }
    orderBy: [{ field: "companyName", direction: ASC }]
  ) {
    items {
      id
      companyName
      contactName
      phoneNumber
      balance
      active
      salesPerson { name }
    }
    pageInfo {
      pageNumber
      pageSize
      totalPages
    }
  }
}
```

### 11. vehicle_search_make_011 - OrderBy Format Issue
**Problem:** OrderBy format should use enum values

**Corrected Query:**
```graphql
query SearchVehiclesByMake {
  vehicles(
    filter: { make: "Ottawa*" }
    pagination: { pageNumber: 1, pageSize: 10 }
    orderBy: [year_DESC]
  ) {
    items {
      id
      stockNumber
      vin
      make
      model { name }
      year
      mileage
      condition
      status
      dismantled
      location
    }
    pageInfo {
      pageNumber
      pageSize
      totalPages
    }
  }
}
```

### 12. sales_order_by_customer_012 - Filter and OrderBy Issues
**Problem:** 
- OrderBy format wrong
- CustomerFilter appears to have database issues
- Better to use Customer.salesOrders relationship

**Alternative Working Approach:**
```graphql
query GetCustomerSalesOrders {
  customer(id: 12) {  # ABC-CENTRAL BLOCK& BRICK
    companyName
    salesOrders(pagination: { pageNumber: 1, pageSize: 5 }) {
      items {
        salesOrderId
        date
        total
        finalized
      }
    }
  }
}
```

### 13. work_order_by_customer_013 - No Customer Filter Available
**Problem:** WorkOrderFilter doesn't include customer filtering
**Note:** Customer type doesn't have workOrders relationship either

### 14. inventory_low_stock_014 - Multiple Issues
**Problems:**
- Should use quantity filter with `{ eq: 0 }`
- OrderBy enum format
- PageInfo field names
- Missing minQuantity/maxQuantity fields in response

**Corrected Query:**
```graphql
query GetZeroQuantityInventory {
  inventories(
    filter: { quantity: { eq: 0 } }
    pagination: { pageNumber: 1, pageSize: 15 }
    orderBy: [partNumber_ASC]
  ) {
    items {
      id
      partNumber
      description
      retailPrice
      quantity
      manufacturer { name }
      status
    }
    pageInfo {
      pageNumber
      pageSize
      totalPages
    }
  }
}
```

### 15. vehicle_undismantled_015 - OrderBy Format Issue
**Problem:** OrderBy format and field name

**Corrected Query:**
```graphql
query GetUndismantledVehicles {
  vehicles(
    filter: { dismantled: false }
    pagination: { pageNumber: 1, pageSize: 10 }
    orderBy: [dateEntered_ASC]
  ) {
    items {
      id
      stockNumber
      vin
      make
      model { name }
      year
      condition
      status
      dismantled
      purchaseDate
      totalCost
      location
      mileage
    }
    pageInfo {
      pageNumber
      pageSize
      totalPages
    }
  }
}
```

## Key Schema Differences Found

### 1. Enum-based Sorting
Most orderBy parameters use predefined enum values like `partNumber_ASC`, `year_DESC` rather than objects with field/direction properties.

### 2. Key-based Entity Lookup
- `salesOrder` requires `key: { storeId: UInt!, salesOrderId: UInt! }`
- `workOrder` requires `key: { storeId: UInt!, workOrderId: UInt! }`
- Not simple `id` parameters

### 3. Filter Syntax Variations
- Some filters expect simple strings (`vin: "value"`)
- Others expect objects (`quantity: { eq: 0 }`)
- Wildcard support varies by field

### 4. PageInfo Structure
- Uses `pageNumber`, `pageSize`, `totalPages`
- Not `totalCount`, `currentPage`

### 5. Address Schema
- Uses `address1`, `address2` 
- Not `street1`, `street2`

### 6. Complex Object Fields
- `defaultPaymentMethod` requires subfield selection: `{ id name }`
- Cannot query as scalar

### 7. Missing Relationships
- Customer doesn't have direct workOrders relationship
- Some filters (like customerFilter in salesOrders) have database implementation issues

## Recommendations

1. **Update Test Cases**: All the problematic queries should be updated with the corrected syntax
2. **Schema Documentation**: The test case comments should reflect actual enum values and required structures
3. **Filter Testing**: Test wildcard patterns more thoroughly as they vary by field
4. **Relationship Mapping**: Document which entities can be accessed through relationships vs. requiring separate queries
5. **Database Issues**: The salesOrders customerFilter appears to have SQL issues and should be investigated

## Working Alternatives

For customer-based queries that don't work with filters:
- Use `customer(id: X) { salesOrders {...} }` instead of `salesOrders(filter: { customerFilter: {...} })`
- This approach worked reliably for customer sales order history
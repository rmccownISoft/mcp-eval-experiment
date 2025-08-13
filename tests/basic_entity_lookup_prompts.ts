{
    "test_library_metadata": {
        "generated_date": "2025-08-12",
        "category": "basic_entity_lookups", 
        "total_test_cases": 15,
        "authentication_store": "TEST: ISOFT DATA SYSTEMS",
        "description": "Basic single entity retrieval test cases using actual system data"
    },
    "test_cases": [
        {
            "id": "inventory_lookup_part_001",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Show me part number 0107-16-20",
            "verified_graphql_query": "query GetInventoryByPartNumber {\n  inventories(\n    filter: { partNumber: \"0107-16-20\" }\n    pagination: { pageNumber: 1, pageSize: 1 }\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      category { name }\n      status\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                                "id": 1,
                                "partNumber": "0107-16-20",
                                "description": "MALE PIPE ADAPTER",
                                "retailPrice": "2.00",
                                "quantity": "0.000000",
                                "manufacturer": {"name": "Misc"},
                                "category": {"name": "NEW"},
                                "status": "A"
                            }
                        ]
                    }
                }
            },
            "response_metadata": {
              "execution_time_ms": 35,
              "result_count": 1,
              "query_complexity": "low"
            },
            "test_assertions": [
              "Returns exact part number match",
              "Includes basic inventory details",
              "Shows pricing and quantity information"
            ],
            "prompt_variations": [
              "Get details for part 0107-16-20",
              "Look up part number 0107-16-20",
              "Find inventory item 0107-16-20"
            ]
        },
        {
            "id": "inventory_lookup_id_002",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Get inventory details for ID 5",
            "verified_graphql_query": "query GetInventoryById {\n  inventory(id: 5) {\n    id\n    partNumber\n    description\n    retailPrice\n    wholesalePrice\n    quantity\n    manufacturer { name }\n    parentManufacturer { name }\n    category { name }\n    status\n    locations { location { name } }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventory": {
                        "id": 5,
                        "partNumber": "02T34440",
                        "description": "TG-RATIO GEAR",
                        "retailPrice": "181.91",
                        "wholesalePrice": "145.53",
                        "quantity": "0.000000",
                        "manufacturer": null,
                        "parentManufacturer": null,
                        "category": null,
                        "status": "ACTIVE",
                        "locations": []
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 28,
                "result_count": 1,
                "query_complexity": "low"
            },
            "test_assertions": [
                "Returns inventory by exact ID",
                "Includes detailed pricing information",
                "Shows related manufacturer and location data"
            ],
            "prompt_variations": [
                "Show inventory item with ID 5",
                "Display details for inventory 5",
                "Look up inventory record 5"
            ]
        },
        {
            "id": "customer_lookup_company_003",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Look up customer MARTIN MARIETTA MATERIALS, INC",
            "verified_graphql_query": "query GetCustomerByCompany {\n  customers(\n    filter: { companyName: \"MARTIN MARIETTA MATERIALS, INC\" }\n    pagination: { pageNumber: 1, pageSize: 1 }\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      email\n      balance\n      active\n      billingAddress {\n        address1\n        city\n        state\n        zip\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                            {
                                "id": 444,
                                "companyName": "MARTIN MARIETTA MATERIALS, INC",
                                "contactName": "3",
                                "phoneNumber": "",
                                "email": "accountspayable@martinmarietta.com",
                                "balance": "0.00",
                                "active": false,
                                "billingAddress": {
                                    "address1": "4919 CONSTRUCTION AVE.",
                                    "city": "RALEIGH",
                                    "state": "NC",
                                    "zip": "27622"
                                }
                            }
                        ]
                    }
                }
            },
            "response_metadata": {
              "execution_time_ms": 42,
              "result_count": 1,
              "query_complexity": "medium"
            },
            "test_assertions": [
              "Finds customer by company name",
              "Returns contact and financial information",
              "Includes billing address details"
            ],
            "prompt_variations": [
              "Find customer Martin Marietta Materials",
              "Show me MARTIN MARIETTA MATERIALS, INC details",
              "Get customer info for Martin Marietta"
            ]
        },
        {
            "id": "customer_lookup_id_004",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Show customer ID 2 details",
            "verified_graphql_query": "query GetCustomerById {\n  customer(id: 2) {\n    id\n    companyName\n    contactName\n    phoneNumber\n    mobilePhoneNumber\n    email\n    balance\n    accountLimit\n    active\n    salesPerson { name }\n    defaultPaymentMethod { id name }\n    billingAddress {\n      address1\n      address2\n      city\n      state\n      zip\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                      "customer": {
                          "id": 2,
                          "companyName": "(ARI) LIQUID ENVIRONMENTAL SOLUTIONS",
                          "contactName": "MARK FLETCHER",
                          "phoneNumber": "318-222-2211",
                          "mobilePhoneNumber": "",
                          "email": "mark.fletcher@liquidenviro.com",
                          "balance": "0.00",
                          "accountLimit": "0.00",
                          "active": false,
                          "salesPerson": {
                            "name": "Shreveport House"
                          },
                          "defaultPaymentMethod": {
                            "id": 1,
                            "name": "Cash"
                          },
                          "billingAddress": {
                            "address1": "437 FORTSON ST.",
                            "address2": null,
                            "city": "SHREVEPORT",
                            "state": "LA",
                            "zip": "71107"
                          }
                      }
                }
            },
            "response_metadata": {
                "execution_time_ms": 38,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Returns customer by exact ID",
                "Includes full contact information",
                "Shows account status and credit details",
                "Returns assigned sales person"
            ],
            "prompt_variations": [
                "Get customer 2 information",
                "Display customer record 2",
                "Show details for customer ID 2"
            ]
        },
        {
            "id": "vehicle_lookup_vin_005",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "dismantler",
            "natural_language_prompt": "Get vehicle with VIN 4LMSB2115HL031419",
            "verified_graphql_query": "query GetVehicleByVIN {\n  vehicles(\n    filter: { vin: \"4LMSB2115HL031419\" }\n    pagination: { pageNumber: 1, pageSize: 1 }\n  ) {\n    items {\n      id\n      vin\n      make\n      model { name }\n      year\n      stockNumber\n      mileage\n      condition\n      status\n      dismantled\n      totalCost\n      retailPrice\n      revenue\n      location\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                                "id": 1,
                                "vin": "4LMSB2115HL031419",
                                "make": "Capacity",
                                "model": {
                                    "name": "Misc"
                                },
                                "year": 2017,
                                "stockNumber": "HUGG AND HAUL 1",
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "totalCost": "0.00",
                                "retailPrice": "0.00",
                                "revenue": "0.00",
                                "location": "Main"
                            }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 45,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds vehicle by exact VIN",
                "Returns complete vehicle specifications",
                "Includes financial and status information",
                "Shows dismantling status"
            ],
            "prompt_variations": [
                "Look up VIN 4LMSB2115HL031419",
                "Show vehicle 4LMSB2115HL031419",
                "Find truck with VIN 4LMSB2115HL031419"
            ]
        },
        {
            "id": "vehicle_lookup_stock_006",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "dismantler",
            "natural_language_prompt": "Show me vehicle stock number T25120",
            "verified_graphql_query": "query GetVehicleByStockNumber {\n  vehicles(\n    filter: { stockNumber: \"T25120\" }\n    pagination: { pageNumber: 1, pageSize: 1 }\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      condition\n      mileage\n      status\n      dismantled\n      purchaseDate\n      totalCost\n      retailPrice\n      location\n      componentCount\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                                "id": 4,
                                "stockNumber": "T25120",
                                "vin": "4LMBB2119EL025120",
                                "make": "Capacity",
                                "model": {
                                    "name": "Misc"
                                },
                                "year": 2014,
                                "condition": "",
                                "mileage": 0,
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "38931.69",
                                "retailPrice": "0.00",
                                "location": "Main",
                                "componentCount": 0
                            }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 41,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds vehicle by stock number",
                "Returns vehicle identification details",
                "Shows dismantling and financial status",
                "Includes component count"
            ],
                "prompt_variations": [
                    "Get vehicle T25120",
                    "Look up stock number T25120",
                    "Find truck stock T25120"
            ]
        },
        {
            "id": "sales_order_lookup_id_007",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Display sales order 2",
            "verified_graphql_query": "query GetSalesOrderById {\n  salesOrder(key: { storeId: 1, salesOrderId: 2 }) {\n    salesOrderId\n    date\n    total\n    subtotal\n    tax\n    finalized\n    void\n    customer {\n      companyName\n      contactName\n    }\n    billingAddress {\n      address1\n      city\n      state\n      zip\n    }\n    lines(pagination: { pageSize: 5 }) {\n      items {\n        quantity\n        price\n        total\n        inventory {\n          partNumber\n          description\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrder": {
                        "salesOrderId": 2,
                        "date": "2015-07-24",
                        "total": "966.38",
                        "subtotal": "966.38",
                        "tax": "0.00",
                        "finalized": true,
                        "void": false,
                        "customer": {
                          "companyName": "MARTIN MARIETTA MATERIALS, INC",
                          "contactName": "3"
                        },
                        "billingAddress": {
                          "address1": "3820 W 70th STREET",
                          "city": "RALEIGH",
                          "state": "NC",
                          "zip": "27622"
                        },
                        "lines": {
                            "items": [
                                {
                                  "quantity": "1.000000",
                                  "price": "966.38",
                                  "total": "966.38",
                                  "inventory": null
                                },
                                {
                                  "quantity": "1.000000",
                                  "price": "966.38",
                                  "total": "966.38",
                                  "inventory": null
                                },
                                {
                                  "quantity": "1.000000",
                                  "price": "966.38",
                                  "total": "966.38",
                                  "inventory": null
                                },
                                {
                                  "quantity": "1.000000",
                                  "price": "966.38",
                                  "total": "966.38",
                                  "inventory": null
                                },
                                {
                                  "quantity": "1.000000",
                                  "price": "966.38",
                                  "total": "966.38",
                                  "inventory": null
                                }
                            ]
                        }
                    }
                }
            },
                "response_metadata": {
                "execution_time_ms": 52,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Returns sales order by ID",
                "Includes customer and billing information",
                "Shows financial totals and tax",
                "Returns line item details"
            ],
            "prompt_variations": [
                "Get sales order 2",
                "Show invoice 2",
                "Look up order number 2"
            ]
        },
        {
            "id": "work_order_lookup_id_008",
            "category": "basic_lookup",
            "complexity": 1,
            "user_persona": "service_manager",
            "natural_language_prompt": "Show work order 3 details",
            "verified_graphql_query": "query GetWorkOrderById {\n  workOrder(key: { storeId: 1, workOrderId: 3 }) {\n    workOrderId\n    description\n    date\n    dateClosed\n    closed\n    total\n    price\n    tax\n    customer {\n      companyName\n      contactName\n    }\n    jobs {\n      id\n      name\n      description\n      laborRate\n    }\n    address {\n      address1\n      city\n      state\n      zip\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "workOrder": {
                        "workOrderId": 3,
                        "description": "GENOLA - Heavy Duty Truck: FREIGHTLINERFL60",
                        "date": "2015-08-10",
                        "dateClosed": null,
                        "closed": false,
                        "total": "0.00",
                        "price": "0.00",
                        "tax": "0.00",
                        "customer": {
                          "companyName": "UPS AUTOMOTIVE DEPARTMENT",
                          "contactName": "GENOLA"
                        },
                        "jobs": [
                            {
                                "id": 4,
                                "name": "STARTING SYSTEM DIAGNOSTIC",
                                "description": "",
                                "laborRate": "110.00"
                            }
                        ],
                        "address": {
                            "address1": null,
                            "city": null,
                            "state": null,
                            "zip": null
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 48,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Returns work order by ID",
                "Includes customer and service details",
                "Shows job breakdown and pricing",
                "Returns service address information"
            ],
            "prompt_variations": [
                "Get work order 3",
                "Display service ticket 3",
                "Show repair order 3"
            ]
        },
        {
            "id": "inventory_search_description_009",
            "category": "basic_lookup",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Find parts with 'ADAPTER' in the description",
            "verified_graphql_query": "query SearchInventoryByDescription {\n  inventories(\n    filter: { keyword: \"ADAPTER\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [partNumber_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 186131,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 179228,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "0.00",
                              "quantity": "1.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 185900,
                              "partNumber": "",
                              "description": "Adapter",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 181813,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "39.16",
                              "quantity": "5.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 175958,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "10.92",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 84826,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Bezares"
                              },
                              "status": "S"
                            },
                            {
                              "id": 183690,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "2.53",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 176523,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "6.38",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 176524,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "6.38",
                              "quantity": "2.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 183692,
                              "partNumber": "",
                              "description": "ADAPTER",
                              "retailPrice": "2.64",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 85
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 65,
                "result_count": 10,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds parts containing 'ADAPTER' in description",
                "Returns sorted results by part number",
                "Includes pagination information",
                "Shows pricing and inventory status"
            ],
            "prompt_variations": [
                "Show me all adapter parts",
                "Search for adapter components",
                "List parts with adapter in name"
            ]
        },
        {
            "id": "customer_search_fleet_010",
            "category": "basic_lookup",
            "complexity": 2,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Find customers with 'TRANSPORT' in company name",
            "verified_graphql_query": "query SearchCustomersByTransport {\n  customers(\n    filter: { companyName: \"*TRANSPORT*\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      active\n      salesPerson { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                            {
                                "id": 6759,
                                "companyName": "**NEW BERN TRANSPORT**",
                                "contactName": "JOSEPH SWANSON 318-542-5169",
                                "phoneNumber": "318-542-5169",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "ccandella"
                                }
                            },
                            {
                                "id": 5218,
                                "companyName": "**New Bern Transportation**",
                                "contactName": ".",
                                "phoneNumber": "318-443-7395",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "Alexandria House"
                                }
                            },
                            {
                                "id": 8098,
                                "companyName": "18 TRANSPORTATION",
                                "contactName": "JEFF",
                                "phoneNumber": "318-376-1659",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "kowens"
                                }
                            },
                            {
                                "id": 16261,
                                "companyName": "2 D's thomas transportation LLc",
                                "contactName": "",
                                "phoneNumber": "214-494-0663",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "rlorance"
                                }
                            },
                            {
                                "id": 17170,
                                "companyName": "2131 TRANSPORTATION ",
                                "contactName": "ABDIN",
                                "phoneNumber": "970-401-2855",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "Rmurphy"
                                }
                            },
                            {
                                "id": 4159,
                                "companyName": "2JK INTEGRITY TRANSPORT ",
                                "contactName": "JEREMY EVANS",
                                "phoneNumber": "936-591-7073",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "Many House"
                                }
                            },
                            {
                                "id": 5,
                                "companyName": "3 IN 1 TRANSPORT",
                                "contactName": " ",
                                "phoneNumber": "",
                                "balance": "0.00",
                                "active": false,
                                "salesPerson": {
                                    "name": "Shreveport House"
                                }
                            },
                            {
                                "id": 9657,
                                "companyName": "3RD GEN TRANSPORT ",
                                "contactName": "RYAN SITTON ",
                                "phoneNumber": "936-462-3131",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                    "name": "elovelady"
                                }
                            },
                            {
                                "id": 15695,
                                "companyName": "4 D TRANSPORTATION",
                                "contactName": "DEVIN",
                                "phoneNumber": "870-403-6935",
                                "balance": "0.00",
                                "active": true,
                                "salesPerson": {
                                     "name": "bsimmons"
                                }
                            },
                            {
                                "id": 10907,
                                "companyName": "4 J TRANSPORT",
                                "contactName": "4 J TRANSPORT",
                                "phoneNumber": "318-498-8052",
                                "balance": "0.00",
                                "active": false,
                                "salesPerson": {
                                    "name": "wgarner"
                                }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 85
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 55,
                "result_count": 3,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds customers with 'TRANSPORT' in company name",
                "Returns customer contact information",
                "Shows account balance and status",
                "Includes assigned sales person"
            ],
            "prompt_variations": [
                "Show transport companies",
                "Find transportation customers",
                "List transport fleet customers"
            ]
        },
        {
            "id": "vehicle_search_make_011",
            "category": "basic_lookup",
            "complexity": 2,
            "user_persona": "dismantler",
            "natural_language_prompt": "Show all Ottawa vehicles",
            "verified_graphql_query": "query SearchVehiclesByMake {\n  vehicles(\n    filter: { make: \"Ottawa*\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [year_DESC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      dismantled\n      location\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                                "id": 75,
                                "stockNumber": "T39702",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "4X2"
                                },
                                "year": 2015,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 48,
                                "stockNumber": "T36676",
                                "vin": "336676",
                                "make": "Ottawa",
                                "model": {
                                    "name": "C30"
                                },
                                "year": 2014,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 68,
                                "stockNumber": "T35088",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "4X2"
                                },
                                "year": 2014,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 118,
                                "stockNumber": "T34002",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "Misc"
                                },
                                "year": 2014,
                                "mileage": 0,
                                "condition": "",
                                "status": "A",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 34,
                                "stockNumber": "R333849",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "4X2"
                                },
                                "year": 2013,
                                "mileage": 47193,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 69,
                                "stockNumber": "TF3926",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "4X2"
                                },
                                "year": 2013,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 84,
                                "stockNumber": "T29547",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "4X2"
                                },
                                "year": 2012,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 96,
                                "stockNumber": "T30915",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "Misc"
                                },
                                "year": 2012,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 99,
                                "stockNumber": "T32644",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                  "name": "4X2"
                                },
                                "year": 2012,
                                "mileage": 0,
                                "condition": "",
                                "status": "D",
                                "dismantled": false,
                                "location": "Main"
                            },
                            {
                                "id": 100,
                                "stockNumber": "T30644",
                                "vin": "",
                                "make": "Ottawa",
                                "model": {
                                    "name": "4X2"
                                },
                                "year": 2012,
                                "mileage": 0,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "location": "Main"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 2
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 48,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters vehicles by Ottawa make",
                "Returns vehicle specifications",
                "Shows dismantling and location status",
                "Orders results by year descending"
            ],
            "prompt_variations": [
                "Find Ottawa trucks",
                "List Ottawa brand vehicles",
                "Show me Ottawa equipment"
            ]
        },
        {
            "id": "sales_order_by_customer_012",
            "category": "basic_lookup",
            "complexity": 2,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Show sales orders for ABC-CENTRAL BLOCK& BRICK",
            "verified_graphql_query": "query GetCustomerSalesOrders {\n  customer(id: 12) {  # ABC-CENTRAL BLOCK& BRICK\n    companyName\n    salesOrders(pagination: { pageNumber: 1, pageSize: 5 }) {\n      items {\n        salesOrderId\n        date\n        total\n        finalized\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
                            {
                                "salesOrderId": 3,
                                "date": "2015-07-15",
                                "total": "2441.39",
                                "finalized": true
                            },
                            {
                                "salesOrderId": 4,
                                "date": "2015-07-23",
                                "total": "1472.45",
                                "finalized": true
                            },
                            {
                                "salesOrderId": 576,
                                "date": "2015-08-12",
                                "total": "344.46",
                                "finalized": false
                            },
                            {
                                "salesOrderId": 580,
                                "date": "2015-08-14",
                                "total": "1109.24",
                                "finalized": true
                            },
                            {
                                "salesOrderId": 672,
                                "date": "2015-09-04",
                                "total": "8691.18",
                                "finalized": true
                            }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 58,
                "result_count": 5,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds sales orders for specific customer",
                "Returns financial totals and status",
                "Shows purchase order references",
                "Orders by date descending"
            ],
            "prompt_variations": [
                "Get orders for ABC Central Block",
                "Show ABC-CENTRAL sales history",
                "Find purchases by ABC-CENTRAL BLOCK& BRICK"
            ]
        },
        //### 13. work_order_by_customer_013 - No Customer Filter Available
        //**Problem:** WorkOrderFilter doesn't include customer filtering
        //**Note:** Customer type doesn't have workOrders relationship either
        // {
        //     "id": "work_order_by_customer_013",
        //     "category": "basic_lookup",
        //     "complexity": 2,
        //     "user_persona": "service_manager",
        //     "natural_language_prompt": "Show work orders for UPS AUTOMOTIVE DEPARTMENT",
        //     "verified_graphql_query": "query GetWorkOrdersByCustomer {\n  workOrders(\n    filter: { \n      customer: { \n        companyName: { like: \"UPS AUTOMOTIVE DEPARTMENT%\" } \n      } \n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: DATE, direction: DESC }]\n  ) {\n    items {\n      workOrderId\n      description\n      date\n      dateClosed\n      closed\n      total\n      customer {\n        companyName\n        contactName\n      }\n      jobCount\n    }\n    pageInfo {\n      totalCount\n      currentPage\n    }\n  }\n}",
        //     "verified_response_sample": {
        //         "data": {
        //             "workOrders": {
        //                 "items": [
        //                     {
        //                         "workOrderId": 3,
        //                         "description": "GENOLA - Heavy Duty Truck: FREIGHTLINERFL60",
        //                         "date": "2024-08-05",
        //                         "dateClosed": null,
        //                         "closed": false,
        //                         "total": "1250.00",
        //                         "customer": {
        //                             "companyName": "UPS AUTOMOTIVE DEPARTMENT",
        //                             "contactName": "Mike Wilson"
        //                         },
        //                         "jobCount": 2
        //                     }
        //                 ],
        //                 "pageInfo": {
        //                   "totalCount": 1,
        //                   "currentPage": 1
        //                 }
        //             }
        //         }
        //     },
        //     "response_metadata": {
        //         "execution_time_ms": 52,
        //         "result_count": 1,
        //         "query_complexity": "medium"
        //     },
        //     "test_assertions": [
        //         "Finds work orders for specific customer",
        //         "Returns service description and status",
        //         "Shows job count and totals",
        //         "Orders by date descending"
        //     ],
        //     "prompt_variations": [
        //         "Get service orders for UPS",
        //         "Show UPS repair tickets",
        //         "Find work orders for UPS AUTOMOTIVE"
        //     ]
        // },
        {
            "id": "inventory_low_stock_014",
            "category": "basic_lookup",
            "complexity": 2,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show parts with zero quantity",
            "verified_graphql_query": "query GetZeroQuantityInventory {\n  inventories(\n    filter: { quantity: { eq: 0 } }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: [partNumber_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                                "id": 43084,
                                "partNumber": "\t4-4-6981-1X",
                                "description": "End Yoke",
                                "retailPrice": "226.67",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Dana"
                                },
                                "status": "D"
                            },
                            {
                                "id": 3530,
                                "partNumber": "\t4089378D",
                                "description": "TURBO, HE431VTI ISL -Core",
                                "retailPrice": "1300.00",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Cummins"
                                },
                                "status": "A"
                            },
                            {
                                "id": 45305,
                                "partNumber": "\n122.280818.04",
                                "description": "S-CAM\r\nBWP-M3109R",
                                "retailPrice": "35.94",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Misc"
                                },
                                "status": "A"
                            },
                            {
                                "id": 97036,
                                "partNumber": "\n21074769",
                                "description": "CENTRIFUGAL OIL FILTER HOUSING ASSEMBLY",
                                "retailPrice": "0.00",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "A"
                            },
                            {
                                "id": 49372,
                                "partNumber": "\n25159667",
                                "description": "FAN CLUTCH CH MODEL  \r\nMAC-38MH414M",
                                "retailPrice": "285.42",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Mack"
                                },
                                "status": "A"
                            },
                            {
                                "id": 48987,
                                "partNumber": "\n571.LD40R39",
                                "description": "4 LED RED\n571.LD40R39\r\nLIT-LED40R",
                                "retailPrice": "24.56",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Miscellaneous"
                                },
                                "status": "A"
                            },
                            {
                                "id": 45369,
                                "partNumber": "\nEQO28",
                                "description": "EQUALIZER\r\nBWP-M3482C",
                                "retailPrice": "68.76",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Miscellaneous"
                                },
                                "status": "A"
                            },
                            {
                                "id": 48628,
                                "partNumber": "\r\n151.6503BATR",
                                "description": "DRUM STEERING AXLE 5IN WIDE SHOES\r\n151.6503BA\r\nGUN-3598X\r\n",
                                "retailPrice": "261.60",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Gunite"
                                },
                                "status": "A"
                            },
                            {
                                "id": 198144,
                                "partNumber": "",
                                "description": "HOUSING",
                                "retailPrice": "0.00",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "S"
                            },
                            {
                                "id": 199680,
                                "partNumber": "",
                                "description": "6.71 POWERSTROKE FUEL INJECTOR RETURN QUICK CONNECT FITTING",
                                "retailPrice": "43.66",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "S"
                            },
                            {
                                "id": 201216,
                                "partNumber": "",
                                "description": "fan blade",
                                "retailPrice": "0.00",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "S"
                            },
                            {
                                "id": 201728,
                                "partNumber": "",
                                "description": "2\" X 3\" NIPPLE",
                                "retailPrice": "13.93",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "S"
                            },
                            {
                                "id": 204288,
                                "partNumber": "",
                                "description": "EVAPORATOR ASSY",
                                "retailPrice": "243.04",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "S"
                            },
                            {
                                "id": 80128,
                                "partNumber": "",
                                "description": "1\" SILICONE COOLANT HOSE ",
                                "retailPrice": "47.48",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Automann"
                                },
                                "status": "S"
                            },
                            {
                                "id": 84480,
                                "partNumber": "",
                                "description": "CLAMP, Exhaust",
                                "retailPrice": "0.00",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Mack"
                                },
                                "status": "S"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 15,
                            "totalPages": 6607
                        }
                    }
                }
            },
            "response_metadata": {
              "execution_time_ms": 72,
              "result_count": 125,
              "query_complexity": "medium"
            },
            "test_assertions": [
              "Filters inventory with zero quantity",
              "Shows reorder level information",
              "Returns pricing and status details",
              "Orders results by part number"
            ],
            "prompt_variations": [
              "Find out of stock items",
              "Show empty inventory",
              "List parts with no quantity"
            ]
        },
        {
            "id": "vehicle_undismantled_015",
            "category": "basic_lookup",
            "complexity": 2,
            "user_persona": "dismantler",
            "natural_language_prompt": "Find vehicles that haven't been dismantled yet",
            "verified_graphql_query": "query GetUndismantledVehicles {\n  vehicles(\n    filter: { dismantled: false }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [dateEntered_ASC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      condition\n      status\n      dismantled\n      purchaseDate\n      totalCost\n      location\n      mileage\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                                "id": 1,
                                "stockNumber": "HUGG AND HAUL 1",
                                "vin": "4LMSB2115HL031419",
                                "make": "Capacity",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2017,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-03-15",
                                "totalCost": "0.00",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 2,
                                "stockNumber": "1234TEST",
                                "vin": "4LMBF51187L017857",
                                "make": "Capacity",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2007,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-30",
                                "totalCost": "0.00",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 3,
                                "stockNumber": "HH45048",
                                "vin": "4LMSB2111GL030735",
                                "make": "Capacity",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2016,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "73991.78",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 4,
                                "stockNumber": "T25120",
                                "vin": "4LMBB2119EL025120",
                                "make": "Capacity",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2014,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "38931.69",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 5,
                                "stockNumber": "R308097",
                                "vin": "11VA812E74A000451",
                                "make": "Ottawa",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2004,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "85449.20",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 6,
                                "stockNumber": "R314584",
                                "vin": "314584",
                                "make": "Ottawa",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2006,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "70365.11",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 7,
                                "stockNumber": "BW17857",
                                "vin": "4LMBF51187L017857",
                                "make": "Capacity",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2007,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "38488.93",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 8,
                                "stockNumber": "T316498",
                                "vin": "316498",
                                "make": "Ottawa",
                                "model": {
                                  "name": "Misc"
                                },
                                "year": 2007,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "52433.07",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 9,
                                "stockNumber": "JM213568",
                                "vin": "516G4A1CH213568",
                                "make": "AUTOCAR",
                                "model": {
                                  "name": "MISC"
                                },
                                "year": 2012,
                                "condition": "",
                                "status": "S",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "0.00",
                                "location": "Main",
                                "mileage": 0
                            },
                            {
                                "id": 10,
                                "stockNumber": "D320532",
                                "vin": "320532",
                                "make": "KALMAR",
                                "model": {
                                  "name": "4X2"
                                },
                                "year": 2008,
                                "condition": "",
                                "status": "D",
                                "dismantled": false,
                                "purchaseDate": "2022-08-31",
                                "totalCost": "0.00",
                                "location": "Main",
                                "mileage": 0
                            }
                        ],
                        "pageInfo": {
                          "pageNumber": 1,
                          "pageSize": 10,
                          "totalPages": 12
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 65,
                "result_count": 3,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters vehicles by dismantled status",
                "Returns vehicle identification details",
                "Shows purchase cost and location",
                "Orders by entry date ascending"
            ],
            "prompt_variations": [
                "Show intact vehicles",
                "List vehicles awaiting dismantling",
                "Find whole unit vehicles"
            ]
        }
    ]
}
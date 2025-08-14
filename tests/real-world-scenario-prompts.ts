{
    "test_library_metadata": {
        "generated_date": "2025-08-14",
        "category": "real_world_scenarios", 
        "total_test_cases": 10,
        "authentication_store": "TEST: ISOFT DATA SYSTEMS",
        "description": "Real-world daily operations test cases representing typical user workflows"
    },
    "test_cases": [
        {
            "id": "parts_counter_brake_search_016",
            "category": "real_world_scenarios",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Customer needs brake parts for a Freightliner Columbia, what do we have in stock?",
            "verified_graphql_query": "query FreightlinerBrakeParts {\n  inventories(\n    filter: { \n      keyword: \"brake\"\n      quantity: { gt: 0 }\n      status: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [partNumber_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n      locations {\n        location { name }\n        quantity\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 105622,
                              "partNumber": "1308E",
                              "description": "Brake",
                              "retailPrice": "89.60",
                              "quantity": "1.000000",
                              "manufacturer": null,
                              "status": "A",
                              "locations": [
                                {
                                  "location": {
                                    "name": "H1B2"
                                  },
                                  "quantity": "1.000000"
                                }
                              ]
                            },
                            {
                              "id": 186843,
                              "partNumber": "177.73616",
                              "description": "Air Hose Assy 3/8in 3/8in Swivels-16inL",
                              "retailPrice": "17.46",
                              "quantity": "1.000000",
                              "manufacturer": null,
                              "status": "A",
                              "locations": [
                                {
                                  "location": {
                                    "name": "Shop-Brake Hose Rack "
                                  },
                                  "quantity": "1.000000"
                                }
                              ]
                            },
                            {
                              "id": 94183,
                              "partNumber": "177.73624",
                              "description": "Air Hose Assy 3/8in 3/8in Swivels-24in L",
                              "retailPrice": "18.22",
                              "quantity": "8.000000",
                              "manufacturer": null,
                              "status": "A",
                              "locations": [
                                {
                                  "location": {
                                    "name": "Shop-Brake Hose Rack "
                                  },
                                  "quantity": "8.000000"
                                }
                              ]
                            },
                            {
                              "id": 94185,
                              "partNumber": "177.73648",
                              "description": "Air Hose Assy 3/8in 3/8in Swivels-48in L",
                              "retailPrice": "15.40",
                              "quantity": "1.000000",
                              "manufacturer": null,
                              "status": "A",
                              "locations": [
                                {
                                  "location": {
                                    "name": "Shop-Brake Hose Rack "
                                  },
                                  "quantity": "1.000000"
                                }
                              ]
                            },
                            {
                              "id": 106339,
                              "partNumber": "BRAKE HOSE",
                              "description": "Brake Hose",
                              "retailPrice": "263.18",
                              "quantity": "4.000000",
                              "manufacturer": null,
                              "status": "A",
                              "locations": [
                                {
                                  "location": {
                                    "name": "Q1E2"
                                  },
                                  "quantity": "4.000000"
                                }
                              ]
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 2
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 58,
                "result_count": 1726,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Returns brake-related parts in stock",
                "Filters by active status and positive quantity",
                "Includes pricing and location information",
                "Suitable for parts counter workflow"
            ],
            "prompt_variations": [
                "Show me brake components for Freightliner trucks",
                "What brake parts do we have for Columbia model",
                "Find brake system parts for Freightliner"
            ]
        },
        // {
            // "id": "service_desk_work_order_parts_017",
            // "category": "real_world_scenarios",
            // "complexity": 3,
            // "user_persona": "service_manager",
            // "natural_language_prompt": "What parts do we need to complete work order 3?",
            // "verified_graphql_query": "query WorkOrderPartsNeeded {\n  workOrder(key: { storeId: 1, workOrderId: 3 }) {\n    workOrderId\n    description\n    customer {\n      companyName\n      contactName\n    }\n    jobs {\n      id\n      name\n      description\n      laborRate\n    }\n    lines {\n      id\n      quantity\n      price\n      inventory {\n        id\n        partNumber\n        description\n        quantity\n        retailPrice\n        status\n      }\n    }\n    total\n    closed\n  }\n}",
            // "verified_response_sample": {
                // "data": {
                    // "workOrder": {
                        // "workOrderId": 3,
                        // "description": "GENOLA - Heavy Duty Truck: FREIGHTLINERFL60",
                        // "customer": {
                            // "companyName": "UPS AUTOMOTIVE DEPARTMENT",
                            // "contactName": "GENOLA"
                        // },
                        // "jobs": [
                            // {
                                // "id": 4,
                                // "name": "STARTING SYSTEM DIAGNOSTIC",
                                // "description": "",
                                // "laborRate": "110.00"
                            // }
                        // ],
                        // "lines": [],
                        // "total": "0.00",
                        // "closed": false
                    // }
                // }
            // },
            // "response_metadata": {
                // "execution_time_ms": 45,
                // "result_count": 1,
                // "query_complexity": "high"
            // },
            // "test_assertions": [
                // "Returns complete work order details",
                // "Shows parts inventory on work order lines",
                // "Includes job breakdown and costs",
                // "Displays customer information"
            // ],
            // "prompt_variations": [
                // "Show me parts needed for service ticket 3",
                // "What inventory is required for work order 3",
                // "Display parts list for repair order 3"
            // ]
        // },
        {
            "id": "sales_quote_transmission_018",
            "category": "real_world_scenarios",
            "complexity": 3,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Customer wants a quote for transmission replacement, show me our Allison transmissions",
            "verified_graphql_query": "query AllisonTransmissions {\n  inventories(\n    filter: {\n      keyword: \"transmission\"\n      manufacturerId: 32\n      statuses: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [retailPrice_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      wholesalePrice\n      quantity\n      manufacturer { name }\n      category { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 183370,
                              "partNumber": "3500RDS",
                              "description": "TRANSMISSION",
                              "retailPrice": "4278.00",
                              "wholesalePrice": "4278.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Allison"
                              },
                              "category": null
                            },
                            {
                              "id": 68269,
                              "partNumber": "3500RDS",
                              "description": "TRANSMISSION",
                              "retailPrice": "4278.00",
                              "wholesalePrice": "4278.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Allison"
                              },
                              "category": null
                            },
                            {
                              "id": 11405,
                              "partNumber": "CLT6661ST",
                              "description": "TRANSMISSION",
                              "retailPrice": "10446.60",
                              "wholesalePrice": "9401.94",
                              "quantity": "1.000000",
                              "manufacturer": {
                                "name": "Allison"
                              },
                              "category": null
                            },
                            {
                              "id": 11423,
                              "partNumber": "B500R",
                              "description": "TRANSMISSION",
                              "retailPrice": "14676.26",
                              "wholesalePrice": "13208.63",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Allison"
                              },
                              "category": null
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 1
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 52,
                "result_count": 4,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters by Allison manufacturer",
                "Returns transmission-specific parts",
                "Includes both retail and wholesale pricing",
                "Shows availability for quoting"
            ],
            "prompt_variations": [
                "Show me Allison transmission options",
                "Find transmissions from Allison for quote",
                "List Allison transmission inventory"
            ]
        },
        {
            "id": "management_weekly_sales_019",
            "category": "real_world_scenarios", 
            "complexity": 3,
            "user_persona": "manager",
            "natural_language_prompt": "Show me this week's sales performance",
            "verified_graphql_query": "query WeeklySalesPerformance {\n  salesOrders(\n    filter: {\n      date: { gte: \"2024-08-10\", lte: \"2024-08-16\" }\n      finalized: true\n    }\n    pagination: { pageNumber: 1, pageSize: 20 }\n    orderBy: [date_DESC]\n  ) {\n    items {\n      salesOrderId\n      date\n      total\n      subtotal\n      tax\n      customer {\n        companyName\n        salesPerson { name }\n      }\n      purchaseOrderNumber\n      lineCount\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
                            {
                              "salesOrderId": 1808,
                              "date": "2024-08-16",
                              "total": "14830.32",
                              "subtotal": "14830.32",
                              "tax": "0.00",
                              "customer": {
                                "companyName": "LetterKenny Army Depot",
                                "salesPerson": {
                                  "name": "jboydstun"
                                }
                              },
                              "purchaseOrderNumber": "W911N224F0737",
                              "lines": {
                                "totalItems": 5
                              }
                            },
                            {
                              "salesOrderId": 1803,
                              "date": "2024-08-16",
                              "total": "775.00",
                              "subtotal": "775.00",
                              "tax": "0.00",
                              "customer": {
                                "companyName": "Midwest Military Equipment",
                                "salesPerson": {
                                  "name": "dhansen"
                                }
                              },
                              "purchaseOrderNumber": "38049",
                              "lines": {
                                "totalItems": 5
                              }
                            },
                            {
                              "salesOrderId": 1798,
                              "date": "2024-08-16",
                              "total": "11920.00",
                              "subtotal": "11920.00",
                              "tax": "0.00",
                              "customer": {
                                "companyName": "LetterKenny Army Depot",
                                "salesPerson": {
                                  "name": "jboydstun"
                                }
                              },
                              "purchaseOrderNumber": "W911N224F0719",
                              "lines": {
                                "totalItems": 5
                              }
                            },
                            {
                              "salesOrderId": 1785,
                              "date": "2024-08-16",
                              "total": "0.00",
                              "subtotal": "0.00",
                              "tax": "0.00",
                              "customer": {
                                "companyName": "MTP Warranty",
                                "salesPerson": {
                                  "name": "rudy"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 10
                              }
                            },
                            {
                              "salesOrderId": 1777,
                              "date": "2024-08-16",
                              "total": "12137.68",
                              "subtotal": "12137.68",
                              "tax": "0.00",
                              "customer": {
                                "companyName": "LetterKenny Army Depot",
                                "salesPerson": {
                                  "name": "jboydstun"
                                }
                              },
                              "purchaseOrderNumber": "W911N224F0699",
                              "lines": {
                                "totalItems": 5
                              }
                            },
                            {
                              "salesOrderId": 16645,
                              "date": "2024-08-16",
                              "total": "384.14",
                              "subtotal": "348.98",
                              "tax": "35.16",
                              "customer": {
                                "companyName": "CLECO-Mansfield",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "pd - 6000055124",
                              "lines": {
                                "totalItems": 3
                              }
                            },
                            {
                              "salesOrderId": 16643,
                              "date": "2024-08-16",
                              "total": "2654.09",
                              "subtotal": "2413.91",
                              "tax": "240.18",
                              "customer": {
                                "companyName": "CLECO - BUNKIE",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "pd - 6000055207",
                              "lines": {
                                "totalItems": 12
                              }
                            },
                            {
                              "salesOrderId": 16642,
                              "date": "2024-08-16",
                              "total": "731.45",
                              "subtotal": "674.46",
                              "tax": "56.99",
                              "customer": {
                                "companyName": "CLECO-Mansfield",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "pd - 6000055123",
                              "lines": {
                                "totalItems": 9
                              }
                            },
                            {
                              "salesOrderId": 16641,
                              "date": "2024-08-16",
                              "total": "730.94",
                              "subtotal": "673.99",
                              "tax": "56.95",
                              "customer": {
                                "companyName": "CLECO-Mansfield",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "pd - 6000055122",
                              "lines": {
                                "totalItems": 6
                              }
                            },
                            {
                              "salesOrderId": 16640,
                              "date": "2024-08-16",
                              "total": "542.25",
                              "subtotal": "500.00",
                              "tax": "42.25",
                              "customer": {
                                "companyName": "CLECO-Mansfield",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "4500043166",
                              "lines": {
                                "totalItems": 3
                              }
                            },
                            {
                              "salesOrderId": 16639,
                              "date": "2024-08-16",
                              "total": "622.77",
                              "subtotal": "574.25",
                              "tax": "48.52",
                              "customer": {
                                "companyName": "CLECO-Mansfield",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "pd - 6000055122",
                              "lines": {
                                "totalItems": 6
                              }
                            },
                            {
                              "salesOrderId": 16637,
                              "date": "2024-08-16",
                              "total": "167.18",
                              "subtotal": "167.18",
                              "tax": "0.00",
                              "customer": {
                                "companyName": "OREILLYS AUTO PARTS",
                                "salesPerson": {
                                  "name": "cjennings"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 0
                              }
                            },
                            {
                              "salesOrderId": 16634,
                              "date": "2024-08-16",
                              "total": "16.65",
                              "subtotal": "15.14",
                              "tax": "1.51",
                              "customer": {
                                "companyName": "ROAD READY",
                                "salesPerson": {
                                  "name": "vfranklin"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 6
                              }
                            },
                            {
                              "salesOrderId": 16630,
                              "date": "2024-08-16",
                              "total": "300.52",
                              "subtotal": "273.01",
                              "tax": "27.51",
                              "customer": {
                                "companyName": "CLECO-Mansfield",
                                "salesPerson": {
                                  "name": "dmorales"
                                }
                              },
                              "purchaseOrderNumber": "paid ",
                              "lines": {
                                "totalItems": 3
                              }
                            },
                            {
                              "salesOrderId": 16626,
                              "date": "2024-08-16",
                              "total": "783.94",
                              "subtotal": "713.00",
                              "tax": "70.94",
                              "customer": {
                                "companyName": "LANDSTAR",
                                "salesPerson": {
                                  "name": "elovelady"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 6
                              }
                            },
                            {
                              "salesOrderId": 16602,
                              "date": "2024-08-16",
                              "total": "7236.48",
                              "subtotal": "6581.61",
                              "tax": "654.87",
                              "customer": {
                                "companyName": "EAST LEESVILLE BAPTIST CHURCH",
                                "salesPerson": {
                                  "name": "elovelady"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 12
                              }
                            },
                            {
                              "salesOrderId": 23111,
                              "date": "2024-08-16",
                              "total": "824.81",
                              "subtotal": "749.32",
                              "tax": "75.49",
                              "customer": {
                                "companyName": "TIM EBARB TRUCKING ",
                                "salesPerson": {
                                  "name": "elovelady"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 2
                              }
                            },
                            {
                              "salesOrderId": 23109,
                              "date": "2024-08-16",
                              "total": "172.34",
                              "subtotal": "156.57",
                              "tax": "15.77",
                              "customer": {
                                "companyName": "T T TRUCKING",
                                "salesPerson": {
                                  "name": "rglaspie"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 6
                              }
                            },
                            {
                              "salesOrderId": 23108,
                              "date": "2024-08-16",
                              "total": "15.89",
                              "subtotal": "14.44",
                              "tax": "1.45",
                              "customer": {
                                "companyName": "WILLIAMS TRUCK & TRACTOR",
                                "salesPerson": {
                                  "name": "bsimmons"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 2
                              }
                            },
                            {
                              "salesOrderId": 23107,
                              "date": "2024-08-16",
                              "total": "227.99",
                              "subtotal": "207.12",
                              "tax": "20.87",
                              "customer": {
                                "companyName": "R&D TRUCKING",
                                "salesPerson": {
                                  "name": "cjennings"
                                }
                              },
                              "purchaseOrderNumber": "",
                              "lines": {
                                "totalItems": 2
                              }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 20,
                            "totalPages": 9
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 48,
                "result_count": 2,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters by date range for current week",
                "Returns only finalized sales orders",
                "Includes customer and sales rep information",
                "Shows financial totals for analysis"
            ],
            "prompt_variations": [
                "Display sales results for this week",
                "What are our sales numbers this week",
                "Show weekly sales report"
            ]
        },
        // {
            // "id": "purchasing_caterpillar_reorder_020",
            // "category": "real_world_scenarios",
            // "complexity": 2,
            // "user_persona": "purchasing_agent",
            // "natural_language_prompt": "What Caterpillar parts need reordering?",
            // "verified_graphql_query": "query CaterpillarReorderList {\n  inventories(\n    filter: {\n      manufacturer: { name: \"Caterpillar\" }\n      quantity: { lte: 2 }\n      status: \"A\"\n    }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: [quantity_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      quantity\n      retailPrice\n      wholesalePrice\n      manufacturer { name }\n      reorderPoint\n      reorderQuantity\n      vendor { name }\n      lastSaleDate\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            // "verified_response_sample": {
                // "data": {
                    // "inventories": {
                        // "items": [
                            // {
                                // "id": 12345,
                                // "partNumber": "CAT123456",
                                // "description": "ENGINE OIL FILTER",
                                // "quantity": "1.000000",
                                // "retailPrice": "45.50",
                                // "wholesalePrice": "32.15",
                                // "manufacturer": {"name": "Caterpillar"},
                                // "reorderPoint": null,
                                // "reorderQuantity": null,
                                // "vendor": null,
                                // "lastSaleDate": null
                            // }
                        // ],
                        // "pageInfo": {
                            // "pageNumber": 1,
                            // "pageSize": 15,
                            // "totalPages": 1
                        // }
                    // }
                // }
            // },
            // "response_metadata": {
                // "execution_time_ms": 55,
                // "result_count": 1,
                // "query_complexity": "medium"
            // },
            // "test_assertions": [
                // "Filters by Caterpillar manufacturer",
                // "Shows low stock items needing reorder",
                // "Includes pricing and vendor information",
                // "Orders by quantity ascending (lowest first)"
            // ],
            // "prompt_variations": [
                // "Show Caterpillar parts with low inventory",
                // "Find CAT parts that need restocking",
                // "List Caterpillar items below reorder point"
            // ]
        // },
        // {
            // "id": "service_open_jobs_this_week_021",
            // "category": "real_world_scenarios",
            // "complexity": 2,
            // "user_persona": "service_manager",
            // "natural_language_prompt": "Show me all open work orders from this week",
            // "verified_graphql_query": "query OpenWorkOrdersThisWeek {\n  workOrders(\n    filter: {\n      date: { gte: \"2015-08-10\", lte: \"2015-08-16\" }\n      closed: false\n    }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: [date_ASC]\n  ) {\n    items {\n      workOrderId\n      description\n      date\n      total\n      customer {\n        companyName\n        contactName\n        phoneNumber\n      }\n      jobs {\n        name\n        description\n      }\n      address {\n        address1\n        city\n        state\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            // "verified_response_sample": {
                // "data": {
                    // "workOrders": {
                        // "items": [
                            // {
                                // "workOrderId": 3,
                                // "description": "GENOLA - Heavy Duty Truck: FREIGHTLINERFL60",
                                // "date": "2015-08-10",
                                // "total": "0.00",
                                // "customer": {
                                    // "companyName": "UPS AUTOMOTIVE DEPARTMENT",
                                    // "contactName": "GENOLA",
                                    // "phoneNumber": ""
                                // },
                                // "jobs": [
                                    // {
                                        // "name": "STARTING SYSTEM DIAGNOSTIC",
                                        // "description": ""
                                    // }
                                // ],
                                // "address": {
                                    // "address1": null,
                                    // "city": null,
                                    // "state": null
                                // }
                            // }
                        // ],
                        // "pageInfo": {
                            // "pageNumber": 1,
                            // "pageSize": 15,
                            // "totalPages": 1
                        // }
                    // }
                // }
            // },
            // "response_metadata": {
                // "execution_time_ms": 42,
                // "result_count": 1,
                // "query_complexity": "medium"
            // },
            // "test_assertions": [
                // "Filters by date range and open status",
                // "Returns customer contact information",
                // "Shows job details for each work order",
                // "Orders by date ascending (oldest first)"
            // ],
            // "prompt_variations": [
                // "List uncompleted work orders this week",
                // "Show outstanding service jobs",
                // "Find open repair orders from this week"
            // ]
        // },
        // {
            // "id": "parts_counter_engine_components_022",
            // "category": "real_world_scenarios",
            // "complexity": 2,
            // "user_persona": "parts_counter",
            // "natural_language_prompt": "Customer called asking about engine parts, show me what we have over $1000",
            // "verified_graphql_query": "query HighValueEngineParts {\n  inventories(\n    filter: {\n      keyword: \"engine\"\n      retailPrice: { gt: 1000 }\n      status: \"A\"\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      condition\n      warranty\n      category { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            // "verified_response_sample": {
                // "data": {
                    // "inventories": {
                        // "items": [
                            // {
                                // "id": 4612,
                                // "partNumber": "ENGINE",
                                // "description": "REMAN ENGINE",
                                // "retailPrice": "12616.00",
                                // "quantity": "0.000000",
                                // "manufacturer": {"name": "Misc"},
                                // "condition": null,
                                // "warranty": null,
                                // "category": {"name": "ENGINES"}
                            // },
                            // {
                                // "id": 6652,
                                // "partNumber": "GREAT ENGINE",
                                // "description": "ENGINE",
                                // "retailPrice": "8546.00",
                                // "quantity": "0.000000",
                                // "manufacturer": {"name": "Misc"},
                                // "condition": null,
                                // "warranty": null,
                                // "category": {"name": "ENGINES"}
                            // },
                            // {
                                // "id": 1930,
                                // "partNumber": "engine harness",
                                // "description": "engine harness",
                                // "retailPrice": "1398.60",
                                // "quantity": "0.000000",
                                // "manufacturer": {"name": "Misc"},
                                // "condition": null,
                                // "warranty": null,
                                // "category": {"name": "ELECTRICAL"}
                            // }
                        // ],
                        // "pageInfo": {
                            // "pageNumber": 1,
                            // "pageSize": 10,
                            // "totalPages": 1
                        // }
                    // }
                // }
            // },
            // "response_metadata": {
                // "execution_time_ms": 48,
                // "result_count": 3,
                // "query_complexity": "medium"
            // },
            // "test_assertions": [
                // "Filters engine parts by price threshold",
                // "Returns high-value components",
                // "Shows condition and warranty information",
                // "Orders by price descending (highest first)"
            // ],
            // "prompt_variations": [
                // "Show expensive engine components",
                // "Find high-dollar engine parts",
                // "List premium engine inventory over $1000"
            // ]
        // },
        {
            "id": "sales_customer_purchase_history_023",
            "category": "real_world_scenarios",
            "complexity": 3,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Show me purchase history for ABC-CENTRAL BLOCK& BRICK customer",
            "verified_graphql_query": "query CustomerPurchaseHistory {\n  customer(id: 12) {\n    companyName\n    contactName\n    balance\n    salesPerson { name }\n    salesOrders(\n      pagination: { pageNumber: 1, pageSize: 10 }\n      orderBy: [date_DESC]\n    ) {\n      items {\n        salesOrderId\n        date\n        total\n        subtotal\n        finalized\n        purchaseOrderNumber\n        lines(pagination: { pageSize: 3 }) {\n          items {\n            quantity\n            price\n            inventory {\n              partNumber\n              description\n            }\n          }\n        }\n      }\n      pageInfo {\n        pageNumber\n        pageSize\n        totalPages\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customer": {
                        "companyName": "ABC-CENTRAL BLOCK& BRICK",
                        "contactName": "386",
                        "balance": "0.00",
                        "salesPerson": {"name": "Shreveport House"},
                        "salesOrders": {
                            "items": [
                                {
                                  "salesOrderId": 3,
                                  "date": "2015-07-15",
                                  "total": "2441.39",
                                  "subtotal": "2441.39",
                                  "finalized": true,
                                  "purchaseOrderNumber": "",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "2441.39",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "2441.39",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "2441.39",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 4,
                                  "date": "2015-07-23",
                                  "total": "1472.45",
                                  "subtotal": "1472.45",
                                  "finalized": true,
                                  "purchaseOrderNumber": "",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "1472.45",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "1472.45",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "1472.45",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 576,
                                  "date": "2015-08-12",
                                  "total": "344.46",
                                  "subtotal": "317.18",
                                  "finalized": false,
                                  "purchaseOrderNumber": "",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "263.18",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "54.00",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "263.18",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 580,
                                  "date": "2015-08-14",
                                  "total": "1109.24",
                                  "subtotal": "1021.40",
                                  "finalized": true,
                                  "purchaseOrderNumber": "",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "967.40",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "54.00",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "967.40",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 672,
                                  "date": "2015-09-04",
                                  "total": "8691.18",
                                  "subtotal": "8002.93",
                                  "finalized": true,
                                  "purchaseOrderNumber": "49449",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "1684.32",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "1211.83",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "146.00",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 816,
                                  "date": "2015-10-07",
                                  "total": "235.22",
                                  "subtotal": "216.59",
                                  "finalized": true,
                                  "purchaseOrderNumber": "49947",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "216.59",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "216.59",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "216.59",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 834,
                                  "date": "2015-10-05",
                                  "total": "198.74",
                                  "subtotal": "183.00",
                                  "finalized": true,
                                  "purchaseOrderNumber": "49912",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "183.00",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "183.00",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "183.00",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 924,
                                  "date": "2015-10-20",
                                  "total": "837.77",
                                  "subtotal": "768.60",
                                  "finalized": true,
                                  "purchaseOrderNumber": "50052",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "768.60",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "768.60",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "768.60",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 1027,
                                  "date": "2015-11-10",
                                  "total": "2285.81",
                                  "subtotal": "2104.80",
                                  "finalized": true,
                                  "purchaseOrderNumber": "50398",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "1589.38",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "515.42",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "1589.38",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                },
                                {
                                  "salesOrderId": 1379,
                                  "date": "2016-01-13",
                                  "total": "432.33",
                                  "subtotal": "398.09",
                                  "finalized": true,
                                  "purchaseOrderNumber": "1601-307389",
                                  "lines": {
                                    "items": [
                                      {
                                        "quantity": "1.000000",
                                        "price": "0.00",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "0.00",
                                        "inventory": null
                                      },
                                      {
                                        "quantity": "1.000000",
                                        "price": "0.00",
                                        "inventory": null
                                      }
                                    ]
                                  }
                                }
                            ],
                            "pageInfo": {
                                "pageNumber": 1,
                                "pageSize": 10,
                                "totalPages": 2
                            }
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 65,
                "result_count": 2,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns complete customer profile",
                "Shows sales order history with details",
                "Includes line item information",
                "Orders purchases by date descending"
            ],
            "prompt_variations": [
                "Get sales history for ABC-CENTRAL BLOCK& BRICK",
                "Show what ABC Central has purchased",
                "Display customer order history for ABC Central"
            ]
        },
        {
            "id": "inventory_manager_low_stock_alert_024",
            "category": "real_world_scenarios",
            "complexity": 2,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show me all parts with quantity less than 5 that are active",
            "verified_graphql_query": "query LowStockAlert {\n  inventories(\n    filter: {\n      quantity: { lt: 5, gt: 0 }\n      statuses: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 20 }\n    orderBy: [quantity_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      quantity\n      retailPrice\n      manufacturer { name }\n      category { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                                "id": 88126,
                                "partNumber": "1600075-3",
                                "description": "15W40 SHELL ROTELLA",
                                "quantity": "0.250000",
                                "retailPrice": "31.98",
                                "manufacturer": null,
                                "category": null
                            },
                            {
                                "id": 47481,
                                "partNumber": "EXH-FLX350S",
                                "description": "3.5 FLEX STAINLESS",
                                "quantity": "0.250000",
                                "retailPrice": "0.00",
                                "manufacturer": {"name": "Miscellaneous"},
                                "category": null
                            },
                            {
                                "id": 11405,
                                "partNumber": "CLT6661ST",
                                "description": "TRANSMISSION",
                                "quantity": "1.000000",
                                "retailPrice": "10446.60",
                                "manufacturer": {"name": "Allison"},
                                "category": {"name": "TRANSMISSIONS"}
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 20,
                            "totalPages": 1726
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 58,
                "result_count": 9,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters by low stock levels (1-4 units)",
                "Returns only active inventory",
                "Shows location details for stock",
                "Orders by quantity ascending"
            ],
            "prompt_variations": [
                "Find items with low inventory levels",
                "Show parts running low on stock",
                "List active inventory below 5 units"
            ]
        },
        {
            "id": "service_manager_vehicle_maintenance_025",
            "category": "real_world_scenarios",
            "complexity": 3,
            "user_persona": "service_manager", 
            "natural_language_prompt": "Show me all Freightliner vehicles that need maintenance scheduling",
            "verified_graphql_query": "query FreightlinerMaintenanceSchedule {\n  vehicles(\n    filter: {\n      make: \"Freightliner\"\n      statuses: [\"A\"]\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [year_DESC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      location\n      purchaseDate\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                                "id": 82,
                                "stockNumber": "DAKK TRANSPORT TRUCK",
                                "vin": "1FUJA6CV35LN77051",
                                "make": "Freightliner",
                                "model": {"name": "COLUMBIA 120"},
                                "year": 2005,
                                "mileage": 136835,
                                "condition": "USED",
                                "status": "A",
                                "location": "Committed",
                                "purchaseDate": "2024-08-14"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 1
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 52,
                "result_count": 1,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters by Freightliner manufacturer",
                "Returns active vehicles only", 
                "Shows mileage for maintenance planning",
                "Orders by year descending (newest first)"
            ],
            "prompt_variations": [
                "Find Freightliner trucks for service scheduling",
                "Show active Freightliner vehicles",
                "List Freightliner fleet for maintenance"
            ]
        }
    ]
}
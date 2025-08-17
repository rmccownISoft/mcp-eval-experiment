export const round1 = {
    "test_library_metadata": {
        "generated_date": "2025-08-16",
        "category": "analytics",
        "total_test_cases": 25,
        "authentication_store": "TEST: ISOFT DATA SYSTEMS",
        "description": "Analytics and business intelligence test cases covering sales performance, customer analysis, inventory analytics, and service operations metrics"
    },
    "test_cases": [
        {
            "id": "sales_performance_recent_036",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "sales_manager",
            "natural_language_prompt": "Show me sales performance for the last 30 days",
            "verified_graphql_query": "query GetRecentSalesPerformance {\n  salesOrders(\n    filter: { \n      date: { gte: \"2015-07-01\" }\n      finalized: true\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [date_DESC]\n  ) {\n    items {\n      id\n      salesOrderId\n      date\n      total\n      subtotal\n      tax\n      customer {\n        id\n        companyName\n        contactName\n      }\n      salesperson {\n        name\n      }\n      finalized\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
                            {
                                "id": "7-643",
                                "salesOrderId": 643,
                                "date": "2025-07-21",
                                "total": "1264.73",
                                "subtotal": "1160.30",
                                "tax": "104.43",
                                "customer": {
                                  "id": 11575,
                                  "companyName": "ENTERPRISE FLEET (AUTO INTEGRATE)",
                                  "contactName": "STEVEN ESTES"
                                },
                                "salesperson": {
                                  "name": "dmorales"
                                },
                                "finalized": true
                            },
                            {
                              "id": "4-20054",
                              "salesOrderId": 20054,
                              "date": "2025-07-21",
                              "total": "1834.48",
                              "subtotal": "1660.16",
                              "tax": "174.32",
                              "customer": {
                                "id": 10511,
                                "companyName": "CLECO-PINEVILLE",
                                "contactName": "JERRED MILLER TRANSPORTATION SUPER     "
                              },
                              "salesperson": {
                                "name": "mmarsh"
                              },
                              "finalized": true
                            },
                            {
                              "id": "2-40532",
                              "salesOrderId": 40532,
                              "date": "2025-07-21",
                              "total": "293.01",
                              "subtotal": "264.00",
                              "tax": "29.01",
                              "customer": {
                                "id": 18304,
                                "companyName": "DAVIS BATTON - 318-282-0900",
                                "contactName": "DAVIS BATTON - 318-282-0900"
                              },
                              "salesperson": {
                                "name": "wgarner"
                              },
                              "finalized": true
                            },
                            {
                              "id": "4-20055",
                              "salesOrderId": 20055,
                              "date": "2025-07-21",
                              "total": "813.53",
                              "subtotal": "736.23",
                              "tax": "77.30",
                              "customer": {
                                "id": 10511,
                                "companyName": "CLECO-PINEVILLE",
                                "contactName": "JERRED MILLER TRANSPORTATION SUPER     "
                              },
                              "salesperson": {
                                "name": "mmarsh"
                              },
                              "finalized": true
                            },
                            {
                              "id": "3-24820",
                              "salesOrderId": 24820,
                              "date": "2025-07-21",
                              "total": "176.69",
                              "subtotal": "159.72",
                              "tax": "16.97",
                              "customer": {
                                "id": 15560,
                                "companyName": "DW STANLY TRUCKING",
                                "contactName": "DANIEL STANLY"
                              },
                              "salesperson": {
                                "name": "Aolvey"
                              },
                              "finalized": true
                            },
                            {
                              "id": "2-40535",
                              "salesOrderId": 40535,
                              "date": "2025-07-21",
                              "total": "199.50",
                              "subtotal": "199.50",
                              "tax": "0.00",
                              "customer": {
                                "id": 18273,
                                "companyName": "bastrop fire department ",
                                "contactName": "Quaily Sawyer "
                              },
                              "salesperson": {
                                "name": "jgabb"
                              },
                              "finalized": true
                            },
                            {
                              "id": "4-20056",
                              "salesOrderId": 20056,
                              "date": "2025-07-21",
                              "total": "1176.04",
                              "subtotal": "1064.29",
                              "tax": "111.75",
                              "customer": {
                                "id": 10511,
                                "companyName": "CLECO-PINEVILLE",
                                "contactName": "JERRED MILLER TRANSPORTATION SUPER     "
                              },
                              "salesperson": {
                                "name": "mmarsh"
                              },
                              "finalized": true
                            },
                            {
                              "id": "2-40536",
                              "salesOrderId": 40536,
                              "date": "2025-07-21",
                              "total": "275.26",
                              "subtotal": "248.00",
                              "tax": "27.26",
                              "customer": {
                                "id": 3538,
                                "companyName": "RUSTON ROCK IT LLC",
                                "contactName": "NICK"
                              },
                              "salesperson": {
                                "name": "wgarner"
                              },
                              "finalized": true
                            },
                            {
                              "id": "4-20058",
                              "salesOrderId": 20058,
                              "date": "2025-07-21",
                              "total": "2109.20",
                              "subtotal": "1908.78",
                              "tax": "200.42",
                              "customer": {
                                "id": 10457,
                                "companyName": "GEO TRANSPORT (Holman)",
                                "contactName": "Jacqueline Bellard"
                              },
                              "salesperson": {
                                "name": "mmarsh"
                              },
                              "finalized": true
                            },
                            {
                              "id": "2-40537",
                              "salesOrderId": 40537,
                              "date": "2025-07-21",
                              "total": "6.35",
                              "subtotal": "6.35",
                              "tax": "0.00",
                              "customer": {
                                "id": 2038,
                                "companyName": "KENWORTH OF SOUTH LOUISIANA **PO REQ**",
                                "contactName": "NATHAN WILEY"
                              },
                              "salesperson": {
                                "name": "bsimmons"
                              },
                              "finalized": true
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 8783
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 125,
                "result_count": 87825,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns finalized sales orders only",
                "Orders by date descending",
                "Includes customer and salesperson details",
                "Shows financial metrics (total, subtotal, tax)"
            ],
            "prompt_variations": [
                "Show recent sales performance",
                "Get sales data for the past month",
                "Display finalized sales orders from last 30 days"
            ]
        },
        {
            "id": "customer_balance_analysis_037",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "credit_manager",
            "natural_language_prompt": "What are our top customers by outstanding balance?",
            "verified_graphql_query": "query GetTopCustomersByBalance {\n  customers(\n    filter: { \n      active: true\n      balance: { gt: \"0\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [{ field: \"balance\", direction: DESC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      balance\n      accountLimit\n      phoneNumber\n      active\n      salesPerson {\n        name\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                            {
                              "id": 13972,
                              "companyName": "DLA LAND AND MARITIME",
                              "contactName": "",
                              "balance": "1787000.00",
                              "accountLimit": "1000000.00",
                              "phoneNumber": "",
                              "active": true,
                              "salesPerson": {
                                "name": "rplette"
                              }
                            },
                            {
                              "id": 13575,
                              "companyName": "Vertex Aerospace LLC",
                              "contactName": "FSS A/P",
                              "balance": "401959.84",
                              "accountLimit": "9900.00",
                              "phoneNumber": "",
                              "active": true,
                              "salesPerson": {
                                "name": "rplette"
                              }
                            },
                            {
                              "id": 2359,
                              "companyName": "MTP DRIVETRAIN SERVICES LLC",
                              "contactName": "Joe Boydstun",
                              "balance": "53071.24",
                              "accountLimit": "1000000.00",
                              "phoneNumber": "318-256-2083",
                              "active": true,
                              "salesPerson": {
                                "name": "Monroe House"
                              }
                            },
                            {
                              "id": 16514,
                              "companyName": "CTP Lafayette",
                              "contactName": "",
                              "balance": "47452.48",
                              "accountLimit": "500000.00",
                              "phoneNumber": "",
                              "active": true,
                              "salesPerson": {
                                "name": "ecloud"
                              }
                            },
                            {
                              "id": 1807,
                              "companyName": "HOUSE OF RAEFORD FARMS **PO REQ**",
                              "contactName": "AFFIL NASH JOHNSON & SONS",
                              "balance": "46900.79",
                              "accountLimit": "5000.00",
                              "phoneNumber": "318-263-9004",
                              "active": true,
                              "salesPerson": {
                                "name": "bsimmons"
                              }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 29
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 78,
                "result_count": 145,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters active customers with positive balances",
                "Orders by balance amount descending",
                "Shows customers exceeding credit limits",
                "Includes sales person assignments"
            ],
            "prompt_variations": [
                "Show customers with highest balances",
                "Find accounts with outstanding debt",
                "List top debtors by balance amount"
            ]
        },
        {
            "id": "inventory_high_value_analysis_038",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show me the most valuable inventory we have in stock",
            "verified_graphql_query": "query GetHighValueInventory {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer {\n        name\n      }\n      status\n      cost\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                          {
                            "id": 21933,
                            "partNumber": "m916a1",
                            "description": "TRUCK, Tractor, 6x6, Hydraulic Winch, Freightliner",
                            "retailPrice": "51262.20",
                            "quantity": "1.000000",
                            "manufacturer": null,
                            "status": "A",
                            "cost": "23301.00"
                          },
                          {
                            "id": 7316,
                            "partNumber": "16V149DD3",
                            "description": "16V149 DETROIT DIESEL DDEC III",
                            "retailPrice": "45164.98",
                            "quantity": "2.000000",
                            "manufacturer": {
                              "name": "Detroit"
                            },
                            "status": "A",
                            "cost": "22582.49"
                          },
                          {
                            "id": 194448,
                            "partNumber": "DR7722RX",
                            "description": "RECON ENGINE - See Notes",
                            "retailPrice": "32813.48",
                            "quantity": "1.000000",
                            "manufacturer": null,
                            "status": "A",
                            "cost": "16406.74"
                          },
                          {
                            "id": 162229,
                            "partNumber": "55F4D160G",
                            "description": "CUMMINS 6BT ENGINE REVIVA",
                            "retailPrice": "26252.64",
                            "quantity": "2.000000",
                            "manufacturer": null,
                            "status": "A",
                            "cost": "13126.32"
                          },
                          {
                            "id": 105855,
                            "partNumber": "424909",
                            "description": "YARD SPOTTER HYBRID RADIATOR",
                            "retailPrice": "26100.00",
                            "quantity": "6.000000",
                            "manufacturer": null,
                            "status": "A",
                            "cost": "2900.00"
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 5628
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 112,
                "result_count": 189125,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters active inventory with quantity",
                "Orders by date modified ascending for oldest first",
                "Shows aging analysis with entry/modification dates",
                "Includes cost data for investment tracking"
            ],
            "prompt_variations": [
                "Find old inventory that hasn't moved",
                "Show aging stock analysis",
                "Identify stagnant inventory items"
            ]
        },
        {
            "id": "profitability_analysis_043",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "financial_analyst",
            "natural_language_prompt": "Calculate profit margins on high-value inventory",
            "verified_graphql_query": "query GetProfitabilityAnalysis {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n      jobberPrice: { gt: \"1000\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 8 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      cost\n      quantity\n      manufacturer {\n        name\n      }\n      wholesalePrice\n      jobberPrice\n      distributorPrice\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                          {
                            "id": 21933,
                            "partNumber": "m916a1",
                            "description": "TRUCK, Tractor, 6x6, Hydraulic Winch, Freightliner",
                            "retailPrice": "51262.20",
                            "cost": "23301.00",
                            "quantity": "1.000000",
                            "manufacturer": null,
                            "wholesalePrice": "46602.00",
                            "jobberPrice": "41941.80",
                            "distributorPrice": "0.00"
                          },
                          {
                            "id": 7316,
                            "partNumber": "16V149DD3",
                            "description": "16V149 DETROIT DIESEL DDEC III",
                            "retailPrice": "45164.98",
                            "cost": "22582.49",
                            "quantity": "2.000000",
                            "manufacturer": {
                              "name": "Detroit"
                            },
                            "wholesalePrice": "40648.48",
                            "jobberPrice": "0.00",
                            "distributorPrice": "0.00"
                          },
                          {
                            "id": 194448,
                            "partNumber": "DR7722RX",
                            "description": "RECON ENGINE - See Notes",
                            "retailPrice": "32813.48",
                            "cost": "16406.74",
                            "quantity": "1.000000",
                            "manufacturer": null,
                            "wholesalePrice": "32813.48",
                            "jobberPrice": "32813.48",
                            "distributorPrice": "32813.48"
                          },
                          {
                            "id": 162229,
                            "partNumber": "55F4D160G",
                            "description": "CUMMINS 6BT ENGINE REVIVA",
                            "retailPrice": "26252.64",
                            "cost": "13126.32",
                            "quantity": "2.000000",
                            "manufacturer": null,
                            "wholesalePrice": "26252.64",
                            "jobberPrice": "26252.64",
                            "distributorPrice": "0.00"
                          },
                          {
                            "id": 105855,
                            "partNumber": "424909",
                            "description": "YARD SPOTTER HYBRID RADIATOR",
                            "retailPrice": "26100.00",
                            "cost": "2900.00",
                            "quantity": "6.000000",
                            "manufacturer": null,
                            "wholesalePrice": "26100.00",
                            "jobberPrice": "26100.00",
                            "distributorPrice": "26100.00"
                          },
                          {
                            "id": 106058,
                            "partNumber": "7143971",
                            "description": "LTG SCAB HD S23-190D 717 ABS A REAR AXLE",
                            "retailPrice": "25223.55",
                            "cost": "5044.71",
                            "quantity": "2.000000",
                            "manufacturer": null,
                            "wholesalePrice": "25223.55",
                            "jobberPrice": "25223.55",
                            "distributorPrice": "25223.55"
                          },
                          {
                            "id": 105465,
                            "partNumber": "10339926",
                            "description": "10 LEAF SPRING",
                            "retailPrice": "16132.34",
                            "cost": "1152.31",
                            "quantity": "9.000000",
                            "manufacturer": null,
                            "wholesalePrice": "16132.34",
                            "jobberPrice": "16132.34",
                            "distributorPrice": "16132.34"
                          },
                          {
                            "id": 105411,
                            "partNumber": "10157327",
                            "description": "STEER AXLE DRESSED WITH ABS FRONT AXLE",
                            "retailPrice": "15254.75",
                            "cost": "3050.95",
                            "quantity": "1.000000",
                            "manufacturer": null,
                            "wholesalePrice": "15254.75",
                            "jobberPrice": "15254.75",
                            "distributorPrice": "15254.75"
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 8,
                            "totalPages": 3518
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 98,
                "result_count": 2808,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters high-value inventory over $1000",
                "Includes all pricing tiers for margin analysis",
                "Shows cost data for profit calculations",
                "Orders by retail price for revenue focus"
            ],
            "prompt_variations": [
                "Show profit margins on expensive parts",
                "Analyze pricing tiers and profitability",
                "Calculate margins on high-value items"
            ]
        },
        {
            "id": "customer_credit_risk_analysis_044",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "credit_manager",
            "natural_language_prompt": "Find customers who are over their credit limits",
            "verified_graphql_query": "query GetCreditRiskAnalysis {\n  customers(\n    filter: { \n      active: true\n      balance: { gt: \"0\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [{ field: \"balance\", direction: DESC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      balance\n      accountLimit\n      phoneNumber\n      email\n      salesPerson {\n        name\n      }\n      aging {\n        zeroToThirtyDays\n        thirtyOneToSixtyDays\n        sixtyOneToNinetyDays\n        overOneHundredTwentyDays\n        ninetyOneToOneHundredTwentyDays\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                          {
                            "id": 13972,
                            "companyName": "DLA LAND AND MARITIME",
                            "contactName": "",
                            "balance": "1787000.00",
                            "accountLimit": "1000000.00",
                            "phoneNumber": "",
                            "email": "",
                            "salesPerson": {
                              "name": "rplette"
                            },
                            "aging": {
                              "zeroToThirtyDays": "4922.88",
                              "thirtyOneToSixtyDays": "17770.19",
                              "sixtyOneToNinetyDays": "5935.44",
                              "overOneHundredTwentyDays": "1582.98",
                              "ninetyOneToOneHundredTwentyDays": "16689.30"
                            }
                          },
                          {
                            "id": 13575,
                            "companyName": "Vertex Aerospace LLC",
                            "contactName": "FSS A/P",
                            "balance": "401959.84",
                            "accountLimit": "9900.00",
                            "phoneNumber": "",
                            "email": "",
                            "salesPerson": {
                              "name": "rplette"
                            },
                            "aging": {
                              "zeroToThirtyDays": "0.00",
                              "thirtyOneToSixtyDays": "42521.29",
                              "sixtyOneToNinetyDays": "10549.95",
                              "overOneHundredTwentyDays": "0.00",
                              "ninetyOneToOneHundredTwentyDays": "0.00"
                            }
                          },
                          {
                            "id": 2359,
                            "companyName": "MTP DRIVETRAIN SERVICES LLC",
                            "contactName": "Joe Boydstun",
                            "balance": "53071.24",
                            "accountLimit": "1000000.00",
                            "phoneNumber": "318-256-2083",
                            "email": "accounting@mtpdrivetrain.com",
                            "salesPerson": {
                              "name": "Monroe House"
                            },
                            "aging": {
                              "zeroToThirtyDays": "0.00",
                              "thirtyOneToSixtyDays": "400959.84",
                              "sixtyOneToNinetyDays": "1000.00",
                              "overOneHundredTwentyDays": "0.00",
                              "ninetyOneToOneHundredTwentyDays": "0.00"
                            }
                          },
                          {
                            "id": 16514,
                            "companyName": "CTP Lafayette",
                            "contactName": "",
                            "balance": "47452.48",
                            "accountLimit": "500000.00",
                            "phoneNumber": "",
                            "email": "ap@consolidatedtruck.com",
                            "salesPerson": {
                              "name": "ecloud"
                            },
                            "aging": {
                              "zeroToThirtyDays": "0.00",
                              "thirtyOneToSixtyDays": "419400.00",
                              "sixtyOneToNinetyDays": "393185.00",
                              "overOneHundredTwentyDays": "376090.00",
                              "ninetyOneToOneHundredTwentyDays": "598325.00"
                            }
                          },
                          {
                            "id": 1807,
                            "companyName": "HOUSE OF RAEFORD FARMS **PO REQ**",
                            "contactName": "AFFIL NASH JOHNSON & SONS",
                            "balance": "46900.79",
                            "accountLimit": "5000.00",
                            "phoneNumber": "318-263-9004",
                            "email": "kristie.jackson@houseofraeford.com",
                            "salesPerson": {
                              "name": "bsimmons"
                            },
                            "aging": {
                              "zeroToThirtyDays": "1840.00",
                              "thirtyOneToSixtyDays": "8555.09",
                              "sixtyOneToNinetyDays": "1616.67",
                              "overOneHundredTwentyDays": "29733.84",
                              "ninetyOneToOneHundredTwentyDays": "5706.88"
                            }
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 29
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 156,
                "result_count": 290,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Shows customers with outstanding balances",
                "Includes aging schedule for risk assessment",
                "Compares balance to credit limit",
                "Orders by balance amount for priority"
            ],
            "prompt_variations": [
                "Show credit risk customers",
                "Find accounts over credit limits",
                "Analyze customer credit exposure"
            ]
        },
        {
            "id": "inventory_by_manufacturer_045",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "purchasing_manager",
            "natural_language_prompt": "Show inventory distribution by manufacturer",
            "verified_graphql_query": "query GetInventoryByManufacturer {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n      statuses: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: [manufacturerName_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      quantity\n      retailPrice\n      manufacturer {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                          {
                            "id": 197632,
                            "partNumber": "3819598",
                            "description": "Pulley large cranshaft",
                            "quantity": "2.000000",
                            "retailPrice": "0.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 203008,
                            "partNumber": "6849305",
                            "description": "valve",
                            "quantity": "3.000000",
                            "retailPrice": "25.32",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 203520,
                            "partNumber": "8376253",
                            "description": "Bearing roller cylinder",
                            "quantity": "4.000000",
                            "retailPrice": "0.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 203776,
                            "partNumber": "502-550",
                            "description": "FUEL INJECTION PUMP",
                            "quantity": "1.000000",
                            "retailPrice": "2125.98",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 204544,
                            "partNumber": "",
                            "description": "AC COMPRESSOR ",
                            "quantity": "1.000000",
                            "retailPrice": "719.63",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 87808,
                            "partNumber": "050732",
                            "description": "Temp Sensor Black Inlet/ Outlet",
                            "quantity": "4.000000",
                            "retailPrice": "174.98",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 88320,
                            "partNumber": "19481",
                            "description": "GASKET",
                            "quantity": "5.000000",
                            "retailPrice": "2.74",
                            "manufacturer": null,
                            "category": {
                              "name": "NEW"
                            }
                          },
                          {
                            "id": 88576,
                            "partNumber": "321316",
                            "description": "O-Ring",
                            "quantity": "6.000000",
                            "retailPrice": "5.32",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 89088,
                            "partNumber": "571.LG60R",
                            "description": "S/T/T Light 6 in Oval Red",
                            "quantity": "3.000000",
                            "retailPrice": "4.64",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 90112,
                            "partNumber": "HAS.CS100",
                            "description": "Coolant Treatment",
                            "quantity": "11.000000",
                            "retailPrice": "9.84",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 158208,
                            "partNumber": "1077791",
                            "description": "PISTON, SKIRT",
                            "quantity": "13.000000",
                            "retailPrice": "0.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 92928,
                            "partNumber": "5473296RX",
                            "description": "Core - EGR VALVE KIT",
                            "quantity": "3.000000",
                            "retailPrice": "125.00",
                            "manufacturer": null,
                            "category": {
                              "name": "Core"
                            }
                          },
                          {
                            "id": 158464,
                            "partNumber": "11630528",
                            "description": "CABLE ASSY POWER",
                            "quantity": "1.000000",
                            "retailPrice": "0.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 158976,
                            "partNumber": "12534417",
                            "description": "WATER PUMP 6.5L 94 - 96",
                            "quantity": "2.000000",
                            "retailPrice": "0.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 159232,
                            "partNumber": "14098634R",
                            "description": "pipe fuel inj #4 clean",
                            "quantity": "1.000000",
                            "retailPrice": "0.00",
                            "manufacturer": null,
                            "category": null
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 15,
                            "totalPages": 1883
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 89,
                "result_count": 28245,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Groups inventory by manufacturer",
                "Shows quantity and value metrics",
                "Includes category classification",
                "Orders alphabetically by manufacturer"
            ],
            "prompt_variations": [
                "Analyze inventory by brand",
                "Show parts distribution by manufacturer",
                "Group inventory by supplier"
            ]
        },
        {
            "id": "sales_order_line_analysis_046",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "sales_analyst",
            "natural_language_prompt": "Analyze sales order details and line items for trends",
            "verified_graphql_query": "query GetSalesOrderLineAnalysis {\n  salesOrders(\n    filter: { \n      finalized: true\n      date: { gte: \"2015-07-01\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 3 }\n    orderBy: [date_DESC]\n  ) {\n    items {\n      id\n      salesOrderId\n      date\n      total\n      totalQuantity\n      customer {\n        companyName\n      }\n      lines(pagination: { pageNumber: 1, pageSize: 5 }) {\n        items {\n          id\n          quantity\n          price\n          total\n          inventory {\n            partNumber\n            description\n            manufacturer {\n              name\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
                          {
                            "id": "7-643",
                            "salesOrderId": 643,
                            "date": "2025-07-21",
                            "total": "1264.73",
                            "totalQuantity": "24.000000",
                            "customer": {
                              "companyName": "ENTERPRISE FLEET (AUTO INTEGRATE)"
                            },
                            "lines": {
                              "items": [
                                {
                                  "id": 246456,
                                  "quantity": "1.000000",
                                  "price": "0.00",
                                  "total": "0.00",
                                  "inventory": null
                                },
                                {
                                  "id": 246457,
                                  "quantity": "1.000000",
                                  "price": "275.50",
                                  "total": "275.50",
                                  "inventory": null
                                },
                                {
                                  "id": 246458,
                                  "quantity": "1.000000",
                                  "price": "766.30",
                                  "total": "766.30",
                                  "inventory": null
                                },
                                {
                                  "id": 246459,
                                  "quantity": "1.000000",
                                  "price": "82.50",
                                  "total": "82.50",
                                  "inventory": null
                                },
                                {
                                  "id": 246456,
                                  "quantity": "1.000000",
                                  "price": "0.00",
                                  "total": "0.00",
                                  "inventory": null
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-20054",
                            "salesOrderId": 20054,
                            "date": "2025-07-21",
                            "total": "1834.48",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "CLECO-PINEVILLE"
                            },
                            "lines": {
                              "items": [
                                {
                                  "id": 246461,
                                  "quantity": "1.000000",
                                  "price": "1341.16",
                                  "total": "1341.16",
                                  "inventory": null
                                },
                                {
                                  "id": 246524,
                                  "quantity": "1.000000",
                                  "price": "319.00",
                                  "total": "319.00",
                                  "inventory": null
                                },
                                {
                                  "id": 246461,
                                  "quantity": "1.000000",
                                  "price": "1341.16",
                                  "total": "1341.16",
                                  "inventory": null
                                },
                                {
                                  "id": 246524,
                                  "quantity": "1.000000",
                                  "price": "319.00",
                                  "total": "319.00",
                                  "inventory": null
                                },
                                {
                                  "id": 246461,
                                  "quantity": "1.000000",
                                  "price": "1341.16",
                                  "total": "1341.16",
                                  "inventory": null
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-40532",
                            "salesOrderId": 40532,
                            "date": "2025-07-21",
                            "total": "293.01",
                            "totalQuantity": "3.000000",
                            "customer": {
                              "companyName": "DAVIS BATTON - 318-282-0900"
                            },
                            "lines": {
                              "items": [
                                {
                                  "id": 246465,
                                  "quantity": "1.000000",
                                  "price": "112.00",
                                  "total": "112.00",
                                  "inventory": {
                                    "partNumber": "5-407X",
                                    "description": "JOINT, Universal",
                                    "manufacturer": {
                                      "name": "Spicer"
                                    }
                                  }
                                },
                                {
                                  "id": 246466,
                                  "quantity": "2.000000",
                                  "price": "76.00",
                                  "total": "152.00",
                                  "inventory": {
                                    "partNumber": "5-280X",
                                    "description": "JOINT, Universal SPICER",
                                    "manufacturer": {
                                      "name": "Spicer"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 3,
                            "totalPages": 29276
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 187,
                "result_count": 26349,
                "query_complexity": "very_high"
            },
            "test_assertions": [
                "Shows detailed line item breakdown",
                "Includes product and manufacturer data",
                "Calculates line totals and quantities",
                "Enables product mix analysis"
            ],
            "prompt_variations": [
                "Break down sales by line items",
                "Show product sales details",
                "Analyze sales order composition"
            ]
        },
        {
            "id": "pricing_tier_analysis_048",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "pricing_manager",
            "natural_language_prompt": "Compare pricing tiers across inventory categories",
            "verified_graphql_query": "query GetPricingTierAnalysis {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n      jobberPrice: { gt: \"100\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      wholesalePrice\n      jobberPrice\n      distributorPrice\n      listPrice\n      cost\n      manufacturer {\n        name\n      }\n      category {\n        name\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                          {
                            "id": 21933,
                            "partNumber": "m916a1",
                            "description": "TRUCK, Tractor, 6x6, Hydraulic Winch, Freightliner",
                            "retailPrice": "51262.20",
                            "wholesalePrice": "46602.00",
                            "jobberPrice": "41941.80",
                            "distributorPrice": "0.00",
                            "listPrice": "54291.33",
                            "cost": "23301.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 7316,
                            "partNumber": "16V149DD3",
                            "description": "16V149 DETROIT DIESEL DDEC III",
                            "retailPrice": "45164.98",
                            "wholesalePrice": "40648.48",
                            "jobberPrice": "0.00",
                            "distributorPrice": "0.00",
                            "listPrice": "0.00",
                            "cost": "22582.49",
                            "manufacturer": {
                              "name": "Detroit"
                            },
                            "category": null
                          },
                          {
                            "id": 194448,
                            "partNumber": "DR7722RX",
                            "description": "RECON ENGINE - See Notes",
                            "retailPrice": "32813.48",
                            "wholesalePrice": "32813.48",
                            "jobberPrice": "32813.48",
                            "distributorPrice": "32813.48",
                            "listPrice": "32813.48",
                            "cost": "16406.74",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 162229,
                            "partNumber": "55F4D160G",
                            "description": "CUMMINS 6BT ENGINE REVIVA",
                            "retailPrice": "26252.64",
                            "wholesalePrice": "26252.64",
                            "jobberPrice": "26252.64",
                            "distributorPrice": "0.00",
                            "listPrice": "26252.64",
                            "cost": "13126.32",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 105855,
                            "partNumber": "424909",
                            "description": "YARD SPOTTER HYBRID RADIATOR",
                            "retailPrice": "26100.00",
                            "wholesalePrice": "26100.00",
                            "jobberPrice": "26100.00",
                            "distributorPrice": "26100.00",
                            "listPrice": "26100.00",
                            "cost": "2900.00",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 106058,
                            "partNumber": "7143971",
                            "description": "LTG SCAB HD S23-190D 717 ABS A REAR AXLE",
                            "retailPrice": "25223.55",
                            "wholesalePrice": "25223.55",
                            "jobberPrice": "25223.55",
                            "distributorPrice": "25223.55",
                            "listPrice": "25223.55",
                            "cost": "5044.71",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 105465,
                            "partNumber": "10339926",
                            "description": "10 LEAF SPRING",
                            "retailPrice": "16132.34",
                            "wholesalePrice": "16132.34",
                            "jobberPrice": "16132.34",
                            "distributorPrice": "16132.34",
                            "listPrice": "16132.34",
                            "cost": "1152.31",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 105411,
                            "partNumber": "10157327",
                            "description": "STEER AXLE DRESSED WITH ABS FRONT AXLE",
                            "retailPrice": "15254.75",
                            "wholesalePrice": "15254.75",
                            "jobberPrice": "15254.75",
                            "distributorPrice": "15254.75",
                            "listPrice": "15254.75",
                            "cost": "3050.95",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 202005,
                            "partNumber": "GEP18000131",
                            "description": "6.5NA longblock 100",
                            "retailPrice": "15182.20",
                            "wholesalePrice": "15182.20",
                            "jobberPrice": "15182.20",
                            "distributorPrice": "15182.20",
                            "listPrice": "15182.20",
                            "cost": "7591.10",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 165289,
                            "partNumber": "12414398004",
                            "description": "ENGINE DRESSED W/CONTAINER 3116 FMTV",
                            "retailPrice": "12509.14",
                            "wholesalePrice": "12509.14",
                            "jobberPrice": "12509.14",
                            "distributorPrice": "0.00",
                            "listPrice": "12509.14",
                            "cost": "6254.57",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 8122,
                            "partNumber": "APU-PERKINS",
                            "description": "APU UNIT",
                            "retailPrice": "12278.84",
                            "wholesalePrice": "11050.96",
                            "jobberPrice": "0.00",
                            "distributorPrice": "0.00",
                            "listPrice": "0.00",
                            "cost": "6139.42",
                            "manufacturer": {
                              "name": "Perkins"
                            },
                            "category": null
                          },
                          {
                            "id": 189701,
                            "partNumber": "CRDP1501356W",
                            "description": "CRDP1501 FRONT MACK 3.56 RATIO",
                            "retailPrice": "12140.02",
                            "wholesalePrice": "12140.02",
                            "jobberPrice": "12140.02",
                            "distributorPrice": "12140.02",
                            "listPrice": "15175.03",
                            "cost": "6070.01",
                            "manufacturer": {
                              "name": "Mack"
                            },
                            "category": null
                          },
                          {
                            "id": 105467,
                            "partNumber": "10340029",
                            "description": "RADIATOR/CAC 6BTAA",
                            "retailPrice": "11538.98",
                            "wholesalePrice": "11538.98",
                            "jobberPrice": "11538.98",
                            "distributorPrice": "5769.49",
                            "listPrice": "11538.98",
                            "cost": "5769.49",
                            "manufacturer": null,
                            "category": null
                          },
                          {
                            "id": 11405,
                            "partNumber": "CLT6661ST",
                            "description": "TRANSMISSION",
                            "retailPrice": "10446.60",
                            "wholesalePrice": "9401.94",
                            "jobberPrice": "0.00",
                            "distributorPrice": "0.00",
                            "listPrice": "0.00",
                            "cost": "5223.30",
                            "manufacturer": {
                              "name": "Allison"
                            },
                            "category": null
                          },
                          {
                            "id": 194402,
                            "partNumber": "5501574RX",
                            "description": "KIT, TURBOCHARGER",
                            "retailPrice": "9816.98",
                            "wholesalePrice": "9816.98",
                            "jobberPrice": "9816.98",
                            "distributorPrice": "9816.98",
                            "listPrice": "9816.98",
                            "cost": "4908.49",
                            "manufacturer": null,
                            "category": null
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 15,
                            "totalPages": 1876
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 98,
                "result_count": 5560,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Shows all pricing tiers for comparison",
                "Includes cost for margin calculations",
                "Filters meaningful price ranges",
                "Groups by category for analysis"
            ],
            "prompt_variations": [
                "Analyze pricing strategies",
                "Compare price levels across tiers",
                "Show markup analysis by category"
            ]
        },
        {
            "id": "customer_sales_frequency_049",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "customer_relationship_manager",
            "natural_language_prompt": "Analyze customer purchase frequency and patterns",
            "verified_graphql_query": "query GetCustomerPurchasePatterns {\n  customers(\n    filter: { active: true }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      balance\n      salesPerson {\n        name\n      }\n      salesOrders(\n        filter: { finalized: true, date: { gte: \"2015-01-01\" } }\n        pagination: { pageNumber: 1, pageSize: 10 }\n        orderBy: [date_DESC]\n      ) {\n        items {\n          id\n          date\n          total\n          totalQuantity\n        }\n        pageInfo {\n          totalPages\n        }\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                          {
                            "id": 3333,
                            "companyName": "",
                            "contactName": "Kurt Fussel",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "dphillips"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-1329",
                                  "date": "2015-08-21",
                                  "total": "120.99",
                                  "totalQuantity": "5.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3496,
                            "companyName": "",
                            "contactName": "Byron J. Holton - 318-331-3903",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "wgarner"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2131",
                                  "date": "2015-10-20",
                                  "total": "120.99",
                                  "totalQuantity": "10.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3514,
                            "companyName": "",
                            "contactName": "Jimmy",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "dphillips"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2232",
                                  "date": "2015-10-28",
                                  "total": "214.04",
                                  "totalQuantity": "10.000000"
                                },
                                {
                                  "id": "2-2233",
                                  "date": "2015-10-28",
                                  "total": "10.56",
                                  "totalQuantity": "5.000000"
                                },
                                {
                                  "id": "2-2235",
                                  "date": "2015-10-28",
                                  "total": "-214.04",
                                  "totalQuantity": "0.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3579,
                            "companyName": "",
                            "contactName": "Daks Trucking",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "dphillips"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2512",
                                  "date": "2015-11-20",
                                  "total": "545.51",
                                  "totalQuantity": "45.000000"
                                },
                                {
                                  "id": "2-2522",
                                  "date": "2015-11-23",
                                  "total": "-246.91",
                                  "totalQuantity": "0.000000"
                                },
                                {
                                  "id": "2-2535",
                                  "date": "2015-11-23",
                                  "total": "37.40",
                                  "totalQuantity": "5.000000"
                                },
                                {
                                  "id": "2-2578",
                                  "date": "2015-11-30",
                                  "total": "98.88",
                                  "totalQuantity": "16.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3624,
                            "companyName": "",
                            "contactName": "TONY ROBBINS",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "thester"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2755",
                                  "date": "2015-12-11",
                                  "total": "48.02",
                                  "totalQuantity": "32.000000"
                                },
                                {
                                  "id": "2-2757",
                                  "date": "2015-12-11",
                                  "total": "119.10",
                                  "totalQuantity": "64.000000"
                                },
                                {
                                  "id": "2-3258",
                                  "date": "2016-01-21",
                                  "total": "12.08",
                                  "totalQuantity": "8.000000"
                                },
                                {
                                  "id": "2-3760",
                                  "date": "2016-03-22",
                                  "total": "441.90",
                                  "totalQuantity": "12.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3626,
                            "companyName": "",
                            "contactName": "LANDON",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "thester"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2794",
                                  "date": "2015-12-14",
                                  "total": "14.35",
                                  "totalQuantity": "4.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3656,
                            "companyName": "",
                            "contactName": "MASON DURHAM ",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "svallery"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2960",
                                  "date": "2015-12-29",
                                  "total": "230.08",
                                  "totalQuantity": "4.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3666,
                            "companyName": "",
                            "contactName": "EDDIE",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "thester"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-2972",
                                  "date": "2015-12-30",
                                  "total": "97.89",
                                  "totalQuantity": "4.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3682,
                            "companyName": "",
                            "contactName": "TODD HALE",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "svallery"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-3046",
                                  "date": "2016-01-06",
                                  "total": "654.24",
                                  "totalQuantity": "4.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          },
                          {
                            "id": 3695,
                            "companyName": "",
                            "contactName": "Gabriel Hollis",
                            "balance": "0.00",
                            "salesPerson": {
                              "name": "wgarner"
                            },
                            "salesOrders": {
                              "items": [
                                {
                                  "id": "2-3110",
                                  "date": "2016-01-11",
                                  "total": "214.37",
                                  "totalQuantity": "12.000000"
                                }
                              ],
                              "pageInfo": {
                                "totalPages": 1
                              }
                            }
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 1266
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 245,
                "result_count": 12655,
                "query_complexity": "very_high"
            },
            "test_assertions": [
                "Shows customer purchase history",
                "Enables frequency analysis calculation",
                "Includes order values and quantities",
                "Provides total pages for volume metrics"
            ],
            "prompt_variations": [
                "Show customer buying patterns",
                "Analyze purchase frequency by customer",
                "Track customer order history"
            ]
        },
        {
            "id": "inventory_location_analysis_050",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "warehouse_manager",
            "natural_language_prompt": "Show inventory distribution across warehouse locations",
            "verified_graphql_query": "query GetInventoryLocationAnalysis {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n      statuses: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      quantity\n      retailPrice\n      locations {\n        id\n        location {\n          name\n          description\n        }\n        quantity\n      }\n      manufacturer {\n        name\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                          {
                            "id": 21933,
                            "partNumber": "m916a1",
                            "description": "TRUCK, Tractor, 6x6, Hydraulic Winch, Freightliner",
                            "quantity": "1.000000",
                            "retailPrice": "51262.20",
                            "locations": [
                              {
                                "id": 21958,
                                "location": {
                                  "name": "SY",
                                  "description": "Shop Yard"
                                },
                                "quantity": "1.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 7316,
                            "partNumber": "16V149DD3",
                            "description": "16V149 DETROIT DIESEL DDEC III",
                            "quantity": "2.000000",
                            "retailPrice": "45164.98",
                            "locations": [
                              {
                                "id": 7316,
                                "location": {
                                  "name": "WASHBAY",
                                  "description": "WASHBAY"
                                },
                                "quantity": "2.000000"
                              }
                            ],
                            "manufacturer": {
                              "name": "Detroit"
                            }
                          },
                          {
                            "id": 194448,
                            "partNumber": "DR7722RX",
                            "description": "RECON ENGINE - See Notes",
                            "quantity": "1.000000",
                            "retailPrice": "32813.48",
                            "locations": [
                              {
                                "id": 286835,
                                "location": {
                                  "name": "Main",
                                  "description": null
                                },
                                "quantity": "1.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 162229,
                            "partNumber": "55F4D160G",
                            "description": "CUMMINS 6BT ENGINE REVIVA",
                            "quantity": "2.000000",
                            "retailPrice": "26252.64",
                            "locations": [
                              {
                                "id": 286114,
                                "location": {
                                  "name": "Ship/Rcv-Prod In",
                                  "description": ""
                                },
                                "quantity": "2.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 105855,
                            "partNumber": "424909",
                            "description": "YARD SPOTTER HYBRID RADIATOR",
                            "quantity": "6.000000",
                            "retailPrice": "26100.00",
                            "locations": [
                              {
                                "id": 159379,
                                "location": {
                                  "name": "WALL1",
                                  "description": "WALL1"
                                },
                                "quantity": "6.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 106058,
                            "partNumber": "7143971",
                            "description": "LTG SCAB HD S23-190D 717 ABS A REAR AXLE",
                            "quantity": "2.000000",
                            "retailPrice": "25223.55",
                            "locations": [
                              {
                                "id": 159581,
                                "location": {
                                  "name": "MANY",
                                  "description": "MANY"
                                },
                                "quantity": "2.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 105465,
                            "partNumber": "10339926",
                            "description": "10 LEAF SPRING",
                            "quantity": "9.000000",
                            "retailPrice": "16132.34",
                            "locations": [
                              {
                                "id": 158992,
                                "location": {
                                  "name": "152",
                                  "description": "152"
                                },
                                "quantity": "9.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 105411,
                            "partNumber": "10157327",
                            "description": "STEER AXLE DRESSED WITH ABS FRONT AXLE",
                            "quantity": "1.000000",
                            "retailPrice": "15254.75",
                            "locations": [
                              {
                                "id": 161384,
                                "location": {
                                  "name": "YARD",
                                  "description": "YARD"
                                },
                                "quantity": "1.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 202005,
                            "partNumber": "GEP18000131",
                            "description": "6.5NA longblock 100",
                            "quantity": "1.000000",
                            "retailPrice": "15182.20",
                            "locations": [
                              {
                                "id": 305252,
                                "location": {
                                  "name": "S09 SL4",
                                  "description": "S09 SL4"
                                },
                                "quantity": "1.000000"
                              }
                            ],
                            "manufacturer": null
                          },
                          {
                            "id": 165289,
                            "partNumber": "12414398004",
                            "description": "ENGINE DRESSED W/CONTAINER 3116 FMTV",
                            "quantity": "1.000000",
                            "retailPrice": "12509.14",
                            "locations": [
                              {
                                "id": 289930,
                                "location": {
                                  "name": "WA PNF",
                                  "description": "Western Annex"
                                },
                                "quantity": "1.000000"
                              }
                            ],
                            "manufacturer": null
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 1883
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 142,
                "result_count": 18830,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Shows inventory location details",
                "Includes quantity per location",
                "Enables warehouse optimization analysis",
                "Maps parts to storage areas"
            ],
            "prompt_variations": [
                "Analyze warehouse inventory placement",
                "Show parts location distribution",
                "Map inventory to storage locations"
            ]
        },
        {
            "id": "seasonal_sales_trends_051",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "business_analyst",
            "natural_language_prompt": "Analyze sales trends by month for seasonal patterns",
            "verified_graphql_query": "query GetSeasonalSalesTrends {\n  salesOrders(\n    filter: { \n      finalized: true\n      date: { gte: \"2024-01-01\", lte: \"2024-12-31\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 50 }\n    orderBy: [date_ASC]\n  ) {\n    items {\n      id\n      date\n      total\n      subtotal\n      totalQuantity\n      customer {\n        companyName\n        type\n      }\n      lines(pagination: { pageNumber: 1, pageSize: 3 }) {\n        items {\n          inventory {\n            category {\n              name\n            }\n            manufacturer {\n              name\n            }\n          }\n          quantity\n          total\n        }\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
                          {
                            "id": "3-21998",
                            "date": "2024-01-02",
                            "total": "16.15",
                            "subtotal": "14.67",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "EARTH MOVERS CONSTRUCTION, LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.67"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.67"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35378",
                            "date": "2024-01-02",
                            "total": "352.30",
                            "subtotal": "319.00",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "SOUTHEAST CARRIERS",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "319.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-21999",
                            "date": "2024-01-02",
                            "total": "572.39",
                            "subtotal": "520.00",
                            "totalQuantity": "4.000000",
                            "customer": {
                              "companyName": "JOHNNY JENKINS TRUCKING, LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Mack"
                                    }
                                  },
                                  "quantity": "2.000000",
                                  "total": "520.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Mack"
                                    }
                                  },
                                  "quantity": "2.000000",
                                  "total": "520.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22000",
                            "date": "2024-01-02",
                            "total": "487.24",
                            "subtotal": "442.64",
                            "totalQuantity": "4.000000",
                            "customer": {
                              "companyName": "JOHNNY JENKINS TRUCKING, LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Mack"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "300.36"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Mack"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "142.28"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Mack"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "300.36"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35379",
                            "date": "2024-01-02",
                            "total": "32.80",
                            "subtotal": "32.80",
                            "totalQuantity": "1.000000",
                            "customer": {
                              "companyName": "NORTHEAST TRUCK & TRAILER **PO REQ**",
                              "type": "Truck Parts Store"
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Spicer"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "32.80"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35380",
                            "date": "2024-01-02",
                            "total": "861.40",
                            "subtotal": "779.97",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "G & C FOODS",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "225.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "554.97"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14069",
                            "date": "2024-01-02",
                            "total": "15.91",
                            "subtotal": "14.47",
                            "totalQuantity": "3.000000",
                            "customer": {
                              "companyName": "GERIK LEWIS",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.47"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.47"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.47"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22003",
                            "date": "2024-01-02",
                            "total": "8.56",
                            "subtotal": "7.78",
                            "totalQuantity": "4.000000",
                            "customer": {
                              "companyName": "COLTON ETHERIDGE HAULING LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "6.06"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "1.72"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "6.06"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22004",
                            "date": "2024-01-02",
                            "total": "71.50",
                            "subtotal": "71.50",
                            "totalQuantity": "4.000000",
                            "customer": {
                              "companyName": "PILCHER TRUCKING ",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "71.50"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35383",
                            "date": "2024-01-02",
                            "total": "-675.89",
                            "subtotal": "-612.00",
                            "totalQuantity": "0.000000",
                            "customer": {
                              "companyName": "Merchants Food Service",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Paccar"
                                    }
                                  },
                                  "quantity": "-1.000000",
                                  "total": "-612.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-21982",
                            "date": "2024-01-02",
                            "total": "329.96",
                            "subtotal": "299.76",
                            "totalQuantity": "8.000000",
                            "customer": {
                              "companyName": "AIMWELL TIMBER COMPANY, LLC ",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Dana"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "136.34"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Spicer"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "4.80"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Rockwell"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "12.78"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14068",
                            "date": "2024-01-03",
                            "total": "105.92",
                            "subtotal": "105.92",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "MCQUILLAN & GUILLORY ENTERPRISES LLC *PO REQ*",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "2.000000",
                                  "total": "105.92"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "2.000000",
                                  "total": "105.92"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "2.000000",
                                  "total": "105.92"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35384",
                            "date": "2024-01-03",
                            "total": "10.00",
                            "subtotal": "10.00",
                            "totalQuantity": "1.000000",
                            "customer": {
                              "companyName": "RANDAL LAWSON",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "10.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35385",
                            "date": "2024-01-03",
                            "total": "3146.34",
                            "subtotal": "2848.91",
                            "totalQuantity": "8.000000",
                            "customer": {
                              "companyName": "C&C WEBSTER",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "290.75"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "30.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22005",
                            "date": "2024-01-03",
                            "total": "15.18",
                            "subtotal": "13.79",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "WILLIAMS TRUCK & TRACTOR",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Spicer Select"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "13.79"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Spicer Select"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "13.79"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22006",
                            "date": "2024-01-03",
                            "total": "51.47",
                            "subtotal": "46.76",
                            "totalQuantity": "4.000000",
                            "customer": {
                              "companyName": "FRAZLAND TRANSPORTATION, LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Spicer Select"
                                    }
                                  },
                                  "quantity": "2.000000",
                                  "total": "46.76"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Spicer Select"
                                    }
                                  },
                                  "quantity": "2.000000",
                                  "total": "46.76"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22008",
                            "date": "2024-01-03",
                            "total": "85.33",
                            "subtotal": "77.52",
                            "totalQuantity": "80.000000",
                            "customer": {
                              "companyName": "",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Dayton"
                                    }
                                  },
                                  "quantity": "8.000000",
                                  "total": "44.40"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Dayton"
                                    }
                                  },
                                  "quantity": "16.000000",
                                  "total": "15.84"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Dayton"
                                    }
                                  },
                                  "quantity": "16.000000",
                                  "total": "17.28"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22010",
                            "date": "2024-01-03",
                            "total": "352.09",
                            "subtotal": "319.86",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "KNH TRUCKING AND CONTRACTING",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "319.86"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22011",
                            "date": "2024-01-03",
                            "total": "106.44",
                            "subtotal": "96.70",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "LITES BROS. ASPHALT, INC.",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "96.70"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "96.70"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22012",
                            "date": "2024-01-03",
                            "total": "73.07",
                            "subtotal": "66.38",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "G & G LOGGING, LLC / TIMBER RIDGE",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Misc"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "63.74"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "2.000000",
                                  "total": "2.64"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Misc"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "63.74"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35387",
                            "date": "2024-01-03",
                            "total": "505.93",
                            "subtotal": "458.10",
                            "totalQuantity": "1.000000",
                            "customer": {
                              "companyName": "NBA LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "458.10"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14075",
                            "date": "2024-01-03",
                            "total": "3.83",
                            "subtotal": "3.48",
                            "totalQuantity": "18.000000",
                            "customer": {
                              "companyName": "",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "6.000000",
                                  "total": "3.48"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "6.000000",
                                  "total": "3.48"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "6.000000",
                                  "total": "3.48"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35389",
                            "date": "2024-01-03",
                            "total": "6077.95",
                            "subtotal": "5503.40",
                            "totalQuantity": "7.000000",
                            "customer": {
                              "companyName": "JTB RENTALS LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "246.53"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "1557.10"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35390",
                            "date": "2024-01-03",
                            "total": "1402.01",
                            "subtotal": "1269.48",
                            "totalQuantity": "3.000000",
                            "customer": {
                              "companyName": "DMARIO GRAVES",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "319.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "950.48"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14076",
                            "date": "2024-01-03",
                            "total": "196.26",
                            "subtotal": "178.50",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "Alpha Transport",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "30.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "148.50"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "30.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22013",
                            "date": "2024-01-03",
                            "total": "550.93",
                            "subtotal": "500.50",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "GENTRY WATER WELLS, INC.",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "143.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "357.50"
                                }
                              ]
                            }
                          },
                          {
                            "id": "6-1307",
                            "date": "2024-01-03",
                            "total": "14.20",
                            "subtotal": "14.20",
                            "totalQuantity": "5.000000",
                            "customer": {
                              "companyName": "CTP MANY",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.20"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.20"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "14.20"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22015",
                            "date": "2024-01-03",
                            "total": "357.50",
                            "subtotal": "357.50",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "CTP Alexandria",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Eaton"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "357.50"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Eaton"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "357.50"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35393",
                            "date": "2024-01-03",
                            "total": "1298.98",
                            "subtotal": "1298.98",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "MOREHOUSE PARISH POL JURY IBS# 733750",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "1298.98"
                                }
                              ]
                            }
                          },
                          {
                            "id": "6-1233",
                            "date": "2024-01-03",
                            "total": "186.92",
                            "subtotal": "186.92",
                            "totalQuantity": "5.000000",
                            "customer": {
                              "companyName": "LA ARMY NATIONAL GUARD (CSMS)",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "169.84"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "169.84"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "169.84"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14112",
                            "date": "2024-01-04",
                            "total": "16.89",
                            "subtotal": "15.36",
                            "totalQuantity": "3.000000",
                            "customer": {
                              "companyName": "Jerry Robbins",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "15.36"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "15.36"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "15.36"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14113",
                            "date": "2024-01-04",
                            "total": "697.55",
                            "subtotal": "635.33",
                            "totalQuantity": "9.000000",
                            "customer": {
                              "companyName": "TRAN-SAND INCORPORATED **SIGN REQ**",
                              "type": "Construction Road"
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "584.85"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "29.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "11.48"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22026",
                            "date": "2024-01-04",
                            "total": "523.21",
                            "subtotal": "475.32",
                            "totalQuantity": "8.000000",
                            "customer": {
                              "companyName": "COLTON ETHERIDGE HAULING LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Alliance"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "227.90"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Eaton"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "145.90"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Chicago Rawhide"
                                    }
                                  },
                                  "quantity": "2.000000",
                                  "total": "101.52"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14115",
                            "date": "2024-01-04",
                            "total": "941.69",
                            "subtotal": "856.47",
                            "totalQuantity": "3.000000",
                            "customer": {
                              "companyName": "CLECO-PINEVILLE",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "856.47"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "856.47"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "856.47"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14117",
                            "date": "2024-01-04",
                            "total": "471.07",
                            "subtotal": "428.44",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "428.44"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14119",
                            "date": "2024-01-04",
                            "total": "1071.89",
                            "subtotal": "973.78",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "CLECO-Mansfield",
                              "type": "Utilities"
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "74.25"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "899.53"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "74.25"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35422",
                            "date": "2024-01-04",
                            "total": "2262.26",
                            "subtotal": "2073.46",
                            "totalQuantity": "1.000000",
                            "customer": {
                              "companyName": "Demery Resources Company, LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Perkins"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "1808.46"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14121",
                            "date": "2024-01-04",
                            "total": "378.00",
                            "subtotal": "343.79",
                            "totalQuantity": "9.000000",
                            "customer": {
                              "companyName": "DESIRED CARRIERS, LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "343.79"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14124",
                            "date": "2024-01-04",
                            "total": "999.65",
                            "subtotal": "909.19",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "Barcelo Freight",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "716.69"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "192.50"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "716.69"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22002",
                            "date": "2024-01-04",
                            "total": "1457.51",
                            "subtotal": "1327.91",
                            "totalQuantity": "18.000000",
                            "customer": {
                              "companyName": "KLM LOGGING INC.",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Miscellaneous"
                                    }
                                  },
                                  "quantity": "4.000000",
                                  "total": "178.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Automann"
                                    }
                                  },
                                  "quantity": "4.000000",
                                  "total": "951.68"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Kenworth"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "156.64"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35382",
                            "date": "2024-01-04",
                            "total": "295.17",
                            "subtotal": "272.94",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "EXCO TRUCKING",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "PAI"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "155.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "PAI"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "7.02"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "PAI"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "11.10"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22007",
                            "date": "2024-01-04",
                            "total": "1332.63",
                            "subtotal": "1210.66",
                            "totalQuantity": "4.000000",
                            "customer": {
                              "companyName": "DEEP WELL ENERGIES",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "214.50"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "996.16"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "214.50"
                                }
                              ]
                            }
                          },
                          {
                            "id": "6-1306",
                            "date": "2024-01-04",
                            "total": "1081.50",
                            "subtotal": "1081.50",
                            "totalQuantity": "5.000000",
                            "customer": {
                              "companyName": "Test LLC",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "1050.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "1050.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "1050.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35391",
                            "date": "2024-01-04",
                            "total": "5901.70",
                            "subtotal": "5901.70",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "LOUISIANA DEPT OF TRANS CHASE",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "502.20"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "5399.50"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35392",
                            "date": "2024-01-04",
                            "total": "331.32",
                            "subtotal": "300.00",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "WASTE MANAGEMENT OF NELA **PO REQ**",
                              "type": "Waste"
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "75.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "225.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14079",
                            "date": "2024-01-04",
                            "total": "1057.68",
                            "subtotal": "961.96",
                            "totalQuantity": "9.000000",
                            "customer": {
                              "companyName": "TARVER INDUSTRIES ",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "0.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "887.71"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "74.25"
                                }
                              ]
                            }
                          },
                          {
                            "id": "3-22022",
                            "date": "2024-01-04",
                            "total": "426.19",
                            "subtotal": "426.19",
                            "totalQuantity": "6.000000",
                            "customer": {
                              "companyName": "CTP Alexandria",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Eaton"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "197.89"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Eaton"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "207.46"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": {
                                      "name": "Eaton"
                                    }
                                  },
                                  "quantity": "1.000000",
                                  "total": "20.84"
                                }
                              ]
                            }
                          },
                          {
                            "id": "6-1311",
                            "date": "2024-01-04",
                            "total": "252.36",
                            "subtotal": "252.36",
                            "totalQuantity": "5.000000",
                            "customer": {
                              "companyName": "CTP Alexandria",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "252.36"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "252.36"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "252.36"
                                }
                              ]
                            }
                          },
                          {
                            "id": "2-35416",
                            "date": "2024-01-04",
                            "total": "1005.00",
                            "subtotal": "910.00",
                            "totalQuantity": "2.000000",
                            "customer": {
                              "companyName": "CARDINAL LOGISTICS",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "370.00"
                                },
                                {
                                  "inventory": null,
                                  "quantity": "1.000000",
                                  "total": "540.00"
                                }
                              ]
                            }
                          },
                          {
                            "id": "4-14110",
                            "date": "2024-01-04",
                            "total": "793.26",
                            "subtotal": "793.26",
                            "totalQuantity": "18.000000",
                            "customer": {
                              "companyName": "D&M SUPPLY",
                              "type": ""
                            },
                            "lines": {
                              "items": [
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "520.00"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "53.70"
                                },
                                {
                                  "inventory": {
                                    "category": null,
                                    "manufacturer": null
                                  },
                                  "quantity": "1.000000",
                                  "total": "46.59"
                                }
                              ]
                            }
                          }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 50,
                            "totalPages": 1756
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 298,
                "result_count": 87800,
                "query_complexity": "very_high"
            },
            "test_assertions": [
                "Filters sales by specific date range",
                "Enables monthly grouping analysis",
                "Includes category breakdown for trends",
                "Shows customer type segmentation"
            ],
            "prompt_variations": [
                "Show monthly sales patterns",
                "Analyze seasonal business trends",
                "Track sales by time of year"
            ]
        },
        {
            "id": "service_labor_efficiency_052",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "service_manager",
            "natural_language_prompt": "Analyze service department labor efficiency and rates",
            "verified_graphql_query": "query GetServiceLaborEfficiency {\n  workOrders(\n    filter: { \n      date: { gte: \"2015-07-01\" }\n      closed: true\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [workOrderId_DESC]\n  ) {\n    items {\n      id\n      workOrderId\n      date\n      total\n      customer {\n        companyName\n      }\n      user {\n        name\n      }\n      jobs {\n        id\n        name\n        description\n        laborRate\n        laborCharge\n        partsCharge\n        billingHours\n        expectedHours\n        cost\n        price\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "workOrders": {
                        "items": [
                            {
                              "id": "2-19155",
                              "workOrderId": 19155,
                              "date": "2025-07-21",
                              "total": "1315.51",
                              "customer": {
                                "companyName": "BERRY CHANDLER "
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164389,
                                  "name": "DRIVE TIME TO ROAD CALL ",
                                  "description": "",
                                  "laborRate": "155.00",
                                  "laborCharge": "387.50",
                                  "partsCharge": "0.00",
                                  "billingHours": "2.50",
                                  "expectedHours": 2,
                                  "cost": "57.51",
                                  "price": "426.25"
                                },
                                {
                                  "id": 164390,
                                  "name": "C&A TRUCK LOST ALL AIR AND WONT MOVE ",
                                  "description": "",
                                  "laborRate": "155.00",
                                  "laborCharge": "465.00",
                                  "partsCharge": "247.50",
                                  "billingHours": "3.00",
                                  "expectedHours": 2,
                                  "cost": "220.97",
                                  "price": "759.00"
                                }
                              ]
                            },
                            {
                              "id": "2-19152",
                              "workOrderId": 19152,
                              "date": "2025-07-21",
                              "total": "1146.23",
                              "customer": {
                                "companyName": "Atlas Logistic "
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164360,
                                  "name": "FREE 40 PT INSPECTION",
                                  "description": "",
                                  "laborRate": "0.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "0.00",
                                  "expectedHours": 0,
                                  "cost": "0.00",
                                  "price": "0.00"
                                },
                                {
                                  "id": 164361,
                                  "name": "C&A WHY COOLANT FAN WON'T CUT OFF ",
                                  "description": "ATLAS",
                                  "laborRate": "155.00",
                                  "laborCharge": "232.50",
                                  "partsCharge": "75.00",
                                  "billingHours": "1.50",
                                  "expectedHours": 2,
                                  "cost": "102.31",
                                  "price": "330.75"
                                },
                                {
                                  "id": 164362,
                                  "name": "REPLACE PRIMARY AIR RELAY UNDER CAT WALK ",
                                  "description": "ATLAS",
                                  "laborRate": "155.00",
                                  "laborCharge": "620.00",
                                  "partsCharge": "19.98",
                                  "billingHours": "4.00",
                                  "expectedHours": 4,
                                  "cost": "98.75",
                                  "price": "701.98"
                                }
                              ]
                            },
                            {
                              "id": "2-19148",
                              "workOrderId": 19148,
                              "date": "2025-07-18",
                              "total": "802.35",
                              "customer": {
                                "companyName": "DF LOGISTICS "
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164291,
                                  "name": "FREE 40 PT INSPECTION",
                                  "description": "",
                                  "laborRate": "0.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "0.00",
                                  "expectedHours": 0,
                                  "cost": "0.00",
                                  "price": "0.00"
                                },
                                {
                                  "id": 164292,
                                  "name": "C&A TRUCK IS IN DRATE ",
                                  "description": "",
                                  "laborRate": "155.00",
                                  "laborCharge": "589.00",
                                  "partsCharge": "75.00",
                                  "billingHours": "3.80",
                                  "expectedHours": 2,
                                  "cost": "166.57",
                                  "price": "722.90"
                                }
                              ]
                            },
                            {
                              "id": "2-19146",
                              "workOrderId": 19146,
                              "date": "2025-07-21",
                              "total": "707.56",
                              "customer": {
                                "companyName": "(RSI) Advanced Building Products"
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164268,
                                  "name": "SUBLET INSTALL WINDSHIELD ",
                                  "description": "",
                                  "laborRate": "155.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "637.50",
                                  "billingHours": "0.00",
                                  "expectedHours": 0,
                                  "cost": "0.00",
                                  "price": "637.50"
                                }
                              ]
                            },
                            {
                              "id": "2-19144",
                              "workOrderId": 19144,
                              "date": "2025-07-21",
                              "total": "0.00",
                              "customer": {
                                "companyName": "CTP Monroe - Company Vehicles & Equipment"
                              },
                              "user": {
                                "name": "Smarshall"
                              },
                              "jobs": [
                                {
                                  "id": 164246,
                                  "name": "REPLACE REAR DRIVER SIDE BRAKES",
                                  "description": "",
                                  "laborRate": "0.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "0.00",
                                  "expectedHours": 0,
                                  "cost": "161.68",
                                  "price": "0.00"
                                }
                              ]
                            },
                            {
                              "id": "2-19143",
                              "workOrderId": 19143,
                              "date": "2025-07-18",
                              "total": "493.00",
                              "customer": {
                                "companyName": "WELLER TRUCK PARTS **PO REQ**"
                              },
                              "user": {
                                "name": "wgarner"
                              },
                              "jobs": [
                                {
                                  "id": 164245,
                                  "name": "S400 REMAN - PINION PRELOAD TO TIGHT",
                                  "description": "",
                                  "laborRate": "145.00",
                                  "laborCharge": "435.00",
                                  "partsCharge": "58.00",
                                  "billingHours": "3.00",
                                  "expectedHours": 3,
                                  "cost": "190.77",
                                  "price": "493.00"
                                }
                              ]
                            },
                            {
                              "id": "2-19136",
                              "workOrderId": 19136,
                              "date": "2025-07-17",
                              "total": "0.00",
                              "customer": {
                                "companyName": "B & J ENTERPRISES"
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164138,
                                  "name": "FREE 40 PT INSPECTION",
                                  "description": "",
                                  "laborRate": "0.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "0.00",
                                  "expectedHours": 0,
                                  "cost": "0.00",
                                  "price": "0.00"
                                },
                                {
                                  "id": 164139,
                                  "name": "C&A AIR LEAKING UNDER TRUCK ",
                                  "description": "",
                                  "laborRate": "0.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "0.00",
                                  "expectedHours": 2,
                                  "cost": "41.38",
                                  "price": "0.00"
                                }
                              ]
                            },
                            {
                              "id": "2-19134",
                              "workOrderId": 19134,
                              "date": "2025-07-21",
                              "total": "6010.43",
                              "customer": {
                                "companyName": "STOTT WOOD COMPANY"
                              },
                              "user": {
                                "name": "wgarner"
                              },
                              "jobs": [
                                {
                                  "id": 164107,
                                  "name": "EXCHANGE RTLO18913A 13-SPEED EATON",
                                  "description": "STOTT",
                                  "laborRate": "125.00",
                                  "laborCharge": "432.50",
                                  "partsCharge": "5195.00",
                                  "billingHours": "3.46",
                                  "expectedHours": 2,
                                  "cost": "4294.14",
                                  "price": "5670.75"
                                }
                              ]
                            },
                            {
                              "id": "2-19133",
                              "workOrderId": 19133,
                              "date": "2025-07-16",
                              "total": "378.48",
                              "customer": {
                                "companyName": "RED LINE TRUCKING "
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164046,
                                  "name": "CLEAN CONDENCER  ON TRAILER ",
                                  "description": "",
                                  "laborRate": "155.00",
                                  "laborCharge": "310.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "2.00",
                                  "expectedHours": 2,
                                  "cost": "13.07",
                                  "price": "341.00"
                                }
                              ]
                            },
                            {
                              "id": "2-19132",
                              "workOrderId": 19132,
                              "date": "2025-07-18",
                              "total": "614.33",
                              "customer": {
                                "companyName": "MARK BRANCH"
                              },
                              "user": {
                                "name": "jgabb"
                              },
                              "jobs": [
                                {
                                  "id": 164027,
                                  "name": "FREE 40 PT INSPECTION",
                                  "description": "",
                                  "laborRate": "0.00",
                                  "laborCharge": "0.00",
                                  "partsCharge": "0.00",
                                  "billingHours": "0.00",
                                  "expectedHours": 0,
                                  "cost": "0.00",
                                  "price": "0.00"
                                },
                                {
                                  "id": 164028,
                                  "name": "C&A CODES ON DASH ",
                                  "description": "MARK BRANCH",
                                  "laborRate": "145.00",
                                  "laborCharge": "435.00",
                                  "partsCharge": "75.00",
                                  "billingHours": "3.00",
                                  "expectedHours": 2,
                                  "cost": "177.35",
                                  "price": "553.50"
                                }
                              ]
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 0,
                            "totalPages": 4770
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 198,
                "result_count": 6225,
                "query_complexity": "very_high"
            },
            "test_assertions": [
                "Shows completed work orders with job details",
                "Includes labor rates and actual hours",
                "Compares expected vs billing hours",
                "Enables efficiency calculations by technician"
            ],
            "prompt_variations": [
                "Show service department productivity",
                "Analyze technician efficiency rates",
                "Track labor performance metrics"
            ]
        },
        {
            "id": "top_selling_parts_analysis_053",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "inventory_analyst",
            "natural_language_prompt": "Find our top-selling parts by quantity and revenue",
            "verified_graphql_query": "query GetTopSellingPartsAnalysis {\n  salesOrders(\n    filter: { \n      finalized: true\n      date: { gte: \"2015-06-01\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [date_DESC]\n  ) {\n    items {\n      id\n      date\n      total\n      lines(pagination: { pageNumber: 1, pageSize: 10 }) {\n        items {\n          id\n          quantity\n          price\n          total\n          inventory {\n            id\n            partNumber\n            description\n            manufacturer {\n              name\n            }\n            category {\n              name\n            }\n          }\n        }\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
                            {
                                "id": "7-643",
                                "date": "2025-07-21",
                                "total": "1264.73",
                                "lines": {
                                    "items": [
              {
                "id": 246456,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "id": 246457,
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "inventory": null
              },
              {
                "id": 246458,
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "inventory": null
              },
              {
                "id": 246459,
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "inventory": null
              },
              {
                "id": 246456,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "id": 246457,
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "inventory": null
              },
              {
                "id": 246458,
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "inventory": null
              },
              {
                "id": 246459,
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "inventory": null
              },
              {
                "id": 246456,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "id": 246457,
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "4-20054",
          "date": "2025-07-21",
          "total": "1834.48",
          "lines": {
            "items": [
              {
                "id": 246461,
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "inventory": null
              },
              {
                "id": 246524,
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "inventory": null
              },
              {
                "id": 246461,
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "inventory": null
              },
              {
                "id": 246524,
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "inventory": null
              },
              {
                "id": 246461,
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "inventory": null
              },
              {
                "id": 246524,
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "2-40532",
          "date": "2025-07-21",
          "total": "293.01",
          "lines": {
            "items": [
              {
                "id": 246465,
                "quantity": "1.000000",
                "price": "112.00",
                "total": "112.00",
                "inventory": {
                  "id": 18730,
                  "partNumber": "5-407X",
                  "description": "JOINT, Universal",
                  "manufacturer": {
                    "name": "Spicer"
                  },
                  "category": null
                }
              },
              {
                "id": 246466,
                "quantity": "2.000000",
                "price": "76.00",
                "total": "152.00",
                "inventory": {
                  "id": 18726,
                  "partNumber": "5-280X",
                  "description": "JOINT, Universal SPICER",
                  "manufacturer": {
                    "name": "Spicer"
                  },
                  "category": null
                }
              }
            ]
          }
        },
        {
          "id": "4-20055",
          "date": "2025-07-21",
          "total": "813.53",
          "lines": {
            "items": [
              {
                "id": 246545,
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "inventory": null
              },
              {
                "id": 246545,
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "inventory": null
              },
              {
                "id": 246545,
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "3-24820",
          "date": "2025-07-21",
          "total": "176.69",
          "lines": {
            "items": [
              {
                "id": 246470,
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "inventory": null
              },
              {
                "id": 246470,
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "2-40535",
          "date": "2025-07-21",
          "total": "199.50",
          "lines": {
            "items": [
              {
                "id": 246478,
                "quantity": "1.000000",
                "price": "199.50",
                "total": "199.50",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "4-20056",
          "date": "2025-07-21",
          "total": "1176.04",
          "lines": {
            "items": [
              {
                "id": 246479,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "inventory": null
              },
              {
                "id": 246480,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "inventory": null
              },
              {
                "id": 246479,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "inventory": null
              },
              {
                "id": 246480,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "inventory": null
              },
              {
                "id": 246479,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "inventory": null
              },
              {
                "id": 246480,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "2-40536",
          "date": "2025-07-21",
          "total": "275.26",
          "lines": {
            "items": [
              {
                "id": 246486,
                "quantity": "1.000000",
                "price": "248.00",
                "total": "248.00",
                "inventory": {
                  "id": 21444,
                  "partNumber": "CP25RPLS1",
                  "description": "U-JOINT",
                  "manufacturer": {
                    "name": "Meritor"
                  },
                  "category": null
                }
              }
            ]
          }
        },
        {
          "id": "4-20058",
          "date": "2025-07-21",
          "total": "2109.20",
          "lines": {
            "items": [
              {
                "id": 246487,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "id": 246488,
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "inventory": null
              },
              {
                "id": 246489,
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "inventory": null
              },
              {
                "id": 246487,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "id": 246488,
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "inventory": null
              },
              {
                "id": 246489,
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "inventory": null
              },
              {
                "id": 246487,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "id": 246488,
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "inventory": null
              },
              {
                "id": 246489,
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "inventory": null
              }
            ]
          }
        },
        {
          "id": "2-40537",
          "date": "2025-07-21",
          "total": "6.35",
          "lines": {
            "items": [
              {
                "id": 246490,
                "quantity": "1.000000",
                "price": "6.35",
                "total": "6.35",
                "inventory": {
                  "id": 93809,
                  "partNumber": "35-P-74",
                  "description": "ALLISON PTO MOUNTING GASKET",
                  "manufacturer": {
                    "name": "Chelsea"
                  },
                  "category": null
                }
              }
            ]
          }
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 8797
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 215,
                "result_count": 29260,
                "query_complexity": "very_high"
            },
            "test_assertions": [
                "Shows detailed sales line data for aggregation",
                "Includes part identification and categorization",
                "Enables quantity and revenue ranking",
                "Provides manufacturer breakdown analysis"
            ],
            "prompt_variations": [
                "Show best-selling inventory items",
                "Analyze top revenue generating parts",
                "Find most popular products by sales"
            ]
        },
        {
            "id": "customer_geographic_analysis_054",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "sales_director",
            "natural_language_prompt": "Analyze customer distribution by geographic regions",
            "verified_graphql_query": "query GetCustomerGeographicAnalysis {\n  customers(\n    filter: { active: true }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      salesRegion\n      storeRegion\n      balance\n      salesPerson {\n        name\n      }\n      billingAddress {\n        address1\n        city\n        state\n        zip\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
        {
          "id": 3333,
          "companyName": "",
          "contactName": "Kurt Fussel",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "dphillips"
          },
          "billingAddress": {
            "address1": "",
            "city": "",
            "state": "",
            "zip": ""
          }
        },
        {
          "id": 3496,
          "companyName": "",
          "contactName": "Byron J. Holton - 318-331-3903",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "wgarner"
          },
          "billingAddress": {
            "address1": "153 VFW Road",
            "city": "WEST MONROE",
            "state": "LA",
            "zip": "71291"
          }
        },
        {
          "id": 3514,
          "companyName": "",
          "contactName": "Jimmy",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "dphillips"
          },
          "billingAddress": {
            "address1": "",
            "city": "",
            "state": "",
            "zip": ""
          }
        },
        {
          "id": 3579,
          "companyName": "",
          "contactName": "Daks Trucking",
          "phoneNumber": "318-791-9212",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "dphillips"
          },
          "billingAddress": {
            "address1": "133 TIMBER WAY",
            "city": "MONROE",
            "state": "LA",
            "zip": "71203"
          }
        },
        {
          "id": 3624,
          "companyName": "",
          "contactName": "TONY ROBBINS",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "thester"
          },
          "billingAddress": {
            "address1": "",
            "city": "",
            "state": "",
            "zip": ""
          }
        },
        {
          "id": 3626,
          "companyName": "",
          "contactName": "LANDON",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "thester"
          },
          "billingAddress": {
            "address1": "",
            "city": "",
            "state": "",
            "zip": ""
          }
        },
        {
          "id": 3656,
          "companyName": "",
          "contactName": "MASON DURHAM ",
          "phoneNumber": "318-497-3121",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "svallery"
          },
          "billingAddress": {
            "address1": "305 SPLANE ",
            "city": "WEST MONROE",
            "state": "LA",
            "zip": "71291"
          }
        },
        {
          "id": 3666,
          "companyName": "",
          "contactName": "EDDIE",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "thester"
          },
          "billingAddress": {
            "address1": "",
            "city": "",
            "state": "",
            "zip": ""
          }
        },
        {
          "id": 3682,
          "companyName": "",
          "contactName": "TODD HALE",
          "phoneNumber": "318-794-4695",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "svallery"
          },
          "billingAddress": {
            "address1": "1650 HIGHWAY 122",
            "city": "MONTGOMERY",
            "state": "LA",
            "zip": "71454"
          }
        },
        {
          "id": 3695,
          "companyName": "",
          "contactName": "Gabriel Hollis",
          "phoneNumber": "",
          "salesRegion": null,
          "storeRegion": null,
          "balance": "0.00",
          "salesPerson": {
            "name": "wgarner"
          },
          "billingAddress": {
            "address1": "",
            "city": "Ruston",
            "state": "LA",
            "zip": ""
          }
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 1266
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 156,
                "result_count": 25310,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Includes geographic region classifications",
                "Shows address data for location analysis",
                "Enables sales territory mapping",
                "Provides sales person regional assignments"
            ],
            "prompt_variations": [
                "Show customer locations by region",
                "Analyze sales territory distribution",
                "Map customers by geographic area"
            ]
        },
        {
            "id": "inventory_investment_analysis_055",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "financial_controller",
            "natural_language_prompt": "Calculate total inventory investment and valuation",
            "verified_graphql_query": "query GetInventoryInvestmentAnalysis {\n  inventories(\n    filter: { \n      statuses: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: retailPrice_DESC\n  ) {\n    items {\n      id\n      partNumber\n      description\n      quantity\n      cost\n      averageCost\n      retailPrice\n      wholesalePrice\n      manufacturer {\n        name\n      }\n      category {\n        name\n      }\n      dateEntered\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
        {
          "id": 100086,
          "partNumber": "1853658PE",
          "description": "SECONDARY FAN BELT TENSIONER",
          "quantity": "0.000000",
          "cost": "1853658.00",
          "averageCost": "189.06",
          "retailPrice": "3707316.00",
          "wholesalePrice": "3707316.00",
          "manufacturer": {
            "name": "Paccar"
          },
          "category": null,
          "dateEntered": "2021-12-27T22:36:38.000Z",
          "status": "A"
        },
        {
          "id": 11158,
          "partNumber": "S9810M",
          "description": "S9810M SN# 4320001081",
          "quantity": "0.000000",
          "cost": "130000.00",
          "averageCost": "130000.00",
          "retailPrice": "260000.00",
          "wholesalePrice": "234000.00",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 11218,
          "partNumber": "U-S9800M",
          "description": "9800M USED ALLISON TRANSMISSION",
          "quantity": "0.000000",
          "cost": "57467.53",
          "averageCost": "57467.53",
          "retailPrice": "114935.06",
          "wholesalePrice": "103441.55",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 11157,
          "partNumber": "S60-POWERUNIT-PMP",
          "description": "S60 P/U W/SKID-CLUTCH-PILLOWBLOCK SETUP",
          "quantity": "0.000000",
          "cost": "52145.11",
          "averageCost": "52145.11",
          "retailPrice": "104290.22",
          "wholesalePrice": "93861.20",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 12462,
          "partNumber": "RM-9810M",
          "description": "REBUILT 9810M ALLISON",
          "quantity": "0.000000",
          "cost": "51073.79",
          "averageCost": "51073.79",
          "retailPrice": "102147.58",
          "wholesalePrice": "91932.82",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 743,
          "partNumber": "29546971",
          "description": "KIT S9820 SPE",
          "quantity": "0.000000",
          "cost": "44485.46",
          "averageCost": "44485.46",
          "retailPrice": "88970.92",
          "wholesalePrice": "88970.92",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 11098,
          "partNumber": "RMDP8962",
          "description": "REBUILT DP8962 TRANSMISSION 29541766",
          "quantity": "0.000000",
          "cost": "33002.03",
          "averageCost": "33002.03",
          "retailPrice": "66004.06",
          "wholesalePrice": "59403.65",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 5956,
          "partNumber": "CLT5860-5",
          "description": "CLT5860-5 SN# 30-75643",
          "quantity": "0.000000",
          "cost": "32200.00",
          "averageCost": "32200.00",
          "retailPrice": "64400.00",
          "wholesalePrice": "64400.00",
          "manufacturer": {
            "name": "Allison"
          },
          "category": null,
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        },
        {
          "id": 68107,
          "partNumber": "DR6436RX",
          "description": "ENGINE, ISX 450@1800 RUNNING COMPLETE",
          "quantity": "0.000000",
          "cost": "30415.18",
          "averageCost": "0.00",
          "retailPrice": "60830.36",
          "wholesalePrice": "51705.81",
          "manufacturer": {
            "name": "Cummins"
          },
          "category": null,
          "dateEntered": "2017-06-08T17:13:00.000Z",
          "status": "A"
        },
        {
          "id": 11035,
          "partNumber": "R23536953-PU",
          "description": "SERIES 60 PU WITH HT-750 TRANSMISSION",
          "quantity": "0.000000",
          "cost": "29775.15",
          "averageCost": "29775.15",
          "retailPrice": "59550.30",
          "wholesalePrice": "53595.27",
          "manufacturer": {
            "name": "Detroit"
          },
          "category": null,
          "dateEntered": "2015-08-09T03:50:33.000Z",
          "status": "A"
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 12065
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 178,
                "result_count": 120650,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Shows cost basis for investment calculations",
                "Includes multiple pricing tiers for valuation",
                "Enables inventory aging analysis",
                "Provides data for turn rate calculations"
            ],
            "prompt_variations": [
                "Show total inventory value",
                "Calculate inventory investment levels",
                "Analyze inventory asset valuation"
            ]
        },
        {
            "id": "salesperson_performance_analysis_056",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "sales_manager",
            "natural_language_prompt": "Analyze sales performance by salesperson",
            "verified_graphql_query": "query GetSalespersonPerformance {\n  salesOrders(\n    filter: { \n      finalized: true\n      date: { gte: \"2015-06-01\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: date_DESC\n  ) {\n    items {\n      id\n      salesOrderId\n      date\n      total\n      subtotal\n      totalQuantity\n      salesperson {\n        name\n      }\n      customer {\n        companyName\n        type\n        salesRegion\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
        {
          "id": "7-643",
          "salesOrderId": 643,
          "date": "2025-07-21",
          "total": "1264.73",
          "subtotal": "1160.30",
          "totalQuantity": "24.000000",
          "salesperson": {
            "name": "dmorales"
          },
          "customer": {
            "companyName": "ENTERPRISE FLEET (AUTO INTEGRATE)",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "4-20054",
          "salesOrderId": 20054,
          "date": "2025-07-21",
          "total": "1834.48",
          "subtotal": "1660.16",
          "totalQuantity": "6.000000",
          "salesperson": {
            "name": "mmarsh"
          },
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "2-40532",
          "salesOrderId": 40532,
          "date": "2025-07-21",
          "total": "293.01",
          "subtotal": "264.00",
          "totalQuantity": "3.000000",
          "salesperson": {
            "name": "wgarner"
          },
          "customer": {
            "companyName": "DAVIS BATTON - 318-282-0900",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "4-20055",
          "salesOrderId": 20055,
          "date": "2025-07-21",
          "total": "813.53",
          "subtotal": "736.23",
          "totalQuantity": "3.000000",
          "salesperson": {
            "name": "mmarsh"
          },
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "3-24820",
          "salesOrderId": 24820,
          "date": "2025-07-21",
          "total": "176.69",
          "subtotal": "159.72",
          "totalQuantity": "2.000000",
          "salesperson": {
            "name": "Aolvey"
          },
          "customer": {
            "companyName": "DW STANLY TRUCKING",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "2-40535",
          "salesOrderId": 40535,
          "date": "2025-07-21",
          "total": "199.50",
          "subtotal": "199.50",
          "totalQuantity": "1.000000",
          "salesperson": {
            "name": "jgabb"
          },
          "customer": {
            "companyName": "bastrop fire department ",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "4-20056",
          "salesOrderId": 20056,
          "date": "2025-07-21",
          "total": "1176.04",
          "subtotal": "1064.29",
          "totalQuantity": "6.000000",
          "salesperson": {
            "name": "mmarsh"
          },
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "2-40536",
          "salesOrderId": 40536,
          "date": "2025-07-21",
          "total": "275.26",
          "subtotal": "248.00",
          "totalQuantity": "1.000000",
          "salesperson": {
            "name": "wgarner"
          },
          "customer": {
            "companyName": "RUSTON ROCK IT LLC",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "4-20058",
          "salesOrderId": 20058,
          "date": "2025-07-21",
          "total": "2109.20",
          "subtotal": "1908.78",
          "totalQuantity": "9.000000",
          "salesperson": {
            "name": "mmarsh"
          },
          "customer": {
            "companyName": "GEO TRANSPORT (Holman)",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "2-40537",
          "salesOrderId": 40537,
          "date": "2025-07-21",
          "total": "6.35",
          "subtotal": "6.35",
          "totalQuantity": "1.000000",
          "salesperson": {
            "name": "bsimmons"
          },
          "customer": {
            "companyName": "KENWORTH OF SOUTH LOUISIANA **PO REQ**",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "7-644",
          "salesOrderId": 644,
          "date": "2025-07-21",
          "total": "177.40",
          "subtotal": "162.75",
          "totalQuantity": "6.000000",
          "salesperson": {
            "name": "mmarsh"
          },
          "customer": {
            "companyName": "EFFORT LOGISTICS",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "2-40540",
          "salesOrderId": 40540,
          "date": "2025-07-21",
          "total": "3430.13",
          "subtotal": "3090.49",
          "totalQuantity": "2.000000",
          "salesperson": {
            "name": "vfranklin"
          },
          "customer": {
            "companyName": "B&P ENTERPRISES",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "4-19876",
          "salesOrderId": 19876,
          "date": "2025-07-21",
          "total": "304.50",
          "subtotal": "275.57",
          "totalQuantity": "3.000000",
          "salesperson": null,
          "customer": {
            "companyName": "DERECK MORALES",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "4-20060",
          "salesOrderId": 20060,
          "date": "2025-07-21",
          "total": "176.25",
          "subtotal": "159.50",
          "totalQuantity": "6.000000",
          "salesperson": {
            "name": "mmarsh"
          },
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "type": "",
            "salesRegion": null
          }
        },
        {
          "id": "7-645",
          "salesOrderId": 645,
          "date": "2025-07-21",
          "total": "321.79",
          "subtotal": "295.22",
          "totalQuantity": "6.000000",
          "salesperson": {
            "name": "lbroussard"
          },
          "customer": {
            "companyName": "Anax Transportation",
            "type": "",
            "salesRegion": null
          }
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 15,
                            "totalPages": 5865
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 189,
                "result_count": 58545,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Groups sales data by salesperson",
                "Includes customer type for market analysis",
                "Shows regional performance breakdowns",
                "Enables commission and quota calculations"
            ],
            "prompt_variations": [
                "Show sales rep performance metrics",
                "Analyze salesperson productivity",
                "Track individual sales achievements"
            ]
        },
        {
            "id": "parts_margin_analysis_057",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "pricing_analyst",
            "natural_language_prompt": "Analyze profit margins across different part categories",
            "verified_graphql_query": "query GetPartsMarginAnalysis {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n      jobberPrice: { gt: \"50\" }\n      statuses: [A]\n    }\n    pagination: { pageNumber: 1, pageSize: 12 }\n    orderBy: retailPrice_DESC\n  ) {\n    items {\n      id\n      partNumber\n      description\n      cost\n      averageCost\n      retailPrice\n      wholesalePrice\n      jobberPrice\n      distributorPrice\n      listPrice\n      quantity\n      manufacturer {\n        name\n      }\n      category {\n        name\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
        {
          "id": 21933,
          "partNumber": "m916a1",
          "description": "TRUCK, Tractor, 6x6, Hydraulic Winch, Freightliner",
          "cost": "23301.00",
          "averageCost": "0.00",
          "retailPrice": "51262.20",
          "wholesalePrice": "46602.00",
          "jobberPrice": "41941.80",
          "distributorPrice": "0.00",
          "listPrice": "54291.33",
          "quantity": "1.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 7316,
          "partNumber": "16V149DD3",
          "description": "16V149 DETROIT DIESEL DDEC III",
          "cost": "22582.49",
          "averageCost": "22582.49",
          "retailPrice": "45164.98",
          "wholesalePrice": "40648.48",
          "jobberPrice": "0.00",
          "distributorPrice": "0.00",
          "listPrice": "0.00",
          "quantity": "2.000000",
          "manufacturer": {
            "name": "Detroit"
          },
          "category": null
        },
        {
          "id": 194448,
          "partNumber": "DR7722RX",
          "description": "RECON ENGINE - See Notes",
          "cost": "16406.74",
          "averageCost": "319.82",
          "retailPrice": "32813.48",
          "wholesalePrice": "32813.48",
          "jobberPrice": "32813.48",
          "distributorPrice": "32813.48",
          "listPrice": "32813.48",
          "quantity": "1.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 162229,
          "partNumber": "55F4D160G",
          "description": "CUMMINS 6BT ENGINE REVIVA",
          "cost": "13126.32",
          "averageCost": "4500.00",
          "retailPrice": "26252.64",
          "wholesalePrice": "26252.64",
          "jobberPrice": "26252.64",
          "distributorPrice": "0.00",
          "listPrice": "26252.64",
          "quantity": "2.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 105855,
          "partNumber": "424909",
          "description": "YARD SPOTTER HYBRID RADIATOR",
          "cost": "2900.00",
          "averageCost": "2900.00",
          "retailPrice": "26100.00",
          "wholesalePrice": "26100.00",
          "jobberPrice": "26100.00",
          "distributorPrice": "26100.00",
          "listPrice": "26100.00",
          "quantity": "6.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 106058,
          "partNumber": "7143971",
          "description": "LTG SCAB HD S23-190D 717 ABS A REAR AXLE",
          "cost": "5044.71",
          "averageCost": "5044.71",
          "retailPrice": "25223.55",
          "wholesalePrice": "25223.55",
          "jobberPrice": "25223.55",
          "distributorPrice": "25223.55",
          "listPrice": "25223.55",
          "quantity": "2.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 105465,
          "partNumber": "10339926",
          "description": "10 LEAF SPRING",
          "cost": "1152.31",
          "averageCost": "1152.31",
          "retailPrice": "16132.34",
          "wholesalePrice": "16132.34",
          "jobberPrice": "16132.34",
          "distributorPrice": "16132.34",
          "listPrice": "16132.34",
          "quantity": "9.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 105411,
          "partNumber": "10157327",
          "description": "STEER AXLE DRESSED WITH ABS FRONT AXLE",
          "cost": "3050.95",
          "averageCost": "2678.67",
          "retailPrice": "15254.75",
          "wholesalePrice": "15254.75",
          "jobberPrice": "15254.75",
          "distributorPrice": "15254.75",
          "listPrice": "15254.75",
          "quantity": "1.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 202005,
          "partNumber": "GEP18000131",
          "description": "6.5NA longblock 100",
          "cost": "7591.10",
          "averageCost": "7591.10",
          "retailPrice": "15182.20",
          "wholesalePrice": "15182.20",
          "jobberPrice": "15182.20",
          "distributorPrice": "15182.20",
          "listPrice": "15182.20",
          "quantity": "1.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 165289,
          "partNumber": "12414398004",
          "description": "ENGINE DRESSED W/CONTAINER 3116 FMTV",
          "cost": "6254.57",
          "averageCost": "6254.57",
          "retailPrice": "12509.14",
          "wholesalePrice": "12509.14",
          "jobberPrice": "12509.14",
          "distributorPrice": "0.00",
          "listPrice": "12509.14",
          "quantity": "1.000000",
          "manufacturer": null,
          "category": null
        },
        {
          "id": 8122,
          "partNumber": "APU-PERKINS",
          "description": "APU UNIT",
          "cost": "6139.42",
          "averageCost": "6139.42",
          "retailPrice": "12278.84",
          "wholesalePrice": "11050.96",
          "jobberPrice": "0.00",
          "distributorPrice": "0.00",
          "listPrice": "0.00",
          "quantity": "1.000000",
          "manufacturer": {
            "name": "Perkins"
          },
          "category": null
        },
        {
          "id": 189701,
          "partNumber": "CRDP1501356W",
          "description": "CRDP1501 FRONT MACK 3.56 RATIO",
          "cost": "6070.01",
          "averageCost": "6058.29",
          "retailPrice": "12140.02",
          "wholesalePrice": "12140.02",
          "jobberPrice": "12140.02",
          "distributorPrice": "12140.02",
          "listPrice": "15175.03",
          "quantity": "1.000000",
          "manufacturer": {
            "name": "Mack"
          },
          "category": null
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 12,
                            "totalPages": 2342
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 167,
                "result_count": 18564,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Provides all pricing tiers for margin calculations",
                "Includes cost data for profitability analysis",
                "Filters meaningful price ranges",
                "Enables category-based margin comparison"
            ],
            "prompt_variations": [
                "Calculate profit margins by category",
                "Show markup analysis across parts",
                "Analyze pricing profitability by type"
            ]
        },
        {
            "id": "work_order_cost_analysis_059",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "service_controller",
            "natural_language_prompt": "Analyze work order profitability and cost breakdown",
            "verified_graphql_query": "query GetWorkOrderCostAnalysis {\n  workOrders(\n    filter: { \n      date: { gte: \"2025-07-01\" }\n      closed: true\n      void: false\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: workOrderId_DESC\n  ) {\n    items {\n      id\n      workOrderId\n      date\n      total\n      customer {\n        companyName\n        type\n      }\n      user {\n        name\n      }\n      type {\n        name\n        description\n      }\n      jobs {\n        id\n        name\n        laborRate\n        laborCharge\n        partsCharge\n        cost\n        price\n        billingHours\n        expectedHours\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "workOrders": {
                        "items": [
        {
          "id": "2-19155",
          "workOrderId": 19155,
          "date": "2025-07-21",
          "total": "1315.51",
          "customer": {
            "companyName": "BERRY CHANDLER ",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Mobile Service Order"
          },
          "jobs": [
            {
              "id": 164389,
              "name": "DRIVE TIME TO ROAD CALL ",
              "laborRate": "155.00",
              "laborCharge": "387.50",
              "partsCharge": "0.00",
              "cost": "57.51",
              "price": "426.25",
              "billingHours": "2.50",
              "expectedHours": 2
            },
            {
              "id": 164390,
              "name": "C&A TRUCK LOST ALL AIR AND WONT MOVE ",
              "laborRate": "155.00",
              "laborCharge": "465.00",
              "partsCharge": "247.50",
              "cost": "220.97",
              "price": "759.00",
              "billingHours": "3.00",
              "expectedHours": 2
            }
          ]
        },
        {
          "id": "2-19152",
          "workOrderId": 19152,
          "date": "2025-07-21",
          "total": "1146.23",
          "customer": {
            "companyName": "Atlas Logistic ",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164360,
              "name": "FREE 40 PT INSPECTION",
              "laborRate": "0.00",
              "laborCharge": "0.00",
              "partsCharge": "0.00",
              "cost": "0.00",
              "price": "0.00",
              "billingHours": "0.00",
              "expectedHours": 0
            },
            {
              "id": 164361,
              "name": "C&A WHY COOLANT FAN WON'T CUT OFF ",
              "laborRate": "155.00",
              "laborCharge": "232.50",
              "partsCharge": "75.00",
              "cost": "102.31",
              "price": "330.75",
              "billingHours": "1.50",
              "expectedHours": 2
            },
            {
              "id": 164362,
              "name": "REPLACE PRIMARY AIR RELAY UNDER CAT WALK ",
              "laborRate": "155.00",
              "laborCharge": "620.00",
              "partsCharge": "19.98",
              "cost": "98.75",
              "price": "701.98",
              "billingHours": "4.00",
              "expectedHours": 4
            }
          ]
        },
        {
          "id": "2-19148",
          "workOrderId": 19148,
          "date": "2025-07-18",
          "total": "802.35",
          "customer": {
            "companyName": "DF LOGISTICS ",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164291,
              "name": "FREE 40 PT INSPECTION",
              "laborRate": "0.00",
              "laborCharge": "0.00",
              "partsCharge": "0.00",
              "cost": "0.00",
              "price": "0.00",
              "billingHours": "0.00",
              "expectedHours": 0
            },
            {
              "id": 164292,
              "name": "C&A TRUCK IS IN DRATE ",
              "laborRate": "155.00",
              "laborCharge": "589.00",
              "partsCharge": "75.00",
              "cost": "166.57",
              "price": "722.90",
              "billingHours": "3.80",
              "expectedHours": 2
            }
          ]
        },
        {
          "id": "2-19146",
          "workOrderId": 19146,
          "date": "2025-07-21",
          "total": "707.56",
          "customer": {
            "companyName": "(RSI) Advanced Building Products",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164268,
              "name": "SUBLET INSTALL WINDSHIELD ",
              "laborRate": "155.00",
              "laborCharge": "0.00",
              "partsCharge": "637.50",
              "cost": "0.00",
              "price": "637.50",
              "billingHours": "0.00",
              "expectedHours": 0
            }
          ]
        },
        {
          "id": "2-19144",
          "workOrderId": 19144,
          "date": "2025-07-21",
          "total": "0.00",
          "customer": {
            "companyName": "CTP Monroe - Company Vehicles & Equipment",
            "type": ""
          },
          "user": {
            "name": "Smarshall"
          },
          "type": {
            "name": "Company Vehicle or Equipment"
          },
          "jobs": [
            {
              "id": 164246,
              "name": "REPLACE REAR DRIVER SIDE BRAKES",
              "laborRate": "0.00",
              "laborCharge": "0.00",
              "partsCharge": "0.00",
              "cost": "161.68",
              "price": "0.00",
              "billingHours": "0.00",
              "expectedHours": 0
            }
          ]
        },
        {
          "id": "2-19143",
          "workOrderId": 19143,
          "date": "2025-07-18",
          "total": "493.00",
          "customer": {
            "companyName": "WELLER TRUCK PARTS **PO REQ**",
            "type": ""
          },
          "user": {
            "name": "wgarner"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164245,
              "name": "S400 REMAN - PINION PRELOAD TO TIGHT",
              "laborRate": "145.00",
              "laborCharge": "435.00",
              "partsCharge": "58.00",
              "cost": "190.77",
              "price": "493.00",
              "billingHours": "3.00",
              "expectedHours": 3
            }
          ]
        },
        {
          "id": "2-19136",
          "workOrderId": 19136,
          "date": "2025-07-17",
          "total": "0.00",
          "customer": {
            "companyName": "B & J ENTERPRISES",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164138,
              "name": "FREE 40 PT INSPECTION",
              "laborRate": "0.00",
              "laborCharge": "0.00",
              "partsCharge": "0.00",
              "cost": "0.00",
              "price": "0.00",
              "billingHours": "0.00",
              "expectedHours": 0
            },
            {
              "id": 164139,
              "name": "C&A AIR LEAKING UNDER TRUCK ",
              "laborRate": "0.00",
              "laborCharge": "0.00",
              "partsCharge": "0.00",
              "cost": "41.38",
              "price": "0.00",
              "billingHours": "0.00",
              "expectedHours": 2
            }
          ]
        },
        {
          "id": "2-19134",
          "workOrderId": 19134,
          "date": "2025-07-21",
          "total": "6010.43",
          "customer": {
            "companyName": "STOTT WOOD COMPANY",
            "type": ""
          },
          "user": {
            "name": "wgarner"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164107,
              "name": "EXCHANGE RTLO18913A 13-SPEED EATON",
              "laborRate": "125.00",
              "laborCharge": "432.50",
              "partsCharge": "5195.00",
              "cost": "4294.14",
              "price": "5670.75",
              "billingHours": "3.46",
              "expectedHours": 2
            }
          ]
        },
        {
          "id": "2-19133",
          "workOrderId": 19133,
          "date": "2025-07-16",
          "total": "378.48",
          "customer": {
            "companyName": "RED LINE TRUCKING ",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164046,
              "name": "CLEAN CONDENCER  ON TRAILER ",
              "laborRate": "155.00",
              "laborCharge": "310.00",
              "partsCharge": "0.00",
              "cost": "13.07",
              "price": "341.00",
              "billingHours": "2.00",
              "expectedHours": 2
            }
          ]
        },
        {
          "id": "2-19132",
          "workOrderId": 19132,
          "date": "2025-07-18",
          "total": "614.33",
          "customer": {
            "companyName": "MARK BRANCH",
            "type": ""
          },
          "user": {
            "name": "jgabb"
          },
          "type": {
            "name": "Service Order"
          },
          "jobs": [
            {
              "id": 164027,
              "name": "FREE 40 PT INSPECTION",
              "laborRate": "0.00",
              "laborCharge": "0.00",
              "partsCharge": "0.00",
              "cost": "0.00",
              "price": "0.00",
              "billingHours": "0.00",
              "expectedHours": 0
            },
            {
              "id": 164028,
              "name": "C&A CODES ON DASH ",
              "laborRate": "145.00",
              "laborCharge": "435.00",
              "partsCharge": "75.00",
              "cost": "177.35",
              "price": "553.50",
              "billingHours": "3.00",
              "expectedHours": 2
            }
          ]
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 33
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 234,
                "result_count": 5435,
                "query_complexity": "very_high"
            },
            "test_assertions": [
                "Shows detailed cost and pricing breakdown",
                "Includes labor efficiency comparisons",
                "Enables profitability analysis by job type",
                "Provides customer type segmentation"
            ],
            "prompt_variations": [
                "Analyze service department profitability",
                "Show work order cost breakdown",
                "Calculate service margin analysis"
            ]
        },
        {
            "id": "manufacturer_performance_analysis_039",
            "category": "analytics",
            "complexity": 3,
            "user_persona": "purchasing_manager",
            "natural_language_prompt": "Show me Mack parts inventory and performance",
            "verified_graphql_query": "query GetMackInventoryPerformance {\n  inventories(\n    filter: { \n      quantity: { gt: \"0\" }\n      manufacturerId: 7\n    }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: retailPrice_DESC\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer {\n        id\n        name\n      }\n      status\n      cost\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
        {
          "id": 189701,
          "partNumber": "CRDP1501356W",
          "description": "CRDP1501 FRONT MACK 3.56 RATIO",
          "retailPrice": "12140.02",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "6070.01"
        },
        {
          "id": 190963,
          "partNumber": "GD CRD203-435",
          "description": "REAR CRD203 MACK DIFF 4.35 RATIO - EXCH...",
          "retailPrice": "8000.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "4000.00"
        },
        {
          "id": 11603,
          "partNumber": "T2180B",
          "description": "REMAN TRANSMISSION",
          "retailPrice": "7600.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "3800.00"
        },
        {
          "id": 23089,
          "partNumber": "CRDP-L202-435",
          "description": "UNIT, Differential, Reman, Mack, Front, W/ Lockout, W/O Support Case",
          "retailPrice": "6387.58",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "3193.79"
        },
        {
          "id": 11812,
          "partNumber": "T2180-B-C",
          "description": "REMAN TRANSMISSION (CORE)",
          "retailPrice": "6240.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "3000.00"
        },
        {
          "id": 66306,
          "partNumber": "CRDPL92-5.55",
          "description": "REMAN DIFFERENTIAL",
          "retailPrice": "4160.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "2000.00"
        },
        {
          "id": 101124,
          "partNumber": "23753850",
          "description": "DEF PUMP",
          "retailPrice": "3338.94",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "1669.47"
        },
        {
          "id": 46025,
          "partNumber": "DIF-CRDL92-3.65 #15",
          "description": "REBUILT EXCHANGE\n",
          "retailPrice": "3250.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "0.00"
        },
        {
          "id": 22490,
          "partNumber": "CTP-CRDPL92-4.42",
          "description": "UNIT, Differential, Rebuilt",
          "retailPrice": "3185.14",
          "quantity": "2.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "1592.57"
        },
        {
          "id": 204202,
          "partNumber": "23030732",
          "description": "FLYWHEEL HOUSING",
          "retailPrice": "3075.84",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "1537.92"
        },
        {
          "id": 79783,
          "partNumber": "22423434",
          "description": "UNIT, Control",
          "retailPrice": "2888.24",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "1444.12"
        },
        {
          "id": 179527,
          "partNumber": "21745603",
          "description": "FUEL PUMP AND POWERSTEERING PUMP ASSEMBLY",
          "retailPrice": "2873.30",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "1436.65"
        },
        {
          "id": 203377,
          "partNumber": "85023805",
          "description": "Core - REMACK--CRD 151  4.80 RATIO  FINE SPLINE\r\nSTRADLE MOUNT 4 STUDS IN BACK \r\n",
          "retailPrice": "2800.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "2800.00"
        },
        {
          "id": 45899,
          "partNumber": "DIF-CRD92-417",
          "description": "REBUILT EXCHANGE\n",
          "retailPrice": "2750.00",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "0.00"
        },
        {
          "id": 85428,
          "partNumber": "22581042",
          "description": "UNIT, Control",
          "retailPrice": "2699.16",
          "quantity": "1.000000",
          "manufacturer": {
            "id": 7,
            "name": "Mack"
          },
          "status": "A",
          "cost": "1349.58"
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 15,
                            "totalPages": 71
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 82,
                "result_count": 1055,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters by specific manufacturer (Mack)",
                "Shows only in-stock items",
                "Returns high-value items like differentials and transmissions",
                "Orders by retail price for profitability analysis"
            ],
            "prompt_variations": [
                "Analyze Mack parts inventory",
                "Show Mack truck components in stock",
                "Display Mack manufacturer performance"
            ]
        },
        {
            "id": "sales_by_customer_analysis_041",
            "category": "analytics",
            "complexity": 4,
            "user_persona": "sales_manager",
            "natural_language_prompt": "Show me sales totals grouped by customer for top buyers",
            "verified_graphql_query": "query GetSalesByCustomer {\n  salesOrders(\n    filter: { \n      finalized: true\n      date: { gte: \"2025-01-01\" }\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [date_DESC]\n  ) {\n    items {\n      id\n      total\n      date\n      customer {\n        id\n        companyName\n        contactName\n        balance\n        accountLimit\n      }\n      salesperson {\n        name\n      }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
        {
          "id": "7-648",
          "total": "343.01",
          "date": "2025-07-21",
          "customer": {
            "id": 18316,
            "companyName": "GO POWER",
            "contactName": "DENNIS",
            "balance": "0.00",
            "accountLimit": "0.00"
          },
          "salesperson": {
            "name": "mmarsh"
          }
        },
        {
          "id": "7-645",
          "total": "321.79",
          "date": "2025-07-21",
          "customer": {
            "id": 18307,
            "companyName": "Anax Transportation",
            "contactName": "Hugo Saravia",
            "balance": "0.00",
            "accountLimit": "0.00"
          },
          "salesperson": {
            "name": "lbroussard"
          }
        },
        {
          "id": "7-644",
          "total": "177.40",
          "date": "2025-07-21",
          "customer": {
            "id": 18306,
            "companyName": "EFFORT LOGISTICS",
            "contactName": "JACK MIRZA",
            "balance": "0.00",
            "accountLimit": "0.00"
          },
          "salesperson": {
            "name": "mmarsh"
          }
        },
        {
          "id": "7-643",
          "total": "1264.73",
          "date": "2025-07-21",
          "customer": {
            "id": 11575,
            "companyName": "ENTERPRISE FLEET (AUTO INTEGRATE)",
            "contactName": "STEVEN ESTES",
            "balance": "10276.62",
            "accountLimit": "0.00"
          },
          "salesperson": {
            "name": "dmorales"
          }
        },
        {
          "id": "7-642",
          "total": "729.40",
          "date": "2025-07-21",
          "customer": {
            "id": 17426,
            "companyName": "Sunbelt Rentals  (BILLED WITH FLEET NET)",
            "contactName": "Cameron McIntyre",
            "balance": "729.40",
            "accountLimit": "0.00"
          },
          "salesperson": {
            "name": "lbroussard"
          }
        },
        {
          "id": "7-635",
          "total": "0.00",
          "date": "2025-07-21",
          "customer": {
            "id": 16681,
            "companyName": "CTP Lafayette Warranty",
            "contactName": "Melissa Marsh",
            "balance": "0.00",
            "accountLimit": "0.00"
          },
          "salesperson": {
            "name": "bstroup"
          }
        },
        {
          "id": "6-2526",
          "total": "1340.59",
          "date": "2025-07-21",
          "customer": {
            "id": 7496,
            "companyName": "LA ARMY NATIONAL GUARD (CSMS)",
            "contactName": "",
            "balance": "0.00",
            "accountLimit": "1000000.00"
          },
          "salesperson": {
            "name": "dhansen"
          }
        },
        {
          "id": "6-2473",
          "total": "18848.00",
          "date": "2025-07-21",
          "customer": {
            "id": 13465,
            "companyName": "LetterKenny Army Depot",
            "contactName": "",
            "balance": "18848.00",
            "accountLimit": "100000.00"
          },
          "salesperson": {
            "name": "jboydstun"
          }
        },
        {
          "id": "5-576",
          "total": "574.08",
          "date": "2025-07-21",
          "customer": {
            "id": 2100,
            "companyName": "LAZER LOGISTICS INC **PO REQ**",
            "contactName": "Johnny Marlow",
            "balance": "7851.73",
            "accountLimit": "9900.00"
          },
          "salesperson": {
            "name": "rudy"
          }
        },
        {
          "id": "5-566",
          "total": "484.56",
          "date": "2025-07-21",
          "customer": {
            "id": 12331,
            "companyName": "Hugg & Hall Equipment Company",
            "contactName": "Tim Waychoff",
            "balance": "484.56",
            "accountLimit": "7500.00"
          },
          "salesperson": {
            "name": "rlorance"
          }
        }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 8783
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 145,
                "result_count": 87825,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns finalized sales only",
                "Includes customer financial data",
                "Shows salesperson for commission tracking",
                "Enables grouping analysis by customer"
            ],
            "prompt_variations": [
                "Analyze sales by customer",
                "Show customer purchase totals",
                "Group sales data by buyer"
            ]
        }
    ]
}


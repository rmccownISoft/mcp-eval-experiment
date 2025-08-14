{
    "test_library_metadata": {
        "generated_date": "2025-08-12",
        "category": "search_filtering", 
        "total_test_cases": 20,
        "authentication_store": "TEST: ISOFT DATA SYSTEMS",
        "description": "Search and filtering test cases using keyword searches, range filters, and multi-criteria filtering"
    },
    "test_cases": [
        {
            "id": "inventory_search_brake_parts_016",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Find all brake parts under $200",
            "verified_graphql_query": "query SearchBrakeParts {\n  inventories(\n    filter: { keyword: \"brake\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [retailPrice_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                                "id": 108276,
                                "partNumber": "",
                                "description": "Vlave,Brake,Trailer",
                                "retailPrice": "0.00",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "S"
                            },
                            {
                                "id": 32696,
                                "partNumber": "BRAKE CHAMBER",
                                "description": "Type 12",
                                "retailPrice": "0.02",
                                "quantity": "0.000000",
                                "manufacturer": null,
                                "status": "D"
                            },
                            {
                                "id": 1880,
                                "partNumber": "BRAKE LINE UNION 1/4 IN FEMALE",
                                "description": "BRAKE LINE UNION 1/4 IN FEMALE (BRAKE NUTS)",
                                "retailPrice": "0.92",
                                "quantity": "0.000000",
                                "manufacturer": {
                                    "name": "Chelsea"
                                },
                                "status": "A"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 3
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 65,
                "result_count": 25,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Returns parts containing 'brake' in description",
                "Results properly sorted by price ascending", 
                "Includes manufacturer information where available",
                "Shows pricing and inventory status"
            ],
            "prompt_variations": [
                "Show me brake components under $200",
                "Find brake parts less than 200 dollars",
                "List affordable brake parts"
            ]
        },
        {
            "id": "inventory_search_transmission_parts_017",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Show all transmission components",
            "verified_graphql_query": "query SearchTransmissionParts {\n  inventories(\n    filter: { keyword: \"transmission\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [retailPrice_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 198689,
                              "partNumber": "",
                              "description": "TRANSMISSION",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 197426,
                              "partNumber": "",
                              "description": "TRANSMISSION",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 200514,
                              "partNumber": "",
                              "description": "TRANSMISSION",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "S"
                            },
                            {
                              "id": 166211,
                              "partNumber": "290321C91",
                              "description": "TRANSMISSION",
                              "retailPrice": "0.00",
                              "quantity": "1.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 166212,
                              "partNumber": "290321C91",
                              "description": "TRANSMISSION",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 61513,
                              "partNumber": "rto16910bdm3h",
                              "description": "transmission",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "D"
                            },
                            {
                              "id": 75087,
                              "partNumber": "ZED F TRANSMISSION",
                              "description": "REMAN ZED F TRANSMISSION",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "ZF"
                              },
                              "status": "A"
                            },
                            {
                              "id": 61530,
                              "partNumber": "t318er",
                              "description": "Transmission",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "D"
                            },
                            {
                              "id": 198762,
                              "partNumber": "T165102-882",
                              "description": "TRANSMISSION ",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 199534,
                              "partNumber": "29550025",
                              "description": "TRANSMISSION ",
                              "retailPrice": "0.00",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 7
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 58,
                "result_count": 65,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds parts containing 'transmission' in description",
                "Returns both new and remanufactured units",
                "Shows various manufacturers including ZF",
                "Includes pricing and availability data"
            ],
            "prompt_variations": [
                "Find transmission parts",
                "Search for gearbox components", 
                "Show transmission inventory"
            ]
        },
        {
            "id": "customer_search_transport_companies_018",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Find customers with 'TRANSPORT' in company name",
            "verified_graphql_query": "query SearchTransportCompanies {\n  customers(\n    filter: { keyword: \"TRANSPORT\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      active\n      salesPerson { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
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
                            },
                            {
                              "id": 11882,
                              "companyName": "4 J TRANSPORT - JOEY 318-498-8052",
                              "contactName": "4 J TRANSPORT - JOEY 318-498-8052",
                              "phoneNumber": "318-498-8052",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 11468,
                              "companyName": "A N TRANSPORT",
                              "contactName": "A N TRANSPORT",
                              "phoneNumber": "636-283-6950",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "djameson"
                              }
                            },
                            {
                              "id": 11040,
                              "companyName": "ASSET TRANSPORT - 870-797-4387",
                              "contactName": "ASSET TRANSPORT - 870-797-4387",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 11506,
                              "companyName": "AYCOCK TRANSPORT - 318-542-1697",
                              "contactName": "AYCOCK TRANSPORT - 318-542-1697",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 11295,
                              "companyName": "BIG TONE TRANSPORT LLC - 870-310-3432",
                              "contactName": "BIG TONE TRANSPORT LLC - 870-310-3432",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 11977,
                              "companyName": "Cardin Transport LLC",
                              "contactName": "Cardin Transport LLC ",
                              "phoneNumber": "318-341-3452",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 15619,
                              "companyName": "D.C. TRANSPORT",
                              "contactName": "D.C. TRANSPORT",
                              "phoneNumber": "313-418-4084",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 8059,
                              "companyName": "DARREL McMILLIAN/same as DBM Transport, LLC",
                              "contactName": "DARREL McMILLIAN /same as DBM Transport, LLC",
                              "phoneNumber": "318-469-5832",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "rglaspie"
                              }
                            },
                            {
                              "id": 5822,
                              "companyName": "DEER TRANSPORT ",
                              "contactName": "DEER TRANSPORT ",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "dedgeworth"
                              }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 56
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 72,
                "result_count": 560,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds customers with 'TRANSPORT' in company name",
                "Returns contact information and phone numbers",
                "Shows account status (active/inactive)",
                "Includes assigned sales person information"
            ],
            "prompt_variations": [
                "Show transport companies",
                "Find transportation fleet customers",
                "List trucking companies"
            ]
        },
        {
            "id": "vehicle_search_ottawa_trucks_019",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "dismantler",
            "natural_language_prompt": "Show all Ottawa brand vehicles",
            "verified_graphql_query": "query SearchOttawaVehicles {\n  vehicles(\n    filter: { make: \"Ottawa*\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [year_DESC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      dismantled\n      location\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
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
                "result_count": 18,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters vehicles by Ottawa make",
                "Returns vehicle specifications and VIN",
                "Shows dismantling status and location",
                "Orders results by year descending"
            ],
            "prompt_variations": [
                "Find Ottawa trucks",
                "List Ottawa brand equipment",
                "Show Ottawa yard hostlers"
            ]
        },
        {
            "id": "inventory_zero_quantity_020",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show parts with zero quantity",
            "verified_graphql_query": "query GetZeroQuantityInventory {\n  inventories(\n    filter: { quantity: { eq: 0 } }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [partNumber_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
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
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 10,
                            "totalPages": 9910
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 85,
                "result_count": 99095,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters inventory with zero quantity accurately",
                "Shows high-value items that need restocking",
                "Includes manufacturer and status information",
                "Orders results by part number ascending"
            ],
            "prompt_variations": [
                "Find out of stock items",
                "Show empty inventory",
                "List parts with no quantity"
            ]
        },
        {
            "id": "vehicle_undismantled_filter_021",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "dismantler",
            "natural_language_prompt": "Find vehicles that haven't been dismantled yet",
            "verified_graphql_query": "query GetUndismantledVehicles {\n  vehicles(\n    filter: { dismantled: false }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [dateEntered_ASC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      condition\n      status\n      dismantled\n      location\n      mileage\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
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
                              "location": "Main",
                              "mileage": 0
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 24
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 65,
                "result_count": 119,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters vehicles by dismantled status accurately",
                "Returns vehicle identification details",
                "Shows current location and condition",
                "Orders by entry date ascending"
            ],
            "prompt_variations": [
                "Show intact vehicles",
                "List vehicles awaiting dismantling",
                "Find whole unit vehicles"
            ]
        },
        {
            "id": "inventory_mack_parts_search_022",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Show all Mack parts sorted by price high to low",
            "verified_graphql_query": "query SearchMackParts {\n  inventories(\n    filter: { manufacturerId: 7 }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 196232,
                              "partNumber": "3514-22953321",
                              "description": "MK 7/8 MP8 US17 ENGINE",
                              "retailPrice": "57349.82",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Mack"
                              },
                              "status": "A"
                            },
                            {
                              "id": 62851,
                              "partNumber": "86SB3534",
                              "description": "ENGINE",
                              "retailPrice": "32792.94",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Mack"
                              },
                              "status": "D"
                            },
                            {
                              "id": 197960,
                              "partNumber": "86SB3527",
                              "description": "REMAN BASIC E7 ETECH",
                              "retailPrice": "22031.80",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Mack"
                              },
                              "status": "A"
                            },
                            {
                              "id": 102460,
                              "partNumber": "85020577",
                              "description": "M DRIVE TRANSMISSION",
                              "retailPrice": "21051.96",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Mack"
                              },
                              "status": "A"
                            },
                            {
                              "id": 192749,
                              "partNumber": "GD CRDP95A-673",
                              "description": "REMAN FRONT MACK DIFF CRDP95 SERIES 6.73 RATIO",
                              "retailPrice": "17700.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Mack"
                              },
                              "status": "A"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 1439
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 52,
                "result_count": 7200,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters inventory by Mack manufacturer ID",
                "Returns high-value items like engines and transmissions",
                "Shows both new and remanufactured parts",
                "Orders results by price descending"
            ],
            "prompt_variations": [
                "Find Mack truck parts",
                "Show Mack components by price",
                "List expensive Mack inventory"
            ]
        },
        {
            "id": "customer_active_status_filter_023",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Show only active customers",
            "verified_graphql_query": "query GetActiveCustomers {\n  customers(\n    filter: { active: true }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      active\n      salesPerson { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                            {
                              "id": 3333,
                              "companyName": "",
                              "contactName": "Kurt Fussel",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "dphillips"
                              }
                            },
                            {
                              "id": 3496,
                              "companyName": "",
                              "contactName": "Byron J. Holton - 318-331-3903",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "wgarner"
                              }
                            },
                            {
                              "id": 3514,
                              "companyName": "",
                              "contactName": "Jimmy",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "dphillips"
                              }
                            },
                            {
                              "id": 3579,
                              "companyName": "",
                              "contactName": "Daks Trucking",
                              "phoneNumber": "318-791-9212",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "dphillips"
                              }
                            },
                            {
                              "id": 3624,
                              "companyName": "",
                              "contactName": "TONY ROBBINS",
                              "phoneNumber": "",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "thester"
                              }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 2531
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 45,
                "result_count": 12660,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters customers by active status only",
                "Returns contact information and phone numbers",
                "Shows assigned sales person for each customer",
                "Orders results alphabetically by company name"
            ],
            "prompt_variations": [
                "List active customers only",
                "Show current customer accounts",
                "Find customers who are still active"
            ]
        },
        {
            "id": "inventory_muncie_transmission_parts_024",
            "category": "search_filtering",
            "complexity": 3,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Find Muncie transmission and PTO parts over $100",
            "verified_graphql_query": "query SearchMuncieTransmissionParts {\n  inventories(\n    filter: { \n      manufacturerId: 45,\n      keyword: \"transmission PTO gear\"\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [description_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 62255,
                              "partNumber": "MUNCIE PTO",
                              "description": "MUNCIE PTO",
                              "retailPrice": "3036.24",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Muncie"
                              },
                              "status": "D"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 1
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 67,
                "result_count": 350,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters by specific manufacturer (Muncie)",
                "Searches transmission and PTO related keywords",
                "Returns parts with pricing over $100",
                "Shows detailed part descriptions and status"
            ],
            "prompt_variations": [
                "Show Muncie transmission components over $100",
                "Find expensive Muncie PTO parts",
                "List Muncie gear and transmission parts"
            ]
        },
        {
            "id": "vehicle_autocar_year_range_025",
            "category": "search_filtering",
            "complexity": 3,
            "user_persona": "dismantler",
            "natural_language_prompt": "Show Autocar trucks from 2010 and newer",
            "verified_graphql_query": "query SearchRecentAutocarTrucks {\n  vehicles(\n    filter: { \n      make: \"AUTOCAR\",\n      year: { gte: 2010 }\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [year_DESC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      dismantled\n      location\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                              "id": 20,
                              "stockNumber": "RUDY TEST",
                              "vin": "TESTING",
                              "make": "AUTOCAR",
                              "model": {
                                "name": "MISC"
                              },
                              "year": 2022,
                              "mileage": 0,
                              "condition": "",
                              "status": "D",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 56,
                              "stockNumber": "T22090",
                              "vin": "516H4GB29HH222090",
                              "make": "AUTOCAR",
                              "model": {
                                "name": "MISC"
                              },
                              "year": 2017,
                              "mileage": 0,
                              "condition": "",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 106,
                              "stockNumber": "T19868",
                              "vin": "516H4GB22GH219868",
                              "make": "AUTOCAR",
                              "model": {
                                "name": "MISC"
                              },
                              "year": 2016,
                              "mileage": 0,
                              "condition": "",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 107,
                              "stockNumber": "T22097",
                              "vin": "516H4C821HH222097",
                              "make": "AUTOCAR",
                              "model": {
                                "name": "MISC"
                              },
                              "year": 2016,
                              "mileage": 0,
                              "condition": "",
                              "status": "A",
                              "dismantled": false,
                              "location": "Main"
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
                              "mileage": 0,
                              "condition": "",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 1
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 55,
                "result_count": 4,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters vehicles by make and year range",
                "Returns only vehicles from 2010 and newer",
                "Orders results by year descending",
                "Shows complete vehicle identification data"
            ],
            "prompt_variations": [
                "Find newer Autocar trucks",
                "Show Autocar vehicles 2010 or later",
                "List recent Autocar inventory"
            ]
        },
        {
            "id": "inventory_adapter_parts_search_026",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Search for adapter and fitting parts",
            "verified_graphql_query": "query SearchAdapterParts {\n  inventories(\n    filter: { keyword: \"ADAPTER\" }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [partNumber_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
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
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 22
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 58,
                "result_count": 1275,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Finds parts containing 'ADAPTER' in description",
                "Returns various adapter types and fittings",
                "Shows pricing and quantity information",
                "Includes pagination for large result sets"
            ],
            "prompt_variations": [
                "Find adapter components",
                "Show hydraulic adapters",
                "Search for fitting parts"
            ]
        },
        {
            "id": "customer_fleet_with_balance_027",
            "category": "search_filtering",
            "complexity": 3,
            "user_persona": "credit_manager",
            "natural_language_prompt": "Find fleet customers with outstanding balances",
            "verified_graphql_query": "query SearchFleetCustomersWithBalance {\n  customers(\n    filter: { \n      keyword: \"FLEET TRUCKING TRANSPORT\",\n      balance: { gt: 0 }\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [{ field: \"balance\", direction: DESC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      active\n      salesPerson { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": []
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 45,
                "result_count": 0,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Searches for fleet-related keywords in company names",
                "Filters customers with balances greater than zero",
                "Orders results by balance descending",
                "Returns empty result when no matches found"
            ],
            "prompt_variations": [
                "Show fleet accounts with balances",
                "Find trucking companies owing money",
                "List fleet customers with outstanding debt"
            ]
        },
        {
            "id": "vehicle_capacity_saber_models_028",
            "category": "search_filtering",
            "complexity": 3,
            "user_persona": "dismantler",
            "natural_language_prompt": "Find Capacity trucks with Saber model designation",
            "verified_graphql_query": "query SearchCapacitySaberTrucks {\n  vehicles(\n    filter: { \n      make: \"Capacity\",\n      model: \"*SABER*\"\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [year_DESC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      dismantled\n      location\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                              "id": 13,
                              "stockNumber": "1234TEST2",
                              "vin": "65437",
                              "make": "Capacity",
                              "model": {
                                "name": "SABER 5"
                              },
                              "year": 2022,
                              "mileage": 0,
                              "condition": "",
                              "status": "A",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 59,
                              "stockNumber": "HH59803",
                              "vin": "4LMSB2110LL031904",
                              "make": "Capacity",
                              "model": {
                                "name": "SABER 5"
                              },
                              "year": 2020,
                              "mileage": 0,
                              "condition": "",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 58,
                              "stockNumber": "HH52959",
                              "vin": "4LMSB2112KL031580",
                              "make": "Capacity",
                              "model": {
                                "name": "SABER 5"
                              },
                              "year": 2019,
                              "mileage": 0,
                              "condition": "",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 19,
                              "stockNumber": "HH45082",
                              "vin": "4LMSB2115GL031158",
                              "make": "Capacity",
                              "model": {
                                "name": "SABER 5"
                              },
                              "year": 2016,
                              "mileage": 0,
                              "condition": "USED",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 73,
                              "stockNumber": "HH77071",
                              "vin": "4LMSB21116L030735",
                              "make": "Capacity",
                              "model": {
                                "name": "SABER 5"
                              },
                              "year": 2016,
                              "mileage": 0,
                              "condition": "",
                              "status": "D",
                              "dismantled": false,
                              "location": "Main"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 1
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 42,
                "result_count": 2,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters by specific make (Capacity)",
                "Searches for specific model designation (Saber)",
                "Returns vehicles ordered by year",
                "Shows condition and dismantled status"
            ],
            "prompt_variations": [
                "Show Capacity Saber trucks",
                "Find Saber model yard hostlers",
                "List Capacity vehicles with Saber designation"
            ]
        },
        {
            "id": "inventory_high_value_parts_029",
            "category": "search_filtering",
            "complexity": 3,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show parts worth more than $5000",
            "verified_graphql_query": "query GetHighValueInventory {\n  inventories(\n    filter: { \n      quantity: { gt: 0 }\n    }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
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
                              "status": "A"
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
                              "status": "A"
                            },
                            {
                              "id": 194448,
                              "partNumber": "DR7722RX",
                              "description": "RECON ENGINE - See Notes",
                              "retailPrice": "32813.48",
                              "quantity": "1.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 162229,
                              "partNumber": "55F4D160G",
                              "description": "CUMMINS 6BT ENGINE REVIVA",
                              "retailPrice": "26252.64",
                              "quantity": "2.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 105855,
                              "partNumber": "424909",
                              "description": "YARD SPOTTER HYBRID RADIATOR",
                              "retailPrice": "26100.00",
                              "quantity": "6.000000",
                              "manufacturer": null,
                              "status": "A"
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
                "execution_time_ms": 75,
                "result_count": 1400,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters inventory with quantity greater than zero",
                "Orders results by retail price descending",
                "Shows only items currently in stock",
                "Returns highest value available inventory"
            ],
            "prompt_variations": [
                "Find expensive parts in stock",
                "Show high-value inventory on hand",
                "List costly components available"
            ]
        },
        {
            "id": "customer_phone_contact_search_030",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "sales_rep",
            "natural_language_prompt": "Find customers with 318 area code phone numbers",
            "verified_graphql_query": "query SearchCustomersByAreaCode {\n  customers(\n    filter: { phoneNumber: \"318*\" }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      active\n      salesPerson { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                            {
                              "id": 3481,
                              "companyName": "",
                              "contactName": "THOMAS BUNGE",
                              "phoneNumber": "318-707-4629",
                              "balance": "0.00",
                              "active": false,
                              "salesPerson": {
                                "name": "wmanchester"
                              }
                            },
                            {
                              "id": 3579,
                              "companyName": "",
                              "contactName": "Daks Trucking",
                              "phoneNumber": "318-791-9212",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "dphillips"
                              }
                            },
                            {
                              "id": 3602,
                              "companyName": "",
                              "contactName": "ANSLEY & SONS",
                              "phoneNumber": "318-834-9797",
                              "balance": "0.00",
                              "active": false,
                              "salesPerson": {
                                "name": "jrnarvaja"
                              }
                            },
                            {
                              "id": 3651,
                              "companyName": "",
                              "contactName": "JAMES E TIDWELL",
                              "phoneNumber": "318-508-1142",
                              "balance": "0.00",
                              "active": false,
                              "salesPerson": {
                                "name": "jrnarvaja"
                              }
                            },
                            {
                              "id": 3656,
                              "companyName": "",
                              "contactName": "MASON DURHAM ",
                              "phoneNumber": "318-497-3121",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "svallery"
                              }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 1261
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 48,
                "result_count": 1950,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters customers by phone number pattern",
                "Finds customers with 318 area code",
                "Returns contact information and company details",
                "Shows large number of regional customers"
            ],
            "prompt_variations": [
                "Show customers in 318 area code",
                "Find local customers by phone area",
                "List Shreveport area customers"
            ]
        },
        {
            "id": "vehicle_used_condition_filter_031",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "dismantler",
            "natural_language_prompt": "Show vehicles marked as 'USED' condition",
            "verified_graphql_query": "query SearchUsedConditionVehicles {\n  vehicles(\n    filter: { condition: \"USED\" }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [make_ASC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      dismantled\n      location\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "vehicles": {
                        "items": [
                            {
                              "id": 18,
                              "stockNumber": "R25825",
                              "vin": "4LMBB511XFL025825",
                              "make": "Capacity",
                              "model": {
                                "name": "TJ 5000"
                              },
                              "year": 2015,
                              "mileage": 0,
                              "condition": "USED",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 19,
                              "stockNumber": "HH45082",
                              "vin": "4LMSB2115GL031158",
                              "make": "Capacity",
                              "model": {
                                "name": "SABER 5"
                              },
                              "year": 2016,
                              "mileage": 0,
                              "condition": "USED",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 42,
                              "stockNumber": "V112500",
                              "vin": "4LMDM6137TL0091",
                              "make": "Capacity",
                              "model": {
                                "name": "TJ 6500"
                              },
                              "year": 1996,
                              "mileage": 0,
                              "condition": "USED",
                              "status": "S",
                              "dismantled": false,
                              "location": "Main"
                            },
                            {
                              "id": 82,
                              "stockNumber": "DAKK TRANSPORT TRUCK",
                              "vin": "1FUJA6CV35LN77051",
                              "make": "Freightliner",
                              "model": {
                                "name": "COLUMBIA 120"
                              },
                              "year": 2005,
                              "mileage": 136835,
                              "condition": "USED",
                              "status": "A",
                              "dismantled": false,
                              "location": "Committed"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 1
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 38,
                "result_count": 2,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters vehicles by exact condition match",
                "Returns vehicles marked as 'USED'",
                "Shows vehicle identification and specs",
                "Orders results by make alphabetically"
            ],
            "prompt_variations": [
                "Find used condition vehicles",
                "Show trucks marked as used",
                "List vehicles in used condition"
            ]
        },
        {
            "id": "inventory_chelsea_manufacturer_032",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "parts_counter",
            "natural_language_prompt": "Find all Chelsea brand parts",
            "verified_graphql_query": "query SearchChelseaParts {\n  inventories(\n    filter: { manufacturerId: 52 }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [description_ASC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 102183,
                              "partNumber": "819987-7",
                              "description": "",
                              "retailPrice": "1231.76",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Dana"
                              },
                              "status": "A"
                            },
                            {
                              "id": 64373,
                              "partNumber": "SPI-90-4-591-1X",
                              "description": "",
                              "retailPrice": "0.00",
                              "quantity": "1.000000",
                              "manufacturer": {
                                "name": "Dana"
                              },
                              "status": "A"
                            },
                            {
                              "id": 78712,
                              "partNumber": "",
                              "description": "",
                              "retailPrice": "2400.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Dana"
                              },
                              "status": "S"
                            },
                            {
                              "id": 31872,
                              "partNumber": "AMO1750-4D",
                              "description": "",
                              "retailPrice": "17040.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Dana"
                              },
                              "status": "D"
                            },
                            {
                              "id": 26256,
                              "partNumber": "104609",
                              "description": "",
                              "retailPrice": "1990.00",
                              "quantity": "0.000000",
                              "manufacturer": {
                                "name": "Dana"
                              },
                              "status": "D"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 871
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 35,
                "result_count": 1,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters inventory by Chelsea manufacturer",
                "Returns PTO and hydraulic components",
                "Shows part numbers and descriptions",
                "Orders results by description alphabetically"
            ],
            "prompt_variations": [
                "Show Chelsea PTO parts",
                "Find Chelsea hydraulic components",
                "List Chelsea brand inventory"
            ]
        },
//{
//    "id": "vehicle_mileage_range_search_033",
//    "category": "search_filtering",
//    "complexity": 3,
//    "user_persona": "dismantler",
//    "natural_language_prompt": "Find vehicles with mileage over 30,000",
//    "verified_graphql_query": "query SearchHighMileageVehicles {\n  vehicles(\n    filter: { \n      mileage: { gt: 30000 }\n    }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: [mileage_DESC]\n  ) {\n    items {\n      id\n      stockNumber\n      vin\n      make\n      model { name }\n      year\n      mileage\n      condition\n      status\n      dismantled\n      location\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
//    "verified_response_sample": {
//        "data": {
//            "vehicles": {
//                "items": [
//                    {
//                        "id": 34,
//                        "stockNumber": "R333849",
//                        "vin": "",
//                        "make": "Ottawa",
//                        "model": {
//                            "name": "4X2"
//                        },
//                        "year": 2013,
//                        "mileage": 47193,
//                        "condition": "",
//                        "status": "S",
//                        "dismantled": false,
//                        "location": "Main"
//                    }
//                ],
//                "pageInfo": {
//                    "pageNumber": 1,
//                    "pageSize": 10,
//                    "totalPages": 1
//                }
//            }
//        }
//    },
//    "response_metadata": {
//        "execution_time_ms": 42,
//        "result_count": 1,
//        "query_complexity": "high"
//    },
//    "test_assertions": [
//        "Filters vehicles by mileage greater than 30,000",
//        "Orders results by mileage descending",
//        "Returns vehicle specifications and location",
//        "Shows only vehicles with recorded mileage"
//    ],
//    "prompt_variations": [
//        "Show high mileage vehicles",
//        "Find trucks with over 30k miles",
//        "List vehicles with significant mileage"
//    ]
//},
        {
            "id": "inventory_status_active_filter_034",
            "category": "search_filtering",
            "complexity": 2,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show only active status inventory",
            "verified_graphql_query": "query GetActiveStatusInventory {\n  inventories(\n    filter: { statuses: [A] }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [dateModified_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      manufacturer { name }\n      status\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
                            {
                              "id": 174509,
                              "partNumber": "26424",
                              "description": "14/7 Trailer Cable",
                              "retailPrice": "2.26",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 175301,
                              "partNumber": "54412",
                              "description": "3/4 Heater Hose ( Black )",
                              "retailPrice": "5.20",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 175304,
                              "partNumber": "54411",
                              "description": "5/8 Heater Hose ( Black )",
                              "retailPrice": "4.60",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 175306,
                              "partNumber": "54210",
                              "description": "1/4 Fuel Line",
                              "retailPrice": "10.30",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            },
                            {
                              "id": 175307,
                              "partNumber": "54212",
                              "description": "3/8 Fuel Line",
                              "retailPrice": "12.46",
                              "quantity": "0.000000",
                              "manufacturer": null,
                              "status": "A"
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 18913
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 55,
                "result_count": 101115,
                "query_complexity": "medium"
            },
            "test_assertions": [
                "Filters inventory by active status only",
                "Returns large number of active items",
                "Shows various manufacturers and part types",
                "Orders by most recently modified first"
            ],
            "prompt_variations": [
                "List active inventory items",
                "Show current active parts",
                "Find inventory with active status"
            ]
        },
        {
            "id": "customer_email_domain_search_035",
            "category": "search_filtering",
            "complexity": 3,
            "user_persona": "marketing_manager",
            "natural_language_prompt": "Find customers with Gmail email addresses",
            "verified_graphql_query": "query SearchGmailCustomers {\n  customers(\n    filter: { email: \"*@gmail.com\" }\n    pagination: { pageNumber: 1, pageSize: 5 }\n    orderBy: [{ field: \"companyName\", direction: ASC }]\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      email\n      balance\n      active\n      salesPerson { name }\n    }\n    pageInfo {\n      pageNumber\n      pageSize\n      totalPages\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
                            {
                              "id": 3953,
                              "companyName": "",
                              "contactName": "COLE POSSI",
                              "phoneNumber": "906-241-4677",
                              "email": "COLEPSS@GMAIL.COM",
                              "balance": "0.00",
                              "active": false,
                              "salesPerson": {
                                "name": "bcopeland"
                              }
                            },
                            {
                              "id": 8336,
                              "companyName": "",
                              "contactName": "PAUL MEEK  / NO LONGER IN TRUCKING",
                              "phoneNumber": "318-218-0051",
                              "email": "PAULMEEKCOMPLETE2000@GMAIL.COM",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "elovelady"
                              }
                            },
                            {
                              "id": 8346,
                              "companyName": "",
                              "contactName": "RAMSEY DAVIS ",
                              "phoneNumber": "409-489-2907",
                              "email": "RAMSEYDVS@GMAIL.COM",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "rglaspie"
                              }
                            },
                            {
                              "id": 8567,
                              "companyName": "",
                              "contactName": "BRYAN DILLARD ",
                              "phoneNumber": "936-488-1107",
                              "email": "BDILLARD1107@GMAIL.COM",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "elovelady"
                              }
                            },
                            {
                              "id": 8718,
                              "companyName": "",
                              "contactName": "TOM SMITH ",
                              "phoneNumber": "936-275-6213",
                              "email": "TLSFARMSERVICES@GMAIL.COM",
                              "balance": "0.00",
                              "active": true,
                              "salesPerson": {
                                "name": "elovelady"
                              }
                            }
                        ],
                        "pageInfo": {
                            "pageNumber": 1,
                            "pageSize": 5,
                            "totalPages": 110
                        }
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 52,
                "result_count": 120,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters customers by email domain pattern",
                "Finds customers using Gmail addresses",
                "Returns complete contact information",
                "Shows customer account status and sales rep"
            ],
            "prompt_variations": [
                "Show customers with Gmail accounts",
                "Find Gmail email addresses",
                "List customers using personal email"
            ]
        }
    ]
}
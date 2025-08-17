export const round1 = {
    "test_library_metadata": {
        "generated_date": "2025-08-17",
        "category": "complex_business_queries", 
        "total_test_cases": 15,
        "authentication_store": "TEST: ISOFT DATA SYSTEMS",
        "description": "Complex multi-entity business analysis test cases using actual system data"
    },
    "test_cases": [
        {
            "id": "sales_order_profitability_001",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "sales_manager",
            "natural_language_prompt": "Show me the most profitable sales orders from the last month with profit margins",
            "verified_graphql_query": "query SalesOrderProfitability {\n  salesOrders(\n    filter: { finalized: true }\n    pagination: { pageNumber: 1, pageSize: 10 }\n    orderBy: date_DESC\n  ) {\n    items {\n      salesOrderId\n      date\n      total\n      subtotal\n      customer {\n        companyName\n        contactName\n      }\n      lines(pagination: { pageSize: 10 }) {\n        items {\n          description\n          quantity\n          price\n          total\n          cost\n          averageCost\n          inventory {\n            partNumber\n            manufacturer { name }\n          }\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
          {
          "salesOrderId": 643,
          "date": "2025-07-21",
          "total": "1264.73",
          "subtotal": "1160.30",
          "customer": {
            "companyName": "ENTERPRISE FLEET (AUTO INTEGRATE)",
            "contactName": "STEVEN ESTES"
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "cost": "0.00",
                "averageCost": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "cost": "0.00",
                "averageCost": "52.26",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "cost": "0.00",
                "averageCost": "377.24",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "cost": "0.00",
                "averageCost": "11.38",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "cost": "0.00",
                "averageCost": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "cost": "0.00",
                "averageCost": "52.26",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "cost": "0.00",
                "averageCost": "377.24",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "cost": "0.00",
                "averageCost": "11.38",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "cost": "0.00",
                "averageCost": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "cost": "0.00",
                "averageCost": "52.26",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 20054,
          "date": "2025-07-21",
          "total": "1834.48",
          "subtotal": "1660.16",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "contactName": "JERRED MILLER TRANSPORTATION SUPER     "
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "cost": "0.00",
                "averageCost": "558.77",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "cost": "0.00",
                "averageCost": "105.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "cost": "0.00",
                "averageCost": "558.77",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "cost": "0.00",
                "averageCost": "105.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "cost": "0.00",
                "averageCost": "558.77",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "cost": "0.00",
                "averageCost": "105.00",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40532,
          "date": "2025-07-21",
          "total": "293.01",
          "subtotal": "264.00",
          "customer": {
            "companyName": "DAVIS BATTON - 318-282-0900",
            "contactName": "DAVIS BATTON - 318-282-0900"
          },
          "lines": {
            "items": [
              {
                "description": "Driveline Parts (SPR) JOINT, Universal",
                "quantity": "1.000000",
                "price": "112.00",
                "total": "112.00",
                "cost": "67.21",
                "averageCost": "65.54",
                "inventory": {
                  "partNumber": "5-407X",
                  "manufacturer": {
                    "name": "Spicer"
                  }
                }
              },
              {
                "description": "Driveline Parts (SPR) JOINT, Universal SPICER",
                "quantity": "2.000000",
                "price": "76.00",
                "total": "152.00",
                "cost": "43.13",
                "averageCost": "49.44",
                "inventory": {
                  "partNumber": "5-280X",
                  "manufacturer": {
                    "name": "Spicer"
                  }
                }
              }
            ]
          }
        },
        {
          "salesOrderId": 20055,
          "date": "2025-07-21",
          "total": "813.53",
          "subtotal": "736.23",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "contactName": "JERRED MILLER TRANSPORTATION SUPER     "
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "cost": "0.00",
                "averageCost": "391.32",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "cost": "0.00",
                "averageCost": "391.32",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "cost": "0.00",
                "averageCost": "391.32",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 24820,
          "date": "2025-07-21",
          "total": "176.69",
          "subtotal": "159.72",
          "customer": {
            "companyName": "DW STANLY TRUCKING",
            "contactName": "DANIEL STANLY"
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "cost": "0.00",
                "averageCost": "20.87",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "cost": "0.00",
                "averageCost": "20.87",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40535,
          "date": "2025-07-21",
          "total": "199.50",
          "subtotal": "199.50",
          "customer": {
            "companyName": "bastrop fire department ",
            "contactName": "Quaily Sawyer "
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "199.50",
                "total": "199.50",
                "cost": "0.00",
                "averageCost": "46.07",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 20056,
          "date": "2025-07-21",
          "total": "1176.04",
          "subtotal": "1064.29",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "contactName": "JERRED MILLER TRANSPORTATION SUPER     "
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "cost": "0.00",
                "averageCost": "15.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "cost": "0.00",
                "averageCost": "388.17",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "cost": "0.00",
                "averageCost": "15.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "cost": "0.00",
                "averageCost": "388.17",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "cost": "0.00",
                "averageCost": "15.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "cost": "0.00",
                "averageCost": "388.17",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40536,
          "date": "2025-07-21",
          "total": "275.26",
          "subtotal": "248.00",
          "customer": {
            "companyName": "RUSTON ROCK IT LLC",
            "contactName": "NICK"
          },
          "lines": {
            "items": [
              {
                "description": "Driveline Parts (MRT) U-JOINT",
                "quantity": "1.000000",
                "price": "248.00",
                "total": "248.00",
                "cost": "156.12",
                "averageCost": "159.03",
                "inventory": {
                  "partNumber": "CP25RPLS1",
                  "manufacturer": {
                    "name": "Meritor"
                  }
                }
              }
            ]
          }
        },
        {
          "salesOrderId": 20058,
          "date": "2025-07-21",
          "total": "2109.20",
          "subtotal": "1908.78",
          "customer": {
            "companyName": "GEO TRANSPORT (Holman)",
            "contactName": "Jacqueline Bellard"
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "cost": "0.00",
                "averageCost": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "cost": "0.00",
                "averageCost": "272.05",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "cost": "0.00",
                "averageCost": "498.96",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "cost": "0.00",
                "averageCost": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "cost": "0.00",
                "averageCost": "272.05",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "cost": "0.00",
                "averageCost": "498.96",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "cost": "0.00",
                "averageCost": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "cost": "0.00",
                "averageCost": "272.05",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "cost": "0.00",
                "averageCost": "498.96",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40537,
          "date": "2025-07-21",
          "total": "6.35",
          "subtotal": "6.35",
          "customer": {
            "companyName": "KENWORTH OF SOUTH LOUISIANA **PO REQ**",
            "contactName": "NATHAN WILEY"
          },
          "lines": {
            "items": [
              {
                "description": "Transmission - Allison Parts (CHE) ALLISON PTO MOUNTING GASKET",
                "quantity": "1.000000",
                "price": "6.35",
                "total": "6.35",
                "cost": "3.66",
                "averageCost": "3.66",
                "inventory": {
                  "partNumber": "35-P-74",
                  "manufacturer": {
                    "name": "Chelsea"
                  }
                }
              }
            ]
          }
        }

                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 78,
                "result_count": 5,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns finalized sales orders with profit data",
                "Includes cost vs price comparison for margin calculation",
                "Shows customer information for sales analysis",
                "Orders by date descending for recent activity"
            ],
            "prompt_variations": [
                "Calculate profit margins on recent sales",
                "Show profitable orders with cost breakdowns",
                "Analyze sales order profitability this month"
            ]
        },
        {
            "id": "customer_aging_analysis_002",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "credit_manager",
            "natural_language_prompt": "Find customers with outstanding balances over $1000 and their purchase history",
            "verified_graphql_query": "query CustomerAgingAnalysis {\n  customers(\n    filter: { balance: { gt: 1000 } }\n    pagination: { pageNumber: 1, pageSize: 10 }\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      accountLimit\n      active\n      salesPerson { name }\n      salesOrders(pagination: { pageSize: 5 }) {\n        items {\n          salesOrderId\n          date\n          total\n          finalized\n          appliedPaymentTotal\n          balance\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
        {
          "id": 1277,
          "companyName": "CONTINENTAL DRILLING ** PO REQ**",
          "contactName": "Shannon  L. Aymond",
          "phoneNumber": "318-732-2934",
          "balance": "1734.67",
          "accountLimit": "5000.00",
          "active": true,
          "salesPerson": {
            "name": "Monroe House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 2281,
                "date": "2015-10-31",
                "total": "750.35",
                "finalized": true,
                "appliedPaymentTotal": "750.35",
                "balance": "0.00"
              },
              {
                "salesOrderId": 18430,
                "date": "2019-04-15",
                "total": "163.45",
                "finalized": true,
                "appliedPaymentTotal": "163.45",
                "balance": "0.00"
              },
              {
                "salesOrderId": 18470,
                "date": "2019-04-17",
                "total": "66.82",
                "finalized": true,
                "appliedPaymentTotal": "66.82",
                "balance": "0.00"
              },
              {
                "salesOrderId": 18803,
                "date": "2019-05-15",
                "total": "836.01",
                "finalized": true,
                "appliedPaymentTotal": "836.01",
                "balance": "0.00"
              },
              {
                "salesOrderId": 19045,
                "date": "2019-05-31",
                "total": "868.61",
                "finalized": true,
                "appliedPaymentTotal": "868.61",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 1520,
          "companyName": "EAST CARROLL PAR POL JURY",
          "contactName": "BOBBY  ",
          "phoneNumber": "318-418-1726",
          "balance": "14702.00",
          "accountLimit": "9900.00",
          "active": true,
          "salesPerson": {
            "name": "bsimmons"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 6503,
                "date": "2016-09-13",
                "total": "240.00",
                "finalized": true,
                "appliedPaymentTotal": "240.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 8591,
                "date": "2017-02-26",
                "total": "6194.91",
                "finalized": true,
                "appliedPaymentTotal": "6194.91",
                "balance": "0.00"
              },
              {
                "salesOrderId": 9682,
                "date": "2017-05-10",
                "total": "362.00",
                "finalized": true,
                "appliedPaymentTotal": "362.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 11088,
                "date": "2017-08-23",
                "total": "144.00",
                "finalized": true,
                "appliedPaymentTotal": "144.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 15010,
                "date": "2018-06-29",
                "total": "61.69",
                "finalized": true,
                "appliedPaymentTotal": "61.69",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 1594,
          "companyName": "FERRARA FIRE APPARATUS, INC  *PO REQUIRED*",
          "contactName": "e-mail invoice to apfax@ferrarafire.com",
          "phoneNumber": "225-567-7100",
          "balance": "14179.32",
          "accountLimit": "12500.00",
          "active": true,
          "salesPerson": {
            "name": "bsimmons"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 775,
                "date": "2015-07-24",
                "total": "808.54",
                "finalized": true,
                "appliedPaymentTotal": "808.54",
                "balance": "0.00"
              },
              {
                "salesOrderId": 776,
                "date": "2015-07-14",
                "total": "1178.59",
                "finalized": true,
                "appliedPaymentTotal": "1178.59",
                "balance": "0.00"
              },
              {
                "salesOrderId": 777,
                "date": "2015-08-10",
                "total": "161.79",
                "finalized": true,
                "appliedPaymentTotal": "161.79",
                "balance": "0.00"
              },
              {
                "salesOrderId": 778,
                "date": "2015-08-13",
                "total": "3148.41",
                "finalized": true,
                "appliedPaymentTotal": "3148.41",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1507,
                "date": "2015-09-01",
                "total": "747.46",
                "finalized": true,
                "appliedPaymentTotal": "747.46",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 1807,
          "companyName": "HOUSE OF RAEFORD FARMS **PO REQ**",
          "contactName": "AFFIL NASH JOHNSON & SONS",
          "phoneNumber": "318-263-9004",
          "balance": "46900.79",
          "accountLimit": "5000.00",
          "active": true,
          "salesPerson": {
            "name": "bsimmons"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1358,
                "date": "2015-08-24",
                "total": "4955.95",
                "finalized": true,
                "appliedPaymentTotal": "4955.95",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1382,
                "date": "2015-08-25",
                "total": "218.88",
                "finalized": true,
                "appliedPaymentTotal": "218.88",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1950,
                "date": "2015-10-02",
                "total": "437.76",
                "finalized": true,
                "appliedPaymentTotal": "437.76",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2467,
                "date": "2015-11-18",
                "total": "4911.14",
                "finalized": true,
                "appliedPaymentTotal": "4911.14",
                "balance": "0.00"
              },
              {
                "salesOrderId": 3417,
                "date": "2016-02-02",
                "total": "4973.35",
                "finalized": true,
                "appliedPaymentTotal": "4973.35",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 1832,
          "companyName": "Waste Connections Natchitoches",
          "contactName": "BRANDON",
          "phoneNumber": "318-356-0000",
          "balance": "36856.48",
          "accountLimit": "9900.00",
          "active": true,
          "salesPerson": {
            "name": "drains"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 2351,
                "date": "2015-11-06",
                "total": "1261.42",
                "finalized": true,
                "appliedPaymentTotal": "1261.42",
                "balance": "0.00"
              },
              {
                "salesOrderId": 755,
                "date": "2016-04-01",
                "total": "626.89",
                "finalized": true,
                "appliedPaymentTotal": "626.89",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1278,
                "date": "2016-04-27",
                "total": "72.87",
                "finalized": true,
                "appliedPaymentTotal": "72.87",
                "balance": "0.00"
              },
              {
                "salesOrderId": 4635,
                "date": "2016-04-29",
                "total": "4702.79",
                "finalized": true,
                "appliedPaymentTotal": "4702.79",
                "balance": "0.00"
              },
              {
                "salesOrderId": 4662,
                "date": "2016-05-03",
                "total": "771.38",
                "finalized": true,
                "appliedPaymentTotal": "771.38",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 1954,
          "companyName": "Niswanger Family",
          "contactName": "Niswanger Family",
          "phoneNumber": "",
          "balance": "4024.16",
          "accountLimit": "1000000.00",
          "active": true,
          "salesPerson": {
            "name": "Monroe House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 884,
                "date": "2015-02-24",
                "total": "2072.52",
                "finalized": true,
                "appliedPaymentTotal": "2072.52",
                "balance": "0.00"
              },
              {
                "salesOrderId": 9443,
                "date": "2017-07-31",
                "total": "698.28",
                "finalized": true,
                "appliedPaymentTotal": "698.28",
                "balance": "0.00"
              },
              {
                "salesOrderId": 12042,
                "date": "2017-11-06",
                "total": "125.91",
                "finalized": true,
                "appliedPaymentTotal": "125.91",
                "balance": "0.00"
              },
              {
                "salesOrderId": 12863,
                "date": "2018-04-30",
                "total": "0.00",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2916,
                "date": "2018-02-02",
                "total": "44.20",
                "finalized": true,
                "appliedPaymentTotal": "44.20",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 2071,
          "companyName": "LOUISIANA DEPT OF TRANS MONROE DIS 5",
          "contactName": "LOUISIANA DEPT OF TRANS MONROE DIS 5",
          "phoneNumber": "318-342-0152",
          "balance": "6618.81",
          "accountLimit": "10000.00",
          "active": true,
          "salesPerson": {
            "name": "bsimmons"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 898,
                "date": "2015-08-06",
                "total": "-8977.26",
                "finalized": true,
                "appliedPaymentTotal": "-8977.26",
                "balance": "0.00"
              },
              {
                "salesOrderId": 899,
                "date": "2015-08-06",
                "total": "8931.51",
                "finalized": true,
                "appliedPaymentTotal": "8931.51",
                "balance": "0.00"
              },
              {
                "salesOrderId": 900,
                "date": "2015-08-06",
                "total": "8977.26",
                "finalized": true,
                "appliedPaymentTotal": "8977.26",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2077,
                "date": "2015-10-14",
                "total": "87.45",
                "finalized": true,
                "appliedPaymentTotal": "87.45",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2078,
                "date": "2015-10-14",
                "total": "87.45",
                "finalized": true,
                "appliedPaymentTotal": "87.45",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 2100,
          "companyName": "LAZER LOGISTICS INC **PO REQ**",
          "contactName": "Johnny Marlow",
          "phoneNumber": "678-771-2600",
          "balance": "7851.73",
          "accountLimit": "9900.00",
          "active": true,
          "salesPerson": {
            "name": "rudy"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 907,
                "date": "2015-08-12",
                "total": "61.00",
                "finalized": true,
                "appliedPaymentTotal": "61.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1640,
                "date": "2015-09-14",
                "total": "59.83",
                "finalized": true,
                "appliedPaymentTotal": "59.83",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2250,
                "date": "2015-10-29",
                "total": "132.34",
                "finalized": true,
                "appliedPaymentTotal": "132.34",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2342,
                "date": "2015-11-06",
                "total": "90.74",
                "finalized": true,
                "appliedPaymentTotal": "90.74",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2357,
                "date": "2015-11-09",
                "total": "90.74",
                "finalized": true,
                "appliedPaymentTotal": "90.74",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 2271,
          "companyName": "MERRICK CONSTRUCTION",
          "contactName": "KRISTI SIMONEAUX",
          "phoneNumber": "318-876-3326",
          "balance": "12418.34",
          "accountLimit": "9900.00",
          "active": true,
          "salesPerson": {
            "name": "jsavoy"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1338,
                "date": "2015-08-21",
                "total": "643.00",
                "finalized": true,
                "appliedPaymentTotal": "643.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 10141,
                "date": "2017-06-19",
                "total": "250.33",
                "finalized": true,
                "appliedPaymentTotal": "250.33",
                "balance": "0.00"
              },
              {
                "salesOrderId": 8563,
                "date": "2022-05-26",
                "total": "6251.90",
                "finalized": true,
                "appliedPaymentTotal": "6251.90",
                "balance": "0.00"
              },
              {
                "salesOrderId": 9736,
                "date": "2022-11-23",
                "total": "-1614.89",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "-1614.89"
              },
              {
                "salesOrderId": 11130,
                "date": "2023-03-28",
                "total": "-1614.89",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "-1614.89"
              }
            ]
          }
        },
        {
          "id": 2341,
          "companyName": "MOREHOUSE PARISH SCHOOL BOARD",
          "contactName": "LINDA ",
          "phoneNumber": "",
          "balance": "14393.26",
          "accountLimit": "9900.00",
          "active": true,
          "salesPerson": {
            "name": "Monroe House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1458,
                "date": "2016-03-15",
                "total": "180.00",
                "finalized": true,
                "appliedPaymentTotal": "180.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 4007,
                "date": "2016-03-15",
                "total": "85.50",
                "finalized": true,
                "appliedPaymentTotal": "85.50",
                "balance": "0.00"
              },
              {
                "salesOrderId": 6477,
                "date": "2016-09-12",
                "total": "374.05",
                "finalized": true,
                "appliedPaymentTotal": "374.05",
                "balance": "0.00"
              },
              {
                "salesOrderId": 6727,
                "date": "2016-09-30",
                "total": "2522.95",
                "finalized": true,
                "appliedPaymentTotal": "2522.95",
                "balance": "0.00"
              },
              {
                "salesOrderId": 6929,
                "date": "2016-10-12",
                "total": "78.00",
                "finalized": true,
                "appliedPaymentTotal": "78.00",
                "balance": "0.00"
              }
            ]
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 85,
                "result_count": 5,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters customers with balances over $1000",
                "Shows account limits and contact information",
                "Includes recent sales order history",
                "Returns assigned sales person for follow-up"
            ],
            "prompt_variations": [
                "Show customers with high outstanding balances",
                "Find accounts receivable over $1000",
                "List customers with aging balances and purchase history"
            ]
        },
        {
            "id": "work_order_service_analysis_003",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "service_manager",
            "natural_language_prompt": "Show open work orders with job details and estimated completion times",
            "verified_graphql_query": "query OpenWorkOrderAnalysis {\n  workOrders(\n    filter: { closed: false }\n    pagination: { pageNumber: 1, pageSize: 10 }\n  ) {\n    items {\n      workOrderId\n      description\n      date\n      total\n      customer {\n        companyName\n        contactName\n        phoneNumber\n      }\n      jobs {\n        id\n        name\n        description\n        laborRate\n      }\n      address {\n        address1\n        city\n        state\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "workOrders": {
                        "items": [
        {
          "workOrderId": 3,
          "description": "GENOLA - Heavy Duty Truck: FREIGHTLINERFL60",
          "date": "2015-08-10",
          "total": "0.00",
          "customer": {
            "companyName": "UPS AUTOMOTIVE DEPARTMENT",
            "contactName": "GENOLA",
            "phoneNumber": "318-617-5082"
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
            "state": null
          }
        },
        {
          "workOrderId": 7,
          "description": "TERESA GIBSON - Heavy Duty Truck: PETERBILT386",
          "date": "2015-08-10",
          "total": "232.59",
          "customer": {
            "companyName": "REPUBLIC SERVICES (TERVITA DIV.)",
            "contactName": "TERESA GIBSON",
            "phoneNumber": "903-234-2179"
          },
          "jobs": [
            {
              "id": 8,
              "name": "diagnose",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 9,
              "name": "Starting System-Batteries and Cables-Repair",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 31,
          "description": "",
          "date": "2015-08-11",
          "total": "0.00",
          "customer": {
            "companyName": "BUDGET-AVIS RENTAL",
            "contactName": " DARLA FORBES",
            "phoneNumber": "877-875-7377"
          },
          "jobs": [
            {
              "id": 63,
              "name": "EXHAUST SYSTEM",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 37,
          "description": "PHILIP JOHNSON - Heavy Duty Truck: KENWORTHW900L",
          "date": "2015-08-11",
          "total": "157.21",
          "customer": {
            "companyName": "SOUTH GATEWAY TIRE CO ** PO REQ**",
            "contactName": "PHILIP JOHNSON",
            "phoneNumber": "318-222-8415"
          },
          "jobs": [
            {
              "id": 74,
              "name": "ENGINE-DIAGNOSTIC",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 40,
          "description": "ANTHONY LODESTRO - Heavy Duty Truck: ",
          "date": "2015-08-11",
          "total": "0.00",
          "customer": {
            "companyName": "LODESTRO",
            "contactName": "ANTHONY LODESTRO",
            "phoneNumber": "318-464-5869"
          },
          "jobs": [
            {
              "id": 80,
              "name": "TRANSMISSION MANUAL-REBUILD",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 80,
          "description": "DALE AND BRENDA CLARK - Drive Shaft : ",
          "date": "2015-08-24",
          "total": "1676.56",
          "customer": {
            "companyName": "D&B TRUCKS AND EQUIPMENT",
            "contactName": "DALE AND BRENDA CLARK",
            "phoneNumber": "903-796-7334"
          },
          "jobs": [
            {
              "id": 221,
              "name": "DRIVESHAFT BUILD",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 112,
          "description": "PHILIP JOHNSON - Heavy Duty Truck: INTERNATIONAL4300",
          "date": "2015-09-02",
          "total": "0.00",
          "customer": {
            "companyName": "SOUTH GATEWAY TIRE CO ** PO REQ**",
            "contactName": "PHILIP JOHNSON",
            "phoneNumber": "318-222-8415"
          },
          "jobs": [
            {
              "id": 367,
              "name": "COOLANT LEAK",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 121,
          "description": "  - Transmission: 9400I",
          "date": "2015-09-03",
          "total": "0.00",
          "customer": {
            "companyName": "DIESEL DRIVING ACADEMY (DDA)",
            "contactName": " ",
            "phoneNumber": "318-636-0606"
          },
          "jobs": [],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        },
        {
          "workOrderId": 137,
          "description": "",
          "date": "2015-09-10",
          "total": "0.00",
          "customer": null,
          "jobs": [],
          "address": null
        },
        {
          "workOrderId": 145,
          "description": "D-ROD - Heavy Duty Truck: PETERBILT387",
          "date": "2015-09-14",
          "total": "0.00",
          "customer": {
            "companyName": "PROTECTED CARGO TRANSPORT",
            "contactName": "D-ROD",
            "phoneNumber": "318-448-1241"
          },
          "jobs": [
            {
              "id": 499,
              "name": "REMOVE AND INSTALL RADIATOR",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 500,
              "name": "PM SERVICE",
              "description": "",
              "laborRate": "110.00"
            }
          ],
          "address": {
            "address1": null,
            "city": null,
            "state": null
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 72,
                "result_count": 15,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns only open work orders",
                "Includes job breakdown with labor rates",
                "Shows customer contact information",
                "Provides service location details"
            ],
            "prompt_variations": [
                "List active service orders with job details",
                "Show pending work orders and labor rates",
                "Find open repair tickets with customer info"
            ]
        },
        {
            "id": "inventory_reorder_analysis_004",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "purchasing_manager", 
            "natural_language_prompt": "Find parts with zero quantity that have recent sales activity for reordering",
            "verified_graphql_query": "query InventoryReorderAnalysis {\n  inventories(\n    filter: { quantity: { eq: 0 } }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: partNumber_ASC\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      quantity\n      minQuantity\n      maxQuantity\n      manufacturer { name }\n      defaultVendor {\n        companyName\n        phoneNumber\n      }\n      status\n      history(pagination: { pageSize: 3 }) {\n        items {\n          documentDate\n          documentTypeName\n          affectedQuantity\n        }\n      }\n    }\n  }\n}",
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
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": {
            "name": "Dana"
          },
          "defaultVendor": {
            "companyName": "Dana Incorporated",
            "phoneNumber": "800-621-8084"
          },
          "status": "D",
          "history": {
            "items": [
              {
                "documentDate": "2016-02-22",
                "documentTypeName": "Job",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2016-02-17",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2016-02-17",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        },
        {
          "id": 3530,
          "partNumber": "\t4089378D",
          "description": "TURBO, HE431VTI ISL -Core",
          "retailPrice": "1300.00",
          "quantity": "0.000000",
          "minQuantity": "0.00",
          "maxQuantity": "0.000000",
          "manufacturer": {
            "name": "Cummins"
          },
          "defaultVendor": {
            "companyName": "Cummins Sales & Service",
            "phoneNumber": "601-939-1800"
          },
          "status": "A",
          "history": {
            "items": []
          }
        },
        {
          "id": 45305,
          "partNumber": "\n122.280818.04",
          "description": "S-CAM\r\nBWP-M3109R",
          "retailPrice": "35.94",
          "quantity": "0.000000",
          "minQuantity": "0.99",
          "maxQuantity": "1.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "defaultVendor": {
            "companyName": "Automann USA, Inc.",
            "phoneNumber": "201-529-4996"
          },
          "status": "A",
          "history": {
            "items": [
              {
                "documentDate": "2019-06-05",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2019-06-05",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2019-06-05",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        },
        {
          "id": 97036,
          "partNumber": "\n21074769",
          "description": "CENTRIFUGAL OIL FILTER HOUSING ASSEMBLY",
          "retailPrice": "0.00",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": null,
          "defaultVendor": {
            "companyName": "CTP Many",
            "phoneNumber": "318-256-9683"
          },
          "status": "A",
          "history": {
            "items": [
              {
                "documentDate": "2021-08-12",
                "documentTypeName": "Job",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2021-08-02",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2021-08-02",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        },
        {
          "id": 49372,
          "partNumber": "\n25159667",
          "description": "FAN CLUTCH CH MODEL  \r\nMAC-38MH414M",
          "retailPrice": "285.42",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "2.000000",
          "manufacturer": {
            "name": "Mack"
          },
          "defaultVendor": {
            "companyName": "SHREVEPORT MACK SALES",
            "phoneNumber": "318.742.1383"
          },
          "status": "A",
          "history": {
            "items": [
              {
                "documentDate": "2019-07-16",
                "documentTypeName": "ManualAdjustment",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2019-06-14",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "2.000000"
              },
              {
                "documentDate": "2019-06-14",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "2.000000"
              }
            ]
          }
        },
        {
          "id": 48987,
          "partNumber": "\n571.LD40R39",
          "description": "4 LED RED\n571.LD40R39\r\nLIT-LED40R",
          "retailPrice": "24.56",
          "quantity": "0.000000",
          "minQuantity": "2.00",
          "maxQuantity": "4.000000",
          "manufacturer": {
            "name": "Miscellaneous"
          },
          "defaultVendor": {
            "companyName": "Automann USA, Inc.",
            "phoneNumber": "201-529-4996"
          },
          "status": "A",
          "history": {
            "items": [
              {
                "documentDate": "2019-10-23",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "0.000000"
              },
              {
                "documentDate": "2019-10-23",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "3.000000"
              },
              {
                "documentDate": "2019-10-23",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "3.000000"
              }
            ]
          }
        },
        {
          "id": 45369,
          "partNumber": "\nEQO28",
          "description": "EQUALIZER\r\nBWP-M3482C",
          "retailPrice": "68.76",
          "quantity": "0.000000",
          "minQuantity": "1.99",
          "maxQuantity": "2.000000",
          "manufacturer": {
            "name": "Miscellaneous"
          },
          "defaultVendor": {
            "companyName": "Automann USA, Inc.",
            "phoneNumber": "201-529-4996"
          },
          "status": "A",
          "history": {
            "items": [
              {
                "documentDate": "2019-06-05",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2019-06-05",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2019-06-05",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        },
        {
          "id": 48628,
          "partNumber": "\r\n151.6503BATR",
          "description": "DRUM STEERING AXLE 5IN WIDE SHOES\r\n151.6503BA\r\nGUN-3598X\r\n",
          "retailPrice": "261.60",
          "quantity": "0.000000",
          "minQuantity": "0.00",
          "maxQuantity": "0.000000",
          "manufacturer": {
            "name": "Gunite"
          },
          "defaultVendor": {
            "companyName": "Automann USA, Inc.",
            "phoneNumber": "201-529-4996"
          },
          "status": "A",
          "history": {
            "items": [
              {
                "documentDate": "2024-08-30",
                "documentTypeName": "Job",
                "affectedQuantity": "-2.000000"
              },
              {
                "documentDate": "2023-11-02",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "2.000000"
              },
              {
                "documentDate": "2023-11-02",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "2.000000"
              }
            ]
          }
        },
        {
          "id": 198144,
          "partNumber": "",
          "description": "HOUSING",
          "retailPrice": "0.00",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": null,
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": [
              {
                "documentDate": "2025-02-19",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2025-02-19",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2025-02-19",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "-1.000000"
              }
            ]
          }
        },
        {
          "id": 199680,
          "partNumber": "",
          "description": "6.71 POWERSTROKE FUEL INJECTOR RETURN QUICK CONNECT FITTING",
          "retailPrice": "43.66",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": null,
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": [
              {
                "documentDate": "2025-02-28",
                "documentTypeName": "Job",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2025-02-26",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        },
        {
          "id": 201216,
          "partNumber": "",
          "description": "fan blade",
          "retailPrice": "0.00",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": null,
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": [
              {
                "documentDate": "2025-04-21",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2025-04-21",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2025-04-21",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "-1.000000"
              }
            ]
          }
        },
        {
          "id": 201728,
          "partNumber": "",
          "description": "2\" X 3\" NIPPLE",
          "retailPrice": "13.93",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": null,
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": [
              {
                "documentDate": "2025-04-25",
                "documentTypeName": "Job",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2025-04-25",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        },
        {
          "id": 204288,
          "partNumber": "",
          "description": "EVAPORATOR ASSY",
          "retailPrice": "243.04",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": null,
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": [
              {
                "documentDate": "2025-07-10",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2025-07-11",
                "documentTypeName": "Job",
                "affectedQuantity": "-1.000000"
              }
            ]
          }
        },
        {
          "id": 80128,
          "partNumber": "",
          "description": "1\" SILICONE COOLANT HOSE ",
          "retailPrice": "47.48",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": {
            "name": "Automann"
          },
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": []
          }
        },
        {
          "id": 84480,
          "partNumber": "",
          "description": "CLAMP, Exhaust",
          "retailPrice": "0.00",
          "quantity": "0.000000",
          "minQuantity": "1.00",
          "maxQuantity": "1.000000",
          "manufacturer": {
            "name": "Mack"
          },
          "defaultVendor": null,
          "status": "S",
          "history": {
            "items": [
              {
                "documentDate": "2020-02-18",
                "documentTypeName": "Job",
                "affectedQuantity": "-1.000000"
              },
              {
                "documentDate": "2020-02-18",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              },
              {
                "documentDate": "2020-02-18",
                "documentTypeName": "Purchase Order",
                "affectedQuantity": "1.000000"
              }
            ]
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 95,
                "result_count": 15,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters inventory with zero quantity",
                "Shows reorder levels and vendor information",
                "Includes sales history for demand analysis",
                "Returns manufacturer details for sourcing"
            ],
            "prompt_variations": [
                "Show out of stock items needing reorder",
                "Find zero quantity parts with sales history",
                "List reorder recommendations with vendor info"
            ]
        },
        {
            "id": "top_selling_parts_analysis_005",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Show me the highest revenue generating parts with sales volume and profit margins",
            "verified_graphql_query": "query TopSellingPartsAnalysis {\n  salesOrders(\n    filter: { finalized: true }\n    pagination: { pageNumber: 1, pageSize: 20 }\n    orderBy: date_DESC\n  ) {\n    items {\n      date\n      lines(pagination: { pageSize: 10 }) {\n        items {\n          inventory {\n            id\n            partNumber\n            description\n            manufacturer { name }\n          }\n          quantity\n          price\n          total\n          averageCost\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "averageCost": "52.26"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "averageCost": "377.24"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "averageCost": "11.38"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "averageCost": "52.26"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "averageCost": "377.24"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "averageCost": "11.38"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "averageCost": "52.26"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "averageCost": "558.77"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "averageCost": "105.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "averageCost": "558.77"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "averageCost": "105.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "averageCost": "558.77"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "averageCost": "105.00"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": {
                  "id": 18730,
                  "partNumber": "5-407X",
                  "description": "JOINT, Universal",
                  "manufacturer": {
                    "name": "Spicer"
                  }
                },
                "quantity": "1.000000",
                "price": "112.00",
                "total": "112.00",
                "averageCost": "65.54"
              },
              {
                "inventory": {
                  "id": 18726,
                  "partNumber": "5-280X",
                  "description": "JOINT, Universal SPICER",
                  "manufacturer": {
                    "name": "Spicer"
                  }
                },
                "quantity": "2.000000",
                "price": "76.00",
                "total": "152.00",
                "averageCost": "49.44"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "averageCost": "391.32"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "averageCost": "391.32"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "averageCost": "391.32"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "averageCost": "20.87"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "averageCost": "20.87"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "199.50",
                "total": "199.50",
                "averageCost": "46.07"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "15.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "averageCost": "388.17"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "15.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "averageCost": "388.17"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "15.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "averageCost": "388.17"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": {
                  "id": 21444,
                  "partNumber": "CP25RPLS1",
                  "description": "U-JOINT",
                  "manufacturer": {
                    "name": "Meritor"
                  }
                },
                "quantity": "1.000000",
                "price": "248.00",
                "total": "248.00",
                "averageCost": "159.03"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "averageCost": "272.05"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "averageCost": "498.96"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "averageCost": "272.05"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "averageCost": "498.96"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "averageCost": "272.05"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "averageCost": "498.96"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": {
                  "id": 93809,
                  "partNumber": "35-P-74",
                  "description": "ALLISON PTO MOUNTING GASKET",
                  "manufacturer": {
                    "name": "Chelsea"
                  }
                },
                "quantity": "1.000000",
                "price": "6.35",
                "total": "6.35",
                "averageCost": "3.66"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "averageCost": "20.49"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "averageCost": "20.49"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "averageCost": "20.49"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "averageCost": "20.49"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "averageCost": "20.49"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "averageCost": "20.49"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "3090.49",
                "total": "3090.49",
                "averageCost": "1362.98"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "275.57",
                "total": "275.57",
                "averageCost": "198.58"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "275.57",
                "total": "275.57",
                "averageCost": "198.58"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "275.57",
                "total": "275.57",
                "averageCost": "198.58"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "averageCost": "0.00"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "averageCost": "65.36"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "averageCost": "65.36"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "averageCost": "65.36"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "averageCost": "65.36"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "averageCost": "65.36"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "averageCost": "65.36"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "averageCost": "249.45"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "averageCost": "249.45"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "averageCost": "249.45"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "5670.75",
                "total": "5670.75",
                "averageCost": "4294.14"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": {
                  "id": 18281,
                  "partNumber": "6-4-9001-1X",
                  "description": "YOKE, End 6-4-8431-1",
                  "manufacturer": {
                    "name": "Spicer"
                  }
                },
                "quantity": "1.000000",
                "price": "172.00",
                "total": "172.00",
                "averageCost": "101.51"
              },
              {
                "inventory": {
                  "id": 28886,
                  "partNumber": "EAT127592",
                  "description": "SEAL, Oil",
                  "manufacturer": {
                    "name": "Dana"
                  }
                },
                "quantity": "1.000000",
                "price": "34.38",
                "total": "34.38",
                "averageCost": "21.54"
              },
              {
                "inventory": {
                  "id": 195680,
                  "partNumber": "EAR127588",
                  "description": "404 T/S NUT",
                  "manufacturer": {
                    "name": "Eaton"
                  }
                },
                "quantity": "1.000000",
                "price": "11.10",
                "total": "11.10",
                "averageCost": "5.55"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "15.50"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "377.46",
                "total": "377.46",
                "averageCost": "140.19"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "222.75",
                "total": "222.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "15.50"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "377.46",
                "total": "377.46",
                "averageCost": "140.19"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "222.75",
                "total": "222.75",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "15.50"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "377.46",
                "total": "377.46",
                "averageCost": "140.19"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "222.75",
                "total": "222.75",
                "averageCost": "0.00"
              }
            ]
          }
        },
        {
          "date": "2025-07-21",
          "lines": {
            "items": [
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "381.58",
                "total": "381.58",
                "averageCost": "64.73"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "222.75",
                "total": "222.75",
                "averageCost": "61.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "381.58",
                "total": "381.58",
                "averageCost": "64.73"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "222.75",
                "total": "222.75",
                "averageCost": "61.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "averageCost": "0.00"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "381.58",
                "total": "381.58",
                "averageCost": "64.73"
              },
              {
                "inventory": null,
                "quantity": "1.000000",
                "price": "222.75",
                "total": "222.75",
                "averageCost": "61.00"
              }
            ]
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 88,
                "result_count": 20,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns sales data for revenue analysis",
                "Includes cost information for profit calculations",
                "Shows part quantities for volume analysis",
                "Includes manufacturer data for sourcing"
            ],
            "prompt_variations": [
                "Find highest revenue parts by sales volume",
                "Show top performing inventory items",
                "Analyze best selling parts with profit data"
            ]
        },
        {
            "id": "customer_purchase_patterns_006",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "sales_manager",
            "natural_language_prompt": "Analyze customer purchase patterns for fleet operators with repeat business",
            "verified_graphql_query": "query CustomerPurchasePatterns {\n  customers(\n    filter: { companyName: \"*TRANSPORT*\" }\n    pagination: { pageNumber: 1, pageSize: 10 }\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      balance\n      salesPerson { name }\n      salesOrders(pagination: { pageSize: 5 }) {\n        items {\n          salesOrderId\n          date\n          total\n          lines(pagination: { pageSize: 3 }) {\n            items {\n              description\n              quantity\n              total\n              inventory {\n                manufacturer { name }\n                category { name }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
        {
          "id": 5,
          "companyName": "3 IN 1 TRANSPORT",
          "contactName": " ",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 26,
          "companyName": "ALL STATE TRANSPORTATION",
          "contactName": "ORLANDO CARMENATC",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 31,
          "companyName": "AMERICAN CENTRAL TRANSPORT",
          "contactName": "JARRED ",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 45,
          "companyName": "ARMSTRONG TRANSPORT INC.",
          "contactName": "CHARLES ARMSTRONG",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 71,
          "companyName": "Bay Area Transport",
          "contactName": " ",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 101,
          "companyName": "BRIDGER TRANSPORT",
          "contactName": "MATT HUGHES",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 104,
          "companyName": "BRUMLEY TRANSPORT",
          "contactName": "SCOTT BRUMLEY",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1593,
                "date": "2016-02-11",
                "total": "512.68",
                "lines": {
                  "items": [
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "411.58",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "60.50",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "411.58",
                      "inventory": null
                    }
                  ]
                }
              },
              {
                "salesOrderId": 1604,
                "date": "2016-02-15",
                "total": "533.99",
                "lines": {
                  "items": [
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "464.90",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "464.90",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "464.90",
                      "inventory": null
                    }
                  ]
                }
              },
              {
                "salesOrderId": 1733,
                "date": "2016-03-04",
                "total": "30.00",
                "lines": {
                  "items": [
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "30.00",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "30.00",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "30.00",
                      "inventory": null
                    }
                  ]
                }
              },
              {
                "salesOrderId": 1734,
                "date": "2016-03-04",
                "total": "281.04",
                "lines": {
                  "items": [
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "258.78",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "258.78",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "258.78",
                      "inventory": null
                    }
                  ]
                }
              },
              {
                "salesOrderId": 1740,
                "date": "2016-03-07",
                "total": "30.00",
                "lines": {
                  "items": [
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "30.00",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "30.00",
                      "inventory": null
                    },
                    {
                      "description": "No Description",
                      "quantity": "1.000000",
                      "total": "30.00",
                      "inventory": null
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "id": 117,
          "companyName": "C&S TRANSPORT",
          "contactName": " ",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 133,
          "companyName": "CEN RATE TRANSPORT",
          "contactName": "HERBERT FISCHER",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        },
        {
          "id": 149,
          "companyName": "CLAIBORNE TRANSPORTATION",
          "contactName": " ",
          "balance": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": []
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 92,
                "result_count": 10,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Filters fleet/transport companies",
                "Shows purchase history patterns",
                "Includes part categories for trend analysis",
                "Returns sales rep assignments"
            ],
            "prompt_variations": [
                "Show fleet customer buying patterns",
                "Analyze transport company purchase history",
                "Find repeat business patterns for fleet operators"
            ]
        },
        {
            "id": "service_revenue_analysis_007",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "service_manager",
            "natural_language_prompt": "Calculate service department revenue by job type and labor rates",
            "verified_graphql_query": "query ServiceRevenueAnalysis {\n  workOrders(\n    pagination: { pageNumber: 1, pageSize: 15 }\n  ) {\n    items {\n      workOrderId\n      description\n      date\n      dateClosed\n      closed\n      total\n      customer {\n        companyName\n      }\n      jobs {\n        id\n        name\n        description\n        laborRate\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "workOrders": {
                        "items": [
        {
          "workOrderId": 1,
          "description": "PHILIP JOHNSON - Heavy Duty Truck: KENWORTHT2000",
          "date": "2015-08-10",
          "dateClosed": "2015-08-10",
          "closed": true,
          "total": "567.84",
          "customer": {
            "companyName": "SOUTH GATEWAY TIRE CO ** PO REQ**"
          },
          "jobs": [
            {
              "id": 1,
              "name": "PM SERVICE",
              "description": "OPEN DATE: 8/10/2015",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 2,
          "description": "  - Heavy Duty Truck: MACKMR686S",
          "date": "2015-08-17",
          "dateClosed": "2015-08-17",
          "closed": true,
          "total": "13118.92",
          "customer": {
            "companyName": "PPT INC."
          },
          "jobs": [
            {
              "id": 2,
              "name": "R&R",
              "description": "TRANSMISSION MODEL: T309-LR",
              "laborRate": "110.00"
            },
            {
              "id": 3,
              "name": "MANUAL TRANMISSION",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 112,
              "name": "FLYWHEEL",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 3,
          "description": "GENOLA - Heavy Duty Truck: FREIGHTLINERFL60",
          "date": "2015-08-10",
          "dateClosed": null,
          "closed": false,
          "total": "0.00",
          "customer": {
            "companyName": "UPS AUTOMOTIVE DEPARTMENT"
          },
          "jobs": [
            {
              "id": 4,
              "name": "STARTING SYSTEM DIAGNOSTIC",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 4,
          "description": "",
          "date": "2015-08-10",
          "dateClosed": "2015-08-10",
          "closed": true,
          "total": "642.60",
          "customer": {
            "companyName": "BUDGET-AVIS RENTAL"
          },
          "jobs": [
            {
              "id": 5,
              "name": "FUEL SYSTEM",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 5,
          "description": " - Heavy Duty Truck: PETERBILT348",
          "date": "2015-08-14",
          "dateClosed": "2015-08-14",
          "closed": true,
          "total": "2493.37",
          "customer": {
            "companyName": "NALCO CHAMPION"
          },
          "jobs": [
            {
              "id": 6,
              "name": "OIL LEAK",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 6,
          "description": "TERESA GIBSON - Heavy Duty Truck: MACK",
          "date": "2015-09-10",
          "dateClosed": "2015-09-10",
          "closed": true,
          "total": "4096.89",
          "customer": {
            "companyName": "REPUBLIC SERVICES (TERVITA DIV.)"
          },
          "jobs": [
            {
              "id": 7,
              "name": "Electrical Group",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 160,
              "name": "WINDSHIELD REPAIR",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 405,
              "name": "DRIVESHAFT REPAIR",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 7,
          "description": "TERESA GIBSON - Heavy Duty Truck: PETERBILT386",
          "date": "2015-08-10",
          "dateClosed": null,
          "closed": false,
          "total": "232.59",
          "customer": {
            "companyName": "REPUBLIC SERVICES (TERVITA DIV.)"
          },
          "jobs": [
            {
              "id": 8,
              "name": "diagnose",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 9,
              "name": "Starting System-Batteries and Cables-Repair",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 8,
          "description": "JODY  - Heavy Duty Truck: BLUE BIRD",
          "date": "2015-08-12",
          "dateClosed": "2015-08-12",
          "closed": true,
          "total": "2371.91",
          "customer": {
            "companyName": "CADDO PARISH FLEET SERVICE"
          },
          "jobs": [
            {
              "id": 10,
              "name": "ENGINE-OIL LEAK",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 9,
          "description": "JILL COOPER - Heavy Duty Truck: INTERNATIONAL9400I",
          "date": "2015-08-28",
          "dateClosed": "2015-08-28",
          "closed": true,
          "total": "4682.84",
          "customer": {
            "companyName": "SUPREME SERVICES AND SPECIALTY"
          },
          "jobs": [
            {
              "id": 11,
              "name": "REMOVE AND REPLACE",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 12,
              "name": "CLUTCH/FLYWHEEL HOUSING",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 276,
              "name": "FLYWHEEL RESURFACE",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 10,
          "description": "RHESA WILLIAMS - Heavy Duty Truck: KENWORTHT800",
          "date": "2015-09-11",
          "dateClosed": "2015-09-11",
          "closed": true,
          "total": "1302.69",
          "customer": {
            "companyName": "TAS ENVIRONMENTAL SERVICES ** PO REQ**"
          },
          "jobs": [
            {
              "id": 14,
              "name": "exhaust system",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 15,
              "name": "A/C system diagnose",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 17,
              "name": "preventative maintenance",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 11,
          "description": "MIKE  - Heavy Duty Truck: FORDF800",
          "date": "2015-08-18",
          "dateClosed": "2015-08-18",
          "closed": true,
          "total": "3489.07",
          "customer": {
            "companyName": "RED RIVER WATER COMMISSION"
          },
          "jobs": [
            {
              "id": 18,
              "name": "REAR AXLE-DRIVEN",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 19,
              "name": "LIGHTING SYSTEM",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 20,
              "name": "STEERING SYSTEM",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 12,
          "description": "",
          "date": "2015-08-14",
          "dateClosed": "2015-08-14",
          "closed": true,
          "total": "1473.57",
          "customer": {
            "companyName": "MARTIN MARIETTA MATERIALS, INC"
          },
          "jobs": [
            {
              "id": 21,
              "name": "A/C SYSTEM",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 13,
          "description": "ANGELIA CHAMPION - Heavy Duty Truck: PETERBILT389",
          "date": "2015-08-13",
          "dateClosed": "2015-08-13",
          "closed": true,
          "total": "2192.11",
          "customer": {
            "companyName": "NUVERRA ENVIRONMENTAL SOLUTIONS"
          },
          "jobs": [
            {
              "id": 22,
              "name": "FRONT DIFFERENTIAL SEAL LEAKING",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 23,
              "name": "STEERING SYSTEM ASSEMBLY",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 24,
              "name": "PULLEY SQUEALING",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 14,
          "description": "  - Heavy Duty Truck: FREIGHTLINERCOLUMBIA",
          "date": "2015-08-24",
          "dateClosed": "2015-08-24",
          "closed": true,
          "total": "1121.45",
          "customer": {
            "companyName": "DIESEL DRIVING ACADEMY (DDA)"
          },
          "jobs": [
            {
              "id": 25,
              "name": "ENGINE-DIAGNOSE",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 28,
              "name": "WINDSHIELD WASHER SPRAYER INOPERABLE",
              "description": "",
              "laborRate": "110.00"
            },
            {
              "id": 29,
              "name": "LIGHTING DIAGNOSTIC",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        },
        {
          "workOrderId": 15,
          "description": "WILL  - Heavy Duty Truck: WESTERN STAR TR",
          "date": "2015-08-14",
          "dateClosed": "2015-08-14",
          "closed": true,
          "total": "65.70",
          "customer": {
            "companyName": "Louisiana Materials"
          },
          "jobs": [
            {
              "id": 30,
              "name": "STEERING ASSEMBLY",
              "description": "",
              "laborRate": "110.00"
            }
          ]
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 68,
                "result_count": 15,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns work orders with revenue totals",
                "Shows job types and labor rates",
                "Includes completion status for analysis",
                "Provides customer information for billing"
            ],
            "prompt_variations": [
                "Calculate labor revenue by service type",
                "Show service department earnings by job category",
                "Analyze work order revenue and labor rates"
            ]
        },
        {
            "id": "parts_category_performance_010",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "inventory_manager",
            "natural_language_prompt": "Analyze parts category performance by sales volume and profit margins",
            "verified_graphql_query": "query PartsCategoryPerformance {\n  inventories(\n    pagination: { pageNumber: 1, pageSize: 20 }\n    orderBy: [retailPrice_DESC]\n  ) {\n    items {\n      id\n      partNumber\n      description\n      retailPrice\n      averageCost\n      quantity\n      manufacturer { name }\n      category { name }\n      status\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "inventories": {
                        "items": [
        {
          "id": 100086,
          "partNumber": "1853658PE",
          "description": "SECONDARY FAN BELT TENSIONER",
          "retailPrice": "3707316.00",
          "averageCost": "189.06",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Paccar"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 11158,
          "partNumber": "S9810M",
          "description": "S9810M SN# 4320001081",
          "retailPrice": "260000.00",
          "averageCost": "130000.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 11218,
          "partNumber": "U-S9800M",
          "description": "9800M USED ALLISON TRANSMISSION",
          "retailPrice": "114935.06",
          "averageCost": "57467.53",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 11157,
          "partNumber": "S60-POWERUNIT-PMP",
          "description": "S60 P/U W/SKID-CLUTCH-PILLOWBLOCK SETUP",
          "retailPrice": "104290.22",
          "averageCost": "52145.11",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 12462,
          "partNumber": "RM-9810M",
          "description": "REBUILT 9810M ALLISON",
          "retailPrice": "102147.58",
          "averageCost": "51073.79",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 743,
          "partNumber": "29546971",
          "description": "KIT S9820 SPE",
          "retailPrice": "88970.92",
          "averageCost": "44485.46",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 30943,
          "partNumber": "s9800m allison",
          "description": "grto allison",
          "retailPrice": "72500.00",
          "averageCost": "0.00",
          "quantity": "0.000000",
          "manufacturer": null,
          "category": {
            "name": "NEW"
          },
          "status": "D"
        },
        {
          "id": 11098,
          "partNumber": "RMDP8962",
          "description": "REBUILT DP8962 TRANSMISSION 29541766",
          "retailPrice": "66004.06",
          "averageCost": "33002.03",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 5956,
          "partNumber": "CLT5860-5",
          "description": "CLT5860-5 SN# 30-75643",
          "retailPrice": "64400.00",
          "averageCost": "32200.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Allison"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 68107,
          "partNumber": "DR6436RX",
          "description": "ENGINE, ISX 450@1800 RUNNING COMPLETE",
          "retailPrice": "60830.36",
          "averageCost": "0.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Cummins"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 11035,
          "partNumber": "R23536953-PU",
          "description": "SERIES 60 PU WITH HT-750 TRANSMISSION",
          "retailPrice": "59550.30",
          "averageCost": "29775.15",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Detroit"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 196232,
          "partNumber": "3514-22953321",
          "description": "MK 7/8 MP8 US17 ENGINE",
          "retailPrice": "57349.82",
          "averageCost": "28674.91",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Mack"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 11156,
          "partNumber": "S60-POWERUNIT",
          "description": "S60 P/U RAD THRU FLYWHEEL W/CONTROL PANEL",
          "retailPrice": "57000.00",
          "averageCost": "28500.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 174552,
          "partNumber": "DDE R23539279",
          "description": "MBE926 ENGINE POWERCHOICE ENGINE",
          "retailPrice": "55321.08",
          "averageCost": "0.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Freightliner"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 10789,
          "partNumber": "DETROIT-SERIES60-PU",
          "description": "DETROIT SERIES 60 POWER UNIT",
          "retailPrice": "53950.98",
          "averageCost": "26975.49",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Detroit"
          },
          "category": null,
          "status": "A"
        },
        {
          "id": 201357,
          "partNumber": "85021411",
          "description": "BASE ENGINE, REMAN",
          "retailPrice": "51888.46",
          "averageCost": "25944.23",
          "quantity": "0.000000",
          "manufacturer": null,
          "category": null,
          "status": "A"
        },
        {
          "id": 21933,
          "partNumber": "m916a1",
          "description": "TRUCK, Tractor, 6x6, Hydraulic Winch, Freightliner",
          "retailPrice": "51262.20",
          "averageCost": "0.00",
          "quantity": "1.000000",
          "manufacturer": null,
          "category": null,
          "status": "A"
        },
        {
          "id": 9114,
          "partNumber": "G3306NG-G6X08482",
          "description": "3306 NG ENGINE",
          "retailPrice": "51260.00",
          "averageCost": "25630.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 1914,
          "partNumber": "DR6152RX",
          "description": "ENG ISX 15 02 565@2000",
          "retailPrice": "48048.00",
          "averageCost": "24024.00",
          "quantity": "0.000000",
          "manufacturer": {
            "name": "Misc"
          },
          "category": {
            "name": "NEW"
          },
          "status": "A"
        },
        {
          "id": 185766,
          "partNumber": "DR6907RX",
          "description": "ENGINE ISB ENGINE FOR T00362",
          "retailPrice": "46415.50",
          "averageCost": "23207.75",
          "quantity": "0.000000",
          "manufacturer": null,
          "category": null,
          "status": "A"
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 78,
                "result_count": 20,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Orders by retail price for revenue analysis",
                "Shows category breakdown for classification",
                "Includes cost vs price for margin calculation",
                "Returns manufacturer data for sourcing"
            ],
            "prompt_variations": [
                "Show highest value parts by category",
                "Analyze category performance by margins",
                "Find top revenue parts by classification"
            ]
        },
        {
            "id": "monthly_sales_trends_011",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "sales_manager",
            "natural_language_prompt": "Show monthly sales trends with customer and product analysis",
            "verified_graphql_query": "query MonthlySalesTrends {\n  salesOrders(\n    filter: { finalized: true }\n    pagination: { pageNumber: 1, pageSize: 15 }\n    orderBy: [date_DESC]\n  ) {\n    items {\n      salesOrderId\n      date\n      total\n      subtotal\n      customer {\n        companyName\n        salesPerson { name }\n      }\n      lines(pagination: { pageSize: 5 }) {\n        items {\n          description\n          quantity\n          price\n          total\n          inventory {\n            category { name }\n            manufacturer { name }\n          }\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "salesOrders": {
                        "items": [
        {
          "salesOrderId": 643,
          "date": "2025-07-21",
          "total": "1264.73",
          "subtotal": "1160.30",
          "customer": {
            "companyName": "ENTERPRISE FLEET (AUTO INTEGRATE)",
            "salesPerson": {
              "name": "dmorales"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.50",
                "total": "275.50",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "766.30",
                "total": "766.30",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "82.50",
                "total": "82.50",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 20054,
          "date": "2025-07-21",
          "total": "1834.48",
          "subtotal": "1660.16",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "salesPerson": {
              "name": "mmarsh"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "319.00",
                "total": "319.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1341.16",
                "total": "1341.16",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40532,
          "date": "2025-07-21",
          "total": "293.01",
          "subtotal": "264.00",
          "customer": {
            "companyName": "DAVIS BATTON - 318-282-0900",
            "salesPerson": {
              "name": "wgarner"
            }
          },
          "lines": {
            "items": [
              {
                "description": "Driveline Parts (SPR) JOINT, Universal",
                "quantity": "1.000000",
                "price": "112.00",
                "total": "112.00",
                "inventory": {
                  "category": null,
                  "manufacturer": {
                    "name": "Spicer"
                  }
                }
              },
              {
                "description": "Driveline Parts (SPR) JOINT, Universal SPICER",
                "quantity": "2.000000",
                "price": "76.00",
                "total": "152.00",
                "inventory": {
                  "category": null,
                  "manufacturer": {
                    "name": "Spicer"
                  }
                }
              }
            ]
          }
        },
        {
          "salesOrderId": 20055,
          "date": "2025-07-21",
          "total": "813.53",
          "subtotal": "736.23",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "salesPerson": {
              "name": "mmarsh"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "736.23",
                "total": "736.23",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 24820,
          "date": "2025-07-21",
          "total": "176.69",
          "subtotal": "159.72",
          "customer": {
            "companyName": "DW STANLY TRUCKING",
            "salesPerson": {
              "name": "Aolvey"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "159.72",
                "total": "159.72",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40535,
          "date": "2025-07-21",
          "total": "199.50",
          "subtotal": "199.50",
          "customer": {
            "companyName": "bastrop fire department ",
            "salesPerson": {
              "name": "jgabb"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "199.50",
                "total": "199.50",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 20056,
          "date": "2025-07-21",
          "total": "1176.04",
          "subtotal": "1064.29",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "salesPerson": {
              "name": "mmarsh"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "990.04",
                "total": "990.04",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "74.25",
                "total": "74.25",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40536,
          "date": "2025-07-21",
          "total": "275.26",
          "subtotal": "248.00",
          "customer": {
            "companyName": "RUSTON ROCK IT LLC",
            "salesPerson": {
              "name": "wgarner"
            }
          },
          "lines": {
            "items": [
              {
                "description": "Driveline Parts (MRT) U-JOINT",
                "quantity": "1.000000",
                "price": "248.00",
                "total": "248.00",
                "inventory": {
                  "category": null,
                  "manufacturer": {
                    "name": "Meritor"
                  }
                }
              }
            ]
          }
        },
        {
          "salesOrderId": 20058,
          "date": "2025-07-21",
          "total": "2109.20",
          "subtotal": "1908.78",
          "customer": {
            "companyName": "GEO TRANSPORT (Holman)",
            "salesPerson": {
              "name": "mmarsh"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "1015.50",
                "total": "1015.50",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "893.28",
                "total": "893.28",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40537,
          "date": "2025-07-21",
          "total": "6.35",
          "subtotal": "6.35",
          "customer": {
            "companyName": "KENWORTH OF SOUTH LOUISIANA **PO REQ**",
            "salesPerson": {
              "name": "bsimmons"
            }
          },
          "lines": {
            "items": [
              {
                "description": "Transmission - Allison Parts (CHE) ALLISON PTO MOUNTING GASKET",
                "quantity": "1.000000",
                "price": "6.35",
                "total": "6.35",
                "inventory": {
                  "category": null,
                  "manufacturer": {
                    "name": "Chelsea"
                  }
                }
              }
            ]
          }
        },
        {
          "salesOrderId": 644,
          "date": "2025-07-21",
          "total": "177.40",
          "subtotal": "162.75",
          "customer": {
            "companyName": "EFFORT LOGISTICS",
            "salesPerson": {
              "name": "mmarsh"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "162.75",
                "total": "162.75",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 40540,
          "date": "2025-07-21",
          "total": "3430.13",
          "subtotal": "3090.49",
          "customer": {
            "companyName": "B&P ENTERPRISES",
            "salesPerson": {
              "name": "vfranklin"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "0.00",
                "total": "0.00",
                "inventory": null
              },
              {
                "description": "b&p",
                "quantity": "1.000000",
                "price": "3090.49",
                "total": "3090.49",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 19876,
          "date": "2025-07-21",
          "total": "304.50",
          "subtotal": "275.57",
          "customer": {
            "companyName": "DERECK MORALES",
            "salesPerson": null
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.57",
                "total": "275.57",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.57",
                "total": "275.57",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "275.57",
                "total": "275.57",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 20060,
          "date": "2025-07-21",
          "total": "176.25",
          "subtotal": "159.50",
          "customer": {
            "companyName": "CLECO-PINEVILLE",
            "salesPerson": {
              "name": "mmarsh"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "79.75",
                "total": "79.75",
                "inventory": null
              }
            ]
          }
        },
        {
          "salesOrderId": 645,
          "date": "2025-07-21",
          "total": "321.79",
          "subtotal": "295.22",
          "customer": {
            "companyName": "Anax Transportation",
            "salesPerson": {
              "name": "lbroussard"
            }
          },
          "lines": {
            "items": [
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "inventory": null
              },
              {
                "description": "No Description",
                "quantity": "1.000000",
                "price": "295.22",
                "total": "295.22",
                "inventory": null
              }
            ]
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 85,
                "result_count": 15,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Returns recent sales data for trend analysis",
                "Includes customer and sales rep information",
                "Shows product categories for analysis",
                "Provides revenue breakdown by line items"
            ],
            "prompt_variations": [
                "Analyze sales performance by month",
                "Show recent sales trends with customer breakdown",
                "Track monthly revenue patterns by product"
            ]
        },
        {
            "id": "customer_credit_risk_analysis_012",
            "category": "complex_business",
            "complexity": 3,
            "user_persona": "credit_manager",
            "natural_language_prompt": "Identify customers with credit risk based on balance vs credit limit ratios",
            "verified_graphql_query": "query CustomerCreditRiskAnalysis {\n  customers(\n    filter: { active: true }\n    pagination: { pageNumber: 1, pageSize: 15 }\n  ) {\n    items {\n      id\n      companyName\n      contactName\n      phoneNumber\n      balance\n      accountLimit\n      salesPerson { name }\n      salesOrders(pagination: { pageSize: 3 }) {\n        items {\n          salesOrderId\n          date\n          total\n          finalized\n          appliedPaymentTotal\n          balance\n        }\n      }\n    }\n  }\n}",
            "verified_response_sample": {
                "data": {
                    "customers": {
                        "items": [
        {
          "id": 120,
          "companyName": "C.M.I.",
          "contactName": "JEFF ",
          "phoneNumber": "318-245-5610",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "ccandella"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 60,
                "date": "2015-09-03",
                "total": "3995.57",
                "finalized": true,
                "appliedPaymentTotal": "2896.27",
                "balance": "0.00"
              },
              {
                "salesOrderId": 61,
                "date": "2015-06-22",
                "total": "2257.73",
                "finalized": true,
                "appliedPaymentTotal": "2257.73",
                "balance": "0.00"
              },
              {
                "salesOrderId": 602,
                "date": "2015-08-19",
                "total": "0.00",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 128,
          "companyName": "D&M SUPPLY",
          "contactName": " DEREK MOREAU",
          "phoneNumber": "318-941-2351",
          "balance": "0.00",
          "accountLimit": "1000.00",
          "salesPerson": {
            "name": "jsavoy"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 717,
                "date": "2015-09-14",
                "total": "346.43",
                "finalized": true,
                "appliedPaymentTotal": "346.43",
                "balance": "0.00"
              },
              {
                "salesOrderId": 839,
                "date": "2016-11-03",
                "total": "676.79",
                "finalized": true,
                "appliedPaymentTotal": "676.79",
                "balance": "0.00"
              },
              {
                "salesOrderId": 925,
                "date": "2016-11-21",
                "total": "374.21",
                "finalized": false,
                "appliedPaymentTotal": "0.00",
                "balance": "374.21"
              }
            ]
          }
        },
        {
          "id": 144,
          "companyName": "CINTAS - SHREVEPORT",
          "contactName": "SHANE",
          "phoneNumber": "318-752-0460",
          "balance": "0.00",
          "accountLimit": "9900.00",
          "salesPerson": {
            "name": "bsimmons"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1380,
                "date": "2016-01-25",
                "total": "372.22",
                "finalized": true,
                "appliedPaymentTotal": "372.22",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1461,
                "date": "2016-01-29",
                "total": "1777.51",
                "finalized": true,
                "appliedPaymentTotal": "1777.51",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1486,
                "date": "2016-01-29",
                "total": "548.56",
                "finalized": true,
                "appliedPaymentTotal": "548.56",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 146,
          "companyName": "CITY OF ALEXANDRIA - STREET DEPT",
          "contactName": "BRIAZA TURNER",
          "phoneNumber": "318-441-6154",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "jsavoy"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 727,
                "date": "2015-09-15",
                "total": "18805.00",
                "finalized": false,
                "appliedPaymentTotal": "0.00",
                "balance": "18805.00"
              },
              {
                "salesOrderId": 1966,
                "date": "2015-10-06",
                "total": "3950.00",
                "finalized": true,
                "appliedPaymentTotal": "3950.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 1143,
                "date": "2015-12-03",
                "total": "419.48",
                "finalized": true,
                "appliedPaymentTotal": "419.48",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 174,
          "companyName": "CUDD PRESSURE CONTROL",
          "contactName": " ",
          "phoneNumber": "985-853-5853",
          "balance": "0.00",
          "accountLimit": "30000.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 16527,
                "date": "2021-08-31",
                "total": "290.82",
                "finalized": true,
                "appliedPaymentTotal": "290.82",
                "balance": "0.00"
              },
              {
                "salesOrderId": 16975,
                "date": "2021-10-26",
                "total": "32.49",
                "finalized": true,
                "appliedPaymentTotal": "32.49",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 184,
          "companyName": "DANNY JONES",
          "contactName": " ",
          "phoneNumber": "",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 32556,
                "date": "2023-04-13",
                "total": "4.22",
                "finalized": true,
                "appliedPaymentTotal": "4.22",
                "balance": "0.00"
              },
              {
                "salesOrderId": 32565,
                "date": "2023-04-17",
                "total": "368.87",
                "finalized": true,
                "appliedPaymentTotal": "368.87",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 205,
          "companyName": "Diesel Specialists - Parts",
          "contactName": " ",
          "phoneNumber": "",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1997,
                "date": "2016-04-20",
                "total": "314.70",
                "finalized": false,
                "appliedPaymentTotal": "0.00",
                "balance": "314.70"
              },
              {
                "salesOrderId": 3132,
                "date": "2016-11-17",
                "total": "7965.00",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "7965.00"
              },
              {
                "salesOrderId": 3174,
                "date": "2016-11-14",
                "total": "6332.62",
                "finalized": false,
                "appliedPaymentTotal": "0.00",
                "balance": "6332.62"
              }
            ]
          }
        },
        {
          "id": 221,
          "companyName": "DYKES OIL WELL SERVICING",
          "contactName": "ACCOUNTS PAYABLE ",
          "phoneNumber": "318-929-2929",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1782,
                "date": "2016-03-15",
                "total": "197.11",
                "finalized": true,
                "appliedPaymentTotal": "197.11",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2689,
                "date": "2016-08-19",
                "total": "2121.37",
                "finalized": true,
                "appliedPaymentTotal": "2121.37",
                "balance": "0.00"
              },
              {
                "salesOrderId": 31463,
                "date": "2022-12-14",
                "total": "4964.28",
                "finalized": true,
                "appliedPaymentTotal": "4964.28",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 254,
          "companyName": "FLEET NET AMERICA INC",
          "contactName": " SCOTT",
          "phoneNumber": "888-788-2944",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 586,
                "date": "2015-08-25",
                "total": "685.52",
                "finalized": true,
                "appliedPaymentTotal": "685.52",
                "balance": "0.00"
              },
              {
                "salesOrderId": 35985,
                "date": "2024-02-23",
                "total": "1932.42",
                "finalized": true,
                "appliedPaymentTotal": "1932.42",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 318,
          "companyName": "HYDRATECH MONROE BEARING *PO REQ*",
          "contactName": "SHANNON AMBROSE",
          "phoneNumber": "318-323-8289",
          "balance": "0.00",
          "accountLimit": "2000.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 24399,
                "date": "2020-10-26",
                "total": "846.43",
                "finalized": true,
                "appliedPaymentTotal": "846.43",
                "balance": "0.00"
              },
              {
                "salesOrderId": 24483,
                "date": "2020-10-29",
                "total": "71.43",
                "finalized": true,
                "appliedPaymentTotal": "71.43",
                "balance": "0.00"
              },
              {
                "salesOrderId": 25170,
                "date": "2021-01-19",
                "total": "290.00",
                "finalized": true,
                "appliedPaymentTotal": "290.00",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 419,
          "companyName": "LOTT OIL ",
          "contactName": "WAYNE HARDY",
          "phoneNumber": "318-352-2055",
          "balance": "0.00",
          "accountLimit": "5000.00",
          "salesPerson": {
            "name": "jsavoy"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 362,
                "date": "2015-08-10",
                "total": "575.13",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "0.00"
              },
              {
                "salesOrderId": 363,
                "date": "2015-07-16",
                "total": "771.69",
                "finalized": true,
                "appliedPaymentTotal": "771.69",
                "balance": "0.00"
              },
              {
                "salesOrderId": 551,
                "date": "2015-08-11",
                "total": "679.96",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "679.96"
              }
            ]
          }
        },
        {
          "id": 421,
          "companyName": "Louisiana CAT",
          "contactName": " ",
          "phoneNumber": "1",
          "balance": "0.00",
          "accountLimit": "10000.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 2051,
                "date": "2016-04-29",
                "total": "209.07",
                "finalized": true,
                "appliedPaymentTotal": "209.07",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2641,
                "date": "2016-09-23",
                "total": "2445.02",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "2445.02"
              }
            ]
          }
        },
        {
          "id": 422,
          "companyName": "LOUISIANA CONCRETE PUMPERS (LCP) **PO REQ**",
          "contactName": "Jimmy --  Scott Location",
          "phoneNumber": "337-531-187",
          "balance": "0.00",
          "accountLimit": "7500.00",
          "salesPerson": {
            "name": "jsavoy"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1760,
                "date": "2015-09-21",
                "total": "118.79",
                "finalized": true,
                "appliedPaymentTotal": "118.79",
                "balance": "0.00"
              },
              {
                "salesOrderId": 822,
                "date": "2015-10-01",
                "total": "63.44",
                "finalized": true,
                "appliedPaymentTotal": "63.44",
                "balance": "0.00"
              },
              {
                "salesOrderId": 907,
                "date": "2015-10-16",
                "total": "120.07",
                "finalized": true,
                "appliedPaymentTotal": "120.07",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 527,
          "companyName": "PLILER INTERNATIONAL ** PO REQ**",
          "contactName": "SHANE",
          "phoneNumber": "318-393-5303",
          "balance": "0.00",
          "accountLimit": "1000.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 401,
                "date": "2015-05-25",
                "total": "1332.03",
                "finalized": true,
                "appliedPaymentTotal": "1332.03",
                "balance": "0.00"
              },
              {
                "salesOrderId": 2774,
                "date": "2016-09-01",
                "total": "86.32",
                "finalized": true,
                "appliedPaymentTotal": "86.32",
                "balance": "0.00"
              },
              {
                "salesOrderId": 31761,
                "date": "2023-01-24",
                "total": "5770.00",
                "finalized": true,
                "appliedPaymentTotal": "5770.00",
                "balance": "0.00"
              }
            ]
          }
        },
        {
          "id": 544,
          "companyName": "R&R SALES & SERVICE, INC.",
          "contactName": "RODNEY GILBERT",
          "phoneNumber": "318-746-5568",
          "balance": "0.00",
          "accountLimit": "0.00",
          "salesPerson": {
            "name": "Shreveport House"
          },
          "salesOrders": {
            "items": [
              {
                "salesOrderId": 1420,
                "date": "2016-01-15",
                "total": "114.42",
                "finalized": true,
                "appliedPaymentTotal": "114.42",
                "balance": "0.00"
              },
              {
                "salesOrderId": 34414,
                "date": "2023-10-30",
                "total": "1021.12",
                "finalized": true,
                "appliedPaymentTotal": "0.00",
                "balance": "1021.12"
              },
              {
                "salesOrderId": 37074,
                "date": "2024-06-28",
                "total": "2233.00",
                "finalized": true,
                "appliedPaymentTotal": "2233.00",
                "balance": "0.00"
              }
            ]
          }
        }
                        ]
                    }
                }
            },
            "response_metadata": {
                "execution_time_ms": 88,
                "result_count": 15,
                "query_complexity": "high"
            },
            "test_assertions": [
                "Shows balance vs credit limit ratios",
                "Includes payment history analysis",
                "Returns contact info for collections",
                "Shows assigned sales rep for coordination"
            ],
            "prompt_variations": [
                "Find customers exceeding credit limits",
                "Analyze credit risk by balance ratios",
                "Show high risk accounts with payment history"
            ]
        }

        
    
    ]
}
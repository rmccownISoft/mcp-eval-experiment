# MCP Test Prompt Analysis by Business Domain

## Overview
Analysis of 69 test prompts across 5 JSON files, categorized by business domain to inform domain-specific MCP tool design.

**Total Test Cases**: 69 prompts  
**Source Files**: 
- `analytics_prompts_extracted.json` (25 prompts)
- `basic_entity_lookup_prompts.json` (15 prompts) 
- `complex_business_queries_prompts.json` (15 prompts)
- `real_world_scenario_prompts.json` (10 prompts)
- `search_and_filtering_prompts.json` (20 prompts)

---

## Domain Breakdown

### 1. Inventory Management Domain
**Coverage**: 28 prompts (40.6% of total)

#### Basic Lookups (4 prompts)
- `inventory_lookup_part_001`: Show me part number 0107-16-20
- `inventory_lookup_id_002`: Get inventory details for ID 5
- `inventory_search_description_009`: Find parts with 'ADAPTER' in the description
- `inventory_low_stock_013`: Show parts with zero quantity

#### Search & Filtering (12 prompts)
- `inventory_search_brake_parts_015`: Find all brake parts under $200
- `inventory_search_transmission_parts_016`: Show all transmission components
- `inventory_zero_quantity_019`: Show parts with zero quantity
- `inventory_mack_parts_search_021`: Show all Mack parts sorted by price high to low
- `inventory_muncie_transmission_parts_023`: Find Muncie transmission and PTO parts over $100
- `inventory_adapter_parts_search_025`: Search for adapter and fitting parts
- `inventory_high_value_parts_028`: Show parts worth more than $5000
- `inventory_chelsea_manufacturer_031`: Find all Chelsea brand parts
- `inventory_status_active_filter_032`: Show only active status inventory
- `inventory_high_value_analysis_047`: Show me the most valuable inventory we have in stock
- `inventory_by_manufacturer_050`: Show inventory distribution by manufacturer
- `inventory_location_analysis_054`: Show inventory distribution across warehouse locations

#### Analytics & Business Intelligence (12 prompts)
- `profitability_analysis_048`: Calculate profit margins on high-value inventory
- `pricing_tier_analysis_052`: Compare pricing tiers across inventory categories
- `top_selling_parts_analysis_057`: Find our top-selling parts by quantity and revenue
- `inventory_investment_analysis_059`: Calculate total inventory investment and valuation
- `parts_margin_analysis_061`: Analyze profit margins across different part categories
- `inventory_reorder_analysis_036`: Find parts with zero quantity that have recent sales activity for reordering
- `top_selling_parts_analysis_037`: Show me the highest revenue generating parts with sales volume and profit margins
- `parts_category_performance_040`: Analyze parts category performance by sales volume and profit margins
- `manufacturer_performance_analysis_063`: Show me Mack parts inventory and performance
- `inventory_manager_low_stock_alert_069`: Show me all parts with quantity less than 5 that are active
- `parts_counter_brake_search_065`: Customer needs brake parts for a Freightliner Columbia, what do we have in stock?
- `sales_quote_transmission_066`: Customer wants a quote for transmission replacement, show me our Allison transmissions

**Key Patterns**:
- Part number and description searches
- Manufacturer and category filtering
- Price range filtering with different price types
- Stock level analysis (zero, low, available)
- Profit margin calculations
- Inventory valuation and investment analysis

---

### 2. Customer Management Domain
**Coverage**: 15 prompts (21.7% of total)

#### Basic Lookups (3 prompts)
- `customer_lookup_company_003`: Look up customer MARTIN MARIETTA MATERIALS, INC
- `customer_lookup_id_004`: Show customer ID 2 details
- `customer_search_fleet_010`: Find customers with 'TRANSPORT' in company name

#### Search & Filtering (6 prompts)
- `customer_search_transport_companies_017`: Find customers with 'TRANSPORT' in company name
- `customer_active_status_filter_022`: Show only active customers
- `customer_fleet_with_balance_026`: Find fleet customers with outstanding balances
- `customer_phone_contact_search_029`: Find customers with 318 area code phone numbers
- `customer_email_domain_search_033`: Find customers with Gmail email addresses
- `sales_customer_purchase_history_068`: Show me purchase history for ABC-CENTRAL BLOCK& BRICK customer

#### Analytics & Financial Analysis (6 prompts)
- `customer_balance_analysis_046`: What are our top customers by outstanding balance?
- `customer_credit_risk_analysis_049`: Find customers who are over their credit limits
- `customer_sales_frequency_053`: Analyze customer purchase frequency and patterns
- `customer_geographic_analysis_058`: Analyze customer distribution by geographic regions
- `customer_aging_analysis_034`: Find customers with outstanding balances over $1000 and their purchase history
- `customer_purchase_patterns_038`: Analyze customer purchase patterns for fleet operators with repeat business
- `customer_credit_risk_analysis_042`: Identify customers with credit risk based on balance vs credit limit ratios

**Key Patterns**:
- Company name and contact searches
- Geographic filtering (city, area code, state)
- Financial analysis (balances, credit limits, aging)
- Customer type classification (fleet, transport, individual)
- Purchase pattern analysis
- Credit risk assessment

---

### 3. Sales Management Domain
**Coverage**: 12 prompts (17.4% of total)

#### Basic Lookups (2 prompts)
- `sales_order_lookup_id_007`: Display sales order 2
- `sales_order_by_customer_012`: Show sales orders for ABC-CENTRAL BLOCK& BRICK

#### Performance Analytics (6 prompts)
- `sales_performance_recent_045`: Show me sales performance for the last 30 days
- `sales_order_line_analysis_051`: Analyze sales order details and line items for trends
- `salesperson_performance_analysis_060`: Analyze sales performance by salesperson
- `sales_by_customer_analysis_064`: Show me sales totals grouped by customer for top buyers
- `management_weekly_sales_067`: Show me this week's sales performance
- `monthly_sales_trends_041`: Show monthly sales trends with customer and product analysis

#### Profitability Analysis (4 prompts)
- `sales_order_profitability_033`: Show me the most profitable sales orders from the last month with profit margins
- `seasonal_sales_trends_055`: Analyze sales trends by month for seasonal patterns
- `sales.analytics` (implied from various analytical prompts)

**Key Patterns**:
- Date range filtering (daily, weekly, monthly, quarterly)
- Salesperson performance tracking
- Customer-based sales analysis
- Profitability and margin calculations
- Trend analysis over time
- Order status filtering (open, finalized, closed)

---

### 4. Vehicle Management Domain
**Coverage**: 8 prompts (11.6% of total)

#### Basic Lookups (3 prompts)
- `vehicle_lookup_vin_005`: Get vehicle with VIN 4LMSB2115HL031419
- `vehicle_lookup_stock_006`: Show me vehicle stock number T25120
- `vehicle_search_make_011`: Show all Ottawa vehicles

#### Search & Filtering (4 prompts)
- `vehicle_undismantled_filter_020`: Find vehicles that haven't been dismantled yet
- `vehicle_autocar_year_range_024`: Show Autocar trucks from 2010 and newer
- `vehicle_capacity_saber_models_027`: Find Capacity trucks with Saber model designation
- `vehicle_used_condition_filter_030`: Show vehicles marked as 'USED' condition

#### Service & Maintenance (1 prompt)
- `service_manager_vehicle_maintenance_070`: Show me all Freightliner vehicles that need maintenance scheduling

**Key Patterns**:
- VIN and stock number lookups
- Make and model filtering
- Year range filtering
- Condition status filtering
- Dismantling status tracking
- Maintenance scheduling needs

---

### 5. Service/Work Order Domain
**Coverage**: 6 prompts (8.7% of total)

#### Basic Operations (2 prompts)
- `work_order_lookup_id_008`: Show work order 3 details
- `work_order_service_analysis_035`: Show open work orders with job details and estimated completion times

#### Analytics & Performance (4 prompts)
- `service_labor_efficiency_056`: Analyze service department labor efficiency and rates
- `service_revenue_analysis_039`: Calculate service department revenue by job type and labor rates
- `work_order_cost_analysis_062`: Analyze work order profitability and cost breakdown

**Key Patterns**:
- Work order status filtering (open, closed, estimate)
- Job type and labor rate analysis
- Profitability and cost breakdown
- Efficiency metrics and performance tracking
- Revenue analysis by service category

---

## Cross-Domain Patterns

### Common Filter Types
1. **Date Ranges**: Used across all domains for time-based analysis
2. **Status Filtering**: Active/inactive, open/closed, finalized/draft
3. **Monetary Ranges**: Price ranges, balance thresholds, value limits
4. **Geographic**: City, state, area code filtering
5. **Category/Type**: Manufacturer, customer type, job type classification

### Common Analytics Needs
1. **Performance Metrics**: Revenue, profitability, efficiency tracking
2. **Trend Analysis**: Monthly, quarterly, seasonal patterns
3. **Top/Bottom Lists**: Best sellers, highest values, risk customers
4. **Distribution Analysis**: Geographic, categorical, temporal distribution
5. **Comparison Analysis**: Period-over-period, benchmark comparisons

### User Personas Identified
- **Parts Counter**: Basic lookups, availability checks, pricing
- **Sales Rep/Manager**: Customer relationships, order tracking, performance
- **Inventory Manager**: Stock levels, reorders, valuation analysis
- **Service Manager**: Work orders, labor efficiency, profitability
- **Credit Manager**: Customer financial health, aging, risk analysis
- **Business Analyst**: Cross-domain analytics and reporting

## Recommended Domain Tools Architecture

Based on this analysis, the following domain-specific tools would cover 90%+ of the test cases:

### Inventory Tools (3 tools)
- `inventory.search` - Handle 16 search/filter prompts
- `inventory.summary` - Handle 4 lookup prompts  
- `inventory.analytics` - Handle 8 analytics prompts

### Customer Tools (3 tools)
- `customer.search` - Handle 9 search/filter prompts
- `customer.summary` - Handle 3 lookup prompts
- `customer.analytics` - Handle 6 financial/pattern analysis prompts

### Sales Tools (3 tools)
- `sales_order.search` - Handle order search and filtering
- `sales_order.summary` - Handle detailed order views
- `sales.analytics` - Handle performance and trend analysis

### Vehicle Tools (3 tools)
- `vehicle.search` - Handle VIN, stock, make/model searches
- `vehicle.summary` - Handle detailed vehicle information
- `vehicle.maintenance` - Handle service scheduling needs

### Service Tools (3 tools)
- `work_order.search` - Handle work order filtering
- `work_order.summary` - Handle detailed work order views
- `service.analytics` - Handle labor and revenue analysis

This architecture would reduce the current 3-5 tool calls per query down to 1 tool call for the vast majority of business use cases while providing predictable, business-friendly outputs.
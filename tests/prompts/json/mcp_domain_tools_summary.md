# MCP Domain-Based Tools Summary (Option 2)

This document summarizes domain-based tool design for our MCP server implementation, derived from analyzing the prompt suites. The goal is **fewer schema-explore calls**, predictable inputs/outputs, and stable projections.

---

## Inventory Tools

**`inventory.search`**
- Inputs: keyword, manufacturer/category, status, price range, quantity filter, location, sort, page.
- Outputs: presets (`basic`, `pricing`, `detail`).
- Use cases: brake parts under $200, Mack parts by price, Chelsea brand, zero-qty stock.

**`inventory.get`**
- Inputs: id or partNumber.
- Outputs: detail preset + recent sales.

**`inventory.high_value`**
- Inputs: threshold, category/manufacturer, paging.
- Outputs: pricing preset + onHandValue.

**`inventory.reorder_candidates`**
- Inputs: sales lookback days, min sales, vendor.
- Outputs: recent sales count, vendors, reorder suitability.

---

## Customer Tools

**`customer.search`**
- Inputs: keyword, active flag, area code, email domain, salesperson, region, sort, paging.
- Outputs: basic info (id, name, contact, phone, active).

**`customer.get`**
- Inputs: id or companyName.
- Outputs: detail (recent orders, balance, account limit, salesperson).

**`customer.credit_risk`**
- Inputs: minBalance, overLimit flag, sort, paging.
- Outputs: balances, limits, ratios, last payment.

**`customer.sales_history`**
- Inputs: id or name, date range, groupBy (month, category).
- Outputs: totals, AOV, grouped rollups.

---

## Sales Order Tools

**`sales_order.search`**
- Inputs: status, date range, customerId, sort, paging.
- Outputs: id, date, customer, subtotal, total, finalized.

**`sales_order.summary`**
- Inputs: id.
- Outputs: totals, cost, margin, PO status, payments.

**`sales_order.lines_trend`**
- Inputs: date range, category, paging.
- Outputs: SKU, qty, revenue, margin%, trend.

---

## Vehicle Tools

**`vehicle.search`**
- Inputs: vin, stockNumber, make/model/year, condition, dismantled, brand, sort, paging.
- Outputs: metadata (vin, stock, make, model, year, condition, location).

**`vehicle.get`**
- Inputs: vin | stockNumber | id.
- Outputs: detail (purchaseDate, cost, mileage).

---

## Work Orders / Service Tools

**`work_order.search`**
- Inputs: status, customerId, vehicleId, date range, sort, paging.
- Outputs: id, customer, vehicle, jobs, estHours, ETA.

**`work_order.profitability`**
- Inputs: id.
- Outputs: partsCost, laborCost, miscCost, revenue, margin%.

**`service.labor_efficiency`**
- Inputs: date range, technicianId, groupBy.
- Outputs: hoursBilled, hoursWorked, efficiency%.

---

## Pricing & Profitability Tools

**`pricing.category_comparison`**
- Inputs: category, date range, tier, paging.
- Outputs: avgPrice, avgCost, margin%.

**`inventory.margin_scan`**
- Inputs: minPrice, minMargin%, paging.
- Outputs: part, pricing, cost, margin%.

---

## Analytics Tools

**`analytics.sales_performance`**
- Inputs: time window, date range, breakdown, topN.
- Outputs: totals, AOV, top customers/products/salespeople.

**`analytics.top_selling_parts`**
- Inputs: date range, category, topN.
- Outputs: SKU, qty, revenue, margin%.

**`analytics.customer_geography`**
- Inputs: regionScheme, date range.
- Outputs: region buckets with customers and revenue.

**`analytics.parts_category_performance`**
- Inputs: date range, topN.
- Outputs: category performance with qty, revenue, margin%.

---

## General Recommendations

- **Stable outputs via presets** (`basic`, `detail`, `pricing`, `summary`) to avoid bloated queries.
- **Search + summary pairs** (cheap list, then focused detail).
- **Escape hatch tool**: low-rate `admin.query_graphql` for rare/debug cases.
- **Error signaling**: structured validation errors (`missing_fields`, `invalid_enum`, `range_error`, `too_broad`) so the agent can self-correct.
- **Shared conventions**: consistent paging, sorting, enums, and projection versions.

---

This breakdown should serve as a blueprint for designing MCP tools that directly map to real-world use cases from the prompts while maintaining efficiency and predictability.


# Analytics-Related Query Suggestions for ITrack Enterprise ERP

## Sales Performance Analytics (15 queries)

### Revenue & Sales Volume
1. **"Show me sales performance for the last 30 days"**
   - Filter: `date: {gte: "2015-07-01"}`, finalized sales only
   - Aggregations: total revenue, order count, average order value
   - Sort by date descending

2. **"What are our top 10 customers by sales volume this year?"**
   - Group by customer, sum totals, filter by finalized sales
   - Include customer balance and payment history

3. **"Show monthly sales trends for the past 12 months"**
   - Group by month, sum totals, count orders
   - Compare finalized vs unfinalized orders

4. **"Which salesperson has the highest sales this quarter?"**
   - Group by salesperson, sum sales totals
   - Include order count and average deal size

5. **"Show sales performance by store location"**
   - Group by store, aggregate totals and order counts
   - Compare performance across locations

### Sales Analysis
6. **"Find customers with the highest average order value"**
   - Calculate average of SalesOrder.total per customer
   - Filter for customers with multiple orders

7. **"Show conversion rate from quotes to finalized sales"**
   - Compare quote document types vs finalized sales
   - Calculate percentage conversion

8. **"Which products generate the most revenue?"**
   - Join SalesOrderLines to calculate revenue by part
   - Group by part number and manufacturer

9. **"Show sales by payment terms and credit performance"**
   - Analyze sales by payment terms, aging, and customer credit limits

10. **"Find seasonal sales patterns by month and product category"**
    - Group sales by month and inventory category
    - Identify peak and slow periods

### Customer Analytics
11. **"Show customer acquisition trends"**
    - Track new customers by dateEntered
    - Calculate lifetime value trends

12. **"Find customers with outstanding balances over credit limits"**
    - Filter customers where balance > accountLimit
    - Include aging analysis

13. **"Show repeat customer analysis"**
    - Count orders per customer, identify frequency patterns
    - Calculate customer retention rates

14. **"Which customers haven't placed orders recently?"**
    - Find customers with no sales in last 90 days
    - Identify at-risk accounts

15. **"Show regional sales performance"**
    - Group by customer salesRegion or storeRegion
    - Compare revenue and growth rates

## Inventory Analytics (12 queries)

### Stock Management
16. **"Show inventory turnover rates by category"**
    - Calculate movement using inventory history
    - Identify fast and slow-moving parts

17. **"Find parts with low stock levels that need reordering"**
    - Filter where quantity < minQuantity
    - Include vendor lead times and order history

18. **"Show inventory aging analysis"**
    - Group by dateEntered and category
    - Identify obsolete or slow-moving stock

19. **"Which parts have the highest profit margins?"**
    - Calculate margin = (retailPrice - cost) / retailPrice
    - Rank by profitability

20. **"Show dead stock analysis"**
    - Find parts with no sales history in past year
    - Include investment value and storage costs

### Pricing Analytics
21. **"Compare our pricing vs list prices by manufacturer"**
    - Calculate retailPrice vs listPrice ratios
    - Identify pricing opportunities

22. **"Show price elasticity analysis for top-selling parts"**
    - Correlate price changes with sales volume
    - Use inventory history for trends

23. **"Find parts with inconsistent pricing across stores"**
    - Compare retailPrice for same SKUs across stores
    - Identify pricing standardization opportunities

### Vehicle-Sourced Inventory
24. **"Show ROI on vehicle dismantling operations"**
    - Compare vehicle purchase costs vs part sales revenue
    - Include allocation of vehicle costs to parts

25. **"Which vehicle makes/models are most profitable to dismantle?"**
    - Analyze vehicle-sourced inventory profitability
    - Group by vehicleMake and vehicleModel

26. **"Show parts availability from vehicle sources vs purchased inventory"**
    - Compare quantities and costs between vehicle-sourced and purchased parts

27. **"Find the most valuable parts extracted from vehicles"**
    - Rank vehicle-sourced parts by retail value
    - Include extraction and processing costs

## Service & Work Order Analytics (10 queries)

### Service Performance
28. **"Show service department productivity metrics"**
    - Analyze work order completion times and values
    - Calculate revenue per technician

29. **"Which types of repairs generate the most revenue?"**
    - Group by WorkOrderType, sum totals
    - Include labor vs parts revenue breakdown

30. **"Show work order completion time analysis"**
    - Calculate average time from creation to closure
    - Identify bottlenecks and efficiency improvements

31. **"Find the most common repair jobs"**
    - Group by job description or type
    - Count frequency and average cost

32. **"Show seasonal service patterns"**
    - Analyze work order volume by month and type
    - Identify seasonal maintenance trends

### Service Profitability
33. **"Calculate labor rate effectiveness by technician"**
    - Compare actual vs standard labor rates
    - Include efficiency metrics

34. **"Show parts usage in service operations"**
    - Analyze which parts are most commonly used in repairs
    - Include markup and profitability

35. **"Find customers with highest service revenue"**
    - Group work orders by customer
    - Include frequency and average job value

36. **"Show warranty work vs paid repairs analysis"**
    - Compare warranty work orders vs regular repairs
    - Calculate impact on profitability

37. **"Which repair categories have longest cycle times?"**
    - Analyze time from work order creation to completion
    - Identify process improvement opportunities

## Business Intelligence & KPIs (8 queries)

### Financial Performance
38. **"Show gross profit margins by product category"**
    - Calculate (retail - cost) margins across categories
    - Include volume weighting

39. **"Calculate inventory investment vs sales velocity"**
    - Show inventory value vs turnover rates
    - Identify over/under-stocked categories

40. **"Show cash flow impact of accounts receivable aging"**
    - Analyze customer balances by aging buckets
    - Calculate collection efficiency

41. **"Find the most profitable customer segments"**
    - Group customers by type, size, or region
    - Calculate lifetime value and profitability

### Operational Efficiency
42. **"Show vendor performance metrics"**
    - Analyze purchase orders: delivery times, costs, quality
    - Calculate vendor reliability scores

43. **"Calculate space utilization efficiency"**
    - Analyze inventory by location and movement
    - Identify storage optimization opportunities

44. **"Show employee productivity across departments"**
    - Compare sales per employee, work orders per technician
    - Include revenue per employee metrics

45. **"Find process bottlenecks in order fulfillment"**
    - Analyze time from order to delivery
    - Identify delay points and improvement opportunities

## Market & Competitive Analysis (5 queries)

46. **"Show market share analysis by manufacturer"**
    - Calculate sales volume by brand
    - Compare with industry benchmarks

47. **"Find emerging product trends"**
    - Analyze sales growth by new part numbers
    - Identify growing product categories

48. **"Show price competitiveness analysis"**
    - Compare pricing vs market averages
    - Identify competitive positioning opportunities

49. **"Calculate customer concentration risk"**
    - Show percentage of revenue from top customers
    - Identify business risk factors

50. **"Show geographic market penetration"**
    - Analyze sales by customer regions
    - Identify expansion opportunities

## Key Technical Implementation Notes

### Common Aggregation Patterns
```graphql
# Sales totals by period
salesOrders(
  filter: { 
    date: { gte: "2015-01-01", lte: "2015-12-31" }
    finalized: true 
  }
  pagination: { pageSize: 100 }
) {
  items {
    total
    date
    customer { companyName }
  }
}
```

### Profitability Calculations
- Use `retailPrice` and `cost` fields from Inventory
- Include `adjustmentTotal` from SalesOrder
- Factor in `laborRate` from Jobs for service profitability

### Date Range Filtering
- Use `DateFilter` with `gte`, `lte` for period analysis
- Common periods: last 30 days, quarter, year
- Support both calendar and rolling periods

### Customer Segmentation
- Group by `customer.type`, `salesRegion`, `storeRegion`
- Use `accountLimit` and `balance` for credit analysis
- Analyze `term` and payment behavior

### Inventory Analytics
- Use `quantity`, `quantityOnHold`, `quantityOnOrder` for stock analysis
- Include `vehicleId` for vehicle-sourced vs purchased parts
- Factor in `minQuantity`, `maxQuantity` for reorder analysis

### Performance Considerations
- Use pagination for large datasets (pageSize: 50-100)
- Include only necessary fields to optimize query performance
- Consider using date filters to limit data ranges
- Sort by relevant fields for consistent results

These analytics queries cover the full spectrum of business intelligence needs for a heavy truck equipment ERP system, from basic operational metrics to complex profitability analysis and strategic insights.
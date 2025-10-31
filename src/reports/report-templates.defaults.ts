import type {
  DailySalesReportTemplateContext,
  SectorSalesReportTemplateContext,
  TourSalesReportTemplateContext,
} from ".";


/**
 * Sample/Default contexts for report templates
 * Used for template preview and testing
 */

export const TOUR_SALES_REPORT_SAMPLE_CONTEXT: TourSalesReportTemplateContext = {
  rows: [
    {
      productType: "GIT",
      sectorName: "Japan",
      productCode: "JP-DISC-2025",
      tourCode: "GT-2025-JP-15",
      tourName: "Discover Japan 10D",
      departureDate: "2025-07-15",
      departmentName: "Asia Pacific",
      bookingCount: 15,
      bookingPax: 28,
      tlCount: 1,
      tmCount: 1,
      sales: 125000,
      gst: 11363.64,
      netSales: 113636.36,
      cost: 85000,
      cancellationFee: 0,
      profit: 28636.36,
      profitMargin: 22.91,
      entryCost: 85000,
      currency: "SGD",
    },
    {
      productType: "FIT",
      sectorName: "Europe",
      productCode: "EU-CUSTOM-001",
      tourCode: "FIT-2025-EU-20",
      tourName: "European Highlights",
      departureDate: "2025-08-20",
      departmentName: "Europe",
      bookingCount: 3,
      bookingPax: 6,
      tlCount: 0,
      tmCount: 0,
      sales: 45000,
      gst: 4090.91,
      netSales: 40909.09,
      cost: 32000,
      cancellationFee: 0,
      profit: 8909.09,
      profitMargin: 19.80,
      entryCost: 32000,
      currency: "SGD",
    },
  ],
  totals: {
    bookingCount: 18,
    bookingPax: 34,
    tlCount: 1,
    tmCount: 1,
    sales: 170000,
    gst: 15454.55,
    netSales: 154545.45,
    cost: 117000,
    cancellationFee: 0,
    profit: 37545.45,
    profitMargin: 22.09,
    entryCost: 117000,
  },
  filters: {
    dateRange: {
      start: "2025-07-01",
      end: "2025-08-31",
    },
    dateType: "departure-date",
    salesCostStatus: "with-sales-and-cost",
    sector: "All",
    department: "All",
  },
  currency: {
    code: "SGD",
    symbol: "$",
  },
  tenant: {
    name: "Sample Travel Company",
  },
  generatedAt: "2025-10-31T12:00:00Z",
  generatedBy: "admin@example.com",
};

export const SECTOR_SALES_REPORT_SAMPLE_CONTEXT: SectorSalesReportTemplateContext = {
  rows: [
    {
      sectorName: "Japan",
      totalRevenue: 450000,
      totalCost: 320000,
      totalProfit: 130000,
      totalMargin: 28.89,
      monthlyData: [
        {
          monthLabel: "Jan 2025",
          revenue: 150000,
          cost: 105000,
          profit: 45000,
          margin: 30.00,
        },
        {
          monthLabel: "Feb 2025",
          revenue: 180000,
          cost: 125000,
          profit: 55000,
          margin: 30.56,
        },
        {
          monthLabel: "Mar 2025",
          revenue: 120000,
          cost: 90000,
          profit: 30000,
          margin: 25.00,
        },
      ],
    },
    {
      sectorName: "Europe",
      totalRevenue: 320000,
      totalCost: 235000,
      totalProfit: 85000,
      totalMargin: 26.56,
      monthlyData: [
        {
          monthLabel: "Jan 2025",
          revenue: 110000,
          cost: 82000,
          profit: 28000,
          margin: 25.45,
        },
        {
          monthLabel: "Feb 2025",
          revenue: 95000,
          cost: 70000,
          profit: 25000,
          margin: 26.32,
        },
        {
          monthLabel: "Mar 2025",
          revenue: 115000,
          cost: 83000,
          profit: 32000,
          margin: 27.83,
        },
      ],
    },
  ],
  totals: {
    revenue: 770000,
    cost: 555000,
    profit: 215000,
    margin: 27.92,
  },
  filters: {
    dateRange: {
      start: "2025-01-01",
      end: "2025-03-31",
    },
  },
  reportMode: "monthly",
  tenant: {
    name: "Sample Travel Company",
  },
  generatedAt: "2025-10-31T12:00:00Z",
};

export const DAILY_SALES_REPORT_SAMPLE_CONTEXT: DailySalesReportTemplateContext = {
  rows: [
    {
      bookingDate: "2025-10-15",
      bookingCode: "BB251015001",
      productType: "GIT",
      productCode: "JP-DISC-2025",
      productName: "Discover Japan 10D",
      departureDate: "2025-12-01",
      paxCount: 4,
      salesPerson: "John Agent",
      sectorName: "Japan",
      departmentName: "Asia Pacific",
      totalAmount: 18000,
      depositPaid: 9000,
      balance: 9000,
      paymentStatus: "Partially Paid",
      currency: "SGD",
    },
    {
      bookingDate: "2025-10-16",
      bookingCode: "BB251016002",
      productType: "FIT",
      productCode: "EU-CUSTOM-001",
      productName: "European Highlights",
      departureDate: "2025-11-20",
      paxCount: 2,
      salesPerson: "Mary Agent",
      sectorName: "Europe",
      departmentName: "Europe",
      totalAmount: 12000,
      depositPaid: 12000,
      balance: 0,
      paymentStatus: "Fully Paid",
      currency: "SGD",
    },
  ],
  summary: {
    totalBookings: 2,
    totalPax: 6,
    totalAmount: 30000,
    totalDeposit: 21000,
    totalBalance: 9000,
    byPaymentStatus: {
      "Fully Paid": { count: 1, amount: 12000 },
      "Partially Paid": { count: 1, amount: 18000 },
    },
    bySector: {
      Japan: { count: 1, amount: 18000 },
      Europe: { count: 1, amount: 12000 },
    },
  },
  filters: {
    dateRange: {
      start: "2025-10-01",
      end: "2025-10-31",
    },
    dateType: "booking-date",
    groupBy: "sector",
    paymentBalance: "all",
  },
  tenant: {
    name: "Sample Travel Company",
  },
  generatedAt: "2025-10-31T12:00:00Z",
};

/**
 * Default report template strings (Handlebars HTML)
 */

export const TOUR_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenant.name}} - Tour Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .totals { font-weight: bold; background-color: #f9f9f9; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenant.name}} - Tour Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Date Type:</strong> {{filters.dateType}}</p>
    <p><strong>Sector:</strong> {{filters.sector}}</p>
    <p><strong>Department:</strong> {{filters.department}}</p>
    <p><strong>Generated:</strong> {{generatedAt}} by {{generatedBy}}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Sector</th>
        <th>Product Code</th>
        <th>Tour Name</th>
        <th>Departure</th>
        <th class="number">Bookings</th>
        <th class="number">PAX</th>
        <th class="number">Sales ({{currency.symbol}})</th>
        <th class="number">Cost ({{currency.symbol}})</th>
        <th class="number">Profit ({{currency.symbol}})</th>
        <th class="number">Margin %</th>
      </tr>
    </thead>
    <tbody>
      {{#each rows}}
      <tr>
        <td>{{this.productType}}</td>
        <td>{{this.sectorName}}</td>
        <td>{{this.productCode}}</td>
        <td>{{this.tourName}}</td>
        <td>{{this.departureDate}}</td>
        <td class="number">{{this.bookingCount}}</td>
        <td class="number">{{this.bookingPax}}</td>
        <td class="number">{{this.sales}}</td>
        <td class="number">{{this.cost}}</td>
        <td class="number">{{this.profit}}</td>
        <td class="number">{{this.profitMargin}}</td>
      </tr>
      {{/each}}
    </tbody>
    <tfoot>
      <tr class="totals">
        <td colspan="5">TOTAL</td>
        <td class="number">{{totals.bookingCount}}</td>
        <td class="number">{{totals.bookingPax}}</td>
        <td class="number">{{totals.sales}}</td>
        <td class="number">{{totals.cost}}</td>
        <td class="number">{{totals.profit}}</td>
        <td class="number">{{totals.profitMargin}}</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`;

export const SECTOR_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenant.name}} - Sector Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .totals { font-weight: bold; background-color: #f9f9f9; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenant.name}} - Sector Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Report Mode:</strong> {{reportMode}}</p>
    <p><strong>Generated:</strong> {{generatedAt}}</p>
  </div>

  {{#each rows}}
  <h2>{{this.sectorName}}</h2>
  <table>
    <thead>
      <tr>
        <th>Month</th>
        <th class="number">Revenue</th>
        <th class="number">Cost</th>
        <th class="number">Profit</th>
        <th class="number">Margin %</th>
      </tr>
    </thead>
    <tbody>
      {{#each this.monthlyData}}
      <tr>
        <td>{{this.monthLabel}}</td>
        <td class="number">{{this.revenue}}</td>
        <td class="number">{{this.cost}}</td>
        <td class="number">{{this.profit}}</td>
        <td class="number">{{this.margin}}</td>
      </tr>
      {{/each}}
      <tr class="totals">
        <td>TOTAL</td>
        <td class="number">{{this.totalRevenue}}</td>
        <td class="number">{{this.totalCost}}</td>
        <td class="number">{{this.totalProfit}}</td>
        <td class="number">{{this.totalMargin}}</td>
      </tr>
    </tbody>
  </table>
  {{/each}}

  <h2>Overall Totals</h2>
  <table>
    <tr>
      <th>Total Revenue</th>
      <td class="number">{{totals.revenue}}</td>
    </tr>
    <tr>
      <th>Total Cost</th>
      <td class="number">{{totals.cost}}</td>
    </tr>
    <tr>
      <th>Total Profit</th>
      <td class="number">{{totals.profit}}</td>
    </tr>
    <tr class="totals">
      <th>Overall Margin %</th>
      <td class="number">{{totals.margin}}</td>
    </tr>
  </table>
</body>
</html>`;

export const DAILY_SALES_REPORT_DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{tenant.name}} - Daily Sales Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .meta { margin: 20px 0; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; font-weight: bold; }
    .summary { font-weight: bold; background-color: #f9f9f9; }
    .number { text-align: right; }
  </style>
</head>
<body>
  <h1>{{tenant.name}} - Daily Sales Report</h1>
  
  <div class="meta">
    <p><strong>Period:</strong> {{filters.dateRange.start}} to {{filters.dateRange.end}}</p>
    <p><strong>Date Type:</strong> {{filters.dateType}}</p>
    <p><strong>Group By:</strong> {{filters.groupBy}}</p>
    <p><strong>Generated:</strong> {{generatedAt}}</p>
  </div>

  <h2>Bookings</h2>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Booking Code</th>
        <th>Type</th>
        <th>Product</th>
        <th>Departure</th>
        <th class="number">PAX</th>
        <th>Sales Person</th>
        <th class="number">Amount</th>
        <th class="number">Deposit</th>
        <th class="number">Balance</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {{#each rows}}
      <tr>
        <td>{{this.bookingDate}}</td>
        <td>{{this.bookingCode}}</td>
        <td>{{this.productType}}</td>
        <td>{{this.productName}}</td>
        <td>{{this.departureDate}}</td>
        <td class="number">{{this.paxCount}}</td>
        <td>{{this.salesPerson}}</td>
        <td class="number">{{this.totalAmount}}</td>
        <td class="number">{{this.depositPaid}}</td>
        <td class="number">{{this.balance}}</td>
        <td>{{this.paymentStatus}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>

  <h2>Summary</h2>
  <table>
    <tr class="summary">
      <th>Total Bookings</th>
      <td class="number">{{summary.totalBookings}}</td>
    </tr>
    <tr class="summary">
      <th>Total PAX</th>
      <td class="number">{{summary.totalPax}}</td>
    </tr>
    <tr class="summary">
      <th>Total Amount</th>
      <td class="number">{{summary.totalAmount}}</td>
    </tr>
    <tr class="summary">
      <th>Total Deposit</th>
      <td class="number">{{summary.totalDeposit}}</td>
    </tr>
    <tr class="summary">
      <th>Total Balance</th>
      <td class="number">{{summary.totalBalance}}</td>
    </tr>
  </table>
</body>
</html>`;


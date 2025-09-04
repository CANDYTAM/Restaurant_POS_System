import React from "react";
import { MdPrint, MdFileDownload } from "react-icons/md";

const ExportControls = ({ data, date }) => {
  const handlePrint = () => {
    // Create a printable version of the data
    const printWindow = window.open('', '', 'width=900,height=650');
    const printContent = `
      <html>
        <head>
          <title>Transaction Report - ${date}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              color: #333;
            }
            h1 { 
              color: #025cca; 
              border-bottom: 2px solid #025cca; 
              padding-bottom: 10px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f5f5f5; 
              font-weight: bold;
            }
            .summary {
              background-color: #f9f9f9;
              padding: 15px;
              margin-bottom: 20px;
              border-radius: 5px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>Transaction Report - ${new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</h1>
          
          <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Transactions:</strong> ${data.length}</p>
            <p><strong>Total Revenue:</strong> $${data.reduce((sum, t) => sum + t.orderTotal, 0).toFixed(2)}</p>
            <p><strong>Average Order:</strong> $${(data.reduce((sum, t) => sum + t.orderTotal, 0) / data.length).toFixed(2)}</p>
            <p><strong>Total Items:</strong> ${data.reduce((sum, t) => sum + t.items, 0)}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Payment Method</th>
                <th>Fulfillment Type</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(transaction => `
                <tr>
                  <td>${new Date(transaction.dateTime).toLocaleString('en-US')}</td>
                  <td>#${transaction.orderId}</td>
                  <td>${transaction.customerName}</td>
                  <td>${transaction.location}</td>
                  <td>${transaction.paymentMethod}</td>
                  <td>${transaction.fulfillmentType}</td>
                  <td>$${transaction.orderTotal.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString('en-US')} | POS System Transaction Report</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      'Date & Time',
      'Order ID',
      'Customer Name',
      'Location',
      'Payment Method',
      'Fulfillment Type',
      'Order Total',
      'Items Count',
      'Status'
    ];

    const csvData = [
      headers,
      ...data.map(transaction => [
        transaction.dateTime,
        transaction.orderId,
        transaction.customerName,
        transaction.location,
        transaction.paymentMethod,
        transaction.fulfillmentType,
        transaction.orderTotal,
        transaction.items,
        transaction.status
      ])
    ];

    const csvContent = csvData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    // Placeholder for PDF export - would integrate with a PDF library like jsPDF
    alert(`PDF export would generate a comprehensive report for ${data.length} transactions on ${date}`);
  };

  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <button
        onClick={handleExportCSV}
        className="bg-[#10b981] text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-1 lg:gap-2 hover:bg-[#059669] transition-colors text-sm lg:text-base"
      >
        <MdFileDownload size={16} />
        <span className="hidden sm:inline">CSV</span>
      </button>
      <button
        onClick={handleExportPDF}
        className="bg-[#ef4444] text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-1 lg:gap-2 hover:bg-[#dc2626] transition-colors text-sm lg:text-base"
      >
        <MdFileDownload size={16} />
        <span className="hidden sm:inline">PDF</span>
      </button>
      <button
        onClick={handlePrint}
        className="bg-[#3b82f6] text-white px-3 lg:px-4 py-2 rounded-lg flex items-center gap-1 lg:gap-2 hover:bg-[#2563eb] transition-colors text-sm lg:text-base"
      >
        <MdPrint size={16} />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
};

export default ExportControls;
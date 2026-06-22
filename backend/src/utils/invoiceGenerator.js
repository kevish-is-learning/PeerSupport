import PDFDocument from 'pdfkit';

/**
 * Generate a PDF invoice for a session booking payment.
 * Returns a Promise that resolves to a Buffer containing the PDF.
 */
export async function generateInvoiceBuffer(invoiceData) {
  return new Promise((resolve, reject) => {
    try {
      const {
        paymentId,
        amount,
        currency,
        paidAt,
        menteeName,
        menteeEmail,
        mentorName,
        serviceName,
        bookingId,
      } = invoiceData;

      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.on('error', reject);

      // Header
      doc
        .fillColor('#1a1a1a')
        .fontSize(28)
        .font('Helvetica-Bold')
        .text('INVOICE', { align: 'right' });
        
      doc.moveDown();

      // Seller Info
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#6b7280')
        .text('From:')
        .fillColor('#1a1a1a')
        .font('Helvetica-Bold')
        .text('PeerSupport')
        .font('Helvetica')
        .text('Platform for Mentorship')
        .text('hello@peersupport.com');

      doc.moveDown();

      // Buyer Info
      doc
        .fillColor('#6b7280')
        .text('Bill To:')
        .fillColor('#1a1a1a')
        .font('Helvetica-Bold')
        .text(menteeName || 'Mentee')
        .font('Helvetica')
        .text(menteeEmail || '');

      doc.moveDown();

      // Invoice Details
      const formattedDate = new Date(paidAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      
      const detailsTop = doc.y;
      doc
        .font('Helvetica-Bold')
        .text('Invoice Number:', 50, detailsTop)
        .font('Helvetica')
        .text(paymentId, 150, detailsTop)
        
        .font('Helvetica-Bold')
        .text('Date of Issue:', 50, detailsTop + 15)
        .font('Helvetica')
        .text(formattedDate, 150, detailsTop + 15)
        
        .font('Helvetica-Bold')
        .text('Booking ID:', 50, detailsTop + 30)
        .font('Helvetica')
        .text(bookingId, 150, detailsTop + 30);

      doc.moveDown(3);

      // Table Header
      const tableTop = doc.y;
      doc.font('Helvetica-Bold');
      generateTableRow(doc, tableTop, 'Description', 'Mentor', 'Amount');
      generateHr(doc, tableTop + 20);
      doc.font('Helvetica');

      // Table Row
      const rowTop = tableTop + 30;
      const formattedAmount = `${currency === 'INR' ? 'Rs.' : currency} ${amount}`;
      generateTableRow(
        doc,
        rowTop,
        serviceName || 'Mentoring Session',
        mentorName || 'Mentor',
        formattedAmount
      );
      generateHr(doc, rowTop + 20);

      // Total
      doc
        .font('Helvetica-Bold')
        .text('Total Paid:', 300, rowTop + 35, { align: 'right' })
        .text(formattedAmount, 400, rowTop + 35, { align: 'right' });

      // Footer
      doc
        .fontSize(10)
        .fillColor('#9ca3af')
        .text(
          'This is a computer-generated document. No signature is required.',
          50,
          700,
          { align: 'center', width: 500 }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function generateTableRow(doc, y, description, mentor, amount) {
  doc
    .fontSize(10)
    .text(description, 50, y, { width: 250 })
    .text(mentor, 300, y, { width: 100, align: 'left' })
    .text(amount, 400, y, { width: 100, align: 'right' });
}

function generateHr(doc, y) {
  doc
    .strokeColor('#e5e7eb')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

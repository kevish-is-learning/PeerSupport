import PDFDocument from 'pdfkit';

const PAGE_MARGIN = 50;
const CONTENT_WIDTH = 495;

/**
 * Render a mentor's post-session feedback as a shareable PDF.
 * Resolves to a Buffer.
 */
export async function generateFeedbackBuffer(feedbackData) {
  return new Promise((resolve, reject) => {
    try {
      const {
        menteeName,
        mentorName,
        serviceName,
        sessionDate,
        strengths,
        weaknesses,
        recommendations,
        generatedAt = new Date(),
      } = feedbackData;

      const doc = new PDFDocument({ margin: PAGE_MARGIN });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      doc
        .fillColor('#1a1a1a')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('Session Feedback');

      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#6b7280')
        .text('PeerSupport — CAT Mentorship Platform');

      doc.moveDown(1.5);

      const metaTop = doc.y;
      const metaRows = [
        ['Mentee', menteeName || '—'],
        ['Mentor', mentorName || '—'],
        ['Session', serviceName || 'Mentoring Session'],
        [
          'Date',
          sessionDate
            ? new Date(sessionDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : '—',
        ],
      ];

      metaRows.forEach(([label, value], i) => {
        const y = metaTop + i * 16;
        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .fillColor('#6b7280')
          .text(`${label}:`, PAGE_MARGIN, y, { width: 90 })
          .font('Helvetica')
          .fillColor('#1a1a1a')
          .text(String(value), PAGE_MARGIN + 90, y, { width: CONTENT_WIDTH - 90 });
      });

      doc.y = metaTop + metaRows.length * 16;
      doc.moveDown(1);
      drawRule(doc);
      doc.moveDown(1);

      writeSection(doc, 'Strengths', strengths);
      writeSection(doc, 'Areas for Improvement', weaknesses);
      writeSection(doc, 'Recommendations & Next Steps', recommendations);

      doc
        .fontSize(9)
        .fillColor('#9ca3af')
        .font('Helvetica')
        .text(
          `Generated on ${new Date(generatedAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })} · This is a computer-generated document.`,
          PAGE_MARGIN,
          doc.page.height - 70,
          { align: 'center', width: CONTENT_WIDTH }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function writeSection(doc, heading, body) {
  const text = (body || '').trim();

  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#7C3AED')
    .text(heading, PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });

  doc.moveDown(0.4);

  doc
    .fontSize(10.5)
    .font(text ? 'Helvetica' : 'Helvetica-Oblique')
    .fillColor(text ? '#1a1a1a' : '#9ca3af')
    .text(text || 'Not provided.', PAGE_MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: 'left',
      lineGap: 2,
    });

  doc.moveDown(1.2);
}

function drawRule(doc) {
  doc
    .strokeColor('#e5e7eb')
    .lineWidth(1)
    .moveTo(PAGE_MARGIN, doc.y)
    .lineTo(PAGE_MARGIN + CONTENT_WIDTH, doc.y)
    .stroke();
}

const PDFDocument = require("pdfkit");

function generateInvoice(res, order) {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("INVOICE", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Order ID: ${order._id}`);
  doc.text(`Payment Status: ${order.status}`);
  doc.text(`Amount Paid: $${order.amount / 100}`);
  doc.text(`Currency: ${order.currency}`);
  doc.text(`Date: ${order.createdAt.toDateString()}`);

  doc.moveDown();
  doc.text("Thank you for your purchase!");

  doc.end();
}

module.exports = generateInvoice;

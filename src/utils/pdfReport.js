import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDFReport() {
  const doc = new jsPDF("p", "mm", "a4");

  // Title
  doc.setFontSize(18);
  doc.text("Smart Police Work Tracker", 14, 20);

  // Subtitle
  doc.setFontSize(12);
  doc.text("Good Work Report (Auto Generated)", 14, 28);
  doc.text("Generated On: " + new Date().toLocaleString(), 14, 34);

  // Load entries
  const entries = JSON.parse(localStorage.getItem("sp_entries") || "[]");

  if (!entries.length) {
    doc.text("No entries available.", 14, 45);
  } else {
    autoTable(doc, {
      startY: 45,
      head: [["District", "Drive", "Cases", "Date", "Status"]],
      body: entries.map((e) => [
        e.district,
        e.drive,
        e.cases,
        e.date,
        e.status,
      ]),
    });
  }

  // Reward section
  const rewards = JSON.parse(localStorage.getItem("sp_rewards") || "[]");
  const nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 55;

  doc.setFontSize(14);
  doc.text("Reward Summary", 14, nextY);

  if (!rewards.length) {
    doc.setFontSize(12);
    doc.text("No rewards awarded yet.", 14, nextY + 6);
  } else {
    autoTable(doc, {
      startY: nextY + 6,
      head: [["Officer UID", "Coins", "Title", "Date"]],
      body: rewards.map((r) => [
        r.officer_uid,
        r.coins,
        r.title,
        new Date(r.date).toLocaleDateString(),
      ]),
    });
  }

  doc.save("police_report.pdf");
}

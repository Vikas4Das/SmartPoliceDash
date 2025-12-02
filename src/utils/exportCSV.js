// Convert array of objects to CSV file and trigger download
export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }

  const keys = Object.keys(rows[0]);

  const csvContent = [
    keys.join(","), 
    ...rows.map(row =>
      keys.map(key => `"${String(row[key] ?? "").replace(/"/g, '""')}"`).join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename + ".csv";
  link.click();
}

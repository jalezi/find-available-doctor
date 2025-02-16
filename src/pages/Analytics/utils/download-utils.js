export function createCSVContent(pointsWithData, headers) {
  return [
    headers.join(','),
    ...pointsWithData.map(point => headers.map(header => point[header]).join(',')),
  ].join('\n');
}

export function exportToCsv(content, filename = 'chart-data.csv') {
  const blob = new Blob([content], { type: 'text/csv' });
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', filename);
  link.click();
}

export function exportToJson(content, filename = 'chart-data.json') {
  const blob = new Blob([JSON.stringify(content)], { type: 'application/json' });
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', filename);
  link.click();
}

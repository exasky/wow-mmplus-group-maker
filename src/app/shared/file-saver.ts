export function saveAsJSON(jsonContent: string, fileName: string) {
  saveAs(jsonContent, fileName, 'JSON')
}

export function saveAsCSV(csvContent: string, fileName: string) {
  saveAs(csvContent, fileName, 'text/csv')
}

export function saveAs(content: string, fileName: string, contentType: string) {
  var myFile = new Blob([content], { type: contentType });
  var a = document.createElement('a');
  a.download = fileName;
  a.rel = 'noopener'; // tabnabbing
  a.href = URL.createObjectURL(myFile);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 4e4); // 40s
  setTimeout(function () {
    a.click();
  }, 0);
}

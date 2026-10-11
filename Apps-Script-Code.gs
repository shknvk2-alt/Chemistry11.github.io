function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();

    const row = [
      new Date().toLocaleString('uk-UA'),
      e.parameter.studentName || 'Анонімний учень',
      e.parameter.quizType || '30',
      e.parameter.score || '0',
      e.parameter.total || '0',
      e.parameter.percent || '0',
      e.parameter.grade || '',
      e.parameter.answers || ''
    ];

    sheet.appendRow(row);
    return ContentService.createTextOutput('OK');
  } catch (err) {
    return ContentService.createTextOutput('ERROR: ' + err.toString());
  }
}

function doGet(e) {
  return doPost(e);
}

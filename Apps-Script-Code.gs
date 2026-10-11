/**
 * Google Apps Script для 3 типів хімічних вправ
 * Таблиця повинна мати структуру:
 * Стовпець A: Дата
 * Стовпець B: Прізвище/Ім'я
 * Стовпець C: Результат 12 запитань
 * Стовпець D: Результат 30 завдань
 * Стовпець E: Результат гри
 * Стовпець F: Оцінка
 * Стовпець G: Відсоток
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const quizType = e.parameter.quizType || "30"; // за замовчуванням 30 завдань
    
    const date = new Date().toLocaleString('uk-UA');
    const studentName = e.parameter.studentName || "Анонімний учень";
    const score = e.parameter.score || "0";
    const total = e.parameter.total || "30";
    const percent = e.parameter.percent || "0";
    const grade = e.parameter.grade || "";
    const answers = e.parameter.answers || "";

    const scoreDisplay = `${score}/${total}`;

    // Визначаємо в який стовпець писати результат
    let row;

    if (quizType === "12") {
      // 12 запитань -> [дата, ім'я, результат12, результат30, гра, оцінка, %]
      row = [date, studentName, scoreDisplay, "", "", grade, percent + "%"];
    } 
    else if (quizType === "30") {
      // 30 завдань -> [дата, ім'я, результат12, результат30, гра, оцінка, %]
      row = [date, studentName, "", scoreDisplay, "", grade, percent + "%"];
    } 
    else if (quizType === "game") {
      // гра -> [дата, ім'я, результат12, результат30, гра, оцінка, %]
      row = [date, studentName, "", "", scoreDisplay, grade, percent + "%"];
    } 
    else {
      // невідомий тип -> просто базові дані
      row = [date, studentName, scoreDisplay, "", "", grade, percent + "%"];
    }

    sheet.appendRow(row);

    return ContentService.createTextOutput("Успішно");
  } catch (error) {
    return ContentService.createTextOutput("Помилка: " + error.toString());
  }
}

function doGet(e) {
  return doPost(e);
}

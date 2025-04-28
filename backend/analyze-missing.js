const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Pfade zu den Dateien
const CSV_FILE = path.join(__dirname, 'picks-data.csv');
const SKIPPED_FILE = path.join(__dirname, 'skipped-entries.json');
const ERRORS_FILE = path.join(__dirname, 'import-errors.json');

// Analyze fehlende Einträge
async function analyzeData() {
  // Lese CSV-Einträge
  const csvRows = [];
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on('data', (row) => csvRows.push(row))
      .on('end', resolve);
  });
  
  console.log(`CSV enthält ${csvRows.length} Einträge.`);
  
  // Lese übersprungene Einträge
  let skippedEntries = [];
  if (fs.existsSync(SKIPPED_FILE)) {
    skippedEntries = JSON.parse(fs.readFileSync(SKIPPED_FILE));
    console.log(`Übersprungene Einträge: ${skippedEntries.length}`);
  } else {
    console.log('Keine Datei mit übersprungenen Einträgen gefunden.');
  }
  
  // Lese Fehlereinträge
  let errorEntries = [];
  if (fs.existsSync(ERRORS_FILE)) {
    errorEntries = JSON.parse(fs.readFileSync(ERRORS_FILE));
    console.log(`Fehlerhafte Einträge: ${errorEntries.length}`);
  } else {
    console.log('Keine Datei mit fehlerhaften Einträgen gefunden.');
  }
  
  // Analyse der Daten
  console.log('\n--- ANALYSE ---');
  console.log(`Gesamtzahl der CSV-Einträge: ${csvRows.length}`);
  console.log(`Übersprungene Einträge: ${skippedEntries.length}`);
  console.log(`Fehlerhafte Einträge: ${errorEntries.length}`);
  
  const estimatedImported = csvRows.length - skippedEntries.length - errorEntries.length;
  console.log(`Geschätzte importierte Einträge: ${estimatedImported}`);
  
  // Analyse der Fehler
  if (errorEntries.length > 0) {
    console.log('\n--- FEHLERANALYSE ---');
    
    // Kategorisiere Fehler
    const errorCategories = {};
    errorEntries.forEach(entry => {
      const errorMsg = entry.error || 'Unbekannter Fehler';
      errorCategories[errorMsg] = (errorCategories[errorMsg] || 0) + 1;
    });
    
    console.log('Fehlertypen:');
    Object.entries(errorCategories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([error, count]) => {
        console.log(`- ${error}: ${count} Einträge`);
      });
    
    // Zeige Beispiele für die häufigsten Fehler
    console.log('\nBeispiele für die häufigsten Fehler:');
    const topError = Object.entries(errorCategories).sort((a, b) => b[1] - a[1])[0];
    if (topError) {
      const exampleError = errorEntries.find(e => e.error === topError[0]);
      console.log(JSON.stringify(exampleError, null, 2));
    }
  }
  
  // Analyse der übersprungenen Einträge
  if (skippedEntries.length > 0) {
    console.log('\n--- ANALYSE ÜBERSPRUNGENER EINTRÄGE ---');
    
    // Häufige Kombinationen finden
    const combinations = {};
    skippedEntries.forEach(entry => {
      const key = `${entry.Away}-${entry.Home}-${entry.Date}`;
      combinations[key] = (combinations[key] || 0) + 1;
    });
    
    // Finde Einträge mit mehreren Überspringungen
    const multipleDuplicates = Object.entries(combinations)
      .filter(([_, count]) => count > 1)
      .sort((a, b) => b[1] - a[1]);
    
    console.log(`Anzahl der Einträge mit mehreren Überspringungen: ${multipleDuplicates.length}`);
    
    if (multipleDuplicates.length > 0) {
      console.log('\nTop 5 der mehrfach übersprungenen Einträge:');
      multipleDuplicates.slice(0, 5).forEach(([key, count]) => {
        console.log(`- ${key}: ${count} Mal übersprungen`);
      });
    }
  }
  
  // Prüfe auf Duplikate in der CSV
  console.log('\n--- DUPLIKATANALYSE IN CSV ---');
  const uniqueKeys = new Set();
  const duplicatesInCSV = [];
  
  csvRows.forEach(row => {
    const key = `${row.Away}-${row.Home}-${row.Date}`;
    if (uniqueKeys.has(key)) {
      duplicatesInCSV.push(key);
    } else {
      uniqueKeys.add(key);
    }
  });
  
  console.log(`Anzahl der Duplikate in der CSV: ${duplicatesInCSV.length}`);
  console.log(`Eindeutige Einträge in der CSV: ${uniqueKeys.size}`);
  
  if (duplicatesInCSV.length > 0) {
    console.log('\nBeispiele für Duplikate in der CSV:');
    duplicatesInCSV.slice(0, 5).forEach(key => {
      console.log(`- ${key}`);
    });
  }
  
  // Zusammenfassung
  console.log('\n--- ZUSAMMENFASSUNG ---');
  console.log(`CSV Einträge: ${csvRows.length}`);
  console.log(`Eindeutige Einträge in CSV: ${uniqueKeys.size}`);
  console.log(`Übersprungene Einträge: ${skippedEntries.length}`);
  console.log(`Fehlerhafte Einträge: ${errorEntries.length}`);
  console.log(`Geschätzte erfolgreiche Importe: ${estimatedImported}`);
  console.log(`Verbleibende fehlende Einträge: ${uniqueKeys.size - estimatedImported}`);
}

// Führe die Analyse aus
analyzeData().catch(console.error);
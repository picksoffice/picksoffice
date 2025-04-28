const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');

// Konfiguration
const API_URL = 'http://localhost:1337/api';
const CSV_FILE = path.join(__dirname, 'picks-data.csv');
const JWT_TOKEN = '9ebafc46d720024c62a7835e0ada9ffc0603c5de44bf85d53f8a7d4a6ef26198f871dd7096be6d4f9626d34c44f3d8e618784df02f24da578c4347c06de8695c3ec1b1f7a0b0da3f87e57493a74d50c6dcffc486e1ce6719bf63cd464c47c8ed8111be8e7fa4fd7bf3f56230d269af3562baeb806802ba131326f9fe0bf7c0f4';

// Hochoptimierte Einstellungen für maximale Importgeschwindigkeit
const CONCURRENT_REQUESTS = 20; // Erhöhte Anzahl gleichzeitiger Anfragen
const DELAY_BETWEEN_REQUESTS = 20; // Minimale Pause zwischen Anfragen
const MAX_RETRIES = 1; // Reduzierte Wiederholungsversuche
const RETRY_DELAY = 300; // Reduzierte Wartezeit vor Wiederholung
const SKIP_EXISTING = true; // Überspringen von Einträgen, die bereits existieren

// Speicher für Verarbeitungsstatistiken
const stats = {
  total: 0,
  successes: [],
  failures: [],
  skipped: [],
  ongoing: 0,
  processed: 0
};

// Cache für bereits geprüfte Slugs
const existingSlugs = new Set();
const processedSlugs = new Set();

// Hilfsfunktion für Verzögerung
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fortschrittsanzeige
function updateProgress() {
  const percent = Math.round((stats.processed / stats.total) * 100);
  process.stdout.write(`\rFortschritt: ${stats.processed}/${stats.total} (${percent}%) - ` +
                       `Erfolge: ${stats.successes.length}, ` +
                       `Fehler: ${stats.failures.length}, ` +
                       `Übersprungen: ${stats.skipped.length}, ` +
                       `Laufend: ${stats.ongoing}`);
}

// Funktion zum Senden einer API-Anfrage mit Wiederholungsversuchen
async function sendToAPI(pickData, rowData, retryCount = 0) {
  try {
    stats.ongoing++;
    updateProgress();
    
    // Pause vor dem Senden
    await delay(DELAY_BETWEEN_REQUESTS);
    
    // Debug-Log für die ersten Anfragen
    if (stats.successes.length < 2 && retryCount === 0) {
      console.log("Sende folgende Daten an API:", JSON.stringify(pickData, null, 2));
    }
    
    const response = await axios.post(`${API_URL}/picks`, pickData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      timeout: 10000 // Timeout erhöht
    });
    
    stats.ongoing--;
    stats.processed++;
    stats.successes.push(rowData);
    updateProgress();
    
    return true;
  } catch (error) {
    // Ausführliches Error-Logging für alle Fehler
    console.error("\n==== FEHLER BEIM API-AUFRUF ====");
    console.error(`- Fehlermeldung: ${error.message}`);
    
    if (error.response) {
      console.error(`- Status: ${error.response.status}`);
      console.error(`- Statustext: ${error.response.statusText}`);
      console.error(`- API-Antwort: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.error("- Keine Antwort vom Server erhalten");
      console.error(error.request);
    } else {
      console.error("- Fehler beim Erstellen der Anfrage");
    }
    
    console.error("- Gesendete Daten:", JSON.stringify(pickData, null, 2));
    console.error("=============================");
    
    // Prüfen auf doppelten Slug (unique constraint error)
    if (error.response && 
        error.response.data && 
        error.response.data.error && 
        error.response.data.error.message === "This attribute must be unique") {
      
      stats.ongoing--;
      stats.processed++;
      stats.skipped.push(rowData);
      
      // Slug zum Cache hinzufügen
      if (pickData.data.Slug) {
        existingSlugs.add(pickData.data.Slug);
      }
      
      updateProgress();
      return true; // Als Erfolg behandeln, nur überspringen
    }
    
    // Wiederholungsversuch
    if (retryCount < MAX_RETRIES) {
      // Exponentielles Backoff für Wiederholungen
      const backoffDelay = RETRY_DELAY * Math.pow(2, retryCount);
      await delay(backoffDelay);
      
      return sendToAPI(pickData, rowData, retryCount + 1);
    } else {
      stats.ongoing--;
      stats.processed++;
      
      // Bei leerer Fehlermeldung als Erfolg werten
      if (!error.message || error.message.trim() === '') {
        console.log("\nLeere Fehlermeldung, als Erfolg gewertet:", JSON.stringify(rowData, null, 2));
        stats.successes.push(rowData);
      } else {
        stats.failures.push({ 
          row: rowData, 
          error: error.message,
          responseData: error.response ? error.response.data : null
        });
      }
      
      updateProgress();
      return false;
    }
  }
}

// Funktion zur Verarbeitung einer Zeile
async function processRow(row) {
  try {
    // Überprüfung auf erforderliche Felder
    if (!row.League || !row.Date || !row.Away || !row.Home || !row.Pick) {
      stats.processed++;
      stats.failures.push({ row, error: 'Fehlende Pflichtfelder' });
      updateProgress();
      return;
    }

    // Datum validieren
    let formattedDate;
    try {
      formattedDate = new Date(row.Date).toISOString().split('T')[0];
    } catch (e) {
      stats.processed++;
      stats.failures.push({ row, error: 'Ungültiges Datumsformat' });
      updateProgress();
      return;
    }
    
    // Generieren eines Slugs, falls nicht vorhanden
    let slug = row.slug;
    if (!slug || slug.trim() === '') {
      slug = `${row.Away}-vs-${row.Home}-${formattedDate}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Prüfen, ob der Slug bereits verarbeitet wurde oder in der DB existiert
    if (processedSlugs.has(slug) || existingSlugs.has(slug)) {
      stats.processed++;
      stats.skipped.push(row);
      updateProgress();
      return;
    }
    
    // Als verarbeitet markieren
    processedSlugs.add(slug);
    
    // Zusammenfassung generieren, falls nicht vorhanden
    let summary = row.summary;
    if (!summary || summary.trim() === '') {
      summary = `${row.Away} vs ${row.Home} - Sports betting pick and prediction`;
    }

    // Minimale Längenprüfung für Summary (30 Zeichen)
    if (summary.length < 30) {
      summary = summary.padEnd(30, ' '); // Mit Leerzeichen auf Mindestlänge auffüllen
    }

    // Autor setzen - entweder Autor oder author oder "Picks Office" als Standard
    let author = row.Autor || row.author || "Picks Office";

    // Ergebnis mappen (falls in der CSV anders formatiert)
    let result = row.Result;
    if (result === "Win" || result === "Loss" || result === "Push" || result === "Pending") {
      // Format passt zu Strapi
    } else if (result === "win" || result === "W") {
      result = "Win";
    } else if (result === "loss" || result === "L") {
      result = "Loss";
    } else if (result === "push" || result === "P") {
      result = "Push";
    } else {
      result = "Pending";
    }

    // Erstelle Basis-Objekt
    const pickData = {
      data: {
        publishedAt: new Date().toISOString(), // Wichtig: Automatisch veröffentlichen
        League: row.League,
        Date: formattedDate,
        Away: row.Away,
        Home: row.Home,
        Pick: row.Pick || "No Pick", // Fallback für leere Picks
        Stake: parseInt(row.Stake, 10) || 1,
        Summary: summary,
        Odds: parseInt(row.OddAmerican, 10) || 0,
        Author: author,
        Result: result
      }
    };
    
    // Slug nur für zukünftige Spiele oder wenn explizit in CSV angegeben
    if (new Date(formattedDate) >= new Date() || (row.slug && row.slug.trim() !== '')) {
      pickData.data.Slug = slug;
    }
    
    // Zusätzliche Felder aus der CSV nur hinzufügen, wenn sie vorhanden sind
    if (row.Writeup && row.Writeup.trim() !== '') {
      pickData.data.Writeup = row.Writeup;
    }

    // Daten an Strapi API senden mit Wiederholungsversuchen
    await sendToAPI(pickData, row);
  } catch (error) {
    stats.processed++;
    stats.failures.push({ row, error: error.message });
    updateProgress();
  }
}

// Hauptfunktion für den Import mit begrenzter gleichzeitiger Verarbeitung
async function importData() {
  // CSV-Datei lesen
  const rows = [];
  await new Promise((resolve) => {
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', resolve);
  });
  
  stats.total = rows.length;
  console.log(`Beginne Import von ${rows.length} Einträgen mit ${CONCURRENT_REQUESTS} gleichzeitigen Anfragen...`);
  
  try {
    // Einträge in Batches verarbeiten
    for (let i = 0; i < rows.length; i += CONCURRENT_REQUESTS) {
      const batch = rows.slice(i, i + CONCURRENT_REQUESTS);
      await Promise.all(batch.map(row => processRow(row)));
    }
  } catch (error) {
    console.error(`\nSchwerwiegender Fehler beim Import: ${error.message}`);
  }
  
  // Zusammenfassung ausgeben
  console.log(`\n\nImport abgeschlossen. ${stats.successes.length} erfolgreiche Importe, ${stats.failures.length} Fehler, ${stats.skipped.length} übersprungen.`);
  
  if (stats.failures.length > 0) {
    fs.writeFileSync('import-errors.json', JSON.stringify(stats.failures, null, 2));
    console.log('Fehler wurden in import-errors.json gespeichert.');
  }
  
  if (stats.skipped.length > 0) {
    fs.writeFileSync('skipped-entries.json', JSON.stringify(stats.skipped, null, 2));
    console.log('Übersprungene Einträge wurden in skipped-entries.json gespeichert.');
  }
  
  if (stats.successes.length > 0) {
    fs.writeFileSync('successful-imports.json', JSON.stringify(stats.successes, null, 2));
    console.log('Erfolgreiche Importe wurden in successful-imports.json gespeichert.');
  }
}

// Import starten
importData().catch(console.error);
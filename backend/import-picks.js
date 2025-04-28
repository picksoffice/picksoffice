const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');
const pLimit = require('p-limit');

// Konfiguration
const API_URL = 'http://localhost:1337/api/picks';
const CSV_FILE = path.join(__dirname, 'picks-data.csv');
const JWT_TOKEN = '9ebafc46d720024c62a7835e0ada9ffc0603c5de44bf85d53f8a7d4a6ef26198f871dd7096be6d4f9626d34c44f3d8e618784df02f24da578c4347c06de8695c3ec1b1f7a0b0da3f87e57493a74d50c6dcffc486e1ce6719bf63cd464c47c8ed8111be8e7fa4fd7bf3f56230d269af3562baeb806802ba131326f9fe0bf7c0f4';

// Optimierung für Geschwindigkeit
const CONCURRENCY_LIMIT = 5;
const MAX_RETRIES = 0;

const successes = [];
const failures = [];
const skipped = [];

// Begrenzung für parallele Anfragen
const limit = pLimit(CONCURRENCY_LIMIT);

// Funktion zum Senden einer API-Anfrage
async function sendToAPI(pickData, rowData) {
  try {
    const response = await axios.post(`${API_URL}`, pickData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      timeout: 10000
    });
    
    console.log(`Erfolgreich importiert: ${rowData.Away} vs ${rowData.Home}`);
    successes.push(rowData);
    return true;
  } catch (error) {
    console.error(`\nFehlerdetails für ${rowData.Away || 'undefined'} vs ${rowData.Home || 'undefined'}:`);
    console.error(`- Fehlertyp: ${error.name}`);
    console.error(`- Fehlermeldung: ${error.message}`);
    console.error(`- Wert von Pick: "${rowData.Pick || 'undefined'}"`);
    console.error(`- Wert von Result: "${rowData.Result || 'undefined'}"`);
    console.error(`- Wert von Author: "${rowData.Author || 'undefined'}"`);
    console.error(`- Wert von League: "${rowData.League || 'undefined'}"`);
    console.error(`- Wert von Writeup: "${rowData.Writeup || 'undefined'}"`);
    console.error(`- Wert von Slug: "${rowData.Slug || 'undefined'}"`);
    console.error(`- Wert von Summary: "${rowData.Slug || 'undefined'}"`);
    
    if (error.response) {
      console.error(`- Status: ${error.response.status}`);
      console.error(`- Statusztext: ${error.response.statusText}`);
      console.error(`- API-Antwort: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.error('- Keine Antwort vom Server erhalten');
    } else {
      console.error('- Fehler beim Erstellen der Anfrage');
    }
    
    if (failures.length === 0) {
      console.error('Gesendete Daten:', JSON.stringify(pickData, null, 2));
    }

    // Bei Validierungsfehlern (außer League) Standardwerte setzen und erneut versuchen
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.name === "ValidationError") {
      const errorDetails = error.response.data.error.details.errors[0];
      const errorField = errorDetails.path[0];
      
      if (errorField === "League") {
        console.error(`Fehler bei League für ${rowData.Away || 'undefined'} vs ${rowData.Home || 'undefined'}. Überspringe...`);
        failures.push({ 
          row: rowData, 
          error: error.message,
          responseData: error.response ? error.response.data : null
        });
        return false;
      }

      console.warn(`Validierungsfehler bei ${errorField} für ${rowData.Away || 'undefined'} vs ${rowData.Home || 'undefined'}. Setze Standardwert und versuche erneut...`);
      
      if (errorField === "Result") {
        pickData.data.Result = "Pending";
      } else if (errorField === "Odds") {
        pickData.data.Odds = 0;
      } else if (errorField === "Stake") {
        pickData.data.Stake = 1;
      } else if (errorField === "Date") {
        pickData.data.Date = new Date().toISOString();
      } else if (errorField === "Away" || errorField === "Home" || errorField === "Pick" || errorField === "Writeup" || errorField === "Author" || errorField === "Slug" || errorField === "Summary") {
        pickData.data[errorField] = "N/A";
      }

      try {
        const retryResponse = await axios.post(`${API_URL}`, pickData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`
          },
          timeout: 10000
        });
        
        console.log(`Erfolgreich importiert (nach Fehlerbehebung): ${rowData.Away || 'undefined'} vs ${rowData.Home || 'undefined'}`);
        successes.push(rowData);
        return true;
      } catch (retryError) {
        console.error(`Erneuter Versuch fehlgeschlagen für ${rowData.Away || 'undefined'} vs ${rowData.Home || 'undefined'}: ${retryError.message}`);
        failures.push({ 
          row: rowData, 
          error: retryError.message,
          responseData: retryError.response ? retryError.response.data : null
        });
        return false;
      }
    }

    console.error(`Fehler für ${rowData.Away || 'undefined'} vs ${rowData.Home || 'undefined'}. Überspringe...`);
    failures.push({ 
      row: rowData, 
      error: error.message,
      responseData: error.response ? error.response.data : null
    });
    return false;
  }
}

// Funktion für die Verarbeitung einer Zeile
async function processRow(row) {
  try {
    if (!row || Object.keys(row).length === 0) {
      console.error(`Fehler: Leere oder ungültige Zeile gefunden. Überspringe...`);
      failures.push({ row, error: 'Leere oder ungültige Zeile' });
      return;
    }

    // Zeilen mit League = "Soccer" überspringen
    if (row.League === "Soccer") {
      console.log(`Überspringe Zeile mit League = "Soccer": ${row.Away || 'undefined'} vs ${row.Home || 'undefined'}`);
      skipped.push(row);
      return;
    }

    if (!row.League) {
      console.error(`Fehler: Fehlendes League-Feld in Zeile: ${JSON.stringify(row)}`);
      failures.push({ row, error: 'Fehlendes League-Feld' });
      return;
    }

    let formattedDate = row.Date;
    try {
      formattedDate = new Date(row.Date).toISOString();
    } catch (e) {
      console.warn(`Warnung: Ungültiges Datumsformat für ${row.Away || 'undefined'} vs ${row.Home || 'undefined'}: ${row.Date}. Verwende Standardwert.`);
      formattedDate = new Date().toISOString();
    }
    
    // Slug mit Pick erweitern
    let slug = row.Slug;
    if (!slug || slug.trim() === '') {
      // Pick bereinigen für den Slug (Leerzeichen durch Unterstriche, Sonderzeichen entfernen)
      let pickForSlug = row.Pick.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      slug = `${row.Away || 'N/A'}-vs-${row.Home || 'N/A'}-${formattedDate.split('T')[0]}-${pickForSlug}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    let summary = row.Summary;
    if (!summary || summary.trim() === '') {
      summary = `${row.Away || 'N/A'} vs ${row.Home || 'N/A'} - Sports betting pick and prediction`;
    }

    let result = row.Result;
    if (result === "Win" || result === "Loss" || result === "Push" || result === "Pending") {
      // Bereits im korrekten Format
    } else if (result && (result.toLowerCase() === "win" || result === "W")) {
      result = "Win";
    } else if (result && (result.toLowerCase() === "loss" || result === "L")) {
      result = "Loss";
    } else if (result && (result.toLowerCase() === "push" || result === "P")) {
      result = "Push";
    } else {
      result = "Pending";
    }

    let pickValue = row.Pick;

    let writeupValue = row.Writeup || '';

    let authorValue = row.Author || "Picks Office";

    const pickData = {
      data: {
        League: row.League,
        Date: formattedDate,
        Away: row.Away,
        Home: row.Home,
        Pick: pickValue,
        Odds: parseFloat(row.Odds),
        Result: result,
        Stake: parseFloat(row.Stake),
        Writeup: writeupValue,
        Author: authorValue,
        Slug: slug,
        Summary: summary,
      }
    };

    await sendToAPI(pickData, row);
  } catch (error) {
    console.error(`Fehler bei der Verarbeitung von ${row.Away || 'undefined'} vs ${row.Home || 'undefined'}: ${error.message}`);
    console.error(error.stack);
    failures.push({ row, error: error.message });
  }
}

// Hauptfunktion für den Import
async function importData() {
  const rows = [];
  
  fs.createReadStream(CSV_FILE)
    .pipe(csv({ separator: ',' })) // Ändere das Trennzeichen, falls nötig
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      console.log(`Beginne Import von ${rows.length} Einträgen...`);
      
      try {
        if (rows.length > 0) {
          console.log('Beispieldatensatz:', JSON.stringify(rows[0], null, 2));
        }
        
        const promises = rows.map((row) => limit(() => processRow(row)));
        await Promise.all(promises);

        console.log(`Fortschritt: ${successes.length + failures.length + skipped.length}/${rows.length} (100%)`);
      } catch (error) {
        console.error(`Schwerwiegender Fehler beim Import: ${error.message}`);
        console.error(error.stack);
      }
      
      console.log(`\nImport abgeschlossen. ${successes.length} erfolgreiche Importe, ${failures.length} Fehler, ${skipped.length} übersprungen.`);
      if (failures.length > 0) {
        fs.writeFileSync('import-errors.json', JSON.stringify(failures, null, 2));
        console.log('Fehler wurden in import-errors.json gespeichert.');
      }
      if (skipped.length > 0) {
        fs.writeFileSync('skipped-entries.json', JSON.stringify(skipped, null, 2));
        console.log('Übersprungene Einträge wurden in skipped-entries.json gespeichert.');
      }
    })
    .on('error', (error) => {
      console.error(`Fehler beim Lesen der CSV-Datei: ${error.message}`);
      process.exit(1);
    });
}

// Import starten
importData();
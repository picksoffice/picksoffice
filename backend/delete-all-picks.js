const axios = require('axios');

// Konfiguration
const API_URL = 'http://localhost:1337/api';
const JWT_TOKEN = '9ebafc46d720024c62a7835e0ada9ffc0603c5de44bf85d53f8a7d4a6ef26198f871dd7096be6d4f9626d34c44f3d8e618784df02f24da578c4347c06de8695c3ec1b1f7a0b0da3f87e57493a74d50c6dcffc486e1ce6719bf63cd464c47c8ed8111be8e7fa4fd7bf3f56230d269af3562baeb806802ba131326f9fe0bf7c0f4';

// Hilfsfunktion für Verzögerung
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Optimierte Version mit parallelen Löschvorgängen
async function deletePick(id) {
  try {
    await axios.delete(`${API_URL}/picks/${id}`, {
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      timeout: 5000 // 5 Sekunden Timeout
    });
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Eintrag existiert nicht mehr, als Erfolg werten
      return true;
    }
    console.error(`Fehler beim Löschen von ID ${id}: ${error.message}`);
    return false;
  }
}

// Hauptfunktion mit parallelen Löschvorgängen
async function deleteAllPicks() {
  console.log('Starte beschleunigten Löschvorgang aller Picks...');
  
  let page = 1;
  let hasMorePages = true;
  let totalDeleted = 0;
  let totalFailed = 0;
  const CONCURRENT_DELETES = 20; // Parallele Löschvorgänge
  const PAGE_SIZE = 200; // Größere Seiten
  
  while (hasMorePages) {
    try {
      // Alle Picks abrufen (paginiert)
      const response = await axios.get(`${API_URL}/picks?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`, {
        headers: {
          'Authorization': `Bearer ${JWT_TOKEN}`
        }
      });
      
      const data = response.data;
      const picks = data.data;
      
      if (picks.length === 0) {
        hasMorePages = false;
        continue;
      }
      
      console.log(`Verarbeite Seite ${page} mit ${picks.length} Einträgen...`);
      
      // Verarbeite Einträge in Batches für parallele Löschvorgänge
      for (let i = 0; i < picks.length; i += CONCURRENT_DELETES) {
        const batch = picks.slice(i, i + CONCURRENT_DELETES);
        const deletePromises = batch.map(pick => deletePick(pick.id));
        
        // Parallele Ausführung
        const results = await Promise.all(deletePromises);
        
        // Zähle Ergebnisse
        const successes = results.filter(success => success).length;
        const failures = results.filter(success => !success).length;
        
        totalDeleted += successes;
        totalFailed += failures;
        
        // Fortschritt anzeigen
        process.stdout.write(`\rGelöscht: ${totalDeleted}, Fehlgeschlagen: ${totalFailed}, Aktueller Batch: ${i+1}-${Math.min(i+CONCURRENT_DELETES, picks.length)} von ${picks.length}`);
      }
      
      console.log(); // Neue Zeile für bessere Lesbarkeit
      
      // Prüfen, ob es weitere Seiten gibt
      if (data.meta && data.meta.pagination) {
        const { page: currentPage, pageCount } = data.meta.pagination;
        if (currentPage >= pageCount) {
          hasMorePages = false;
        } else {
          page++;
        }
      } else {
        hasMorePages = false;
      }
      
    } catch (error) {
      console.error(`\nFehler beim Abrufen der Picks auf Seite ${page}: ${error.message}`);
      if (error.response) {
        console.error('API-Antwort:', error.response.data);
      }
      hasMorePages = false;
    }
  }
  
  console.log(`\n\nLöschvorgang abgeschlossen.`);
  console.log(`Erfolgreich gelöscht: ${totalDeleted}`);
  console.log(`Fehlgeschlagene Löschvorgänge: ${totalFailed}`);
}

// Führe das Skript aus
deleteAllPicks()
  .catch(error => {
    console.error('Fehler beim Löschen aller Picks:', error.message);
  });
# Social Login für PicksOffice einrichten

Ich habe die grundlegende Integration der Social-Login-Funktionalität für PicksOffice implementiert. Hier eine Anleitung, wie du die Einrichtung vervollständigen kannst:

## Was bereits implementiert ist:

1. **Backend-Konfiguration:**
   - Provider-Einstellungen in `config/plugins.ts` für Google, Apple und Twitter
   - Umgebungsvariablen-Support mit Platzhaltern

2. **Frontend-Integration:**
   - Neue `socialLogin`-Funktion in `lib/auth.ts`
   - Callback-Handler für OAuth-Redirects in `src/app/api/auth/[provider]/callback/route.ts`
   - Social-Login-Buttons mit Klick-Handlern in Login- und Register-Formularen
   - JWT-Verarbeitung in der Homepage-Komponente

## Was noch zu tun ist:

### 1. Provider-Anmeldedaten erstellen

Du musst Apps/Projekte bei den folgenden Diensten registrieren, um die Anmeldedaten zu erhalten:

#### Google:

1. Gehe zum [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt
3. Navigiere zu "APIs & Services" > "Credentials"
4. Klicke auf "Create Credentials" > "OAuth client ID"
5. Wähle "Web application"
6. Füge als autorisierte Redirect-URIs hinzu: `http://localhost:1337/api/connect/google/callback`
7. Kopiere die Client-ID und das Client-Secret

#### Twitter:

1. Gehe zum [Twitter Developer Portal](https://developer.twitter.com/)
2. Erstelle eine neue App
3. Setze den Callback-URL auf: `http://localhost:1337/api/connect/twitter/callback`
4. Kopiere die API-Schlüssel und -Secrets

#### Apple:

1. Registriere dich im [Apple Developer Portal](https://developer.apple.com/)
2. Erstelle einen "Service ID" und aktiviere "Sign In with Apple"
3. Setze die Callback-URL auf: `http://localhost:1337/api/connect/apple/callback`
4. Generiere die notwendigen Zertifikate und Schlüssel

### 2. Umgebungsvariablen konfigurieren

Öffne die `.env`-Datei im Backend-Verzeichnis und füge deine Anmeldedaten ein:

```env
# Social provider credentials
GOOGLE_CLIENT_ID=deine_google_client_id
GOOGLE_CLIENT_SECRET=dein_google_client_secret

TWITTER_CLIENT_ID=deine_twitter_client_id
TWITTER_CLIENT_SECRET=dein_twitter_client_secret

APPLE_CLIENT_ID=deine_apple_client_id
APPLE_CLIENT_SECRET=dein_apple_client_secret
```

### 3. Testen

1. Starte den Strapi-Server neu:

   ```
   cd backend
   npm run develop
   ```

2. Starte den Frontend-Server:

   ```
   cd frontend
   npm run dev
   ```

3. Öffne die Anwendung im Browser und teste die Social-Login-Buttons

## Hinweise

- Die aktuelle Implementierung verwendet Platzhalter-Werte. Ohne echte Anmeldedaten werden die Social-Login-Buttons zu Fehlerseiten führen.
- Die Anmeldedaten sollten in der Produktionsumgebung als Umgebungsvariablen gesetzt werden, nicht direkt im Code.
- Falls du Probleme mit dem Strapi-Provider hast, kannst du die Konfiguration im Strapi-Admin-Panel unter Einstellungen > Benutzer & Berechtigungen > Providers anpassen.

## Fehlerbehebung

Wenn du auf Probleme stößt:

1. Überprüfe die Backend-Logs für Fehler im Authentifizierungsprozess
2. Stelle sicher, dass die Callback-URLs korrekt konfiguriert sind
3. Überprüfe, ob die Client-IDs und Secrets korrekt sind
4. Teste die Social-Login-Buttons in einem Inkognito-Fenster, um Cookie- oder Cache-Probleme auszuschließen

Bei weiteren Fragen stehe ich gerne zur Verfügung!

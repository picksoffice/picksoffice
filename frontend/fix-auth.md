# Anleitung zum Testen der Authentifizierung

## Anleitung für Passwort-Reset

Da die E-Mail im Ethereal-Webinterface keinen klickbaren Link zeigt, müssen wir den Link manuell zusammensetzen:

1. Wenn du eine "Passwort vergessen"-E-Mail angefordert hast und den Code in der E-Mail siehst (z.B. `?code=123abc...`), dann:

2. Füge `http://localhost:3000/reset-password` vor dem `?code=...` ein, um den vollständigen Link zu erhalten.

3. Für den aktuellsten Token ist der vollständige Link:

```
http://localhost:3000/reset-password?code=8c63fcbc7da889871b20c60b8a3aa5fb97919e64f2cbe6952e1b0c58a54d497956859c281ecb6b6651351fd9cef725a8f4a6236aeee5faddb931e63592df87ec
```

## Die Authentifizierungsfunktionen und wie man sie testet

1. **Registrierung**:
   - Gehe zu http://localhost:3000/register
   - Fülle das Formular aus und erstelle einen neuen Account

2. **Login**:
   - Gehe zu http://localhost:3000/login
   - Melde dich mit deinen Anmeldedaten an

3. **Passwort vergessen**:
   - Gehe zu http://localhost:3000/forgot-password
   - Gib deine E-Mail-Adresse ein
   - Du erhältst eine E-Mail, die im Ethereal-Mailbox angezeigt wird
   - Der vollständige Link muss manuell zusammengesetzt werden (siehe oben)

4. **Passwort zurücksetzen**:
   - Verwende den zusammengesetzten Link
   - Gib dein neues Passwort ein
   - Du wirst zur Login-Seite weitergeleitet

## Ethereal-Mail Zugriff

Um die gesendeten E-Mails zu sehen:

- Gehe zu https://ethereal.email/messages
- Anmelden mit:
  - Email: emmanuelle.abshire19@ethereal.email
  - Passwort: 7fefuPZUm2TMPg47yd

## Bekannte Probleme und Lösungen

- **Problem**: Der Reset-Link in der E-Mail ist unvollständig (zeigt nur `?code=...`)
- **Lösung**: Manuell den vollständigen Link zusammensetzen wie oben beschrieben

- **Problem**: E-Mail wird nicht empfangen
- **Lösung**: Strapi-Server neu starten und sicherstellen, dass die E-Mail-Konfiguration korrekt ist

- **Problem**: Reset-Token ist abgelaufen
- **Lösung**: Neuen Reset-Token anfordern und den neuen Link verwenden

# Implementierung der Social Login-Funktionalität für PicksOffice

Aktuell zeigt die Anwendung Buttons für die Anmeldung mit Apple, Google und X (Twitter), aber diese Funktionalität ist noch nicht implementiert. Hier ist eine Schritt-für-Schritt-Anleitung, um diese Social-Login-Optionen zu aktivieren.

## 1. Provider in Strapi konfigurieren

### Schritt 1: Strapi Providers Plugin aktivieren

1. Navigiere zum Strapi Admin-Panel: `http://localhost:1337/admin`
2. Gehe zu "Settings" > "Users & Permissions Plugin" > "Providers"
3. Hier kannst du die verschiedenen Social-Provider konfigurieren

### Schritt 2: OAuth Provider-Anmeldedaten einrichten

Für jeden Provider benötigst du Client-ID und Client-Secret:

#### Apple
1. Registriere deine App im [Apple Developer Portal](https://developer.apple.com)
2. Erstelle einen "Services ID" und konfiguriere "Sign In with Apple"
3. Stelle sicher, dass du die Redirect-URL korrekt einstellst: `http://localhost:1337/api/connect/apple/callback`

#### Google
1. Gehe zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt oder nutze ein bestehendes
3. Navigiere zu "APIs & Services" > "Credentials"
4. Erstelle OAuth 2.0 Client-ID
5. Füge als autorisierte Redirect-URI hinzu: `http://localhost:1337/api/connect/google/callback`

#### X (Twitter)
1. Gehe zum [Twitter Developer Portal](https://developer.twitter.com/)
2. Erstelle eine neue App
3. Konfiguriere die OAuth-Einstellungen
4. Setze die Callback-URL auf: `http://localhost:1337/api/connect/twitter/callback`

### Schritt 3: Provider in Strapi aktivieren

Aktualisiere die Strapi `plugins.ts`-Datei (schon teilweise vorbereitet):

```js
module.exports = ({ env }) => ({
  // ... bestehende Konfiguration
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      forgotPassword: {
        from: 'noreply@picksoffice.com',
        replyTo: 'noreply@picksoffice.com',
        emailTemplate: 'reset-password',
        baseUrl: 'http://localhost:3000'
      },
      providers: {
        apple: {
          enabled: true,
          icon: 'apple',
          key: 'DEIN_APPLE_CLIENT_ID',
          secret: 'DEIN_APPLE_CLIENT_SECRET',
          callback: '/api/connect/apple/callback',
          scope: ['name', 'email'],
        },
        google: {
          enabled: true,
          icon: 'google',
          key: 'DEIN_GOOGLE_CLIENT_ID',
          secret: 'DEIN_GOOGLE_CLIENT_SECRET',
          callback: '/api/connect/google/callback',
          scope: ['email', 'profile'],
        },
        twitter: {
          enabled: true,
          icon: 'twitter',
          key: 'DEIN_TWITTER_CLIENT_ID',
          secret: 'DEIN_TWITTER_CLIENT_SECRET',
          callback: '/api/connect/twitter/callback',
        },
      },
    },
  },
  // ... andere Plugins
});
```

## 2. Frontend-Integration implementieren

### Schritt 1: Social-Login-Funktionen im AuthContext hinzufügen

Bearbeite `/frontend/src/lib/auth.ts` um Social-Login zu unterstützen:

```typescript
// Neue Funktion für Social-Login hinzufügen
export async function socialLogin(provider: 'apple' | 'google' | 'twitter'): Promise<void> {
  // Öffne das Social-Login-Fenster
  const authUrl = `${STRAPI_API_URL}/api/connect/${provider}`;
  window.location.href = authUrl;
}
```

### Schritt 2: Auth-Handler für Callbacks einrichten

Erstelle eine neue Datei `/frontend/src/app/api/auth/[provider]/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('access_token');
  
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=Social login failed', request.url));
  }

  // Token aus dem Social-Provider an Strapi senden
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${params.provider}/callback?access_token=${accessToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    const data = await response.json();

    // Speichere JWT in einem Cookie
    const cookies = NextResponse.next().cookies;
    cookies.set('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 Tage
      path: '/',
    });

    // Speichere Benutzer im localStorage (clientseitig erledigen)
    return NextResponse.redirect(new URL('/api/auth/success', request.url));
  } catch (error) {
    console.error('Social auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=Authentication failed', request.url));
  }
}
```

### Schritt 3: Button-Handler aktualisieren

Bearbeite die Login- und Register-Formular-Komponenten, um die Social-Login-Buttons zu aktivieren:

Für `login-form.tsx`:

```tsx
// Social Login Funktion importieren
import { socialLogin } from '@/lib/auth';

// Dann die Buttons aktualisieren:
<Button 
  variant="secondary" 
  className="w-full flex items-center justify-center py-2.5" 
  type="button"
  onClick={() => socialLogin('apple')}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
    <path
      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      fill="currentColor"
    />
  </svg>
  <span className="sr-only">Login with Apple</span>
</Button>
```

Mache dasselbe für die Google- und Twitter-Buttons mit dem entsprechenden Provider-Parameter.

## 3. Testen und Debugging

1. Starte den Strapi-Server neu, nachdem du die Provider konfiguriert hast
2. Starte den Frontend-Server neu
3. Versuche, dich mit den Social-Providern anzumelden
4. Überprüfe die Serverprotokolle auf mögliche Fehler

## 4. Zusätzliche Anmerkungen

### Produktionsumgebung
- In der Produktionsumgebung müssen die Callback-URLs aktualisiert werden, um auf die Live-Domain zu verweisen
- Verwende Umgebungsvariablen für Client-IDs und Secrets

### Sicherheitsüberlegungen
- Verwende sichere HTTP-Only-Cookies für die JWT-Speicherung
- Implementiere CSRF-Schutz
- Validiere Benutzerprofile nach der Anmeldung

### Datenschutz
- Stelle sicher, dass deine Datenschutzrichtlinien die Nutzung von Social-Login abdecken
- Informiere Benutzer, welche Daten von sozialen Netzwerken erfasst werden

Mit dieser Implementierung können sich Benutzer mit Apple, Google und X (Twitter) bei PicksOffice anmelden.
# Button-Komponente Verwendungsleitfaden

Um die Konsistenz in der gesamten Anwendung zu gewährleisten, sollten **alle Buttons** die vordefinierte Button-Komponente verwenden, anstatt direkt HTML-Buttons oder Links mit Tailwind-Klassen zu erstellen.

## Grundlegende Verwendung

```jsx
import { Button } from '@/components/ui/button'

// Primärer Button (Standard)
<Button>Klick mich</Button>

// Mit Varianten
<Button variant="secondary">Sekundärer Button</Button>
<Button variant="tertiary">Tertiärer Button</Button>
<Button variant="ghost">Ghost Button</Button>

// Mit verschiedenen Farben
<Button color="blue">Blauer Button</Button>
<Button color="green">Grüner Button</Button>
<Button color="red">Roter Button</Button>

// Mit verschiedenen Größen
<Button size="sm">Kleiner Button</Button>
<Button size="lg">Großer Button</Button>
<Button size="xl">Extra großer Button</Button>

// Link-Button
<Button href="/pfad">Link-Button</Button>

// Button mit voller Breite
<Button fullWidth>Button mit voller Breite</Button>

// Ladezustand
<Button isLoading>Lädt...</Button>

// Deaktivierter Zustand
<Button disabled>Deaktivierter Button</Button>
```

## Beispiel: Umwandlung eines bestehenden Buttons

### Alter Ansatz (nicht verwenden):

```jsx
<button
  type="submit"
  className="rounded-md bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline..."
>
  Abschicken
</button>
```

### Neuer Ansatz (bevorzugt):

```jsx
<Button
  type="submit"
  variant="primary"
  color="blue"
  size="md"
>
  Abschicken
</Button>
```

## Vorteile der Button-Komponente

1. **Konsistenz**: Alle Buttons haben ein einheitliches Erscheinungsbild
2. **Responsivität**: Responsive Stile sind bereits integriert
3. **Wartbarkeit**: Änderungen an Buttons können zentral vorgenommen werden
4. **Barrierefreiheit**: Accessibility-Features sind automatisch implementiert
5. **Erweiterbarkeit**: Neue Button-Varianten können einfach hinzugefügt werden

## Button-Properties

| Property | Typ | Standard | Beschreibung |
|----------|-----|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' \| 'ghost' | 'primary' | Der visuelle Stil des Buttons |
| color | 'indigo' \| 'blue' \| 'green' \| 'red' \| 'gray' | 'indigo' | Die Farbvariante des Buttons |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Die Größe des Buttons |
| isLoading | boolean | false | Zeigt einen Ladeindikator an |
| href | string | undefined | Verwandelt den Button in einen Link |
| fullWidth | boolean | false | Button nimmt die volle verfügbare Breite ein |
| disabled | boolean | false | Deaktiviert den Button |

## Richtlinien für die Nutzung

1. **Primäre Buttons** - Verwenden Sie für Hauptaktionen (Absenden, Speichern, Fortfahren)
2. **Sekundäre Buttons** - Verwenden Sie für alternative Aktionen (Abbrechen, Zurück, Zurücksetzen)
3. **Tertiäre Buttons** - Verwenden Sie für Navigation oder weniger wichtige Aktionen
4. **Ghost Buttons** - Verwenden Sie für kontextbezogene Aktionen oder Toolbar-Buttons
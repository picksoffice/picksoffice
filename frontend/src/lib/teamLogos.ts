export const getTeamLogoUrl = (
  league: string | undefined,
  team: string | undefined
): string | undefined => {
  if (!league || !team) return undefined;

  // Konvertiere Liga in Kleinbuchstaben für Konsistenz
  const leagueLower = league.toLowerCase();

  // Unterstützte Ligen
  const supportedLeagues = ['nba', 'nfl', 'mlb', 'nhl', 'ncaab', 'ncaaf', 'wnba'];
  if (!supportedLeagues.includes(leagueLower)) return undefined;

  // Normalisiere Teamnamen für kleingeschriebene Dateinamen
  let normalizedTeam = team
    .replace(/\s+/g, '') // Entfernt Leerzeichen
    .replace(/^LosAngeles/, 'LA') // Behandelt "Los Angeles"
    .replace(/^NewYork/, 'NY') // Behandelt "New York"
    .replace(/^SanAntonio/, 'SA') // Behandelt "San Antonio"
    .replace(/^GoldenState/, 'GS') // Behandelt "Golden State"
    .replace(/^Boston/, '') // Behandelt "Boston" für Celtics
    .toLowerCase(); // Konvertiere in Kleinbuchstaben

  // Entferne "City"-Präfixe für bekannte NBA-Teams
  const teamSuffixes = [
    'lakers',
    'celtics',
    'warriors',
    'bulls',
    'spurs',
    'heat',
    'knicks',
    'nets',
    'raptors',
    'clippers',
    'suns',
    'mavericks',
    'nuggets',
    'jazz',
    'trailblazers',
    '76ers',
    'bucks',
    'thunder',
    'rockets',
    'grizzlies',
    'pelicans',
    'hawks',
    'hornets',
    'wizards',
    'magic',
    'pacers',
    'pistons',
    'cavaliers',
    'timberwolves',
    'kings',
  ];

  for (const suffix of teamSuffixes) {
    if (normalizedTeam.includes(suffix)) {
      normalizedTeam = suffix;
      break;
    }
  }

  // Explizite Korrektur für Celtics
  if (normalizedTeam === 'bostonceltics') {
    normalizedTeam = 'celtics';
  }

  // Generiere den Pfad
  const logoUrl = `/images/logos/${leagueLower.toUpperCase()}/${normalizedTeam}.png`;

  // Debugging: Logge den generierten Pfad
  console.log(`Generated logo URL: ${logoUrl} for team: ${team}, league: ${league}`);
  return logoUrl;
};

// Pfade für Ligen (für Dokumentation, nicht direkt im Code verwendet)
export const logoPaths = {
  nba: '/images/logos/NBA/[teamName].png', // z. B. /images/logos/NBA/lakers.png
  nfl: '/images/logos/NFL/[teamName].png', // Platzhalter, Ordner existiert noch nicht
  mlb: '/images/logos/MLB/[teamName].png', // Platzhalter, Ordner existiert
  nhl: '/images/logos/NHL/[teamName].png', // Platzhalter, Ordner existiert noch nicht
  ncaab: '/images/logos/NCAAB/[teamName].png', // Platzhalter, Ordner existiert
  ncaaf: '/images/logos/NCAAF/[teamName].png', // Platzhalter, Ordner existiert noch nicht
  wnba: '/images/logos/WNBA/[teamName].png', // Platzhalter, Ordner existiert noch nicht
};

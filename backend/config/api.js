module.exports = {
  rest: {
    defaultLimit: 500,
    maxLimit: 10000, // Erhöhung auf 10000 für größere Datenabfragen
    timeout: 180000, // Timeout auf 3 Minuten erhöhen für langwierige Abfragen
    withCount: true,
  },
};

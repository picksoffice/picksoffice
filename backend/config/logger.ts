module.exports = {
  level: 'debug',
  transports: [
    {
      type: 'console',
      options: {
        level: 'debug',
        format: 'simple',
        prettyPrint: true,
        timestamp: true
      }
    }
  ]
};
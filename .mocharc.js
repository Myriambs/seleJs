// .mocharc.js
module.exports = {
  reporter: 'mochawesome',
  ui: 'bdd',
  timeout: 10000,
  recursive: true,
  spec: ['tests/**/*.js'], // ajuste si tes tests sont ailleurs
};

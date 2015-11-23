exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*-test.js'],
  baseUrl: 'http://localhost:9001' //default test port with Yeoman
}
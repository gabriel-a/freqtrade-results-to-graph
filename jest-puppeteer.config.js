module.exports = {
    launch: {
        headless: true,
    },
    browserContext: 'default',
    server: {
        command: 'node server.js',
        port: 3000,
        launchTimeout: 30000, // 30 seconds
        debug: true,
    },
};

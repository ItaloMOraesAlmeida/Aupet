module.exports = {
    // Stop running tests after `n` failures
    bail: true,

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The test environment that will be used for testing
    testEnvironment: "node",

    // The glob patterns Jest uses to detect test files
    testMatch: ["**/__tests__/**/*.test.js?(x)"],

    /*
     * Configuration on jest reports for html
     */
    reporters: [
        "default",
        [
            "jest-html-reporters",
            {
                publicPath: "./__tests__/html_reports",
                filename: "jest-report.html",
                expand: true,
            },
        ],
    ],
};

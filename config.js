module.exports = {
    host: process.env.IS_PROD ? "https://dotnet-code-judge-i5fgk.ondigitalocean.app" : "http://localhost:3000",
    instancesCount: process.env.IS_PROD ? 2 : 1
};
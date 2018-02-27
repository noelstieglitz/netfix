const requestFilter = {
    urls: ["https://*.nflxvideo.net/*"]
};
const extraInfo = ["blocking", "requestHeaders"];

chrome
    .webRequest
    .onBeforeSendHeaders
    .addListener(function (details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === "Referer" && details.requestHeaders[i].value === "https://www.netflix.com/browse") {
                return {cancel: true};
            }
        }
        return {cancel: false};
    }, requestFilter, extraInfo);
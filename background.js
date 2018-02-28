const requestFilter = {
    urls: ["https://*.nflxvideo.net/*"]
};
const extraInfo = ["blocking", "requestHeaders"];

// This expression identifies requests for preview data
const previewDataIdExpr = h => h.name.toLowerCase() === "referer" 
    && h.value.toLowerCase() === "https://www.netflix.com/browse";

const beforeSendHeader = details => {
    const isPreviewDataRequest = details
        .requestHeaders
        .some(previewDataIdExpr);

        if(isPreviewDataRequest){
            return {redirectUrl:"javascript:"};
        }

        return {cancel: false};
};

chrome
    .webRequest
    .onBeforeSendHeaders
    .addListener(beforeSendHeader, requestFilter, extraInfo);
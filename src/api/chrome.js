export function getCurrentTab(){
    return new Promise((resolve, reject)=>{
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            resolve(tabs[0]);
        });
    })
}

export function isExtensionMode(){
    return !!chrome.tabs;
}
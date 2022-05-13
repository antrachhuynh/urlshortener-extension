
let shortenBtn = document.getElementById("shorten-btn");
let shortUrl = document.getElementById("short-url");
let longTxt = document.getElementById("long-url");
let msg = document.getElementById("msg");



lang = () => {
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    let long = document.getElementById("long");
    let short = document.getElementById("short");

    title.innerHTML = chrome.i18n.getMessage("AppName");
    desc.innerHTML = chrome.i18n.getMessage("AppDesc");
    long.innerHTML = chrome.i18n.getMessage("Long");
    short.innerHTML = chrome.i18n.getMessage("Short");

}

isURL = (str) => {
    var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}



chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, async (tabs) => {

    var url = tabs[0].url;
    longTxt.value = url;

});



clearMsg = () => {
    msg.innerHTML = "";
}

shorten = () => {


    let longUrl = document.getElementById("long-url");
    shortenBtn.innerText = "Loading..."

    url = longUrl.value;
    if (url == "") {
        longUrl.focus();
        msg.innerHTML = "Please input long URL first";
        setTimeout(clearMsg, 2000);
        shortenBtn.innerText = "Shorten";
        return;
    } else {
        if (!isURL(url)) {
            longUrl.focus();
            msg.innerHTML = "URL is invalid";
            setTimeout(clearMsg, 2000);
            shortenBtn.innerText = "Shorten";
            return;
        }
    }



    //send a POST to short the URL https://zmb.ee/api/url/short/

    const data = { longUrl: url };

    fetch('https://zmb.ee/api/url/short/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            shortUrl.value = data.shortUrl;
            shortenBtn.innerText = "Shorten"
            shortUrl.focus();
            shortUrl.select();


        })
        .catch((error) => {
            console.error('Error:', error);
            msg.innerHTML = error;
            setTimeout(clearMsg, 2000);
            shortenBtn.innerText = "Shorten"
        });


}


//lang


lang();

//click to shorten URL

shortenBtn.addEventListener("click", shorten);


// import Vue from 'vue'
// import App from './App.vue'

function gmailCheck() {
    if (location.href.includes("mail.google.com")) {

        if (document.readyState === "complete") {
            run();
            createTranslateButton();
            createImproveButton();
            translateEmail();

        }
        else {
            window['onload'] = function () {
                run();
            createTranslateButton();
            createImproveButton();
            translateEmail();
            }
        }
    }
    if (location.href.includes("mail.google.com") && location.href.includes("compose")) {
        // add button
        if (document.readyState === "complete") {
            createButton();
            createTranslateButton();
            createImproveButton();
        }
        else {
            window['onload'] = function () {
                createButton();
            createTranslateButton();
            createImproveButton();
            }
        }
    }
}
gmailCheck()
function createButton() {
    if (location.href.includes("mail.google.com") && location.href.includes("compose")) {
        // add button
        if (document.querySelector(".gU.Up") == null) {setTimeout(createButton, 1000); return}
        if (document.querySelector(".aiButton") == null) {
            let button = document.createElement("button");
            button.innerText = "Generate Email";
            button.style = `
            background-color: rgba(51, 51, 51, 0.05);
            border-radius: 8px;
            border-width: 0;
            color: #333333;
            cursor: pointer;
            display: inline-block;
            font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            list-style: none;
            margin: 8px;
            padding: 10px 12px;
            text-align: center;
            transition: all 200ms;
            vertical-align: baseline;
            white-space: nowrap;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            `;
            button.onclick = createEmail;
            button.className = "aiButton";
            document.querySelector(".gU.Up").appendChild(button);
        }
    } else {
        setTimeout(createButton, 1000);
    }
}

function run() {
    let email = getEmail();

    if (email == false) { setTimeout(run, 1000); return; }
    if (document.querySelector(".aiSummary") == null) {
        addSummary();
    }
    addSummary();
    const targetNode = document.querySelector(".gA.gt")
    var observer = new MutationObserver(function(){
        if (document.querySelector(".gU.Up") != null && document.querySelector(".aiButton") == null) {
            if (document.querySelector(".aiButton") != null) { return; }            
            addButton()
        }
      })
      
      observer.observe(targetNode, { 
        childList: true,
        subtree: true // needed if the node you're targeting is not the direct parent
      });
}
function getEmail() {
    let mails = Array.from(
        document.querySelectorAll(".gs")
    )
    if (mails.length > 0) {
        return mails.pop().textContent
    }
    return false
}
function addButton() {
    let button = document.createElement("button");
    button.innerText = "Respond With AI";
    button.style = `
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 8px;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    `;
    button.onclick = remal;
    button.className = "aiButton";
    document.querySelector(".gU.Up").appendChild(button);

}
async function addSummary() {
    let email = getEmail();
    if (email == false) { return; }
    let question = "Summarize the following email in a concise and quick way with maximum 3 sentences. \n email: \n" + email;
    let text = document.createElement("p");
    text.className = "aiSummary";
    text.style = `
    font-size: 18px;
    margin: 10px;
    `
    document.querySelector(".nH.aHU").prepend(text);
    const port = chrome.runtime.connect();
    port.onMessage.addListener(function (msg) {
        text.innerText = msg.answer;
    });
    port.postMessage({ question });
}
window.onhashchange = function() { 
    gmailCheck()
}
function createEmail() {
    let question = prompt("Tell the ai what to say: ");
    const port = chrome.runtime.connect();
    port.onMessage.addListener(function (msg) {
        let input = document.querySelector(".Am.Al.editable.LW-avf");
        input.innerHTML = msg.answer.replace(/(?:\r\n|\r|\n)/g, '<br>');
    });
    port.postMessage({ question });
}
async function remal() {
    let email = getEmail();
    if (email == false) { return; }
    // let question = "Respond to the following email by " + prompt("Respond to the following email by "); + "/n email: "+email;
    let question = prompt("Tell the ai what to say: ") + "/n email: "+email;
    const port = chrome.runtime.connect();
    port.onMessage.addListener(function (msg) {
        addToInput(msg.answer)
    });
    port.postMessage({ question });
}

async function addToInput (text) {
    let input = document.querySelector(".Am.Al.editable.LW-avf");
    input.innerHTML = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function createTranslateButton() {
    if (document.querySelector(".gU.Up") == null) {setTimeout(createTranslateButton, 1000); return}
    if (document.querySelector(".aiTranslateButton") != null) {return;}
    // create button
    let button = document.createElement("button");
    button.innerText = "Translate";
    button.style = `
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 20%;
    `;
    button.className = "aiTranslateButton";
    button.onclick = () => {
        let question = "Translate the following text to " + prompt("Language: ") + "/n text: " + document.querySelector(".Am.Al.editable.LW-avf").innerText;
        const port = chrome.runtime.connect();
        port.onMessage.addListener(function (msg) {
    let input = document.querySelector(".Am.Al.editable.LW-avf");
    input.innerHTML = msg.answer.replace(/(?:\r\n|\r|\n)/g, '<br>');
        });
        port.postMessage({ question: question});
    };
    button.className = "aiTranslateButton";
    document.querySelector(".gU.Up").appendChild(button);
}
function translateEmail() {
    let email = getEmail();
    if (email == false) { return; }
    if (document.querySelector(".aiTranslateEmail") != null) {return;}
    // create button
    let button = document.createElement("button");
    button.innerText = "Translate";
   button.style = `
   text-align: left;
   `
    button.classList.add ("aiTranslateButton","ams");
    button.onclick = () => {
        let question = "Translate the following email to " + prompt("Language: ") + "/n text: " + email;
        const port = chrome.runtime.connect();
        port.onMessage.addListener(function (msg) {
            document.querySelector(".gs").innerHTML = msg.answer.replace(/(?:\r\n|\r|\n)/g, '<br>');
        });
        port.postMessage({ question: question});
    };
    document.querySelector(".amn").appendChild(button);
}
function createImproveButton() {
    if (document.querySelector(".gU.Up") == null) {setTimeout(createImproveButton, 1000); return}
    if (document.querySelector(".aiImproveButton") != null) {return;}
    // create button
    let button = document.createElement("button");
    button.innerText = "Improve";
    button.style = `
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 20%;
    `;
    button.className = "aiImproveButton";
    button.onclick = () => {
        let question = "Improve the following email" + "/n email: " + document.querySelector(".Am.Al.editable.LW-avf").innerText;
        const port = chrome.runtime.connect();
        port.onMessage.addListener(function (msg) {
            console.log(msg)
    let input = document.querySelector(".Am.Al.editable.LW-avf");
    input.innerHTML = msg.answer.replace(/(?:\r\n|\r|\n)/g, '<br>');
        });
        port.postMessage({ question: question});
    };
    document.querySelector(".gU.Up").appendChild(button);
}
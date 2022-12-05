// import openai from 'openai';
// openai.apiKey = "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";z
import Vue from 'vue'
import App from './App.vue'

function gmailCheck() {
    if (location.href.includes("mail.google.com")) {
        console.log("you are in gmail")

        if (document.readyState === "complete") {
            run();
        }
        else {
            window['onload'] = function () {
                run();
            }
        }
    }
}
gmailCheck()
function run() {
    let email = getEmail();
    console.log("email", email)
    if (email == false) { return; }
    console.log("create button")
    addButton();
  
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
    console.log("add button")
    let button = document.createElement("button");
    button.innerText = "Respond With AI";
    button.style = "color: #6134eb;  border-color: #6134eb;";
    button.onclick = sendEmail;
    button.className = "ams bkH";
    document.querySelector(".amn").appendChild(button);
}

window.onhashchange = function() { 
    console.log('location changed!');
    gmailCheck()
}
async function sendEmail() {
 //add div to page
    let div = document.createElement("div");
    div.id = "ai-response";
    div.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999999999";
    document.body.appendChild(div);
    //add div to page
    let div2 = document.createElement("div");
    div2.id = "ai-response2";
    div2.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px; height: 300px; background-color: white; z-index: 9999999999";
    document.body.appendChild(div2);
    // connect vue to div
    new Vue({
      el: div2,
      render: (h) => h(App)
    })
    
}

// async function remal() {
//     let email = getEmail();
//     if (email == false) { return; }
//     let question = "Politely respond to the following email: " + email;

//     const port = chrome.runtime.connect();
//     port.onMessage.addListener(function (msg) {
//         console.log(msg.answer);
//         });
//     port.postMessage({ question });
// }
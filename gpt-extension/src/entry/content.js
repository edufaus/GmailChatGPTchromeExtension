// import Vue from 'vue'
// import App from './App.vue'

function gmailCheck() {
    if (location.href.includes("mail.google.com")) {

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

    if (email == false) { setTimeout(run, 1000); return; }

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
    margin: 20px;
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

window.onhashchange = function() { 
    gmailCheck()
}
// async function sendEmail() {
//  //add div to page
//     let div = document.createElement("div");
//     div.id = "ai-response";
//     div.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999999999";
//     document.body.appendChild(div);
//     //add div to page
//     let div2 = document.createElement("div");
//     div2.id = "ai-response2";
//     div2.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px; height: 300px; background-color: white; z-index: 9999999999";
//     document.body.appendChild(div2);
//     // connect vue to div
//     new Vue({
//       el: div2,
//       render: (h) => h(App)
//     })
    
// }

async function remal() {
    let email = getEmail();
    if (email == false) { return; }
    let question = "Respond to the following email by " + prompt("Respond to the following email by "); + "/n email: "+email;
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
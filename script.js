let submit=document.getElementById("submit");
let input=document.getElementById("inputPass");
let text=document.getElementById("text4");
let generatedPass;
let enteredPass;


input.focus();

function removeDialogue(box) 
{
    box.remove();
}

let generate = async () => {
    const url = "https://www.psswrd.net/api/v1/password/?length=8&lower=1&upper=1&int=1&special=1";
    let response = await fetch(url);
    let data = await response.json();
    return data.password;
}

let replaceAlert = (text) => {
    return new Promise((resolve, reject) => {
        let div=document.createElement("div");
        div.setAttribute("class", "alert");
        div.innerHTML=`<p>${text}<p>`;
        document.body.appendChild(div);

        let okButton = document.createElement("button");
        okButton.setAttribute("type", "button");
        okButton.setAttribute("class", "okButton");
        okButton.innerHTML="Ok";
        div.appendChild(okButton);
        okButton.focus();
        // okButton.setAttribute("onclick", `removeDialogue(this.parentElement)`);
        okButton.addEventListener("click", (e) => {
            removeDialogue(okButton.parentElement);
            input.focus();
            resolve(true);
        });
    });
};

let validate = (str) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;;
    return str.length===8 && /\d/.test(str) && specialChars.test(str) && /[A-Z]/.test(str) &&/[a-z]/.test(str);
}

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    enteredPass=input.value;
    if(validate(enteredPass))
    {
        replaceAlert("Entered Password is accepted.");
        input.value='';
    }
    else
    {
        generatedPass=await generate();
        await replaceAlert(`Entered Password is invalid.\nTry this instead : ${generatedPass}`);
        input.value=generatedPass;
    }
})


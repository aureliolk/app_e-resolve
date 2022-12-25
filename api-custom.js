const inputCpf = document.querySelector("input#inputCPF")
const label = document.querySelector("div#boxtoken label span")
const boxToken = document.querySelector("#token")
const buttonGetToken = document.querySelector("button#gettoken")
const buttonTryAgain = document.querySelector("button#tryAgain")


if (inputCpf) {
  inputCpf.onfocus = () => {
    label.style.top = "-15px"
    label.style.color = "#fff"
    inputCpf.style.outline = "auto"
    inputCpf.style.outlineColor = "#EAA400"
    console.log("focus")
  }
  inputCpf.onblur = () => {    
    console.log("saiu")
    checkCpf()
    if (inputCpf.value.length === 0) {
      label.style.top = "5px"
      inputCpf.style.outline = ""
      inputCpf.style.outlineColor = ""
    }
  }

  inputCpf.onkeypress = ()=>{
    console.log(inputCpf.value.length)
    checkCpf()
  }

}

const checkCpf = ()=>{
  if(inputCpf.value.length >= 13){
    buttonGetToken.removeAttribute("disabled")
  }else{
    buttonGetToken.setAttribute("disabled","")
  }
}

function fMasc(objeto, mascara) {
  obj = objeto
  masc = mascara
  setTimeout("fMascEx()", 1)
}

function fMascEx() {
  obj.value = masc(obj.value)
}

function mCPF(cpf) {
  cpf = cpf.replace(/\D/g, "")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  return cpf
}

const spinSvg = '<svg id="customSpinIcon" class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>'

if(buttonGetToken){
  buttonGetToken.onclick = ()=>{
    getToken()
  }
}


const getToken = () => {
  buttonGetToken.insertAdjacentHTML("beforeend",spinSvg)
  fetch("https://app-cardancred.vercel.app/gettoken")
  .then(res =>  res.json())
  .then(res => {
      document.querySelector("span#cpfName strong").innerText = inputCpf.value
      document.querySelector("span#valueToken").innerText = `${res.access_token}`
  })
  .catch(err => console.log(err))
  .finally(()=>{
    document.querySelector("svg#customSpinIcon").remove()
    buttonGetToken.style.display = "none"
    document.querySelector("div#boxtoken label").style.display = "none"
    buttonTryAgain.style.display = ""
    boxToken.style.display = ""
  })
}

buttonTryAgain.onclick = ()=>{
  buttonGetToken.style.display = ""
  document.querySelector("div#boxtoken label").style.display = ""
  buttonTryAgain.style.display = "none"
  boxToken.style.display = "none"
}

console.log("Api Custom On")
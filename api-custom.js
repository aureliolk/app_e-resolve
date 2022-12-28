const inputCpf = document.querySelector("input#inputCPF")
const label = document.querySelector("div#boxtoken label span")
const buttonGetToken = document.querySelector("button#gettoken")
const buttonTryAgain = document.querySelector("button#tryAgain")

// Rule Input
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
  inputCpf.onkeypress = () => {
    console.log(inputCpf.value.length)
    checkCpf()
  }

}

// Function Enable or Disable Button
const checkCpf = () => {
  if (inputCpf.value.length >= 13) {
    buttonGetToken.removeAttribute("disabled")
  } else {
    buttonGetToken.setAttribute("disabled", "")
  }
}

// Masc CPF
const fMasc = (objeto, mascara) => {
  obj = objeto
  masc = mascara
  setTimeout("fMascEx()", 1)
}

const fMascEx = () => {
  obj.value = masc(obj.value)
}

const mCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  return cpf
}

// SVG Spin
const spinSvg = '<svg id="customSpinIcon" class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>'

// Button Req API
if (buttonGetToken) {
  buttonGetToken.onclick = () => {
    if (document.querySelector("select#typereq").value === "hml") {
      makeHmlSimulation()
    } else {
      makePrdSimulation()
    }
  }
}

// Feth for API Token Bank Merchantil
const makeHmlSimulation = () => {
  buttonGetToken.insertAdjacentHTML("beforeend", spinSvg)
  fetch("https://app-cardancred.vercel.app/hmlsimulation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cpf: inputCpf.value.replace(/[.-]/g, '') })
  })
    .then(res => res.json())
    .then(res => {
      document.querySelector("#cpfName strong").innerText = res.cpf
      document.querySelector("#dataSimulation strong").innerText = convertDate(res.dataReferenciaSaldo)
      res.parcelas.forEach(element => {
        document.querySelector("#parcelas").insertAdjacentHTML("beforeend", `
        <li><div>Data: <strong id="dataParcela">${convertDate(element.dataRepasse)}</strong></div> <div>Valor <strong id="valorParcela">${formatter.format(element.valor)}</strong></div></li>
        `)
      });
      document.querySelector("#valorTotal strong").innerText = formatter.format(res.valorTotal)
      return console.log(res)
    })
    .catch(err => console.log(err))
    .finally(() => {
      document.querySelector("svg#customSpinIcon").remove()
      buttonGetToken.style.display = "none"
      document.querySelector("div#boxtoken label").style.display = "none"
      buttonTryAgain.style.display = ""
      document.querySelector("#token").style.display = ""
    })
}

const makePrdSimulation = () => {
  buttonGetToken.insertAdjacentHTML("beforeend", spinSvg)
  fetch("https://app-cardancred.vercel.app/prdsimulation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cpf: inputCpf.value.replace(/[.-]/g, '') })
  })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        document.querySelector("#token.erro").style.display = ""
        document.querySelector("#status strong").innerText = res.errors[0].key
        document.querySelector("#messagem strong").innerText = res.errors[0].message
      } else {
        document.querySelector("#token").style.display = ""
        document.querySelector("#cpfName strong").innerText = res.cpf
        document.querySelector("#dataSimulation strong").innerText = convertDate(res.dataReferenciaSaldo)
        res.parcelas.forEach(element => {
          document.querySelector("#parcelas").insertAdjacentHTML("beforeend", `
          <li><div>Data: <strong id="dataParcela">${convertDate(element.dataRepasse)}</strong></div> <div>Valor <strong id="valorParcela">${formatter.format(element.valor)}</strong></div></li>
          `)
        });
        document.querySelector("#valorTotal strong").innerText = formatter.format(res.valorTotal)
      }
      return console.log(res)
    })
    .catch(err => console.log(err))
    .finally(() => {
      document.querySelector("svg#customSpinIcon").remove()
      buttonGetToken.style.display = "none"
      document.querySelector("div#boxtoken label").style.display = "none"
      buttonTryAgain.style.display = ""
    })
}

const convertDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

// Button TryAgain 
if (buttonTryAgain) {
  buttonTryAgain.onclick = () => {
    buttonGetToken.style.display = ""
    document.querySelector("div#boxtoken label").style.display = ""
    buttonTryAgain.style.display = "none"
    document.querySelector("#token").style.display = "none"
    document.querySelector("#token.erro").style.display = "none"
    document.querySelector("#parcelas").innerHTML = ""
  }
}


console.log("Api Custom On")

const divTitulo = document.querySelector("#divTitulo")
const divForm = document.querySelector("#divForm")
//inputs form
const inputFile = document.querySelector("#inputFile")
const inputName = document.querySelector("#inputName")
const inputEmail = document.querySelector("#inputEmail")
const inputGit = document.querySelector("#inputGit")
//mensagens
const messageName = document.querySelector("#messageName")
const messageEmail = document.querySelector("#messageEmail")
const messageGit = document.querySelector("#messageGit")
const messageFile = document.querySelector("#messageFile")
//botao
const sendButton = document.querySelector("#sendButton")
//
const imgPreview = document.querySelector("#imgPreview")
//
let urlImage = '';

const hoje = new Date()

// Formato: dd/mm/aaaa
const dia = String(hoje.getDate()).padStart(2, '0');
const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
const ano = hoje.getFullYear();

const minhaDataHoje = `${dia}/${mes}/${ano}`


//Eliminando as mensgens de erro


const deleteErrorMessage = (input, message) => {
    input.addEventListener('input', () => {
        message.textContent = ""
    })
}

deleteErrorMessage(inputName, messageName)
deleteErrorMessage(inputEmail, messageEmail)
deleteErrorMessage(inputGit, messageGit)

//--------------------------------------------------------------------

// Validando e Enviando o formulario
const sendForm = () => {

    messageName.textContent = "";
    messageEmail.textContent = "";
    messageGit.textContent = "";

    if (inputName.value.trim() === "") {
        messageName.textContent = "Insira um nome válido";
        inputName.focus();
        return;
    }

    if (inputEmail.value.trim() === "") {
        messageEmail.textContent = "Insira um email válido";
        inputEmail.focus();
        return;
    }

    if (!inputEmail.value.includes("@")) {
        messageEmail.textContent = "O email deve conter um @";
        inputEmail.focus();
        return;
    }

    if (inputGit.value.trim() === "" || !inputGit.value.includes(".github.com")) {
        messageGit.textContent = "Insira um git válido";
        inputGit.focus();
        return;
    }

    renderIngresso();
}


inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const nomeArquivo = file.name
    const tamanhoArquivo = file.size
    //console.log(tamanhoArquivo)

    if (file) {
        URL.revokeObjectURL(urlImage)
    }


    if (tamanhoArquivo > 5242880) {
        messageFile.textContent = "Insira um arquivo de ate 5mb"
    } else {
        if (nomeArquivo.endsWith('.jpg') || nomeArquivo.endsWith('.png')) {

            urlImage = URL.createObjectURL(file)
            imgPreview.src = urlImage;
            messageFile.textContent = ""

        } else {
            messageFile.textContent = "Insira um arquivo .png ou .jpg"
        }
    }

})


//------------------------------------------------------------

//Renderizar ingresso e a mensagem de sucesso
const renderIngresso = () => {



    divTitulo.textContent = "wetryetryteurutyurtyu"

    const imagemAvatar = urlImage || '../assets/images/image-avatar.jpg';
    const minhaDiv = document.createElement("div")
    minhaDiv.classList.add('div-Card')
    minhaDiv.innerHTML = `
        <div class='card-titulo'>
            <img src='../assets/images/logo-full.svg'>
            <p>${minhaDataHoje}</p>
        </div>

        <div class='card-corpo'>
            <img src='${imagemAvatar}' class='avatar'>
            <div>
                <p>${inputName.value}</p>
                <p>${inputEmail.value}</p>
            </div>
        </div>

    `

    divForm.innerHTML = '';
    divForm.appendChild(minhaDiv);

}
//----------------------------------------------
sendButton.addEventListener("click", sendForm);
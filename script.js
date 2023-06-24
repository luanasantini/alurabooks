async function buscaEndereco(cep) {
    let mensagemErro = document.querySelector('#erro')
    mensagemErro.innerHTML = ""


    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro) {
            throw Error("Cep não existente");
        }

        let cidade = document.querySelector('#cidade')
        let logradouro = document.querySelector('#endereco')
        let estado = document.querySelector('#estado')

        cidade.value = consultaCEPConvertida.cidade
        logradouro.value = consultaCEPConvertida.localidade
        estado.value = consultaCEPConvertida.uf

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep inválido. Tente novamente!</p>`
        console.log("Erro")
    }
}

let cep = document.querySelector('#cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))



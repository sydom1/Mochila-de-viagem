/*constantes, formulario e listas - itens como array*/
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
/*constante com variavel em array, localStorage.gerItem e para o navegardor
ir procurar se tem itens*/
const itens = localStorage.getItem("itens") || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

/*addEventListener cira o evento para o botao*/
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    /*constantes nome e quantidade*/
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    /*para criar o elementos, value = valor, foi colocardo separado para 
    ficar com o codigo mais limpo*/
    criaElemento(itemAtual);

    itens.push(itemAtual)

    /*Json.stringify e para converter o objeto em string para ser
    reconhecido pelo localStorage*/
    localStorage.setItem("itens",JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
});


/*função para criar elemento, buscar e salvar no web atraves do localStorage*/
function criaElemento(item) {

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)

}
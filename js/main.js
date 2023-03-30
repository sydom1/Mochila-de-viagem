/*constantes, formulario e listas - itens como array*/
const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
/*constante com variavel em array, localStorage.gerItem e para o navegardor
ir procurar se tem itens*/
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )

/*addEventListener cira o evento para o botao*/
form.addEventListener("submit", (evento) => {  
    evento.preventDefault()

    /*constantes nome e quantidade*/
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    /*verificar se o elemento já existe*/
    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
        }

        if (existe) {
            itemAtual.id = existe.id

            atualizaElemento(itemAtual)

            itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

        } else {
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
             /*para criar o elementos, value = valor, foi colocardo separado para 
             ficar com o codigo mais limpo*/
             criaElemento(itemAtual)

             itens.push(itemAtual)
        }


    /*Json.stringify e para converter o objeto em string para ser
    reconhecido pelo localStorage*/
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
});


/*função para criar elemento, buscar e salvar no web atraves do localStorage*/
function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDelata(item.id))

    lista.appendChild(novoItem)
}

/*funcão para atualizar o elemento*/
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

/*função para deletar o elemento*/

function botaoDelata(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, this.id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
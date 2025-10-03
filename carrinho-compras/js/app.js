function adicionar() {
    const produtoSelect = document.getElementById("produto");
    const quantidadeInput = document.getElementById("quantidade");
    const listaProdutos = document.getElementById("lista-produtos");
    const valorTotalSpan = document.getElementById("valor-total");

    const produtoSelecionado = produtoSelect.value; 
    const quantidade = parseInt(quantidadeInput.value);

    // valida quantidade (não pode: vazio, 0 ou negativo)
    if (!quantidade || quantidade < 1) {
      alert("Informe uma quantidade válida (mínimo 1).");
      return;
    }

    // split de nome e preço
    const [nome, precoTexto] = produtoSelecionado.split(" - ");
    const preco = parseFloat(precoTexto.replace("R$", ""));

    // procura item no carrinho
    let itemExistente = null;
    const itensCarrinho = listaProdutos.getElementsByClassName("carrinho__produtos__produto");

    for (let item of itensCarrinho) {
      let nomeItem = item.dataset.nome;

      // se não tem dataset, extrai texto inicial
      if (!nomeItem) {
        const texto = item.innerText; // ex: "1x Celular R$1400"
        const partes = texto.split(" ");
        if (partes.length >= 3) {
          nomeItem = partes.slice(1, partes.length - 1).join(" ");
          const qtdInicial = parseInt(partes[0].replace("x", "")) || 1;
          item.dataset.nome = nomeItem;
          item.dataset.quantidade = qtdInicial;
        }
      }

      if (nomeItem === nome) {
        itemExistente = item;
        break;
      }
    }

    if (itemExistente) {
      // se já existe 
      let qtdAtual = parseInt(itemExistente.dataset.quantidade);
      qtdAtual += quantidade;
      itemExistente.dataset.quantidade = qtdAtual;

      const subtotal = qtdAtual * preco;
      itemExistente.innerHTML = `<span class="texto-azul">${qtdAtual}x</span> ${nome} <span class="texto-azul">R$${subtotal}</span>`;
    } else {
      // cria novo item
      const item = document.createElement("section");
      item.classList.add("carrinho__produtos__produto");
      item.dataset.nome = nome;
      item.dataset.quantidade = quantidade;
      item.innerHTML = `<span class="texto-azul">${quantidade}x</span> ${nome} <span class="texto-azul">R$${preco * quantidade}</span>`;
      listaProdutos.appendChild(item);
    }

    // recalcula total de todos os itens
    let novoTotal = 0;
    for (let item of listaProdutos.getElementsByClassName("carrinho__produtos__produto")) {
      const qtd = parseInt(item.dataset.quantidade) || 1;
      const nomeProduto = item.dataset.nome;
      const precoProduto = parseFloat(
        [...produtoSelect.options].find(opt => opt.value.startsWith(nomeProduto)).value.split(" - ")[1].replace("R$", "")
      );
      novoTotal += qtd * precoProduto;
    }

    valorTotalSpan.innerText = `R$${novoTotal}`;

    // limpa campo quantidade
    quantidadeInput.value = "";
}

function limpar() {
    const listaProdutos = document.getElementById("lista-produtos");
    const valorTotalSpan = document.getElementById("valor-total");

    listaProdutos.innerHTML = "";
    valorTotalSpan.innerText = "R$0";
}

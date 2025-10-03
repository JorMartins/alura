// Lista de amigos
let amigos = [];

// Função para adicionar amigo
function adicionar() {
  const input = document.getElementById('nome-amigo');
  const nome = input.value.trim();
  
  if (nome === '') {
    alert('Por favor, digite o nome do amigo.');
    return;
  }
  
  if (amigos.includes(nome)) {
    alert('Este amigo já foi adicionado.');
    return;
  }
  
  amigos.push(nome);
  input.value = '';
  atualizarListaAmigos();
}
/*
// Separados por vírugla
function atualizarListaAmigos() {
  const lista = document.getElementById('lista-amigos');
  if (amigos.length === 0) {
    lista.innerHTML = '<p>Nenhum amigo adicionado ainda.</p>';
  } else {
    const nomesJuntos = amigos.join(', ');
    lista.innerHTML = `<p>${nomesJuntos}</p>`;
  }
}
*/

// Lista clicável para remover
function atualizarListaAmigos() {
  const lista = document.getElementById('lista-amigos');
  if (amigos.length === 0) {
    lista.innerHTML = '<p>Nenhum amigo adicionado ainda.</p>';
  } else {
    // Cria spans clicáveis para cada nome, separados por vírgula
    const spansNomes = amigos.map(nome => 
      `<span class="amigo-item" onclick="removerAmigo('${nome}')">${nome}</span>`
    ).join(', ');
    lista.innerHTML = `<p>${spansNomes}</p>`;
  }
}

// Remover um amigo ao clicar no nome
function removerAmigo(nome) {
  if (confirm(`Deseja remover "${nome}" da lista?`)) {  // Confirmação
    amigos = amigos.filter(amigo => amigo !== nome);  // Remove o nome exato do array
    atualizarListaAmigos();  // Atualiza a tela
  }
}


// Função sortear os amigos (Amigo Secreto)
function sortear() {
  if (amigos.length < 3) {
    alert('É necessário adicionar pelo menos 3 amigos para o sorteio.');
    return;
  }
  
  // Algoritmo de embaralhamento
  let sorteio = [...amigos];
  let tentativas = 0;
  const maxTentativas = 100; // Evita loop infinito
  
  do {
    // Embaralha a lista
    for (let i = sorteio.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
    }
    tentativas++;
  } while (temAutoAtribuicao(sorteio) && tentativas < maxTentativas);
  
  if (tentativas >= maxTentativas) {
    alert('Não foi possível gerar um sorteio sem autoatribuição. Tente novamente.');
    return;
  }
  
  atualizarListaSorteio(sorteio);
}

// Função auxiliar para verificar se há autoatribuição
function temAutoAtribuicao(sorteio) {
  for (let i = 0; i < sorteio.length; i++) {
    if (sorteio[i] === amigos[i]) {
      return true;
    }
  }
  return false;
}

// Função para atualizar a lista de sorteio na tela
function atualizarListaSorteio(sorteio) {
  const lista = document.getElementById('lista-sorteio');
  let html = '';
  for (let i = 0; i < amigos.length; i++) {
    html += `<p>${amigos[i]} -> ${sorteio[i]}</p>`;
  }
  lista.innerHTML = html;
}

// Função para reiniciar
function reiniciar() {
  amigos = [];
  document.getElementById('nome-amigo').value = '';
  atualizarListaAmigos();
  document.getElementById('lista-sorteio').innerHTML = '<p>Aguardando sorteio...</p>';
}
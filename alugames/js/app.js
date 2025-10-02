let qtdDevolvido = 0
function alterarStatus(id) {
    // pega o <li> pelo id
    let item = document.getElementById('game-' + id);

    // pega o <a> dentro do item
    let botao = item.querySelector('a');

    // pega a div da imagem dentro do item
    let imagem = item.querySelector('.dashboard__item__img');

    if (botao.classList.contains('dashboard__item__button--return')) {
        // "Devolver" para "Alugar"
        let confirmar = confirm("Realmente deseja devolver?");
        if (!confirmar) {
            return; // Cancelar, não faz nada
        }
        botao.classList.remove('dashboard__item__button--return');
        botao.textContent = "Alugar";
        qtdDevolvido++
        console.log(`Quantidade de jogos devolvidos: ${qtdDevolvido}`)

        //  imagem
        imagem.classList.remove('dashboard__item__img--rented');
    } else {
        // "Alugar" para "Devolver"
        botao.classList.add('dashboard__item__button--return');
        botao.textContent = "Devolver";

        //  imagem
        imagem.classList.add('dashboard__item__img--rented');
    }
}



function palindromo(texto) {
    // remove espaços, pontuação e coloca tudo em minúsculo
    let tratado = texto.toLowerCase().replace(/[\W_]/g, '');

    // inverte a string
    let invertido = tratado.split('').reverse().join('');

    // compara original tratado com invertido
    if (tratado === invertido) {
        console.log(`TRUE:   ${texto} é um palindromo`);
    }
    else {
        console.log(`FALSE:  ${texto} não é um palindromo`);
    }
    
}

palindromo('jorge');
palindromo('arara');
palindromo('marrom');
palindromo('Roma é amor');




function ordenarTresNumeros(a, b, c) {
    let numeros = [a, b, c];
    numeros.sort((x, y) => x - y); // ordena de forma numérica
    return numeros;
}

let resultado = ordenarTresNumeros(7, 3, 5);
console.log("Números em ordem crescente:", resultado);

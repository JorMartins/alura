function comprar() {
    const select = document.getElementById('tipo-ingresso');
    const inputQtd = document.getElementById('qtd');
    
    // Obter valores
    const tipo = select.value;
    let qtd = parseInt(inputQtd.value);
    
    // Verificar se quantidade é válida (maior que 0)
    if (isNaN(qtd) || qtd <= 0) {
        alert('Quantidade inválida! Digite um número positivo.');
        inputQtd.value = '';
        inputQtd.focus();
        return;
    }
    
    // Obter o elemento span correspondente
    let spanId;
    switch (tipo) {
        case 'pista':
            spanId = 'qtd-pista';
            break;
        case 'superior':
            spanId = 'qtd-superior';
            break;
        case 'inferior':
            spanId = 'qtd-inferior';
            break;
        default:
            alert('Tipo de ingresso inválido!');
            return;
    }
    
    const span = document.getElementById(spanId);
    let disponivel = parseInt(span.textContent);
    
    // Verificar se tem quantidade
    if (qtd > disponivel) {
        alert(`Quantidade indisponível! Apenas ${disponivel} ingressos disponíveis para ${tipo}.`);
        return;
    }
    
    // Decrementar e atualizar
    disponivel -= qtd;
    span.textContent = disponivel;
    
    // Limpar input para próxima compra
    inputQtd.value = '';
    inputQtd.focus();

}




// desafios não obrigatórios
function parOuImpar(numero) {
    if (numero % 2 === 0) {
        return `${numero} é par.`;
    } else {
        return `${numero} é ímpar.`;
    }
}


function converterTemperatura(temperatura, escala) {
    let resultado;
    let novaEscala;

    if (escala.toUpperCase() === "C") {
        // Converte de Celsius para Fahrenheit
        resultado = (temperatura * 9/5) + 32;
        novaEscala = "Fahrenheit";
    } else if (escala.toUpperCase() === "F") {
        // Converte de Fahrenheit para Celsius
        resultado = (temperatura - 32) * 5/9;
        novaEscala = "Celsius";
    } else {
        return "Escala inválida! Use 'C' para Celsius ou 'F' para Fahrenheit.";
    }

    return `${temperatura}°${escala.toUpperCase()} = ${resultado.toFixed(2)}°${novaEscala.substring(0, 1)}`;
}

// main.js
let vida = 100;
let forca = 50;
let medicamentos = 10;
let andar = 1;

function start() {
    alert("Bem-vindo ao jogo! Você é um sobrevivente do apocalipse zumbi. Tente chegar ao térreo do prédio onde um helicóptero está esperando para resgatá-lo!");
    while (vida > 0 && andar <= 10) {
        mostrarStatus();
        let acao = prompt("Escolha sua ação:\n1. Explorar a sala\n2. Avançar para o próximo andar");
        if (acao === "1") {
            explorarSala();
        } else if (acao === "2") {
            avancarAndar();
        } else {
            alert("Opção inválida. Tente novamente.");
        }
    }

    if (vida <= 0) {
        alert("Você morreu! Fim de jogo.");
    } else {
        alert("Parabéns! Você chegou ao térreo e foi resgatado!");
    }
}

function mostrarStatus() {
    alert(`Status Atual:\nVida: ${vida}\nForça: ${forca}\nMedicamentos: ${medicamentos}\nAndar: ${andar}`);
}

function explorarSala() {
    const evento = gerarEvento();
    alert("Você está explorando a sala...");
    if (evento === "salaSilenciosa") {
        alert("Você encontrou uma sala silenciosa. Você pode usar medicamentos aqui.");
        let usarMedicamento = prompt("Deseja usar um medicamento? (sim/não)");
        if (usarMedicamento.toLowerCase() === "sim") {
            usarMedicamento();
        }
    } else if (evento === "ataqueZumbis") {
        alert("Você está sendo atacado por zumbis!");
        let acaoCombate = prompt("Escolha sua ação:\n1. Atacar os zumbis\n2. Fugir");
        if (acaoCombate === "1") {
            let resultado = combaterZumbis();
            alert(resultado);
        } else if (acaoCombate === "2") {
            let perdaMedicamentos = Math.floor(Math.random() * 3) + 1; // Perde entre 1 e 3 medicamentos
            medicamentos = Math.max(0, medicamentos - perdaMedicamentos);
            alert(`Você fugiu, mas perdeu ${perdaMedicamentos} medicamentos.`);
        } else {
            alert("Opção inválida.");
        }
    }
}

function avancarAndar() {
    andar++;
    alert(`Você subiu para o andar ${andar}!`);
}

function gerarEvento() {
    const eventos = ["salaSilenciosa", "ataqueZumbis"];
    return eventos[Math.floor(Math.random() * eventos.length)];
}

function combaterZumbis() {
    let chanceDeVencer = Math.random() * forca; // Chance de vencer baseada na força
    if (chanceDeVencer > 25) { // Valor de referência para vencer
        return "Você atacou os zumbis e os derrotou sem ferimentos!";
    } else {
        let danoRecebido = Math.floor(Math.random() * 20) + 5; // Dano entre 5 e 25
        vida -= danoRecebido;
        return `O zumbi te atacou e você recebeu ${danoRecebido} de dano.`;
    }
}

function usarMedicamento() {
    if (medicamentos > 0) {
        vida = Math.min(100, vida + 30);
        medicamentos--;
        alert("Você usou um medicamento e recuperou 30 de vida.");
    } else {
        alert("Você não tem mais medicamentos para usar!");
    }
}

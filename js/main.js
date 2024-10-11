let vida = 100;
let forca = 50;
let medicamentos = 1; // Começa com 1 medicamento
let suprimentos = 0; // Suprimentos começam em 0
let andarAtual = 1;
const maxMedicamentos = 10;

// Função para atualizar e mostrar status
function mostrarStatus() {
    alert(`Status Atual:\nVida: ${vida}\nForça: ${forca}\nMedicamentos: ${medicamentos}\nSuprimentos: ${suprimentos}\nAndar Atual: ${andarAtual}`);
}

// Função para iniciar o jogo
function start() {
    alert("O jogo começa agora! Você é um sobrevivente do apocalipse zumbi. Prepare-se!");
    explorar();
}

// Função para explorar
function explorar() {
    let eventos = [];
    
    // Adiciona eventos aleatórios
    eventos.push(Math.random() < 0.5 ? "zumbis" : "infectados");
    if (Math.random() < 0.5) {
        eventos.push("arma");
    }
    if (Math.random() < 0.3) { // 30% de chance de encontrar a porta misteriosa
        eventos.push("porta");
    }

    for (const evento of eventos) {
        if (evento === "zumbis") {
            lutar("zumbis");
        } else if (evento === "infectados") {
            lutar("infectados");
        } else if (evento === "arma") {
            encontrarArma();
        } else if (evento === "porta") {
            portaMisteriosa();
        }
    }

    // A chance de explorar novamente ou subir de andar
    if (Math.random() < 0.2) { // 20% de chance de subir de andar
        subirAndar();
    } else {
        let acao = confirm("Deseja continuar explorando a sala (OK) ou avançar para o próximo andar (Cancelar)?");
        if (acao) {
            explorar();
        } else {
            subirAndar();
        }
    }
}

// Função para lutar contra os inimigos
function lutar(tipo) {
    let inimigos = tipo === "zumbis" ? "zumbis" : "infectados";
    alert(`Você está sendo atacado por ${inimigos}!`);

    let acao = confirm("Você deseja atacá-los? (OK para atacar, Cancelar para fugir)");

    if (acao) {
        let chanceDeVencer = Math.random() * forca;
        if (chanceDeVencer > 30) {
            if (tipo === "infectados") {
                alert(`Você atacou os ${inimigos} e matou todos sem perder suprimentos!`);
            } else {
                alert(`Você atacou os ${inimigos} e matou todos sem ferimentos!`);
            }
        } else {
            if (tipo === "infectados") {
                let suprimentosPerdidos = Math.floor(Math.random() * 4) + 2; // Perdendo de 2 a 5 suprimentos
                suprimentos -= suprimentosPerdidos;
                if (suprimentos < 0) suprimentos = 0; // Limitar suprimentos a 0
                alert(`Você tentou atacar os ${inimigos}, mas perdeu ${suprimentosPerdidos} suprimentos! Suprimentos restantes: ${suprimentos}`);
            } else {
                vida -= 20; // dano do zumbi
                alert(`O ${inimigos} te humilha com seus golpes desnecessariamente espetaculares e altamente efetivos! Sua vida agora é ${vida}.`);
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }
                let continuar = confirm("Deseja continuar a luta (OK) ou fugir (Cancelar)?");
                if (continuar) {
                    lutar(tipo);
                } else {
                    let suprimentosPerdidos = Math.floor(Math.random() * 3) + 1; // Perdendo de 1 a 3 suprimentos ao fugir
                    suprimentos -= suprimentosPerdidos;
                    if (suprimentos < 0) suprimentos = 0; // Limitar suprimentos a 0
                    alert(`Você fugiu, mas perdeu ${suprimentosPerdidos} suprimentos! Suprimentos restantes: ${suprimentos}`);
                }
            }
        }
    }

    mostrarStatus();
}

// Função para encontrar uma arma melhor
function encontrarArma() {
    let incrementoForca = Math.floor(Math.random() * 20) + 10; // Incremento de força entre 10 e 30
    forca += incrementoForca;
    alert(`Você encontrou uma arma melhor! Sua força aumentou em ${incrementoForca}. Nova força: ${forca}`);
}

// Função para subir de andar
function subirAndar() {
    if (andarAtual < 10) {
        andarAtual++;
        alert(`Você subiu para o andar ${andarAtual}.`);
        explorar();
    } else {
        alert("Você alcançou o térreo! Parabéns, você sobreviveu!");
    }
}

// Função para usar medicamentos
function usarMedicamentos() {
    if (medicamentos > 0) {
        let acao = confirm("Deseja usar um medicamento? (OK para usar, Cancelar para não usar)");
        if (acao) {
            vida += 30;
            if (vida > 100) vida = 100; // Limitar vida máxima a 100
            medicamentos--;
            alert(`Você usou um medicamento. Vida: ${vida}, Medicamentos restantes: ${medicamentos}.`);
            if (Math.random() < 0.5) {
                alert("Você foi atacado enquanto usava os medicamentos!");
                vida -= 20; // dano do ataque
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }
            }
        }
    } else {
        alert("Você não tem medicamentos disponíveis!");
    }
}

// Função para entrar em uma sala silenciosa
function salaSilenciosa() {
    alert("Você entrou em uma sala silenciosa. Você pode usar medicamentos aqui.");
    usarMedicamentos();
}

// Evento da porta misteriosa
function portaMisteriosa() {
    let acao = confirm("Você encontrou uma porta misteriosa. Deseja abri-la? (OK para abrir, Cancelar para não abrir)");

    if (acao) {
        let resultado = Math.random();
        if (resultado < 0.6) { // 60% de chance de encontrar suprimentos
            let suprimentosEncontrados = Math.floor(Math.random() * 3) + 1; // 1 a 3 suprimentos
            suprimentos += suprimentosEncontrados;
            if (suprimentos > maxMedicamentos) suprimentos = maxMedicamentos; // Limitar suprimentos a 10
            alert(`Você encontrou ${suprimentosEncontrados} suprimentos e saiu da sala! Suprimentos totais: ${suprimentos}`);
        } else { // 40% de chance de ser mordido
            vida -= 15;
            alert(`Você pisou em falso em um corpo de um zumbi! Você perdeu 15 de vida. Sua vida agora é ${vida}.`);
            if (vida <= 0) {
                alert("Você morreu! Fim de jogo.");
                return; // Termina o jogo
            }
            let acaoMatar = confirm("Ele prendeu os dentes em sua perna! Quer pisar na cabeça do zumbi? (OK para pisar, Cancelar para fugir)");
            if (acaoMatar) {
                let chanceMatarZumbi = Math.random() * forca;
                if (chanceMatarZumbi > 30) {
                    alert("Você matou o zumbi com sucesso!");
                    let continuar = confirm("Você deseja continuar na sala da porta misteriosa (OK) ou sair imediatamente (Cancelar)?");
                    if (continuar) {
                        let suprimentosEncontrados = Math.floor(Math.random() * 3) + 1; // 1 a 3 suprimentos
                        suprimentos += suprimentosEncontrados;
                        if (suprimentos > maxMedicamentos) suprimentos = maxMedicamentos; // Limitar suprimentos a 10
                        alert(`Você encontrou ${suprimentosEncontrados} suprimentos e saiu da sala! Suprimentos totais: ${suprimentos}`);
                    } else {
                        alert

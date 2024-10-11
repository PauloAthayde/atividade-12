let vida = 100;
let forca = 50;
let medicamentos = 10;
let andarAtual = 1;
const maxMedicamentos = 10;

// Função para atualizar e mostrar status
function mostrarStatus() {
    alert(`Status Atual:\nVida: ${vida}\nForça: ${forca}\nMedicamentos: ${medicamentos}\nAndar Atual: ${andarAtual}`);
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

    for (const evento of eventos) {
        if (evento === "zumbis") {
            lutar("zumbis");
        } else if (evento === "infectados") {
            lutar("infectados");
        } else if (evento === "arma") {
            encontrarArma();
        }
    }

    // A chance de explorar novamente ou subir de andar
    let acao = confirm("Deseja explorar a sala novamente ou avançar para o próximo andar?");
    if (acao) {
        explorar();
    } else {
        subirAndar();
    }
}

// Função para lutar contra os inimigos
function lutar(tipo) {
    let inimigos = tipo === "zumbis" ? "zumbis" : "infectados";
    alert(`Você está sendo atacado por ${inimigos}!`);

    let acao = confirm("Você deseja atacá-los?");

    if (acao) {
        let chanceDeVencer = Math.random() * forca;
        if (chanceDeVencer > 30) {
            alert(`Você atacou os ${inimigos} e matou todos sem ferimentos!`);
        } else {
            vida -= 20; // dano do inimigo
            alert(`O ${inimigos} te humilha com seus golpes desnecessariamente espetaculares e altamente efetivos! Sua vida agora é ${vida}.`);
            let continuar = confirm("Deseja continuar a luta ou fugir?");
            if (continuar) {
                lutar(tipo);
            } else {
                medicamentos -= 1; // perder medicamentos ao fugir
                alert(`Você fugiu, mas perdeu um medicamento! Medicamentos restantes: ${medicamentos}`);
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
        vida += 30;
        if (vida > 100) vida = 100; // Limitar vida máxima a 100
        medicamentos--;
        alert(`Você usou um medicamento. Vida: ${vida}, Medicamentos restantes: ${medicamentos}.`);
    } else {
        alert("Você não tem medicamentos disponíveis!");
    }
}

// Função para entrar em uma sala silenciosa
function salaSilenciosa() {
    alert("Você entrou em uma sala silenciosa. Você pode usar medicamentos aqui.");
    usarMedicamentos();

    if (Math.random() < 0.5) {
        alert("Você foi atacado enquanto usava os medicamentos!");
        vida -= 20; // dano do ataque
    }

    mostrarStatus();
}

// Iniciar o jogo com o comando start()

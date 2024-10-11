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
    eventos.push(Math.random() < 0.5 ? "infectados" : "salaSilenciosa"); // 50% de chance de encontrar infectados ou entrar na sala silenciosa
    if (Math.random() < 0.3) {
        eventos.push("arma"); // 30% de chance de encontrar arma
    }

    for (const evento of eventos) {
        if (evento === "infectados") {
            lutar("infectados");
        } else if (evento === "arma") {
            encontrarArma();
        } else if (evento === "salaSilenciosa") {
            salaSilenciosa();
        }
    }

    // A chance de explorar novamente ou subir de andar
    let acao = Math.random() < 0.3; // 30% de chance de subir o andar
    if (acao) {
        subirAndar();
    } else {
        let acaoExplorar = confirm("Deseja continuar explorando a sala (OK) ou avançar para o próximo andar (Cancelar)?");
        if (acaoExplorar) {
            explorar();
        } else {
            subirAndar();
        }
    }
}

// Função para lutar contra os inimigos
function lutar(tipo) {
    alert(`Você está sendo atacado por humanos infectados!`);

    let acao = confirm("Você deseja atacá-los? (OK para atacar, Cancelar para fugir)");

    if (acao) {
        let chanceDeVencer = Math.random() * forca;
        if (chanceDeVencer > 30) {
            alert(`Você atacou os infectados e os derrotou sem perder suprimentos!`);
        } else {
            let perdaSuprimentos = Math.floor(Math.random() * 5) + 1; // perda entre 1 e 5 suprimentos
            medicamentos -= perdaSuprimentos;
            alert(`Você tentou atacar os infectados, mas falhou e perdeu ${perdaSuprimentos} suprimentos! Medicamentos restantes: ${medicamentos}`);
            if (medicamentos < 0) medicamentos = 0; // Evitar números negativos
        }
    } else {
        let perdaSuprimentos = Math.floor(Math.random() * 3) + 1; // perda menor ao fugir
        medicamentos -= perdaSuprimentos;
        alert(`Você tentou fugir e perdeu ${perdaSuprimentos} suprimentos! Medicamentos restantes: ${medicamentos}`);
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
        return; // Termina o jogo
    }
}

// Função para usar medicamentos
function usarMedicamentos() {
    if (medicamentos > 0) {
        let chanceAtaque = Math.random();
        if (chanceAtaque < 0.5) { // 50% de chance de ser atacado
            vida -= 20; // dano do ataque
            alert(`Você foi atacado enquanto usava os medicamentos! Sua vida caiu para ${vida}.`);
            if (vida <= 0) {
                alert("Você morreu! Fim de jogo.");
                return; // Termina o jogo
            }
        } else {
            vida += 30;
            if (vida > 100) vida = 100; // Limitar vida máxima a 100
            medicamentos--;
            alert(`Você usou um medicamento. Vida: ${vida}, Medicamentos restantes: ${medicamentos}.`);
        }
    } else {
        alert("Você não tem medicamentos disponíveis!");
    }
}

// Função para entrar em uma sala silenciosa
function salaSilenciosa() {
    alert("Você entrou em uma sala silenciosa. Você pode usar medicamentos aqui.");
    usarMedicamentos();
    mostrarStatus();
}

// Iniciar o jogo com o comando start()

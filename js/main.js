let vida = 100;
let forca = 50;
let medicamentos = 5; // Inicia com 5 medicamentos
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
    if (Math.random() < 0.2) { // 20% chance de porta misteriosa
        eventos.push("porta misteriosa");
    }

    for (const evento of eventos) {
        if (evento === "zumbis") {
            lutar("zumbis");
        } else if (evento === "infectados") {
            lutar("infectados");
        } else if (evento === "arma") {
            encontrarArma();
        } else if (evento === "porta misteriosa") {
            portaMisteriosa();
        }
    }

    // Chance de explorar novamente ou subir de andar
    let acao = confirm("Deseja continuar explorando a sala (OK) ou avançar para o próximo andar (Cancelar)?");
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

    let acao = confirm("Você deseja atacá-los? (OK para atacar, Cancelar para fugir)");

    if (acao) {
        let chanceDeVencer = Math.random() * forca;
        if (chanceDeVencer > 30) {
            alert(`Você atacou os ${inimigos} e matou todos sem ferimentos!`);
        } else {
            if (tipo === "infectados") {
                let suprimentosPerdidos = Math.floor(Math.random() * 3) + 1; // Perde de 1 a 3 suprimentos
                medicamentos -= suprimentosPerdidos;
                if (medicamentos < 0) medicamentos = 0; // Não permitir medicamentos negativos
                alert(`Você falhou em atacar os infectados e perdeu ${suprimentosPerdidos} suprimentos! Medicamentos restantes: ${medicamentos}`);
            } else {
                vida -= 20; // dano do inimigo
                alert(`Os ${inimigos} te atacam! Sua vida agora é ${vida}.`);
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }
                let continuar = confirm("Deseja continuar a luta (OK) ou fugir (Cancelar)?");
                if (continuar) {
                    lutar(tipo);
                } else {
                    let suprimentosPerdidos = Math.floor(Math.random() * 2) + 1; // Perde 1 ou 2 suprimentos ao fugir
                    medicamentos -= suprimentosPerdidos;
                    if (medicamentos < 0) medicamentos = 0; // Não permitir medicamentos negativos
                    alert(`Você fugiu, mas perdeu ${suprimentosPerdidos} suprimentos! Medicamentos restantes: ${medicamentos}`);
                }
            }
        }
    } else {
        let danoVida = Math.floor(Math.random() * 10) + 1; // Perde de 1 a 10 de vida ao fugir
        vida -= danoVida;
        alert(`Você tentou fugir, mas os ${inimigos} te atacaram! Você perdeu ${danoVida} de vida. Sua vida agora é ${vida}.`);
        if (vida <= 0) {
            alert("Você morreu! Fim de jogo.");
            return; // Termina o jogo
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
    if (andarAtual < 10 && Math.random() < 0.2) { // 20% de chance
        andarAtual++;
        alert(`Você subiu para o andar ${andarAtual}.`);
        explorar();
    } else {
        alert("Você não subiu de andar desta vez.");
        explorar();
    }
}

// Função para usar medicamentos
function usarMedicamentos() {
    if (medicamentos > 0) {
        let usar = confirm("Deseja usar um medicamento? (OK para sim, Cancelar para não)");
        if (usar) {
            vida += 30;
            if (vida > 100) vida = 100; // Limitar vida máxima a 100
            medicamentos--;
            alert(`Você usou um medicamento. Vida: ${vida}, Medicamentos restantes: ${medicamentos}.`);
        } else {
            alert("Você decidiu não usar um medicamento.");
        }
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
        if (vida <= 0) {
            alert("Você morreu! Fim de jogo.");
            return; // Termina o jogo
        }
    }

    mostrarStatus();
}

// Função para a porta misteriosa
function portaMisteriosa() {
    alert("Você encontrou uma porta misteriosa. Deseja abri-la?");
    let entrar = confirm("OK para abrir a porta, Cancelar para ignorar.");

    if (entrar) {
        let chanceMedicamentos = Math.floor(Math.random() * 3) + 1; // De 1 a 3 medicamentos
        if (Math.random() < 0.5) {
            medicamentos += chanceMedicamentos;
            if (medicamentos > maxMedicamentos) medicamentos = maxMedicamentos; // Limitar a 10 medicamentos
            alert(`Você encontrou ${chanceMedicamentos} medicamentos! Medicamentos totais: ${medicamentos}`);
        } else {
            alert("Você pisou em falso num corpo de um zumbi que mordeu sua perna!");
            let dano = 15;
            vida -= dano;
            alert(`Você perdeu ${dano} de vida! Sua vida agora é ${vida}.`);

            if (vida <= 0) {
                alert("Você morreu! Fim de jogo.");
                return; // Termina o jogo
            }

            let acaoZumbi = confirm("O zumbi prendeu os dentes na sua perna! Deseja pisar na cabeça dele (OK) ou se soltar a força (Cancelar)?");
            if (acaoZumbi) {
                // Pisar na cabeça do zumbi
                let chanceDeMorte = Math.random() * forca;
                if (chanceDeMorte > 20) {
                    alert("Você pisou na cabeça do zumbi e o matou!");
                    let continuar = confirm("Deseja continuar nessa sala da porta misteriosa (OK) ou sair imediatamente (Cancelar)?");
                    if (continuar) {
                        let chanceMedicamentos = Math.floor(Math.random() * 3) + 1; // De 1 a 3 medicamentos
                        medicamentos += chanceMedicamentos;
                        if (medicamentos > maxMedicamentos) medicamentos = maxMedicamentos; // Limitar a 10 medicamentos
                        alert(`Você encontrou ${chanceMedicamentos} medicamentos! Medicamentos totais: ${medicamentos}`);
                    }
                } else {
                    alert("O zumbi é forte! Você não conseguiu matá-lo a tempo e perdeu a vida.");
                    vida -= 20; // dano do zumbi
                }
            }
        }
    } else {
        alert("Você ignorou a porta misteriosa e continuou explorando.");
    }
}

// Não chamar start() automaticamente

let vida = 100;
let forca = 50;
let medicamentos = 5; // Começa com 5 medicamentos
let andarAtual = 1;
const maxMedicamentos = 10;

// Função para atualizar e mostrar status
function mostrarStatus() {
    alert(`Status Atual:\nVida: ${vida}\nForça: ${forca}\nMedicamentos: ${medicamentos}\nAndar Atual: ${andarAtual}`);
}

// Função para verificar morte
function verificarMorte() {
    if (vida <= 0) {
        alert("Você morreu! Fim de jogo.");
        return true; // Indica que o jogo terminou
    }
    return false; // Indica que o jogo continua
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
    if (Math.random() < 0.3) { // 30% de chance de encontrar uma arma
        eventos.push("arma");
    }
    if (Math.random() < 0.1) { // 10% de chance de encontrar uma porta misteriosa
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

    // A chance de explorar novamente ou subir de andar
    let acao = confirm("Deseja continuar explorando a sala (OK) ou avançar para o próximo andar (Cancelar)?");
    if (acao) {
        explorar();
    } else {
        if (Math.random() < 0.2) { // 20% de chance de subir de andar
            subirAndar();
        } else {
            alert("Você decidiu continuar explorando.");
            explorar();
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
            alert(`Você atacou os ${inimigos} e matou todos sem ferimentos!`);
        } else {
            if (tipo === "infectados") {
                alert(`Você falhou ao atacar os infectados! Eles tentaram roubar seus medicamentos.`);
                if (medicamentos > 0) {
                    let perdaMedicamentos = Math.floor(Math.random() * 3) + 1; // Perda de 1 a 3 medicamentos
                    medicamentos = Math.max(medicamentos - perdaMedicamentos, 0);
                    alert(`Você perdeu ${perdaMedicamentos} medicamentos. Medicamentos restantes: ${medicamentos}`);
                } else {
                    vida -= 10; // Dano quando não há medicamentos
                    alert(`Você não tinha medicamentos para proteger, perdeu 10 de vida! Sua vida agora é ${vida}.`);
                    if (verificarMorte()) return; // Verifica a morte após a luta
                }
            } else {
                vida -= 20; // Dano dos zumbis
                alert(`Os ${inimigos} te atacaram! Sua vida agora é ${vida}.`);
                if (verificarMorte()) return; // Verifica a morte após a luta
                let continuar = confirm("Deseja continuar a luta (OK) ou fugir (Cancelar)?");
                if (continuar) {
                    lutar(tipo);
                } else {
                    let fugaSucesso = Math.random() < 0.5; // 50% de chance de fuga
                    if (fugaSucesso) {
                        let perdaMedicamentos = Math.floor(Math.random() * 2) + 1; // Perda de 1 a 2 medicamentos
                        medicamentos = Math.max(medicamentos - perdaMedicamentos, 0);
                        alert(`Você conseguiu fugir, mas perdeu ${perdaMedicamentos} medicamentos. Medicamentos restantes: ${medicamentos}`);
                    } else {
                        vida -= 10; // Dano na fuga
                        alert(`Você falhou em fugir! Perdeu 10 de vida. Sua vida agora é ${vida}.`);
                        verificarMorte();
                    }
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

// Função para usar medicamentos
function usarMedicamentos() {
    if (medicamentos > 0) {
        let usar = confirm("Deseja usar um medicamento? (OK para sim, Cancelar para não)");
        if (usar) {
            if (vida < 100) {
                vida += 30;
                if (vida > 100) vida = 100; // Limitar vida máxima a 100
                medicamentos--;
                alert(`Você usou um medicamento. Vida: ${vida}, Medicamentos restantes: ${medicamentos}.`);
            } else {
                alert("Você já está com a vida cheia!");
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

    if (Math.random() < 0.5) {
        alert("Você foi atacado enquanto usava os medicamentos!");
        vida -= 20; // Dano do ataque
        if (verificarMorte()) return; // Verifica a morte
    }

    mostrarStatus();
}

// Função para a porta misteriosa
function portaMisteriosa() {
    let entrar = confirm("Você encontrou uma porta misteriosa. Deseja abrir a porta e entrar? (OK para sim, Cancelar para não)");
    if (entrar) {
        let evento = Math.floor(Math.random() * 3); // 0, 1 ou 2 medicamentos
        if (evento === 0) {
            let medicamentosEncontrados = Math.floor(Math.random() * 3) + 1; // 1 a 3 medicamentos
            medicamentos = Math.min(medicamentos + medicamentosEncontrados, maxMedicamentos);
            alert(`Você encontrou ${medicamentosEncontrados} medicamentos! Medicamentos totais: ${medicamentos}`);
        } else {
            alert("Você pisou em um corpo de zumbi que mordeu sua perna!");
            vida -= 15; // Dano da mordida
            alert(`Você perdeu 15 de vida. Sua vida agora é ${vida}.`);
            if (verificarMorte()) return; // Verifica a morte

            let acaoZumbi = confirm("Quer pisar na cabeça dele (OK) ou tentar se soltar a força (Cancelar)?");
            if (acaoZumbi) {
                let chanceDeMatar = Math.random() * forca;
                if (chanceDeMatar > 25) {
                    alert("Você pisou na cabeça do zumbi e o matou!");
                } else {
                    vida -= 15; // Dano da mordida
                    alert(`Você falhou! O zumbi mordeu sua outra perna! Você perdeu mais 15 de vida. Sua vida agora é ${vida}.`);
                    if (verificarMorte()) return; // Verifica a morte
                }
            } else {
                vida -= 5; // Dano ao tentar se soltar
                alert(`Você se soltou a força, mas perdeu 5 de vida ao machucar sua perna! Sua vida agora é ${vida}.`);
                if (verificarMorte()) return; // Verifica a morte
            }
        }
    } else {
        alert("Você decidiu não entrar e continua sua aventura.");
    }
}

// Função para subir de andar
function subirAndar() {
    andarAtual++;
    alert(`Você subiu para o andar ${andarAtual}.`);
    explorar();
}

// Iniciar o jogo com o comando start()

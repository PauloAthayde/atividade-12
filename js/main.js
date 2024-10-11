let vida = 100;
let forca = 50;
let medicamentos = 5; // O jogador começa com 5 medicamentos
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
    if (Math.random() < 0.5) {
        eventos.push("infectados");
    }
    if (Math.random() < 0.3) {
        eventos.push("arma");
    }
    if (Math.random() < 0.2) {
        eventos.push("porta misteriosa");
    }

    for (const evento of eventos) {
        if (evento === "infectados") {
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
        subirAndar();
    }
}

// Função para lutar contra os infectados
function lutar(tipo) {
    let inimigos = tipo === "infectados" ? "infectados" : "zumbis";
    alert(`Você está sendo atacado por ${inimigos}!`);

    let acao = confirm("Você deseja atacá-los? (OK para atacar, Cancelar para fugir)");

    if (acao) {
        let chanceDeVencer = Math.random() * forca;
        if (chanceDeVencer > 30) {
            alert(`Você atacou os ${inimigos} e matou todos sem ferimentos!`);
        } else {
            // Se a vida estiver acima de 0 e medicamentos também, perde suprimentos
            if (medicamentos > 0) {
                let suprimentosPerdidos = Math.floor(Math.random() * 3) + 1; // 1 a 3 suprimentos
                medicamentos -= suprimentosPerdidos;
                medicamentos = Math.max(medicamentos, 0); // Garantir que não fique negativo
                alert(`Você não conseguiu derrotar os ${inimigos} e perdeu ${suprimentosPerdidos} suprimentos!`);
            } else {
                vida -= 20; // Se não tiver medicamentos, perde vida
                alert(`Os ${inimigos} te atacaram! Você perdeu 20 de vida. Sua vida agora é ${vida}.`);
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }
            }
        }
    } else {
        // Ao fugir
        if (medicamentos > 0) {
            let suprimentosPerdidos = Math.floor(Math.random() * 2) + 1; // 1 ou 2 suprimentos
            medicamentos -= suprimentosPerdidos;
            medicamentos = Math.max(medicamentos, 0); // Garantir que não fique negativo
            alert(`Você fugiu, mas perdeu ${suprimentosPerdidos} suprimentos! Medicamentos restantes: ${medicamentos}`);
        } else {
            vida -= 10; // Se não tiver medicamentos, perde vida
            alert(`Você fugiu, mas os ${inimigos} te atacaram! Você perdeu 10 de vida. Sua vida agora é ${vida}.`);
            if (vida <= 0) {
                alert("Você morreu! Fim de jogo.");
                return; // Termina o jogo
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
    mostrarStatus();
}

// Função para subir de andar
function subirAndar() {
    if (andarAtual < 10 && Math.random() < 0.2) { // 20% de chance de subir de andar
        andarAtual++;
        alert(`Você subiu para o andar ${andarAtual}.`);
        explorar();
    } else if (andarAtual === 10) {
        alert("Você alcançou o térreo! Parabéns, você sobreviveu!");
    } else {
        alert("Você continua explorando...");
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
            medicamentos = Math.max(medicamentos, 0); // Garantir que não fique negativo
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

    // Chance de ser atacado
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
    let abrir = confirm("Você encontrou uma porta misteriosa. Deseja abri-la? (OK para sim, Cancelar para não)");

    if (abrir) {
        if (Math.random() < 0.5) {
            let medicamentosEncontrados = Math.floor(Math.random() * 3) + 1; // 1 a 3 medicamentos
            medicamentos += medicamentosEncontrados;
            if (medicamentos > maxMedicamentos) medicamentos = maxMedicamentos; // Garantir que não exceda o máximo
            alert(`Você encontrou ${medicamentosEncontrados} medicamentos! Agora você tem ${medicamentos}.`);
        } else {
            alert("Você pisou em falso num corpo de um zumbi!");
            vida -= 15;
            alert(`Ele prendeu os dentes na sua perna! Você perdeu 15 de vida. Sua vida agora é ${vida}.`);

            // Escolhas
            let acaoZumbi = confirm("Quer pisar na cabeça do zumbi (OK) ou se soltar à força (Cancelar)?");

            if (acaoZumbi) {
                let chanceDeMatar = Math.random() * forca;
                if (chanceDeMatar > 20) {
                    alert("Você pisou na cabeça do zumbi e o matou!");
                } else {
                    vida -= 15; // Se falhar em matar
                    alert("Você tentou pisar na cabeça, mas o zumbi mordeu a sua outra perna! Você perdeu mais 15 de vida.");
                }

                // Mostrar status após a luta
                mostrarStatus();
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }

                let continuar = confirm("Deseja continuar na sala da porta misteriosa (OK) ou sair (Cancelar)?");
                if (continuar) {
                    // Continuar explorando na sala da porta misteriosa
                    explorar();
                } else {
                    alert("Você saiu da sala sem problemas.");
                }

            } else {
                // Soltar à força
                vida -= 5; // Perde mais vida ao tentar escapar
                alert(`Você se soltou à força, mas perdeu 5 de vida ao machucar a perna. Sua vida agora é ${vida}.`);
                mostrarStatus();
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }
                alert("Você saiu da sala sem problemas.");
            }
        }
    }
}

// Iniciar o jogo com o comando start()

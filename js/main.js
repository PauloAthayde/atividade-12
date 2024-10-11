let vida = 100;
let forca = 50;
let medicamentos = 1; // Começa com 1 medicamento
let suprimentos = 0; // Suprimentos iniciais
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
    if (Math.random() < 0.5) {
        eventos.push("porta misteriosa");
    }
    eventos.push(Math.random() < 0.5 ? "infectados" : "arma");

    for (const evento of eventos) {
        if (evento === "infectados") {
            lutar("infectados");
        } else if (evento === "arma") {
            encontrarArma();
        } else if (evento === "porta misteriosa") {
            portaMisteriosa();
        }
    }

    // Chance de explorar novamente ou subir de andar
    if (Math.random() < 0.8) {
        let acao = confirm("Deseja continuar explorando a sala (OK) ou avançar para o próximo andar (Cancelar)?");
        if (acao) {
            explorar();
        } else {
            subirAndar();
        }
    } else {
        subirAndar();
    }
}

// Função para lutar contra os infectados
function lutar(tipo) {
    alert(`Você está sendo atacado por infectados!`);

    let acao = confirm("Você deseja atacá-los? (OK para atacar, Cancelar para fugir)");

    if (acao) {
        let chanceDeVencer = Math.random() * forca;
        if (chanceDeVencer > 30) {
            alert("Você atacou os infectados com sucesso e não perdeu suprimentos!");
        } else {
            suprimentos -= Math.floor(Math.random() * 5) + 1; // Perde suprimentos
            alert(`Você falhou ao atacar! Os infectados roubaram suprimentos! Suprimentos restantes: ${suprimentos}`);
        }
    } else {
        let perdaSuprimentos = Math.floor(Math.random() * 2) + 1; // Perde alguns suprimentos ao fugir
        suprimentos -= perdaSuprimentos;
        alert(`Você tenta fugir e consegue, mas perde ${perdaSuprimentos} suprimentos! Suprimentos restantes: ${suprimentos}`);
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
        if (vida < 100) {
            let curar = confirm("Deseja usar um medicamento? (OK para sim, Cancelar para não)");
            if (curar) {
                vida += 30;
                if (vida > 100) vida = 100; // Limitar vida máxima a 100
                medicamentos--;
                alert(`Você usou um medicamento. Vida: ${vida}, Medicamentos restantes: ${medicamentos}.`);
                if (Math.random() < 0.5) {
                    alert("Enquanto você estava se curando, foi atacado por infectados!");
                    vida -= 20; // dano do ataque
                    alert(`Você perdeu 20 de vida. Vida atual: ${vida}`);
                    if (vida <= 0) {
                        alert("Você morreu! Fim de jogo.");
                        return; // Termina o jogo
                    }
                }
            }
        } else {
            alert("Você já está com a vida cheia!");
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

// Função para o evento da porta misteriosa
function portaMisteriosa() {
    let acao = confirm("Você vê uma porta misteriosa. Deseja abrir a porta? (OK para abrir, Cancelar para continuar a aventura)");
    if (acao) {
        let resultado = Math.random();
        if (resultado < 0.5) {
            let suprimentosEncontrados = Math.floor(Math.random() * 3) + 1; // De 1 a 3 suprimentos
            suprimentos += suprimentosEncontrados;
            alert(`Você encontrou ${suprimentosEncontrados} suprimentos! Suprimentos totais: ${suprimentos}`);
        } else {
            alert("Você pisou em um corpo de um zumbi que mordeu sua perna!");
            vida -= 15; // dano do zumbi
            alert("Ele prendeu os dentes na sua perna! Quer pisar na cabeça dele ou se soltar a força?");
            let escolha = confirm("OK para pisar na cabeça do zumbi, Cancelar para tentar se soltar a força");
            if (escolha) {
                let chanceDeVencer = Math.random() * forca;
                if (chanceDeVencer > 30) {
                    alert("Você pisou na cabeça do zumbi e o matou!");
                } else {
                    vida -= 15; // Dano do segundo ataque
                    alert(`Você tentou pisar, mas o zumbi te mordeu de novo! Você perdeu mais 15 de vida. Vida atual: ${vida}`);
                    if (vida <= 0) {
                        alert("Você morreu! Fim de jogo.");
                        return; // Termina o jogo
                    }
                }
            } else {
                vida -= 5; // Dano ao se soltar
                alert(`Você se soltou, mas machucou a perna! Você perdeu 5 de vida. Vida atual: ${vida}`);
                if (vida <= 0) {
                    alert("Você morreu! Fim de jogo.");
                    return; // Termina o jogo
                }
            }
        }
    }
    mostrarStatus();
}

// Iniciar o jogo com o comando start()

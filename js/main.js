class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50;
        this.medicamentos = 10;
        this.andarAtual = 1;
        this.totalAndares = 10;
        this.eventosPendentes = [];
        this.explorandoSala = false; // Controle para explorar a sala
    }

    enfrentarDesafio() {
        const numeroDeEventos = Math.floor(Math.random() * 3) + 2;
        this.eventosPendentes = [];
        for (let i = 0; i < numeroDeEventos; i++) {
            const evento = this.sortearEvento();
            this.eventosPendentes.push(evento);
        }
        this.mostrarProximoEvento();
    }

    sortearEvento() {
        const eventos = ['ataque_zumbis', 'ataque_infectados', 'sala_silenciosa', 'arma_melhor', 'usar_medicamento'];
        return eventos[Math.floor(Math.random() * eventos.length)];
    }

    mostrarProximoEvento() {
        if (this.eventosPendentes.length > 0) {
            const evento = this.eventosPendentes.shift();
            this.mostrarEventoNaTela(evento);
        } else {
            this.andarAtual++;
            this.explorandoSala = false; // Reseta o estado de exploração após esgotar eventos
            this.verificarProgresso();
        }
    }

    mostrarEventoNaTela(evento) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");
        const botao1 = document.getElementById("botao1");
        const botao2 = document.getElementById("botao2");

        let mensagem = "";
        let opcao1 = "";
        let opcao2 = "";

        switch (evento) {
            case 'ataque_zumbis':
                mensagem = "Você está sendo atacado por zumbis!";
                opcao1 = "Atacá-los";
                opcao2 = "Fugir";
                break;

            case 'ataque_infectados':
                mensagem = "Infectados estão tentando roubar seus medicamentos!";
                opcao1 = "Atacá-los";
                opcao2 = "Fugir";
                break;

            case 'sala_silenciosa':
                const ganhoMedicamentos = Math.floor(Math.random() * 5) + 1;
                this.medicamentos += ganhoMedicamentos;
                mensagem = `Você encontrou uma sala silenciosa e obteve ${ganhoMedicamentos} medicamentos.`;
                opcao1 = "Explorar mais a sala";
                opcao2 = "Avançar para o próximo andar";
                break;

            case 'arma_melhor':
                const ganhoForca = Math.floor(Math.random() * 5) + 3;
                this.forca += ganhoForca;
                mensagem = `Você encontrou uma espada melhor! Sua força aumentou em ${ganhoForca}.`;
                opcao1 = "Pegar a espada";
                opcao2 = "Deixar a espada e avançar para o próximo andar";
                break;

            case 'usar_medicamento':
                const vidaRecuperada = Math.min(this.medicamentos * 5, 30);
                this.vida = Math.min(this.vida + vidaRecuperada, 100); // Limita a vida máxima a 100
                this.medicamentos -= Math.ceil(vidaRecuperada / 5);
                mensagem = `Você usou medicamentos e recuperou ${vidaRecuperada} de vida.`;
                opcao1 = "Explorar a sala";
                opcao2 = "Avançar para o próximo andar";
                break;
        }

        modalMessage.innerText = mensagem;
        botao1.innerText = opcao1;
        botao2.innerText = opcao2;
        modal.style.display = "flex";

        botao1.onclick = () => {
            modal.style.display = "none";
            if (opcao1.includes("Explorar")) {
                this.explorandoSala = true;
                this.enfrentarDesafio(); // Continua os eventos na mesma sala
            } else {
                this.mostrarProximoEvento();
            }
        };

        botao2.onclick = () => {
            modal.style.display = "none";
            this.mostrarProximoEvento();
        };
    }

    realizarCombate() {
        const chanceDeVitoria = Math.random() * 100;
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");

        let mensagem = "";

        if (chanceDeVitoria < this.forca) {
            mensagem = "Você atacou os zumbis e matou eles sem ferimentos.";
        } else if (chanceDeVitoria >= this.forca && chanceDeVitoria < this.forca + 30) {
            const dano = Math.floor(Math.random() * 10) + 1;
            this.vida -= dano;
            mensagem = `Você atacou os zumbis e matou todos, mas foi ferido! Perdeu ${dano} de vida.`;
        } else {
            mensagem = "O zumbi te humilha com golpes espetaculares! Deseja continuar a luta ou fugir?";
            const botao1 = document.getElementById("botao1");
            const botao2 = document.getElementById("botao2");
            botao1.innerText = "Continuar lutando";
            botao2.innerText = "Fugir";
            modalMessage.innerText = mensagem;
            modal.style.display = "flex";
            botao1.onclick = () => {
                modal.style.display = "none";
                this.realizarCombate();
            };
            botao2.onclick = () => {
                modal.style.display = "none";
                this.fugir();
            };
            return;
        }

        modalMessage.innerText = mensagem;
        modal.style.display = "flex";
        const botao1 = document.getElementById("botao1");
        botao1.innerText = "Ok";
        botao1.onclick = () => modal.style.display = "none";
        const botao2 = document.getElementById("botao2");
        botao2.style.display = "none";

        this.mostrarStatus();
    }

    fugir() {
        const perdaMedicamentos = Math.floor(Math.random() * 3) + 1;
        this.medicamentos -= perdaMedicamentos;
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");

        modalMessage.innerText = `Você fugiu e perdeu ${perdaMedicamentos} medicamentos.`;
        modal.style.display = "flex";

        const botao1 = document.getElementById("botao1");
        botao1.innerText = "Ok";
        botao1.onclick = () => modal.style.display = "none";
        const botao2 = document.getElementById("botao2");
        botao2.style.display = "none";

        this.mostrarStatus();
    }

    mostrarStatus() {
        const statusMensagem = `Status atual -> Vida: ${this.vida}, Força: ${this.forca}, Medicamentos: ${this.medicamentos}, Andar: ${this.andarAtual}`;
        console.log(statusMensagem);
        alert(statusMensagem);
    }

    estaVivo() {
        return this.vida > 0;
    }

    chegouAoTopo() {
        return this.andarAtual > this.totalAndares;
    }

    verificarProgresso() {
        if (!this.estaVivo()) {
            console.log("Você morreu. Fim de jogo.");
            alert("Você morreu. Fim de jogo.");
        } else if (this.chegouAoTopo()) {
            console.log("Você chegou ao topo e foi resgatado pelo helicóptero! Parabéns!");
            alert("Você venceu o jogo! Chegou ao topo e foi resgatado!");
        } else {
            this.mostrarStatus();
            this.enfrentarDesafio();
        }
    }
}

let personagem;

function start() {
    personagem = new Personagem("Sobrevivente");
    console.log(`\nIniciando o jogo...`);
    personagem.mostrarStatus();
    personagem.enfrentarDesafio();
}

function executarAcao(acao) {
    const modal = document.getElementById("modal");
    modal.style.display = "none";

    if (acao === "Atacá-los") {
        personagem.realizarCombate();
    } else if (acao === "Fugir") {
        personagem.fugir();
    }

    personagem.mostrarProximoEvento();
}

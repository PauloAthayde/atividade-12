class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50;
        this.medicamentos = 10;
        this.andarAtual = 1;
        this.totalAndares = 10;
        this.eventosPendentes = [];
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
                this.vida += vidaRecuperada;
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
    }

    realizarCombate() {
        const chanceDeVitoria = Math.random() * 100;
        const chanceDePerdaMedicamentos = Math.floor(Math.random() * 5) + 2;

        if (chanceDeVitoria < this.forca) {
            console.log("Você venceu o combate! Não perdeu nada.");
        } else {
            this.medicamentos -= chanceDePerdaMedicamentos;
            console.log(`Você perdeu a batalha e perdeu ${chanceDePerdaMedicamentos} medicamentos.`);
        }
    }

    fugir() {
        const perdaMedicamentos = Math.floor(Math.random() * 3) + 1;
        this.medicamentos -= perdaMedicamentos;
        console.log(`Você fugiu e perdeu ${perdaMedicamentos} medicamentos.`);
    }

    statusAtual() {
        console.log(`Status atual -> Vida: ${this.vida}, Força: ${this.forca}, Medicamentos: ${this.medicamentos}, Andar: ${this.andarAtual}`);
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
            this.statusAtual();
            this.enfrentarDesafio();
        }
    }
}

let personagem; 

function start() {
    personagem = new Personagem("Sobrevivente");
    console.log(`\nIniciando o jogo...`);
    personagem.statusAtual();
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

    console.log(`Ação escolhida: ${acao}`);

    personagem.mostrarProximoEvento();
}

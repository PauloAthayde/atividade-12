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
        const eventos = ['ataque_zumbi', 'sala_silenciosa', 'arma_melhor', 'perda_medicamentos', 'sala_armadilha'];
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
            case 'ataque_zumbi':
                const dano = Math.floor(Math.random() * 30) + 10; 
                this.vida -= dano;
                mensagem = `Você foi atacado por zumbis e perdeu ${dano} de vida.`;
                opcao1 = "Atacar os zumbis";
                opcao2 = "Fugir e perder medicamentos";
                break;

            case 'sala_silenciosa':
                const ganhoMedicamentos = Math.floor(Math.random() * 5); 
                this.medicamentos += ganhoMedicamentos;
                mensagem = `Você encontrou uma sala silenciosa e obteve ${ganhoMedicamentos} de medicamentos, mas há armadilhas no caminho.`;
                opcao1 = "Explorar e arriscar vida";
                opcao2 = "Sair imediatamente";
                break;

            case 'arma_melhor':
                const ganhoForca = Math.floor(Math.random() * 5) + 3; 
                this.forca += ganhoForca;
                mensagem = `Você encontrou uma espada melhor! Sua força aumentou em ${ganhoForca}.`;
                opcao1 = "Pegar a espada";
                opcao2 = "Deixar a espada";
                break;

            case 'perda_medicamentos':
                const perdaMedicamentos = Math.floor(Math.random() * 8) + 2; 
                this.medicamentos -= perdaMedicamentos;
                mensagem = `Você se deparou com saqueadores e perdeu ${perdaMedicamentos} de medicamentos.`;
                opcao1 = "Enfrentá-los";
                opcao2 = "Fugir e perder ainda mais medicamentos";
                break;

            case 'sala_armadilha':
                const danoArmadilha = Math.floor(Math.random() * 15) + 5;
                this.vida -= danoArmadilha;
                mensagem = `Você caiu em uma armadilha e perdeu ${danoArmadilha} de vida.`;
                opcao1 = "Tentar desarmar a armadilha";
                opcao2 = "Ignorar e continuar";
                break;
        }

        modalMessage.innerText = mensagem;
        botao1.innerText = opcao1;
        botao2.innerText = opcao2;
        modal.style.display = "flex";
    }

    statusAtual() {
        console.log(`Status atual -> Vida: ${this.vida}, Força: ${this.forca}, Medicamentos: ${this.medicamentos}`);
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

    console.log(`Ação escolhida: ${acao}`);

    // Após o jogador escolher uma ação, continua para o próximo evento
    personagem.mostrarProximoEvento();
}

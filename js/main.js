class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50; 
        this.recurso = 10; 
        this.andarAtual = 1; 
    }

    enfrentarDesafio() {
        const numeroDeEventos = Math.floor(Math.random() * 3) + 2; 
        for (let i = 0; i < numeroDeEventos; i++) {
            const evento = this.sortearEvento();
            this.mostrarEventoNaTela(evento);
        }
        this.andarAtual += 1; 
    }

    sortearEvento() {
        const eventos = ['ataque_zumbi', 'sala_silenciosa', 'arma_melhor', 'nada'];
        return eventos[Math.floor(Math.random() * eventos.length)];
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
                const dano = Math.floor(Math.random() * 20); 
                this.vida -= dano;
                mensagem = `Você foi atacado por zumbis e perdeu ${dano} de vida.`;
                opcao1 = "Atacar os zumbis";
                opcao2 = "Tentar fugir";
                break;

            case 'sala_silenciosa':
                const ganhoRecurso = Math.floor(Math.random() * 10); 
                this.recurso += ganhoRecurso;
                mensagem = `Você encontrou uma sala silenciosa e obteve ${ganhoRecurso} de recurso.`;
                opcao1 = "Explorar a sala";
                opcao2 = "Sair imediatamente";
                break;

            case 'arma_melhor':
                const ganhoForca = Math.floor(Math.random() * 10 + 5); 
                this.forca += ganhoForca;
                mensagem = `Você encontrou uma espada melhor! Sua força aumentou em ${ganhoForca}.`;
                opcao1 = "Pegar a espada";
                opcao2 = "Deixar a espada";
                break;

            case 'nada':
                mensagem = "Nada aconteceu, você teve sorte dessa vez.";
                opcao1 = "Continuar subindo";
                opcao2 = "Descansar um pouco";
                break;
        }

        modalMessage.innerText = mensagem;
        botao1.innerText = opcao1;
        botao2.innerText = opcao2;
        modal.style.display = "flex"; 
    }

    statusAtual() {
        console.log(`Status atual -> Vida: ${this.vida}, Força: ${this.forca}, Recursos: ${this.recurso}`);
    }

    estaVivo() {
        return this.vida > 0;
    }

    chegouAoTopo() {
        return this.andarAtual === 10; 
    }
}

let personagem; 

function start() {
    personagem = new Personagem("Sobrevivente");
    let rodada = 1;

    while (personagem.estaVivo() && !personagem.chegouAoTopo()) {
        console.log(`\nRodada ${rodada}`);
        personagem.enfrentarDesafio();
        rodada++;
    }

    if (personagem.chegouAoTopo()) {
        console.log("\nParabéns! Você chegou ao topo do prédio e foi resgatado pelo helicóptero!");
    } else {
        console.log("\nO jogo terminou. Você não sobreviveu.");
    }
}

function executarAcao(acao) {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; 

    // Ações diferentes podem ser implementadas aqui dependendo da escolha do jogador
    console.log(`Ação escolhida: ${acao}`);

    // Atualiza o status do personagem e continua o jogo
    personagem.statusAtual();

    // Verifica se o personagem ainda está vivo e continua o jogo
    if (personagem.estaVivo() && !personagem.chegouAoTopo()) {
        personagem.enfrentarDesafio();
    } else if (!personagem.estaVivo()) {
        console.log("Você morreu.");
    } else if (personagem.chegouAoTopo()) {
        console.log("Você chegou ao topo e foi resgatado!");
    }
}

class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50; // Força representa a habilidade com a espada
        this.recurso = 10; // Recurso pode ser usado para recuperar vida ou enfrentar desafios
        this.andarAtual = 1; // Inicia no primeiro andar do prédio
    }

    enfrentarDesafio() {
        const numeroDeEventos = Math.floor(Math.random() * 3) + 2; // No mínimo 2, no máximo 4 eventos
        for (let i = 0; i < numeroDeEventos; i++) {
            const evento = this.sortearEvento();
            this.mostrarEventoNaTela(evento);
        }
        this.andarAtual += 1; // Subir para o próximo andar
    }

    sortearEvento() {
        const eventos = ['ataque_zumbi', 'sala_silenciosa', 'arma_melhor', 'nada'];
        return eventos[Math.floor(Math.random() * eventos.length)];
    }

    mostrarEventoNaTela(evento) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");
        
        let mensagem = "";
        switch (evento) {
            case 'ataque_zumbi':
                const dano = Math.floor(Math.random() * 20); // Dano causado por zumbis
                this.vida -= dano;
                mensagem = `Você foi atacado por zumbis e perdeu ${dano} de vida.`;
                break;

            case 'sala_silenciosa':
                const ganhoRecurso = Math.floor(Math.random() * 10); // Recursos encontrados
                this.recurso += ganhoRecurso;
                mensagem = `Você encontrou uma sala silenciosa e obteve ${ganhoRecurso} de recurso.`;
                break;

            case 'arma_melhor':
                const ganhoForca = Math.floor(Math.random() * 10 + 5); // Aumenta a força
                this.forca += ganhoForca;
                mensagem = `Você encontrou uma espada melhor! Sua força aumentou em ${ganhoForca}.`;
                break;

            case 'nada':
                mensagem = "Nada aconteceu, você teve sorte dessa vez.";
                break;
        }

        modalMessage.innerText = mensagem;
        modal.style.display = "flex"; // Exibir a janela modal
    }

    estaVivo() {
        return this.vida > 0;
    }

    chegouAoTopo() {
        return this.andarAtual === 10; // O jogador precisa chegar ao 10º andar
    }
}

function start() {
    const personagem = new Personagem("Sobrevivente");
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

// Função para executar a ação escolhida na janela modal
function executarAcao(acao) {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Fechar a janela modal

    // Dependendo da ação escolhida, podemos fazer diferentes coisas no jogo.
    console.log(`Ação escolhida: ${acao}`);
}

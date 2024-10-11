class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50;
        this.medicamentos = 10;
        this.andarAtual = 1;
        this.totalAndares = 10;
        this.explorandoSala = false; // Flag para controlar se o jogador está explorando a sala
    }

    // Exibe os status atuais da personagem
    mostrarStatus() {
        alert(`Status Atual:
        Vida: ${this.vida}
        Força: ${this.forca}
        Medicamentos: ${this.medicamentos}
        Andar: ${this.andarAtual}`);
    }

    // Função para enfrentar um desafio
    enfrentarDesafio() {
        if (this.estaVivo() && !this.chegouAoTopo()) {
            if (this.explorandoSala) {
                this.explorandoSala = false;
                this.gerarEventoAleatorio();
            } else {
                this.mostrarOpcoes();
            }
        } else {
            this.verificarProgresso();
        }
    }

    // Função que exibe as opções de ação
    mostrarOpcoes() {
        const opcao = prompt("O que você deseja fazer?\n1. Explorar a sala\n2. Avançar para o próximo andar");

        if (opcao == "1") {
            this.explorarSala();
        } else if (opcao == "2") {
            this.avancarAndar();
        } else {
            alert("Opção inválida. Tente novamente.");
            this.mostrarOpcoes();
        }
    }

    // Função para explorar a sala
    explorarSala() {
        this.explorandoSala = true; // Define que o jogador está explorando a sala
        alert("Você decidiu explorar a sala...");
        this.gerarEventoAleatorio();
    }

    // Função para avançar para o próximo andar
    avancarAndar() {
        if (this.andarAtual < this.totalAndares) {
            this.andarAtual++;
            alert(`Você avançou para o andar ${this.andarAtual}.`);
            this.enfrentarDesafio(); // Continuar com o próximo desafio
        } else {
            this.verificarProgresso();
        }
    }

    // Gera um evento aleatório
    gerarEventoAleatorio() {
        const eventos = [
            () => this.ataqueZumbis(),
            () => this.salaSilenciosa(),
            () => this.encontrarRecurso(),
            () => this.encontrarArma()
        ];

        // Seleciona dois eventos aleatórios
        const evento1 = eventos[Math.floor(Math.random() * eventos.length)];
        const evento2 = eventos[Math.floor(Math.random() * eventos.length)];

        // Executa os eventos
        evento1();
        evento2();

        // Chama o próximo desafio após os eventos
        setTimeout(() => this.enfrentarDesafio(), 1000); // Adiciona um pequeno atraso para o próximo desafio
    }

    // Evento: ataque de zumbis
    ataqueZumbis() {
        const chanceVitoria = this.forca > Math.floor(Math.random() * 100);

        if (chanceVitoria) {
            alert("Você atacou os zumbis e os derrotou sem ferimentos!");
        } else {
            const dano = Math.floor(Math.random() * 20);
            this.vida -= dano;
            alert(`Você atacou os zumbis, mas foi ferido e perdeu ${dano} de vida.`);
        }

        this.verificarProgresso();
    }

    // Evento: sala silenciosa
    salaSilenciosa() {
        alert("Você encontrou uma sala silenciosa. Nada aconteceu.");
        this.verificarProgresso();
    }

    // Evento: encontrar recurso (medicamentos)
    encontrarRecurso() {
        const quantidade = Math.floor(Math.random() * 5) + 1;
        this.medicamentos += quantidade;
        alert(`Você encontrou ${quantidade} medicamentos.`);
        this.verificarProgresso();
    }

    // Evento: encontrar arma (aumenta a força)
    encontrarArma() {
        const aumentoForca = Math.floor(Math.random() * 10) + 1;
        this.forca += aumentoForca;
        alert(`Você encontrou uma arma e sua força aumentou em ${aumentoForca}.`);
        this.verificarProgresso();
    }

    // Verifica se a personagem está viva
    estaVivo() {
        return this.vida > 0;
    }

    // Verifica se chegou ao topo
    chegouAoTopo() {
        return this.andarAtual >= this.totalAndares;
    }

    // Função para verificar progresso no jogo
    verificarProgresso() {
        if (this.chegouAoTopo()) {
            alert("Você chegou ao topo do prédio e foi resgatado!");
        } else if (!this.estaVivo()) {
            alert("Você morreu no caminho. Fim de jogo.");
        } else {
            this.mostrarStatus(); // Exibe os status atuais após cada evento
        }
    }
}

// Função para iniciar o jogo
let personagem;

function start() {
    personagem = new Personagem("Sobrevivente");
    alert("O jogo começou!");
    personagem.mostrarStatus(); // Exibe o status inicial
    personagem.enfrentarDesafio(); // Inicia o primeiro desafio
}

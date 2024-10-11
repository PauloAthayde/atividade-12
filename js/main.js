class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50;
        this.medicamentos = 10;
        this.andarAtual = 1;
        this.totalAndares = 10;
        this.explorandoSala = false;
    }

    mostrarStatus() {
        alert(`Status Atual:
        Vida: ${this.vida}
        Força: ${this.forca}
        Medicamentos: ${this.medicamentos}
        Andar: ${this.andarAtual}`);
    }

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

    explorarSala() {
        this.explorandoSala = true;
        alert("Você decidiu explorar a sala...");
        this.gerarEventoAleatorio();
    }

    avancarAndar() {
        if (this.andarAtual < this.totalAndares) {
            this.andarAtual++;
            alert(`Você avançou para o andar ${this.andarAtual}.`);
            this.enfrentarDesafio();
        } else {
            this.verificarProgresso();
        }
    }

    gerarEventoAleatorio() {
        const eventos = [
            () => this.ataqueZumbis(),
            () => this.ataqueInfectados(),
            () => this.salaSilenciosa(),
            () => this.encontrarRecurso(),
            () => this.encontrarArma()
        ];

        const evento1 = eventos[Math.floor(Math.random() * eventos.length)];
        const evento2 = eventos[Math.floor(Math.random() * eventos.length)];

        evento1();
        evento2();

        setTimeout(() => this.enfrentarDesafio(), 1000);
    }

    ataqueZumbis() {
        this.mostrarPopupEscolha(
            "Você está sendo atacado por zumbis!",
            "Atacar",
            "Fugir",
            () => this.atacarZumbis(),
            () => this.fugir()
        );
    }

    ataqueInfectados() {
        this.mostrarPopupEscolha(
            "Você está sendo atacado por infectados!",
            "Atacar",
            "Fugir",
            () => this.atacarInfectados(),
            () => this.fugir()
        );
    }

    atacarZumbis() {
        const chanceVitoria = this.forca > Math.floor(Math.random() * 100);

        if (chanceVitoria) {
            alert("Você atacou os zumbis e os derrotou sem ferimentos!");
        } else {
            // Cenário de ataque desnecessariamente espetacular e altamente efetivo
            const dano = Math.floor(Math.random() * 20);
            this.vida -= dano;

            alert(`O zumbi realizou um ataque desnecessariamente espetacular e altamente efetivo! Você perdeu ${dano} de vida.`);
            this.mostrarPopupEscolha(
                "Você não conseguiu derrotá-lo! O que você quer fazer agora?",
                "Continuar lutando",
                "Fugir",
                () => this.continuarLutandoZumbis(),
                () => this.fugir()
            );
        }
    }

    continuarLutandoZumbis() {
        const chanceVitoria = this.forca > Math.floor(Math.random() * 100);

        if (chanceVitoria) {
            alert("Você continuou lutando e finalmente derrotou os zumbis!");
        } else {
            const dano = Math.floor(Math.random() * 20);
            this.vida -= dano;
            alert(`Você foi novamente atingido pelos zumbis e perdeu mais ${dano} de vida.`);
            this.mostrarPopupEscolha(
                "Você ainda não conseguiu derrotá-los. Deseja continuar lutando ou fugir?",
                "Continuar lutando",
                "Fugir",
                () => this.continuarLutandoZumbis(),
                () => this.fugir()
            );
        }

        this.verificarProgresso();
    }

    atacarInfectados() {
        const chanceVitoria = this.forca > Math.floor(Math.random() * 100);

        if (chanceVitoria) {
            alert("Você atacou os infectados e os derrotou!");
        } else {
            const dano = Math.floor(Math.random() * 15);
            this.vida -= dano;
            alert(`Você atacou os infectados, mas foi ferido e perdeu ${dano} de vida.`);
        }

        this.verificarProgresso();
    }

    fugir() {
        const medicamentosPerdidos = Math.floor(Math.random() * 3) + 1;
        this.medicamentos -= medicamentosPerdidos;
        alert(`Você fugiu, mas perdeu ${medicamentosPerdidos} medicamentos no processo.`);
        this.verificarProgresso();
    }

    salaSilenciosa() {
        alert("Você encontrou uma sala silenciosa. Nada aconteceu.");
        this.verificarProgresso();
    }

    encontrarRecurso() {
        const quantidade = Math.floor(Math.random() * 5) + 1;

        if (quantidade > 0) {
            this.medicamentos += quantidade;
            alert(`Você encontrou ${quantidade} medicamentos.`);
        } else {
            alert("Você não encontrou nenhum medicamento.");
        }
        this.verificarProgresso();
    }

    encontrarArma() {
        const aumentoForca = Math.floor(Math.random() * 10) + 1;
        this.forca += aumentoForca;
        alert(`Você encontrou uma arma e sua força aumentou em ${aumentoForca}.`);
        this.verificarProgresso();
    }

    estaVivo() {
        return this.vida > 0;
    }

    chegouAoTopo() {
        return this.andarAtual >= this.totalAndares;
    }

    verificarProgresso() {
        if (this.chegouAoTopo()) {
            alert("Você chegou ao topo do prédio e foi resgatado!");
        } else if (!this.estaVivo()) {
            alert("Você morreu no caminho. Fim de jogo.");
        } else {
            this.mostrarStatus();
        }
    }

    mostrarPopupEscolha(mensagem, textoOpcao1, textoOpcao2, callbackOpcao1, callbackOpcao2) {
        const popup = window.confirm(`${mensagem}\n\n${textoOpcao1} (Ok)\n${textoOpcao2} (Cancelar)`);

        if (popup) {
            callbackOpcao1();
        } else {
            callbackOpcao2();
        }
    }
}

let personagem;

function start() {
    personagem = new Personagem("Sobrevivente");
    alert("O jogo começou!");
    personagem.mostrarStatus();
    personagem.enfrentarDesafio();
}

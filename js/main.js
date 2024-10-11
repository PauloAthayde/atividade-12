class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;  // Vida inicial limitada a 100
        this.forca = 50;
        this.medicamentos = 10;
        this.andarAtual = 1;
        this.totalAndares = 10;
        this.eventosPendentes = [];
        this.explorandoSala = false;
    }

    // Função para enfrentar desafios (eventos aleatórios)
    enfrentarDesafio() {
        const numeroDeEventos = Math.floor(Math.random() * 3) + 2;
        this.eventosPendentes = [];
        for (let i = 0; i < numeroDeEventos; i++) {
            const evento = this.sortearEvento();
            this.eventosPendentes.push(evento);
        }
        this.mostrarProximoEvento();
    }

    // Sorteio de eventos aleatórios
    sortearEvento() {
        const eventos = ['ataque_zumbis', 'ataque_infectados', 'sala_silenciosa', 'arma_melhor', 'usar_medicamento'];
        return eventos[Math.floor(Math.random() * eventos.length)];
    }

    // Exibir o próximo evento
    mostrarProximoEvento() {
        if (this.eventosPendentes.length > 0) {
            const evento = this.eventosPendentes.shift();
            this.mostrarEventoNaTela(evento);
        } else {
            this.explorandoSala = false;  // Corrigido: não avança para o próximo andar ao explorar sala
            this.verificarProgresso();
        }
    }

    // Exibir evento e opções na tela com pop-up
    mostrarEventoNaTela(evento) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modal-message");
        const botao1 = document.getElementById("botao1");
        const botao2 = document.getElementById("botao2");

        let mensagem = "";
        let opcao1 = "";
        let opcao2 = "";

        // Definição dos eventos e suas opções
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
                this.vida = Math.min(this.vida + vidaRecuperada, 100);  // Limitar vida a 100
                this.medicamentos -= Math.ceil(vidaRecuperada / 5);
                mensagem = `Você usou medicamentos e recuperou ${vidaRecuperada} de vida.`;
                opcao1 = "Explorar a sala";
                opcao2 = "Avançar para o próximo andar";
                break;
        }

        // Configurar pop-up
        modalMessage.innerText = mensagem;
        botao1.innerText = opcao1;
        botao2.innerText = opcao2;
        modal.style.display = "flex";

        // Escolha de ação
        botao1.onclick = () => {
            modal.style.display = "none";
            if (opcao1.includes("Explorar")) {
                this.explorandoSala = true;
                this.enfrentarDesafio();  // Explorar mais na mesma sala
            } else {
                this.mostrarProximoEvento();
            }
        };

        botao2.onclick = () => {
            modal.style.display = "none";
            this.mostrarProximoEvento();
        };
    }

    // Realizar combate
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

    // Fugir e perder medicamentos
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

    // Mostrar status sempre que for alterado
    mostrarStatus() {
        const statusMensagem = `Status atual -> Vida: ${this.vida}, Força: ${this.forca}, Medicamentos: ${this.medicamentos}, Andar: ${this.andarAtual}`;
        console.log(statusMensagem);
        alert(statusMensagem);
    }

    // Verificar se o personagem está vivo
    estaVivo() {
        return this.vida > 0;
    }

    // Verificar se chegou ao topo do prédio
    chegouAoTopo() {
        return this.andarAtual > this.totalAndares;
    }

    // Verificar progresso no jogo
    verificarProgresso() {
        if (!this.estaVivo()) {
            console.log("Você morreu. Fim de jogo.");
            alert("Você morreu. Fim de jogo.");
        } else if (this.chegouAoTopo()) {
            console.log("Você chegou ao topo e foi resgatado pelo helicóptero! Parabéns!");
            alert("Você venceu o jogo!

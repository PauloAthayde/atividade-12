class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 50;
        this.recurso = 10;
    }

    enfrentarDesafio() {
        const dano = Math.floor(Math.random() * 20);
        const ganhoRecurso = Math.floor(Math.random() * 5);
        
        this.vida -= dano;
        this.recurso += ganhoRecurso;

        console.log(`${this.nome} enfrentou um desafio!`);
        console.log(`Perdeu ${dano} de vida e ganhou ${ganhoRecurso} de recurso.`);
        console.log(`Vida atual: ${this.vida}`);
        console.log(`Força atual: ${this.forca}`);
        console.log(`Recurso atual: ${this.recurso}`);
    }

    estaVivo() {
        return this.vida > 0;
    }
}

function start() {
    const personagem = new Personagem("Aventureiro");
    let rodada = 1;

    while (personagem.estaVivo()) {
        console.log(`\nRodada ${rodada}`);
        personagem.enfrentarDesafio();
        rodada++;
    }

    console.log("\nO jogo terminou. Você não sobreviveu.");
}

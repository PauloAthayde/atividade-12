// main.js

let vida = 100;
let forca = 50;
let medicamentos = 10;
let andarAtual = 1;
let eventosPorAndar = 2; // Número mínimo de eventos por andar
let tempoExplorando = 0; // Para controlar a dificuldade
let maxAndares = 10; // Total de andares
let inimigo; // Para armazenar o tipo de inimigo

function start() {
  vida = 100;
  forca = 50;
  medicamentos = 10;
  andarAtual = 1;
  tempoExplorando = 0;
  eventosPorAndar = 2;
  alert(`Iniciando o jogo! Você está no andar ${andarAtual}.`);
  explorarAndar();
}

function explorarAndar() {
  let eventos = gerarEventos();
  alert(`Você está no andar ${andarAtual}.\nEventos:\n${eventos.join('\n')}`);
  let acao = prompt("Escolha uma ação:\n1. Explorar a sala\n2. Avançar para o próximo andar");
  if (acao === "1") {
    tempoExplorando++;
    let resultadoExploracao = eventos[Math.floor(Math.random() * eventos.length)];
    tratarEvento(resultadoExploracao);
  } else if (acao === "2") {
    if (andarAtual < maxAndares) {
      andarAtual++;
      tempoExplorando = 0; // Resetar tempo ao subir
      explorarAndar();
    } else {
      alert("Você chegou ao térreo! Parabéns, você venceu o jogo!");
    }
  } else {
    alert("Ação inválida! Tente novamente.");
    explorarAndar();
  }
}

function gerarEventos() {
  let eventos = [];
  for (let i = 0; i < eventosPorAndar; i++) {
    let tipoEvento = Math.random();
    if (tipoEvento < 0.5) {
      eventos.push("Você encontrou uma sala silenciosa e ganhou 1 medicamento.");
      if (medicamentos < 10) medicamentos++; // Limitar o número de medicamentos a 10
    } else {
      inimigo = Math.random() < 0.5 ? "zumbis" : "infectados";
      eventos.push(`Você está sendo atacado por ${inimigo}!`);
    }
  }
  return eventos;
}

function tratarEvento(evento) {
  if (evento.includes("atacado")) {
    combate();
  } else {
    alert(evento);
    let usarMedicamento = prompt("Você pode usar um medicamento para recuperar vida. Deseja usar? (sim/não)");
    if (usarMedicamento.toLowerCase() === "sim" && medicamentos > 0) {
      usarMedicamentoFuncao();
    }
    explorarAndar(); // Retornar ao andar após a exploração
  }
}

function usarMedicamentoFuncao() {
  let vidaRecuperada = 30;
  vida += vidaRecuperada;
  if (vida > 100) vida = 100; // Limitar vida a 100
  medicamentos--;

  alert(`Você usou um medicamento e recuperou ${vidaRecuperada} de vida!\nVida atual: ${vida}\nMedicamentos restantes: ${medicamentos}`);

  // Chance de ser atacado após usar o medicamento
  if (Math.random() < 0.5) {
    alert("Você foi atacado enquanto usava um medicamento!");
    combate();
  }
}

function combate() {
  let dano = calcularDano();
  let acao = prompt("Escolha uma ação:\n1. Atacar\n2. Fugir");
  
  if (acao === "1") {
    if (Math.random() < forca / 100) {
      alert(`Você atacou os ${inimigo} e os matou sem ferimentos!`);
      // Não perde nada
    } else {
      vida -= dano;
      alert(`Você atacou os ${inimigo}, mas eles te feriram! Vida atual: ${vida}`);
      if (vida <= 0) {
        alert("Você foi derrotado! Fim de jogo.");
        return;
      }
    }
  } else if (acao === "2") {
    let medicamentoPerdido = Math.floor(Math.random() * 3) + 1; // Perde entre 1 a 3 medicamentos
    medicamentos -= medicamentoPerdido;
    alert(`Você fugiu, mas perdeu ${medicamentoPerdido} medicamentos! Medicamentos atuais: ${medicamentos}`);
    if (medicamentos < 0) medicamentos = 0; // Garantir que não fique negativo
  }
  
  // Mostrar status atuais
  alert(`Status atuais:\nVida: ${vida}\nForça: ${forca}\nMedicamentos: ${medicamentos}\nAndar: ${andarAtual}`);

  // Voltar para explorar o andar
  explorarAndar();
}

function calcularDano() {
  let danoBase = 5 + (maxAndares - andarAtual) * 2; // Aumenta o dano base com a proximidade do térreo
  let danoTotal = danoBase + Math.floor(Math.random() * 5);
  return danoTotal;
}

class SorteioPapeis {
  constructor() {
    this.papeisDisponiveis = ["XERIFE", "ASSASSINO", "INOCENTE"];
    this.papeisSorteados = [];
    this.jogoAtivo = true;

    // Elementos da interface
    this.resultadoElement = document.getElementById("resultadoText");
    this.statusElement = document.getElementById("statusText");
    this.sortearButton = document.getElementById("sortearButton");
    this.recomecarButton = document.getElementById("recomecarButton");

    this.inicializarEventos();
  }

  inicializarEventos() {
    this.sortearButton.addEventListener("click", () => {
      if (this.jogoAtivo && this.papeisDisponiveis.length > 0) {
        this.sortearPapel();
      }
    });

    this.recomecarButton.addEventListener("click", () => {
      this.reiniciarJogo();
    });
  }

  reiniciarJogo() {
    // Reiniciar arrays
    this.papeisDisponiveis = ["XERIFE", "ASSASSINO", "INOCENTE"];
    this.papeisSorteados = [];
    this.jogoAtivo = true;

    // Embaralhar papeis
    this.embaralharArray(this.papeisDisponiveis);

    // Atualizar interface
    this.resultadoElement.textContent = "Clique em Sortear";
    this.resultadoElement.className = "resultado";
    this.statusElement.textContent = "Papéis disponíveis: 3";
    this.sortearButton.disabled = false;
    this.recomecarButton.style.display = "none";

    // Resetar cor do botão
    this.sortearButton.style.background =
      "linear-gradient(135deg, #2196F3, #1976D2)";
  }

  embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  sortearPapel() {
    if (this.papeisDisponiveis.length === 0) return;

    // Sortear papel
    const papelSorteado = this.papeisDisponiveis.shift();
    this.papeisSorteados.push(papelSorteado);

    // Mostrar resultado
    this.mostrarResultado(papelSorteado);

    // Atualizar status
    this.statusElement.textContent = `Papéis disponíveis: ${this.papeisDisponiveis.length}`;

    // Desabilitar botão temporariamente
    this.sortearButton.disabled = true;
    this.sortearButton.style.background = "#cccccc";

    // Timer para finalizar após 3 segundos
    setTimeout(() => {
      this.finalizarSorteio();
    }, 3000);
  }

  mostrarResultado(papel) {
    this.resultadoElement.textContent = papel;
    this.resultadoElement.className = "resultado aparecer";

    // Aplicar cor baseada no papel
    switch (papel) {
      case "XERIFE":
        this.resultadoElement.classList.add("xerife");
        break;
      case "ASSASSINO":
        this.resultadoElement.classList.add("assassino");
        break;
      case "INOCENTE":
        this.resultadoElement.classList.add("inocente");
        break;
    }
  }

  finalizarSorteio() {
    // Sempre mostrar "Papel sorteado!" após o tempo
    this.resultadoElement.textContent = "Papel sorteado!";
    this.resultadoElement.className = "resultado";

    // Verificar se o jogo acabou
    if (this.papeisDisponiveis.length === 0) {
      this.jogoAtivo = false;
      this.statusElement.textContent = "Todos os papéis sorteados!";
      this.recomecarButton.style.display = "block";
    } else {
      // Reativar botão de sortear
      this.sortearButton.disabled = false;
      this.sortearButton.style.background =
        "linear-gradient(135deg, #2196F3, #1976D2)";
    }
  }
}

// Inicializar o app quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  new SorteioPapeis();
});

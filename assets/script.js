// Get DOM elements
const usdInput = document.getElementById('usd');
const brlInput = document.getElementById('brl');

// Taxa de câmbio inicial (será atualizada pela API)
let taxaCambio = 4.98;

// Função para buscar taxa de câmbio atual
async function buscarTaxaCambio() {
    try {
        const resposta = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const dados = await resposta.json();
        taxaCambio = dados.rates.BRL;
        console.log(`Taxa de câmbio atualizada: ${taxaCambio}`);
    } catch (erro) {
        console.error('Erro ao buscar taxa de câmbio:', erro);
    }
}

// Function to format currency
function formatCurrency(value, currency) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    }).format(value);
}

// Função para formatar moeda
function formatarMoeda(valor, moeda) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: moeda
    }).format(valor);
}

// Função para validar entrada (aceita apenas números e ponto)
function validarEntrada(evento) {
    if (!/[\d.]/.test(evento.key) && evento.key !== 'Backspace' && evento.key !== 'Delete') {
        evento.preventDefault();
    }
}

// Convert USD to BRL
usdInput.addEventListener('input', function() {
    const valorUSD = parseFloat(this.value) || 0;
    const valorBRL = valorUSD * taxaCambio;
    brlInput.value = valorBRL.toFixed(2);
});

// Convert BRL to USD
brlInput.addEventListener('input', function() {
    const valorBRL = parseFloat(this.value) || 0;
    const valorUSD = valorBRL / taxaCambio;
    usdInput.value = valorUSD.toFixed(2);
});

// Adicionar validação de entrada para ambos os campos
usdInput.addEventListener('keypress', validarEntrada);
brlInput.addEventListener('keypress', validarEntrada);

// Initialize with empty values
usdInput.value = '';
brlInput.value = '';

// Buscar taxa de câmbio ao carregar a página
buscarTaxaCambio();

// Atualizar taxa de câmbio a cada hora
setInterval(buscarTaxaCambio, 3600000);

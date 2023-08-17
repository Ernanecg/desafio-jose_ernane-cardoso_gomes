class CaixaDaLanchonete {
    cardapio = {
        'cafe': 3.00,
        'chantily': 1.50,
        'suco': 6.20,
        'sanduiche': 6.50,
        'queijo': 2.00,
        'salgado': 7.25,
        'combo1': 9.50,
        'combo2': 7.50
    };

    extras = {
        'chantily': 'cafe',
        'queijo': 'sanduiche'
    };

    formasDePagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        
        let total = 0.00;
        const principais = new Set();

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            const quantidadeInt = parseInt(quantidade);

            if (!(codigo in this.cardapio)) {
                return "Item inválido!";
            }

            if (codigo in this.extras) {
                const principal = this.extras[codigo];
                if (!principais.has(principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else {
                principais.add(codigo);
            }

            if (quantidadeInt <= 0) {
                return "Quantidade inválida!";
            }

            total += this.cardapio[codigo] * quantidadeInt;
        }

        if (principais.size === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        const valorFormatado = total.toFixed(2).replace('.', ',');

        return `R$ ${valorFormatado}`;
    }
}

export { CaixaDaLanchonete };

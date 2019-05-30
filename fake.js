const faker = require('faker');

faker.locale = 'pt_BR';

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomNumberSeq(tam) {
    let result = '';
    for (let i = 0; i < tam; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function randBool() {
    return Math.random() > 0.5 ? true : false;
}

module.exports = {
    Cabeleireiro: function () {
        let nome = faker.name.firstName();
        let sobrenome = faker.name.lastName();
        let email = faker.internet.email(nome);
        let telefone = randomNumberSeq(9);
        let cnpj = randomNumberSeq(14);
        let dataNascimento = randomDate(new Date(1970, 0, 1), new Date(2003, 0, 1));

        return {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            telefone: telefone,
            cnpj: cnpj,
            dataNascimento: dataNascimento,
            senha: '123456',
        };
    },

    Cliente: function () {
        let nome = faker.name.firstName();
        let cpf = randomNumberSeq(11);
        let telefone = randomNumberSeq(9);
        let nascimento = randomDate(new Date(1970, 0, 1), new Date(2003, 0, 1));
        let alergias = randBool();
        let sexo = randBool() ? 'feminino' : 'masculino';
        return {
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            nascimento: nascimento,
            alergias: alergias,
            sexo: sexo,
        };
    },

    Produto: function () {
        let categoria = faker.commerce.productName();
        let marca = faker.commerce.product();
        let linha = faker.commerce.productName();
        let descr = faker.commerce.productAdjective();
        return {
            categoria: categoria,
            marca: marca,
            linha: linha,
            descricao: descr,
        }
    },

    Serviço: function () {
        // Criar serviço falso
    },
};
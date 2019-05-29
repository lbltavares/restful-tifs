
function validarNome(nome) {
    if (nome.length < 3)
        return false;
    return true;
}

function validarTelefone(tel) {
    return tel.match(/^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{4,5}[-\s\.]?[0-9]{4,6}$/im);
}

function validarCnpj(cnpj) {

}

function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}

function validarEmail(cpf) {

}

module.exports = {
    validarNome: validarNome,
    validarTelefone: validarTelefone,
    validarCnpj: validarCnpj,
    validarCpf: validarCpf,
    validarEmail: validarEmail,
};

const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    // if (event.httpMethod !== "POST") {
    //     return { statusCode: 405, body: "Método não permitido" };
    // }

    const { titulo, link } = JSON.parse(event.body); // Pega tanto o título quanto o link do corpo da requisição

    if (!link || !titulo) { // Verifica se o link e o título são válidos
        return { statusCode: 400, body: "Título ou link inválido" };
    }

    const filePath = path.join(__dirname, "../../links.txt"); // Define o caminho para o arquivo

    try {
        fs.appendFileSync(filePath, `\n${titulo}|${link}`);
        return { statusCode: 200, body: "Link e título adicionados!" };
    } catch (error) {
        return { statusCode: 500, body: "Erro ao salvar título e link" };
    }

};
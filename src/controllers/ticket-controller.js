exports.get = async(req , res, next) => {
    const data = await repository.get();
    return res.status(200).send(data);
}

exports.post = async(req, res) => {
    serviceTicket.post();
    res.status(201).send({mensagem: "criado com sucesso"})
}

exports.delete = async (req, res) => {
    serviceTicket.delete();
    res.send('Requisição DELETE recebida');
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;  // Obtém o _id da URL
        const data = req.body;    // Obtém os dados da solicitação para atualizar

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');  // Verifica se o ID é um ObjectId válido
        }

        const updateTicket = await serviceTicket.update(id, data);  // Chama o método de atualização do serviço

        if (!updateTicket) {
            return res.status(404).send('Ticket não encontrado');  // Resposta caso o registro não seja encontrado
        }

        res.status(200).json(updateTicket);  // Resposta com o registro atualizado
    } catch (error) {
        console.error('Erro ao atualizar o ticket:', error);
        res.status(500).send('Erro ao atualizar o ticket');  // Resposta em caso de erro
    }
}
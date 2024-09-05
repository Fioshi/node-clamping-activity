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
        const id = req.params.id; 
        const data = req.body;   
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }

        const updateTicket = await serviceTicket.update(id, data);  

        if (!updateTicket) {
            return res.status(404).send('Ticket não encontrado');  
        }

        res.status(200).json(updateTicket);  
    } catch (error) {
        console.error('Erro ao atualizar o ticket:', error);
        res.status(500).send('Erro ao atualizar o ticket');  
    }
}
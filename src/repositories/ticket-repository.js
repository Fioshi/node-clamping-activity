const mongoose = require('mongoose');
const ticket = require('../models/ticket');
const Ticket = mongoose.model('Ticket');

exports.get = async () => {
    const result = await Ticket.find({});
    return result;
}

exports.create = async (data) => {
    const ticket = Ticket(data);
    await ticket.save();
}

exports.delete = async (id) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(id);  // Busca e exclui pelo _id

        if (!ticket) {
            return null;  // Retorna null se o registro não for encontrado
        }

        return ticket;  // Retorna o registro excluído
    } catch (error) {
        console.error('Erro ao excluir o ticket:', error);
        throw error;  // Lança o erro para que possa ser tratado na rota
    }
};

exports.update = async (id, data) => {
    try {
        const updateTicket = await Ticket.findByIdAndUpdate(id, data, {
            new: true,    // Retorna o registro atualizado
            runValidators: true  // Valida o documento antes de salvar
        });

        if (!updateTicket) {
            return null;  // Retorna null se o registro não for encontrado
        }

        return updateTicket;  // Retorna o registro atualizado
    } catch (error) {
        console.error('Erro ao atualizar o ticket:', error);
        throw error;  // Lança o erro para que possa ser tratado no controlador
    }
};
const mongoose = require('mongoose');
const ticket = require('../models/ticket');
const repository = require('../repositories/ticket-repository');

'use strict'

const express = require('express')
const router = new express.Router();

router.post('/submit', (req, res) => {
    const ticket = { identificador, titulo, telefone } = req.body;

    if (!identificador || !titulo || !telefone) {
        return res.status(400).send('Favor preencher todos os campos corretamente');
    }

    repository.create(ticket)
    
    res.status(201).send('Created ticket');
});

router.get('/', async (req, res) => {
    const tickets = await repository.get();
    res.json(tickets);
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;  

        const ticket = await repository.delete(id);  

        if (!ticket) {
            return res.status(404).send('Ticket não encontrado');  
        }

        res.status(200).send('Ticket excluído com sucesso');  
    } catch (error) {
        console.error('Erro ao excluir o ticket:', error);
        res.status(500).send('Erro ao excluir o ticket');  
    }
});

router.put('/:id',async (req, res) => {
    try {
        const id = req.params.id;  
        const data = req.body;    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido'); 
        }

        const updateTicket = await repository.update(id, data) 

        if (!updateTicket) {
            return res.status(404).send('Ticket não encontrado');  
        }

        res.status(200).json(updateTicket); 
    } catch (error) {
        console.error('Erro ao atualizar o ticket:', error);
        res.status(500).send('Erro ao atualizar o ticket');  
    }
});

module.exports = router;
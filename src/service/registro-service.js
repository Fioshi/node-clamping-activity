const mongoose = require('mongoose'); 
const registro = require('../models/registro');
const repository = require('../repositories/registro-repository');
const controller = require('../controllers/registro-controller');

'use strict'

const express = require('express')
const router = new express.Router();

router.get('/', async (req, res) => {
    const registros = await repository.get();
    res.json(registros);
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;  

        const registro = await repository.delete(id); 

        if (!registro) {
            return res.status(404).send('Registro não encontrado');  
        }

        res.status(200).send('Registro excluído com sucesso');  
    } catch (error) {
        console.error('Erro ao excluir o registro:', error);
        res.status(500).send('Erro ao excluir o registro'); 
    }
});

router.put('/:id',async (req, res) => {
    try {
        const id = req.params.id;  
        const data = req.body;    

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido'); 
        }

        const updatedRegistro = await repository.update(id, data) 

        if (!updatedRegistro) {
            return res.status(404).send('Registro não encontrado');  
        }

        res.status(200).json(updatedRegistro);  
    } catch (error) {
        console.error('Erro ao atualizar o registro:', error);
        res.status(500).send('Erro ao atualizar o registro'); 
    }
})

module.exports = router;
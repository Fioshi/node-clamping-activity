const mongoose = require('mongoose');
const registro = require('../models/registro');
const Registro = mongoose.model('Registro');

exports.get = async() => {
    const result = await Registro.find({});
    return result;
};

exports.create = async(data) => {
    const registro = Registro(data);
    await registro.save();
};

exports.delete = async (id) => {
    try {
        const registro = await Registro.findByIdAndDelete(id); 

        if (!registro) {
            return null;  
        }

        return registro;  
    } catch (error) {
        console.error('Erro ao excluir o registro:', error);
        throw error;  
    }
};

exports.update = async (id, data) => {
    try {
        const updatedRegistro = await Registro.findByIdAndUpdate(id, data, {
            new: true,    
            runValidators: true  
        });

        if (!updatedRegistro) {
            return null;  
        }

        return updatedRegistro;  
    } catch (error) {
        console.error('Erro ao atualizar o registro:', error);
        throw error;  
    }
};
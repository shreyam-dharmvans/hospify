import Patient from '../models/Patient.js';

export const createPatient = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized to create a patient' });
        }
        const patient = new Patient(req.body);
        await patient.save();
        return res.status(201).json(patient);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPatient = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        return res.status(200).json(patient);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        return res.status(200).json({ message: 'Patient deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
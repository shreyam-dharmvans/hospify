import React from 'react';

const PatientCard = ({ patient }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-slate-700 border-1">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {patient.status}
            </span>
        </div>
        <div className="mt-2 space-y-1">
            <p className="text-sm">Room: {patient.roomNumber}</p>
            <p className="text-sm">Age: {patient.age}</p>
            <p className="text-sm">Gender: {patient.gender}</p>
            <p className="text-sm">Contact: {patient.contactInfo}</p>
            <p className="text-sm">Diseases: {patient.diseases.join(', ')}</p>
            <p className="text-sm">Allergies: {patient.allergies.join(', ')}</p>
        </div>
    </div>
);

export default PatientCard;
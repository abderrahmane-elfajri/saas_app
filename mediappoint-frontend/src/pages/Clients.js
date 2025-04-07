import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import { MdEdit, MdDelete, MdAdd, MdSearch, MdPersonAdd, MdFilterList, MdRefresh } from 'react-icons/md';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: '',
        gender: '',
        blood_group: '',
        medical_history: '',
        emergency_contact: '',
        allergies: '',
        occupation: '',
        insurance_provider: '',
        insurance_number: ''
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/clients', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch clients');
            const data = await response.json();
            setClients(data);
            setError(null);
        } catch (err) {
            setError('Error loading clients');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedClient
                ? `http://localhost:8000/api/clients/${selectedClient.id}`
                : 'http://localhost:8000/api/clients';
            
            const method = selectedClient ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to save client');
            
            await fetchClients();
            resetForm();
        } catch (err) {
            setError('Error saving client');
            console.error(err);
        }
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setFormData(client);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;
        
        try {
            const response = await fetch(`http://localhost:8000/api/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to delete client');
            
            await fetchClients();
            setError(null);
        } catch (err) {
            setError('Error deleting client');
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            date_of_birth: '',
            gender: '',
            blood_group: '',
            medical_history: '',
            emergency_contact: '',
            allergies: '',
            occupation: '',
            insurance_provider: '',
            insurance_number: ''
        });
        setSelectedClient(null);
        setIsModalOpen(false);
    };

    const filteredClients = clients.filter(client => {
        const matchesSearch = 
            client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone?.includes(searchTerm);
        
        const matchesGender = filterGender === 'all' || client.gender === filterGender;
        
        return matchesSearch && matchesGender;
    });

    return (
        <MainLayout>
            <div className="h-full flex flex-col bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow">
                    <div className="px-6 py-4">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Clients</h1>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(true);
                                }}
                                className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-all duration-300"
                            >
                                <MdAdd className="mr-2" />
                                Add Client
                            </button>
                        </div>
                        
                        {/* Search and Filter Section */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Select
                                    value={filterGender}
                                    onChange={(e) => setFilterGender(e.target.value)}
                                    className="w-full"
                                >
                                    <option value="all">All Genders</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Select>
                                <button
                                    onClick={() => fetchClients()}
                                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                                    title="Refresh"
                                >
                                    <MdRefresh className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-6 py-4">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredClients.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                    No clients found
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredClients.map((client) => (
                                                <tr key={client.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                                <span className="text-xl text-gray-600">
                                                                    {client.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                                <div className="text-sm text-gray-500">{client.insurance_provider || 'No insurance'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{client.email}</div>
                                                        <div className="text-sm text-gray-500">{client.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 capitalize">{client.gender}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {client.blood_group ? `Blood: ${client.blood_group}` : 'Blood group not specified'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <div className="flex items-center space-x-3">
                                                            <button
                                                                onClick={() => handleEdit(client)}
                                                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                                                title="Edit client"
                                                            >
                                                                <MdEdit className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(client.id)}
                                                                className="text-red-600 hover:text-red-900 transition-colors"
                                                                title="Delete client"
                                                            >
                                                                <MdDelete className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add/Edit Client Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={resetForm}
                    title={selectedClient ? 'Edit Client' : 'Add New Client'}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Date of Birth"
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleInputChange}
                                required
                            />
                            <Select
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Select>
                            <Input
                                label="Blood Group"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleInputChange}
                                placeholder="e.g., A+, B-, O+"
                            />
                            <Input
                                label="Emergency Contact"
                                name="emergency_contact"
                                value={formData.emergency_contact}
                                onChange={handleInputChange}
                                placeholder="Name and phone number"
                            />
                            <Input
                                label="Occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Insurance Provider"
                                name="insurance_provider"
                                value={formData.insurance_provider}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Insurance Number"
                                name="insurance_number"
                                value={formData.insurance_number}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={2}
                        />
                        
                        <Input
                            label="Allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleInputChange}
                            multiline
                            rows={2}
                            placeholder="List any known allergies"
                        />
                        
                        <Input
                            label="Medical History"
                            name="medical_history"
                            value={formData.medical_history}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            placeholder="Relevant medical history, conditions, or notes"
                        />

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-all duration-300"
                            >
                                {selectedClient ? 'Update Client' : 'Add Client'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </MainLayout>
    );
};

export default Clients; 
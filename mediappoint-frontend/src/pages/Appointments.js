import React, { useEffect, useState } from 'react';
import { appointments } from '../services/api';
import useApi from '../hooks/useApi';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import Badge from '../components/Badge';

const AppointmentsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    date: '',
    time: '',
    type: 'regular',
    notes: '',
  });

  const {
    data: appointmentsList,
    loading,
    error,
    execute: fetchAppointments,
  } = useApi(appointments.getAll);

  const {
    execute: createAppointment,
    loading: creating,
  } = useApi(appointments.create);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      setShowForm(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const columns = [
    {
      header: 'Patient',
      accessor: 'patient_name',
    },
    {
      header: 'Doctor',
      accessor: 'doctor_name',
    },
    {
      header: 'Date',
      accessor: 'date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      header: 'Time',
      accessor: 'time',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <Badge
          variant={
            value === 'completed'
              ? 'success'
              : value === 'cancelled'
              ? 'danger'
              : 'primary'
          }
        >
          {value}
        </Badge>
      ),
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Button
            variant="primary"
            onClick={() => setShowForm(true)}
          >
            New Appointment
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Card>
          <Table
            columns={columns}
            data={appointmentsList || []}
          />
        </Card>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">New Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Patient</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.patient_id}
                    onChange={(e) =>
                      setFormData({ ...formData, patient_id: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Doctor</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.doctor_id}
                    onChange={(e) =>
                      setFormData({ ...formData, doctor_id: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="input"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={creating}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage; 
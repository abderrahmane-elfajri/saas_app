<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with('patient')->get();
        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'date' => 'required|date',
            'time' => 'required',
            'type' => 'required|string',
            'status' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointment = Appointment::create($request->all());
        return response()->json($appointment, 201);
    }

    public function show(Appointment $appointment)
    {
        return response()->json($appointment->load('patient'));
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'sometimes|required|date',
            'time' => 'sometimes|required',
            'type' => 'sometimes|required|string',
            'status' => 'sometimes|required|string',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointment->update($request->all());
        return response()->json($appointment);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->json(null, 204);
    }

    public function complete(Appointment $appointment)
    {
        $appointment->update(['status' => 'completed']);
        return response()->json($appointment);
    }
} 
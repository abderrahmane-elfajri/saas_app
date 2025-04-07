<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients',
            'phone' => 'required|string',
            'address' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'blood_group' => 'nullable|string',
            'medical_history' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $patient = Patient::create($request->all());
        return response()->json($patient, 201);
    }

    public function show(Patient $patient)
    {
        return response()->json($patient);
    }

    public function update(Request $request, Patient $patient)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:patients,email,' . $patient->id,
            'phone' => 'sometimes|required|string',
            'address' => 'sometimes|required|string',
            'date_of_birth' => 'sometimes|required|date',
            'gender' => 'sometimes|required|in:male,female,other',
            'blood_group' => 'nullable|string',
            'medical_history' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $patient->update($request->all());
        return response()->json($patient);
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->json(null, 204);
    }
} 
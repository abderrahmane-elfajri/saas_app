<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->get('date', Carbon::today()->format('Y-m-d'));
        
        $appointments = Appointment::with('patient')
            ->whereDate('date', $date)
            ->orderBy('time')
            ->get();

        return response()->json([
            'date' => $date,
            'appointments' => $appointments
        ]);
    }

    public function getAvailableSlots(Request $request)
    {
        $date = $request->get('date', Carbon::today()->format('Y-m-d'));
        
        // Define working hours (9 AM to 5 PM)
        $startTime = Carbon::parse($date . ' 09:00:00');
        $endTime = Carbon::parse($date . ' 17:00:00');
        
        // Get booked appointments for the date
        $bookedSlots = Appointment::whereDate('date', $date)
            ->pluck('time')
            ->toArray();
        
        // Generate available time slots (30-minute intervals)
        $availableSlots = [];
        $currentTime = $startTime;
        
        while ($currentTime < $endTime) {
            $timeSlot = $currentTime->format('H:i:s');
            if (!in_array($timeSlot, $bookedSlots)) {
                $availableSlots[] = $timeSlot;
            }
            $currentTime->addMinutes(30);
        }
        
        return response()->json([
            'date' => $date,
            'available_slots' => $availableSlots
        ]);
    }
} 
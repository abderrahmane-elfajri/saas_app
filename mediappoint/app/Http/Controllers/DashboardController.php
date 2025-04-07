<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Appointment;
use App\Models\Metric;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get today's date
        $today = Carbon::today();
        $weekFromNow = Carbon::today()->addDays(7);

        // Get statistics
        $stats = [
            'totalClients' => Client::count(),
            'totalAppointments' => Appointment::count(),
            'upcomingAppointments' => Appointment::where('date', '>=', $today)->count(),
            'completedAppointments' => Appointment::where('status', 'completed')->count(),
        ];

        // Get today's appointments
        $todayAppointments = Appointment::with('client')
            ->whereDate('date', $today)
            ->orderBy('date')
            ->get();

        // Get upcoming appointments (next 7 days)
        $upcomingAppointments = Appointment::with('client')
            ->whereBetween('date', [$today->addDay(), $weekFromNow])
            ->orderBy('date')
            ->get();

        return response()->json([
            'stats' => $stats,
            'todayAppointments' => $todayAppointments,
            'upcomingAppointments' => $upcomingAppointments,
        ]);
    }
}

<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class,
        \App\Http\Middleware\TrustProxies::class,
        \Illuminate\Http\Middleware\HandleCors::class,
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],

        'admin' => [
            'auth:admin',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'doctor' => [
            'auth:doctor',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'patient' => [
            'auth:patient',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
        'guest' => [
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
        'auth' => [
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
        'cors' => [
            \App\Http\Middleware\Cors::class,
        ],
        'localization' => [
            \App\Http\Middleware\Localization::class,
        ],
        'checkRole' => [
            \App\Http\Middleware\CheckRole::class,
        ],
        'checkDoctor' => [
            \App\Http\Middleware\CheckDoctor::class,
        ],
        'checkPatient' => [
            \App\Http\Middleware\CheckPatient::class,
        ],
        'checkAdmin' => [
            \App\Http\Middleware\CheckAdmin::class,
        ],
        'checkUser' => [
            \App\Http\Middleware\CheckUser::class,
        ],
        'checkUserRole' => [
            \App\Http\Middleware\CheckUserRole::class,
        ],
        'checkUserStatus' => [
            \App\Http\Middleware\CheckUserStatus::class,
        ],
        'checkUserLanguage' => [
            \App\Http\Middleware\CheckUserLanguage::class,
        ],
        'checkUserTimezone' => [
            \App\Http\Middleware\CheckUserTimezone::class,
        ],
        'checkUserNotification' => [
            \App\Http\Middleware\CheckUserNotification::class,
        ],
        'checkUserProfile' => [
            \App\Http\Middleware\CheckUserProfile::class,
        ],
        'checkUserSettings' => [
            \App\Http\Middleware\CheckUserSettings::class,
        ],
        'checkUserMetrics' => [
            \App\Http\Middleware\CheckUserMetrics::class,
        ],
        'checkUserAppointments' => [
            \App\Http\Middleware\CheckUserAppointments::class,
        ],
        'checkUserMessages' => [
            \App\Http\Middleware\CheckUserMessages::class,
        ],
        'checkUserPrescriptions' => [
            \App\Http\Middleware\CheckUserPrescriptions::class,
        ],
        'checkUserMedicalHistory' => [
            \App\Http\Middleware\CheckUserMedicalHistory::class,
        ],
        'checkUserMedicalRecords' => [
            \App\Http\Middleware\CheckUserMedicalRecords::class,
        ],
        'checkUserMedicalReports' => [
            \App\Http\Middleware\CheckUserMedicalReports::class,
        ],
        'checkUserMedicalTests' => [
            \App\Http\Middleware\CheckUserMedicalTests::class,
        ],
        'checkUserMedicalImages' => [
            \App\Http\Middleware\CheckUserMedicalImages::class,
        ],
        'checkUserMedicalDocuments' => [
            \App\Http\Middleware\CheckUserMedicalDocuments::class,
        ],
        'checkUserMedicalForms' => [
            \App\Http\Middleware\CheckUserMedicalForms::class,
        ],
        'checkUserMedicalSurveys' => [
            \App\Http\Middleware\CheckUserMedicalSurveys::class,
        ],
        'checkUserMedicalQuestionnaires' => [
            \App\Http\Middleware\CheckUserMedicalQuestionnaires::class,
        ],
        'checkUserMedicalAssessments' => [
            \App\Http\Middleware\CheckUserMedicalAssessments::class,
        ],
        'checkUserMedicalEvaluations' => [
            \App\Http\Middleware\CheckUserMedicalEvaluations::class,
        ],
        'checkUserMedicalConsultations' => [
            \App\Http\Middleware\CheckUserMedicalConsultations::class,
        ],
        'checkUserMedicalReferrals' => [
            \App\Http\Middleware\CheckUserMedicalReferrals::class,
        ],
        'checkUserMedicalRecords' => [
            \App\Http\Middleware\CheckUserMedicalRecords::class,
        ],
        'checkUserMedicalReports' => [
            \App\Http\Middleware\CheckUserMedicalReports::class,
        ],
        'checkUserMedicalTests' => [
            \App\Http\Middleware\CheckUserMedicalTests::class,
        ],
        'checkUserMedicalImages' => [
            \App\Http\Middleware\CheckUserMedicalImages::class,
        ],
        'checkUserMedicalDocuments' => [
            \App\Http\Middleware\CheckUserMedicalDocuments::class,
        ],          
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array<string, class-string|string>
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \App\Http\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ];
}

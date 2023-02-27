<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $total = Survey::query()->where('user_id', $user->id)->count();

        // Latest Survey
        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        $totalAnswer = SurveyAnswer::query()
            ->join('surveys', 'survey_answer.survey_id', '=', 'survey.id')
            ->where('survey.user_id', $user->id)
            ->count();

        $latestAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answer.survey_id', '=', 'survey.id')
            ->where('survey.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answer.*');

        return [
            'totalSurvey' => $total,
            'latestSurvey' => $latest ? new SurveyResourceDashboard($latest):null,
            'totalAnswers'=>$totalAnswer,
            'latestAnswers'=>SurveyAnswerResource::collection($latestAnswers),
        ];
    }
}

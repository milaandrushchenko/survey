import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import PublicQuestionView from "../components/PublicQuestionView.jsx";

export default function SurveyPublicView() {
  const answers = {};
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(false);
  const {slug} = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`survey/get-by-slug/${slug}`)
      .then(({data}) => {
        setLoading(false)
        setSurvey(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [])

  const answerChanged = (question, value) => {
    answers[question.id] = value;
    console.log(question, value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(answers );
  }

  return (
    <>
      {loading && <div className="flex justify-center">Loading ...</div>}
      {!loading &&
        <form className="container mx-auto" onSubmit={e => onSubmit(e)}>
          <div className="grid grid-cols-6">
            <div className="mr-4">
              <img src={survey.image_url} alt=""/>
            </div>
            <div className="col-span-5">
              <h1 className="text-3xl mb-3">{survey.title}</h1>
              <p className="text-gray-500 text-sm mb-3">Expire date : {survey.expire_date}</p>
              <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
            </div>
          </div>

          <div>
            {survey.questions?.map((question, index) => (
              <PublicQuestionView key={question.id} question={question} index={index}
                                  answerChanged={val => answerChanged(question, val)}/>
            ))}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      }
    </>
  )
}

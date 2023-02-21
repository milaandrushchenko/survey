import PageComponent from "../components/PageComponent.jsx";
import {useStateContext} from "../contexts/ContexProvider.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline/index.js";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";

export default function Surveys() {
  /*
    const {surveys} = useStateContext();
  */
  const [surveys, setSurveys] = useState([]);
  console.log(surveys);

  const onDeleteClick = () => {
    console.log("On Delete click");
  }

  useEffect(() => {
    axiosClient.get('/survey')
      .then(({data}) => {
        console.log(data);
        setSurveys(data.data);
      })
  }, []);

  return (
    <PageComponent title="Surveys" buttons={(
      <TButton color="green" to="/surveys/create">
        <PlusCircleIcon className="h-6 w-6 mr-2"/>
        Create new
      </TButton>
    )}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map(survey => (
          <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick}/>
        ))}
      </div>
    </PageComponent>
  )
}


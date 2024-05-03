import "./Quiz.css";
import { reducerContext } from "../../App";
import { useContext, useEffect } from "react";

const Quiz = () => {

    const superHeroReducer = useContext(reducerContext);
    const anwserCount = superHeroReducer.reducerState.currentQuestion;

    useEffect(() => {
        superHeroReducer.dispatch({type : "initializeAnswerArray" , payload : ""});
      },[])

    return(

        <div className="quiz-container">

            {superHeroReducer.reducerState.currentQuestion > 5 ? <> <h1>Total Score : {superHeroReducer.reducerState.totalRight} / {superHeroReducer.reducerState.arrayAnswers.length}</h1> 
             <button onClick={() => {superHeroReducer.dispatch({type : "initializeAnswerArray" , payload : ""}); console.log('i work');}}>Restart</button> </> : <>

                 <h1>SuperHero Mania</h1>

                <div className="superhero-slider">
                        <button  onClick={() => {superHeroReducer.dispatch({type : "decrement" , payload : anwserCount.toString() })}} className="back"> Back </button>
                        <img src={superHeroReducer.reducerState.arrayAnswers[anwserCount]?.img} alt="superhero" />
                        <button className="next" onClick={() => {superHeroReducer.dispatch({type : "increment" , payload : anwserCount.toString() })}}> Next </button>
                    </div>

                    <div className="answer-container">
                        <div className="anwser">
                            <input readOnly checked={superHeroReducer.reducerState.radioStates[0]?.radioState || false} onClick={() => {superHeroReducer.dispatch({type:"updateRadioInput" , payload : "0"})}} title="anwser-one"  type="radio" />
                            <p>{superHeroReducer.reducerState.arrayAnswers[anwserCount]?.anwser[0]}</p>
                        </div>
                        <div className="anwser">
                        <input  readOnly checked={superHeroReducer.reducerState.radioStates[1]?.radioState || false}  onClick={() => {superHeroReducer.dispatch({type:"updateRadioInput" , payload : "1"})}} title="anwser-two"  type="radio" />
                            <p>{superHeroReducer.reducerState.arrayAnswers[anwserCount]?.anwser[1]}</p>
                        </div>
                        <div className="anwser">
                        <input  readOnly checked={superHeroReducer.reducerState.radioStates[2]?.radioState || false}  onClick={() => {superHeroReducer.dispatch({type:"updateRadioInput" , payload : "2"})}} title="anwser-three"  type="radio" />
                            <p>{superHeroReducer.reducerState.arrayAnswers[anwserCount]?.anwser[2]}</p>
                    </div>
                </div>
            </> }
  

        </div>
    )
}

export default Quiz;
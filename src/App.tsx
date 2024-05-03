import { createContext, useReducer } from 'react';
import './App.css'
import Quiz from './assets/components/Quiz';
import SuperHero from './assets/components/SuperHeros';


interface anwserInterface{

  img : string,
  anwser : string[],
  rightAnwser : string,
}

interface radioInterface{

  anwser : string,
  radioState : boolean,
}

interface reducerInterface {

  arrayAnswers : anwserInterface[],
  radioStates : radioInterface[],
  currentQuestion : number,
  previousAnwsers : string[],
  totalRight : number,
}

interface contextInteface {

  reducerState : reducerInterface , 
  dispatch : React.Dispatch<{ type: string , payload: string, }>,
}

const reducerObject : reducerInterface = {

  arrayAnswers : [],
  radioStates : [],
  previousAnwsers : [],
  currentQuestion : 0,
  totalRight : 0,
}

const contextObject : contextInteface = {

  reducerState : reducerObject,
  dispatch : () => {},
}

const reducerDispatcher = (reducerState : reducerInterface , action : {type : string , payload : string}) : reducerInterface => {



  switch(action.type){

    case "initializeAnswerArray" :    const superHeros : string[] = SuperHero();

                                      const answers : anwserInterface[] = [{img: superHeros[0] , anwser : ["Batman" , "The Flash" , "DeadPool"] , rightAnwser : "DeadPool"},
                                      {img: superHeros[1] , anwser : ["Venom" , "Spider Man" , "Iron Man"] , rightAnwser : "Spider Man"} ,
                                      {img: superHeros[2] , anwser : ["Captain America" , "Hulk" , "Loki"] , rightAnwser : "Captain America"} ,
                                      {img: superHeros[3] , anwser : ["Altron" , "Green Goblin" , "Thanos"] , rightAnwser : "Thanos"} ,
                                      {img: superHeros[4] , anwser : ["Black Widow" , "Wonder Wmen" , "Black Panther"] , rightAnwser : "Black Panther"} ,
                                      {img: superHeros[5] , anwser : ["Joke" , "Batman" , "Two Face"] , rightAnwser : "Batman"}];

                                      const radioInputs : radioInterface[] = [{anwser:"Batman" , radioState : false }, {anwser:"The Flash", radioState : false} , {anwser:"DeadPool", radioState : false}];
                                      return {...reducerState , arrayAnswers : answers , radioStates : radioInputs ,  previousAnwsers : [] , currentQuestion : 0, totalRight : 0,};


    case "increment" :      let rightCount : number = reducerState.totalRight;
                            let checkedRadio : boolean = false;
                            const radioInputsValue : radioInterface[] = [{anwser : reducerState.arrayAnswers[parseInt(action.payload) +1]?.anwser[0] , radioState : false }, {anwser : reducerState.arrayAnswers[parseInt(action.payload) + 1]?.anwser[1], radioState : false} , {anwser : reducerState.arrayAnswers[parseInt(action.payload)+1]?.anwser[2], radioState : false}];
                            let previousAnwsersValue : string[] = reducerState.previousAnwsers; 
                            reducerState.radioStates.map((radio) => {

                                if(radio.radioState){
                                  previousAnwsersValue = [...previousAnwsersValue , radio.anwser ];
                                  checkedRadio = true;
                                  if(radio.anwser === reducerState.arrayAnswers[parseInt(action.payload)].rightAnwser){
                                      rightCount++;
                                  }
                                }

                            });


                         if(!checkedRadio){
                             previousAnwsersValue = [...previousAnwsersValue , ""];
                         }
                         
                         if(reducerState.currentQuestion <= 5){
                            return {...reducerState , currentQuestion : reducerState.currentQuestion + 1 , totalRight : rightCount , radioStates : radioInputsValue , previousAnwsers : previousAnwsersValue };     
                         }
                         break;
    case "decrement" :  const radioInputsValueDecrement : radioInterface[] = [{anwser : reducerState.arrayAnswers[parseInt(action.payload) -1]?.anwser[0] , radioState : false }, {anwser : reducerState.arrayAnswers[parseInt(action.payload) - 1]?.anwser[1], radioState : false} , {anwser : reducerState.arrayAnswers[parseInt(action.payload)-1]?.anwser[2], radioState : false}];
                        let rightCountDecrement : number = reducerState.totalRight;
                  
                        if(reducerState.arrayAnswers[parseInt(action.payload) -1]?.rightAnwser === reducerState?.previousAnwsers[parseInt(action.payload) -1 ]){
                          rightCountDecrement--;
                        }

                        const previousAnwsersDecrement : string[] = reducerState.previousAnwsers.filter((anwser ,icount) => {return (parseInt(action.payload) - 1  !== icount)}); 

                        if( reducerState.currentQuestion > 0){
                          return {...reducerState , currentQuestion : reducerState.currentQuestion - 1 ,  radioStates : radioInputsValueDecrement , totalRight : rightCountDecrement ,  previousAnwsers :  previousAnwsersDecrement};     
                        }

                        break;   
    case "updateRadioInput" : const updateInputArray =  reducerState.radioStates.map((radio , icount) =>{

                                                          if(icount === parseInt(action.payload) ){
                                                            return {...radio , radioState : !radio.radioState }
                                                          }
                                                          return {...radio , radioState : false };     
                                                        })
                            
                             return{...reducerState , radioStates : updateInputArray}                       
  }
  return reducerState;
}

export const reducerContext = createContext<contextInteface>(contextObject);

function App() {

  const [reducerState , dispatch] = useReducer(reducerDispatcher , reducerObject);

  return (
    <>
    <div className='superhero-container'>
        <reducerContext.Provider value={{reducerState , dispatch}}>
            <Quiz/>
        </reducerContext.Provider>
    </div>
    </>
  )
}

export default App

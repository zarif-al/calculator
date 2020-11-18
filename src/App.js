import './App.css';
import buttonValues from './calculator_buttons';
import {useState} from 'react';
import {evaluate} from 'mathjs';
function App() {
  const [formula, setFormula] = useState('');
  const [input, setInput] = useState('0');
  const [evaluated, setEvaluated] = useState(false);
  let name = '';

  const evalBtn = () => {
    const result = evaluate(formula);
    setInput(result);
    setFormula((prevState)=>{
      return prevState + "=" + result;
    })
    setEvaluated(true);
  }

  const decimalBtn = () => {

    if(evaluated){
      setFormula("0.");
      setInput("0.");
    }else{
       if(!(input.includes('.'))){
        setInput(prevState => {
        return prevState+'.';
        });
        setFormula(prevState => {
          return prevState + ".";
        })
      }
    }

    setEvaluated(false)

  }

  const checkSign = (value) => {
    if(value === "+" || value === "-" || value === "/" || value === "*"){
      return true;
    }
  }

  
  const numBtn = (element) => {
    const value = element.target.value;

    if(evaluated){
      setFormula(value);
      setInput(value);
    }else{
       if(input[0] === "0" && value === 0){
          setInput(value);
        }else if(input[0] === "0" && value !== 0){
          setInput(value);
          setFormula(value);
        }else{
          setInput((prevState)=>{
            return prevState +  value;
          });
          setFormula(prevState=>{
            return prevState + value;
          });
        }   
     }

     setEvaluated(false);
  }

  const acBtn = () =>{
    setInput('0');
    setFormula('');
  }

  const signBtn = (element) => {
    const sign = element.target.value;
    if(evaluated){
      setFormula(input + sign)
      setInput(sign);
    }else{
      if(formula.length === 0 && sign === "-"){
      console.log("trigger me")
      setInput(sign);
      setFormula(prevState=>{
        return prevState + sign;
      });

    }else if(formula.length !== 0){
      //last two chars arent signs
      if(!(checkSign(formula[formula.length-1]) && checkSign(formula[formula.length-2]))){

          if(sign === "-"){
            setInput(sign);
            setFormula(prevState=>{
              return prevState + sign;
            });
          }else if(checkSign(formula[formula.length-1])){
            setInput(sign);
            setFormula(prevState=>{
              return prevState.slice(0,prevState.length-1) + sign;
            });
          }else{
            setInput(sign);
            setFormula(prevState=>{
              return prevState + sign;
            });
          }

      }else{
        setInput(sign);
        setFormula(prevState => {
          return prevState.slice(0,prevState.length-2) + sign;
        })
      }
    } 
    }
    setEvaluated(false);
    
  }

  
  return (
    <div className="calculator-body">
        <div className="formulaScreen row">
          {formula}
        </div>
        <div className="outputScreen row" id="display">
          {input}
        </div>
        <div className="buttons">
            {
              buttonValues.map(button => {
                if(checkSign(button.value)){
                  return(
                  <button className={button.class} value={button.value} id={button.id} onClick={signBtn}>{button.show}</button>
                  )
                }else if(button.value === "AC"){
                  return(
                  <button className={button.class} value={button.value} id={button.id} onClick={acBtn}>{button.show}</button>
                  )
                }else if(button.value === "="){
                  return(
                  <button className={button.class} value={button.value} id={button.id} onClick={evalBtn}>{button.show}</button>
                  )
                }else if(button.value === "."){
                  return(
                  <button className={button.class} value={button.value} id={button.id} onClick={decimalBtn}>{button.show}</button>
                  )
                }else{
                  return(
                  <button className={button.class} value={button.value} id={button.id} onClick={numBtn}>{button.show}</button>
                  )
                }
                
              })
            }
        </div>
    </div>
  );
}

export default App;

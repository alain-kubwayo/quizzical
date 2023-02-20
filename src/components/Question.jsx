import { nanoid } from "nanoid";

const Question = ({ q, handleClickAnswer }) => {
    let answers = q.answers;
    
    const handleClick = answer => {
        if(q.checked){
            return;
        }
        handleClickAnswer(q.id, answer);
    }

    const answersElement = answers.map(answer => {
        let id = null;
        if(q.checked){
            if(q.correct == answer){
                id = 'correct';
            }else if(q.selected === answer){
                id = 'incorrect';
            }else{
                id = 'not-selected'
            }
        }
        return (
            <button 
                key={nanoid()} 
                id={id} 
                className={`rounded-md mr-[0.6rem] border border-sky-900 py-0.5 px-2 ${answer === q.selected ? 'bg-sky-500 answer select' : 'answer'}`}
                onClick={() => handleClick(answer)}
            >{atob(answer)}</button>
        )

    })
    return ( 
        <div className="w-full mb-4 text-left">
            <h3 className="text-xl text-sky-900">{atob(q.question)}</h3>
            {answersElement}
            <div className="w-full mt-2 border border-gray-300"></div>
        </div>
     );
}
 
export default Question;
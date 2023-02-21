const Welcome = ({ start }) => {
    return ( 
        <div className="flex flex-col items-center justify-center gap-[.6rem]">
            <h1 className="text-4xl font-bold text-sky-900">Quizzical</h1>
            <span className="text-sky-900">Description</span>
            <button className="px-8 py-4 font-semibold leading-5 text-white border-none rounded-md bg-sky-900" onClick={()=>start()}>Start Quiz</button>
        </div>
    );
}
 
export default Welcome;
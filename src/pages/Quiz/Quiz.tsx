import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export interface QuizQuestion {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function decodeHTML(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


export default function Quiz() {
  const { quizId } = useParams<{ quizId: string }>()
  const [questions, setquestions] = useState<QuizQuestion[]>([])
  const [counter, setcounter] = useState<number>(1)
  const [score, setscore] = useState<number>(0)
  const [currentQuestion, setcurrentQuestion] = useState('')
  const [shuffuledQuestions, setshuffuledQuestions] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(600)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  async function fetchQuiz() {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${quizId}&difficulty=medium`)
      const data = response.data.results
      setquestions(data)
      setcounter(1)
      setcurrentQuestion(data[0]?.question)
    } catch (error) {
      console.error('Error fetching quiz:', error)
    }
  }

  useEffect(() => {
    fetchQuiz()
  }, [quizId])

  useEffect(() => {

    if (!questions[counter - 1]) return;
    const current = questions[counter - 1];
    const allAnswers = [...current.incorrect_answers, current.correct_answer];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    setcurrentQuestion(current.question);
    setshuffuledQuestions(shuffled);
    setSelectedAnswer(null);
  }, [questions, counter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (timeLeft === 0 || counter > questions.length) {
    return (
      <section className='flex flex-col items-center justify-center '>
        <h1 className='text-3xl font-bold mb-4'>Quiz Results</h1>
        <div className='flex flex-col md:flex-row items-center justify-between w-full gap-3 mb-6'>
          <div className='flex  flex-col  w-full md:w-1/3 bg-gray-200 py-6 px-5 text-left  justify-center rounded-2xl gap-2 '>
            <p className='text-lg  font-semibold'>Score</p>
            <p className='text-3xl font-bold'>{score / 10 * 100}%</p>
          </div>
          <div className='flex  flex-col w-full md:w-1/3 bg-gray-200 py-6 px-5 text-left  justify-center rounded-2xl gap-2 '>
            <p className='text-lg  font-semibold'>Correct Answers</p>
            <p className='text-3xl font-bold'>{score}</p>
          </div>
          <div className='flex  flex-col w-full md:w-1/3 bg-gray-200 py-6 px-5 text-left  justify-center rounded-2xl gap-2 '>
            <p className='text-lg  font-semibold'>Incorrect Answers</p>
            <p className='text-3xl font-bold'>{10 - score}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setcounter(1)
            setscore(0)
            fetchQuiz()
          }}
          className='bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 cursor-pointer'
        >
          Restart Quiz
        </button>
      </section>
    )
  }

  return (
    <section>
      <div>
        <p className='font-semibold'>Question {counter} of 10</p>
        <div className="w-full mt-3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-black h-2.5 rounded-full transition-all duration-300" style={{ width: `${counter * 10}%` }} />
        </div>
      </div>
      <div className='mt-5 flex items-center gap-3'>
        <div className='flex flex-col w-1/2'>
          <div className='w-full mx-auto bg-gray-200 p-5 rounded-2xl'>
            <p className='text-center font-semibold text-2xl'>
              {String(minutes).padStart(2, '0')}
            </p>
          </div>
          <p className='text-center mt-4'>Minutes</p>
        </div>
        <div className='flex flex-col w-1/2'>
          <div className='w-full mx-auto bg-gray-200 p-5 rounded-2xl'>
            <p className='text-center font-semibold text-2xl'>
              {String(seconds).padStart(2, '0')}
            </p>
          </div>
          <p className='text-center mt-4'>Seconds</p>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-2xl font-semibold'>{decodeHTML(currentQuestion)}</p>
        <div className='mt-5 flex flex-col gap-3'>
          {
            shuffuledQuestions.map((answer, index) => (
              <div key={index} onClick={() => { setSelectedAnswer(answer) }} className={`w-full rounded-xl border p-4 border-gray-300 transition-all duration-200 ${selectedAnswer === answer ? 'bg-black text-white' : 'bg-transparent'}`}>
                <p>{decodeHTML(answer)}</p>
              </div>
            ))
          }
        </div>
        <div className='mt-5 flex items-center justify-between'>
          <button
            disabled={selectedAnswer === null}
            onClick={() => {
              if (selectedAnswer === null) return;

              if (selectedAnswer === questions[counter - 1].correct_answer) {
                setscore(score + 1);

              }

              setcounter(counter + 1);
            }}

            className='bg-black text-white px-10 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

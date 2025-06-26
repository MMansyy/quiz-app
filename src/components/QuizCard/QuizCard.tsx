import React from 'react'
import { Link } from 'react-router-dom';


interface Quiz {
    quizId: number;
    quizTitle: string;
    quizDesc: string;
    quizImg: string;
    titleSearch: string;
}

export default function QuizCard({ quiz, size }: { quiz: Quiz, size: 'small' | 'large' }) {
    if (size === 'small') {
        return (
            <div className="w-full md:w-56 min-h-64 flex flex-col justify-between">
                <img
                    src={quiz.quizImg}
                    alt={quiz.quizTitle}
                    className="rounded-lg w-full h-32 object-cover shadow-sm"
                />

                <div className="flex flex-col flex-1 mt-2">
                    <h3 className='text-lg font-semibold line-clamp-1'>{quiz.quizTitle}</h3>
                    <p className='text-blue-500 mb-4'>{quiz.quizDesc}</p>
                    <div className="mt-auto w-full">
                        <Link to={`/quiz/${quiz.quizId}`} className='w-full block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer'>
                            Take Quiz
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full md:w-72">
            <img
                src={quiz.quizImg}
                alt={quiz.quizTitle}
                className="rounded-lg w-full h-40 object-cover shadow-sm"
            />
            <div className="mt-3">
                <h3 className='text-xl font-bold line-clamp-1'>{quiz.quizTitle}</h3>
                <p className='text-blue-500'>{quiz.quizDesc}</p>
                <div className="mt-4">
                    <Link to={`/quiz/${quiz.quizId}`} className='w-full block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer'>
                        Take Quiz
                    </Link>
                </div>
            </div>
        </div>
    )
}

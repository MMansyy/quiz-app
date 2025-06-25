import React from 'react'


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
            <div className="w-56">
                <img
                    src={quiz.quizImg}
                    alt={quiz.quizTitle}
                    className="rounded-lg w-full h-32 object-cover shadow-sm"
                />
                <div className="mt-2">
                    <h3 className='text-lg font-semibold line-clamp-1'>{quiz.quizTitle}</h3>
                    <p className='text-blue-500'>{quiz.quizDesc}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="w-72">
            <img
                src={quiz.quizImg}
                alt={quiz.quizTitle}
                className="rounded-lg w-full h-40 object-cover shadow-sm"
            />
            <div className="mt-3">
                <h3 className='text-xl font-bold line-clamp-1'>{quiz.quizTitle}</h3>
                <p className='text-blue-500'>{quiz.quizDesc}</p>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ShowResult from '../components/ShowResult';
import Loader from '../img/loader.svg';
import { Button, Card, CardContent } from '@material-ui/core';

const Questions = ({ match, history }) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [questions, setQuestions] = useState([]);
    const [curQuestionNo, setCurQuestionNo] = useState(0); // sorular üzerinde ileri gitmek için iteratör gibi kullanacağız
    const [allAnswers, setAllAnswers] = useState([]);
    const [result, setResult] = useState(false);

    const createMarkup = (text) => {
        return { __html: text };
    };

    const fetchQuizData = async () => {
        setLoading(true);
        try {
            const url = `https://opentdb.com/api.php?amount=10&category=${match.params.cat
                }&difficulty=${match.params.dif.toLowerCase()}&type=multiple`;
            const { data } = await axios.get(url); // seçilen kategori ve zorluğu match liyoruz

            setQuestions(data.results);
            setAllAnswers(
                [
                    ...data.results[0].incorrect_answers,
                    data.results[0].correct_answer,
                ].sort(() => Math.random() - 0.5)
                //sorular random sıramayla kullanıcının önüne düşecek

            );
        } catch (error) {
            console.log('Fetch quiz error =====>>>>', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuizData();
        // eslint-disable-next-line
    }, []);

    const nextQuestion = () => { // sonraki soru
        if (!questions[curQuestionNo].userAnswer) {
            alert('Lütfen bir cevap seçin !');
            return false;
        }  // cevap seçimi yaptırma uyarısı

        setAllAnswers(
            [
                ...questions[curQuestionNo + 1].incorrect_answers,
                questions[curQuestionNo + 1].correct_answer,
            ].sort(() => Math.random() - 0.5)
        ); // sonraki soruya geçmek için kullandığımız fonksiyon

        setCurQuestionNo(curQuestionNo + 1); // iteratörü 1 arttır
    };
    const showResult = () => { // sonuçları gösterme fonksiyonu
        if (!questions[curQuestionNo].userAnswer) {
            alert('Lütfen bir cevap seçin!');
            return false;
        } // son cevap seçimi yaptırma uyarısı

        setResult(true); // sonuçları getirir
    };

    const reset = () => { // yenileme fonksiyonu 
        history.push('/');
    };

    const getAnswer = (e, ans) => { // cevaplama fonksiyonu 
        questions[curQuestionNo].userAnswer = ans;
        setSelected(ans);
    };

    return (
        <>
            {loading ? (
                <div className='loader'>
                    <img src={Loader} alt='Loading...' />
                </div>
            ) : !result ? (
                <div>
                    {questions.length > 0 && (
                        <>
                            <Card className='questionContent'>
                                <div className='question'>
                                    <p
                                        dangerouslySetInnerHTML={createMarkup(
                                            questions[curQuestionNo].question
                                        )}
                                        className='questionText'
                                    ></p>
                                    {/* soruyu getirdiğimiz kısım */}
                                </div>

                                <hr />
                                <CardContent>
                                    {allAnswers.map((ans, i) => {
                                        return (
                                            <div
                                                className={
                                                    selected === ans ? 'selected answer' : 'answer'
                                                }
                                                key={i}
                                                onClick={(e) => {
                                                    getAnswer(e, ans);
                                                }}
                                            >
                                                <p dangerouslySetInnerHTML={createMarkup(ans)}></p>
                                                {/* cevapları getirip işaretlediğimiz kısım */}
                                            </div>
                                        );
                                    })}

                                    <div>
                                        <Button
                                            variant='outlined'
                                            color='secondary'
                                            style={{ float: 'right' }}
                                            onClick={
                                                questions.length === curQuestionNo + 1
                                                    ? showResult
                                                    : nextQuestion
                                            }
                                        >
                                            {questions.length === curQuestionNo + 1
                                                ? 'Sonucu Göster'
                                                : 'Sonraki Soru'}
                                            {/* dizi uzunluğu curQuestionNo+1 e eşitse sonucu göster degilse sonraki soru */}
                                        </Button>
                                        <Button variant='outlined' onClick={reset}>
                                            Yenile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            ) : (
                <ShowResult
                    questions={questions}
                    createMarkup={createMarkup}
                    reset={reset}
                />
            )}
        </>
    );
};

export default Questions;

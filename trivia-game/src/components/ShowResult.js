import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const ShowResult = ({ questions, createMarkup, reset }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (questions.length > 0) {
      setScore(
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 10 // correct_answer userAnswer a eşit ise cevap doğru 10 ile çarp 
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Card
        style={{ marginTop: '50px', backgroundColor: 'rgb(255, 250, 205)' }}
      >
        <CardHeader
          title='Score Tablosu'
          titleTypographyProps={{ variant: 'h3' }}
          style={{
            textAlign: 'center',
            backgroundColor: 'rgb(238, 173, 14)',
            color: 'white',
          }}
        ></CardHeader>
        <CardContent>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.59rem',
              fontWeight: 'bold',
            }}
          >
            Toplam Puan: {questions.length * 10}
          </p>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.59rem',
              fontWeight: 'bold',
            }}
          >
            Oyuncu Puan: {score}
          </p>
        </CardContent>
      </Card>

      {questions.map((q, i) => {
        return (
          <Card key={i} style={{ marginTop: '15px' }}>
            <div className='question'>
              <p
                className='questionText'
                dangerouslySetInnerHTML={createMarkup(q.question)}
              ></p>
            </div>
            <hr />
            <CardContent>
              <div style={{ textAlign: 'center' }} className='answerq'> 
                <b>Senin Cevabın: </b>{' '} 
                <p
                  dangerouslySetInnerHTML={createMarkup(q.userAnswer)} 
                  className={
                    q.userAnswer === q.correct_answer ? 'correct' : 'wrong' // userAnswer ve correct_answer eşit ise correct değil ise wrong
                  }
                ></p>
                <hr />
                <b>Doğru Cevap: </b>
                <p
                  dangerouslySetInnerHTML={createMarkup(q.correct_answer)}
                  className='correct'  // doğru cevap
                ></p>
              </div>
              <p style={{ float: 'right', color: 'black' }}>
                <b>Puan : {q.userAnswer === q.correct_answer ? '10' : '00'} </b>
              </p>
            </CardContent>
          </Card>
        );
      })}
      <div>
        <Button
          variant='contained'
          onClick={reset}
          style={{ marginTop: '35px', marginBottom: '15px', width: '100%' }}
          color='primary'
        >
          Yenile
        </Button>
      </div>
    </div>
  );
};

export default ShowResult;

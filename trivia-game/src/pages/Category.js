import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    MenuItem,
    TextField,
    Button,
} from '@material-ui/core';
import axios from 'axios';

const Category = ({ history }) => {
    const [cats, setCats] = useState([]); //kategorilerin tamamını tuttuğumuz dizi
    const [cat, setCat] = useState(''); // kategorilere tek tek erişmek için 
    const [difficulty, setDifficulty] = useState('');
    const [qNo] = useState(10);

    const fetchQuestionCategories = async () => {
        const { data } = await axios.get(`https://opentdb.com/api_category.php`); // kategorileri çektik

        setCats(data.trivia_categories); // kategorileri dizi içerisine attık
    };
    useEffect(() => {
        fetchQuestionCategories();
        // componentDidMount yapmis oluruz, 1 kere çalışır - diziye bak dizinin içindeki elemanlar değiştiğinde içeriyi çalıştır demek
        // ilk component yüklendiğinde çalışacak bir daha hiç çalışmayacak çünkü dizi boş içerisi değişmeyecek
    }, []);



    const submitHandler = () => {
        if (
            cat === '' ||
            difficulty === ''
        ) {
            alert(' Lütfen gerekli alanları doldurun!');
        } else {
            const url = `/q/${cat}/${difficulty}/${qNo}`;
            history.push(url);
        }
    };

    return (
        <div>

            <Card style={{ marginTop: '50px' }} className='card'>
                <CardHeader
                    title='TRİVİA GAME'
                    titleTypographyProps={{ variant: 'h3' }}
                    style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        backgroundColor: 'silver-gray',
                        color: 'pink',
                    }}
                ></CardHeader>
                <CardContent>
                    <TextField
                        select
                        label='Select'
                        defaultValue=''
                        onChange={(e) => setCat(e.target.value)}
                        helperText='Kategori seçiniz'
                        className='inputText'
                        variant='outlined'
                    >
                        {cats.map((c) => {
                            return (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            );
                        })}
                    </TextField>

                    <TextField
                        select
                        label='Select'
                        defaultValue=''
                        className='inputText'
                        onChange={(e) => setDifficulty(e.target.value)}
                        helperText='Zorluk düzeyini seçiniz'
                        variant='outlined'
                    >
                        <MenuItem value='easy'>Kolay</MenuItem>
                        <MenuItem value='medium'>Orta</MenuItem>
                        <MenuItem value='hard'>Zor</MenuItem>
                    </TextField>
                    <Button
                        className='button-submit'
                        style={{ fontSize: '25px', marginTop: '20px' }}
                        color='secondary'
                        onClick={submitHandler}
                        variant='contained'
                    > BAŞLAT
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Category;

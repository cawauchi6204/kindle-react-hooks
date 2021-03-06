import React, { FC, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

import firebase from '../firebase'
import TopHeader from '../components/topPage/topHeader';
import { TitleDate } from '../types/types';
import { DialogTitle } from '@material-ui/core';

const useStyles = makeStyles(() => {
    createStyles({

    })
})

const DownloadPage: FC = () => {
    const { keyword } = useParams();
    const classes = useStyles();
    const [data, setData] = useState<TitleDate[]>([])

    const getData = async (searchWord: string | undefined) => {
        const db = firebase.firestore();
        const titleDataRef = db.collection('titleData');
        const searchedData = titleDataRef.where("keyword", "array-contains", searchWord)
        //where(どのフィールドか,比較演算子,検索したい値)
        // 今回は『arraycontains』としましたが、これは一つ目の引数で指定したフィールドが三つ目の引数で指定する文字列を含む配列であるすべてのドキュメントを返します。
        const snapShot = await searchedData.get();
        // awaitはasyncがついている関数の中で使える記述でawaitがついた記述が終わるまで他の記述を待たせておくことができる
        // snapShot.docsには検索ワードが含まれるドキュメントが全て入る
        const temporaryData: object[] = []
        snapShot.docs.map(doc => {
            //mapで格納されている全ての要素に対して加工を行っている
            temporaryData.push(doc.data());
        })
        setData(temporaryData as TitleDate[]);
    }

    useEffect(() => {
        getData(keyword)
    }, [])

    const displayImage = () => {
        return (
            <div>
                {data.map((title) => (
                    <div>
                        <img src={title.image} alt={title.title} />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            {displayImage()}
        </div>
    )

}

export default DownloadPage




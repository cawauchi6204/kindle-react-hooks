import React, { FC, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import firebase from '../../firebase'
import { TitleDate } from '../../types/types'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(() => {
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            width: "80%",
            textAlign: "center",
            marginTop: "2%",
        },
        titleImage: {
            height: "218px",
            width: "218px"
        }
    })
});

const ImageItemList: FC = () => {
    const [data, setData] = useState<TitleDate[]>([]);
    // このdataに画像データなどが格納される
    const { keyword } = useParams();
    // const classes = useStyles();
    const history = useHistory();
    // keywordにはindex.tsxのinputで入力された語句がまずurlに表示されそれをuseParams()で取得する
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
    // 第二引数にから配列[]を渡すことで更新されても呼び出されずに最初だけ呼ばれるようになる

    return (
        <div>
            {data.map((title) => (
                <div>
                    <Button onClick={() => history.push('/download/'+ title.title)}>
                        <img src={title.image} alt={title.title} />
                    </Button>
                    <h3>{title.title}</h3>
                </div>
            ))}
        </div>
    )
}

export default ImageItemList

import React, {useState, useEffect} from 'react';
import s from './SpeedReading.module.css'

const text = 'Жалейкин — мальчуган добрый. Когда видит рядом зло, очень страдает. И хочется ему вмешаться, все исправить и сделать доброе дело. Прибежал однажды Жалейкин на пруд и ахнул: туристы на берегу свой костер не залили, бумажки и тряпки не собрали, банки и склянки не закопали. — Вот неряхи! — вскричал Жалейкин — Как им не жалко портить такой бережок! Придется навести порядок. Соберу весь мусор и брошу в пруд. Снова стал бережок чистеньким и красивым. И пруд красивый: мусора на дне никому не видно. Но прибежали на пруд купальщики и порезали о склянки ноги. Рыболовы порвали об острые склянки лески и поломали о банки крючки. А рыбы в пруду от грязного хлама и ржавчины стали болеть и задыхаться. Хотел Жалейкан как лучше, а вышло — хуже. Столько сразу стало вокруг недовольных! Всякое дело с умом делать надо, но уж если одно делаешь, то другое не порть! Н. Сладков'
const words = text.split(' ');

const SpeedReading = () => {
    const [index, setIndex] = useState(-1);
    const [speed, setSpeed] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [effect, setEffect] = useState('')
    const [effectStyle, setEffectStyle] = useState(s.effect)

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setIndex((index) => index + 1);
                if (index >= words.length) {
                    setIsRunning(false);
                }
            }, 1000 / speed);
            return () => clearInterval(interval);
        }
    }, [index, isRunning, speed]);

    const handleStart = () => {
        if (effect === '') {
            setEffectStyle(s.effectError)
        } else {
            setIsRunning(true);
        }

    }
    const handleStop = () => setIsRunning(false);
    const handleClear = () => {
        setIsRunning(false);
        setIndex(-1);
    }
    const labelsArray = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

    return (
        <div className={s.container}>
            <div className={s.settings}>

                <div className={s.buttons}>
                <button onClick={handleStart}>Старт</button>
                <button onClick={handleStop}>Стоп</button>
                <button onClick={handleClear}>Сброс</button>
                </div>

                <div className={s.range}>
                <input
                    type='range'
                    min='1'
                    max='10'
                    name='speed'
                    value={speed}
                    list="markers"
                    onChange={(e) => setSpeed(e.target.value)}
                />
                    <label htmlFor="speed"> Скорость чтения: {labelsArray[speed - 1]} сек. </label>
                </div>

                <div className={effectStyle}>
                    <span>Анимация:</span>
                    <div className={s.effectButtons}>
                    <div className={s.transparentRadio}>
                        <input
                            type="radio"
                            name="effect"
                            onChange={(e) => {
                                setEffect('grey');
                                setEffectStyle(s.effect)
                            }}
                        />
                        <label style={{paddingLeft: '5px'}}>Закраска </label>
                    </div>

                    <div className={s.shadeRadio}>
                        <input
                            type="radio"
                            name="effect"
                            onChange={(e) => {
                                setEffect('white');
                                setEffectStyle(s.effect)
                            }}
                        />
                        <label style={{paddingLeft: '5px'}}>Исчезновение </label>
                    </div>
                </div>
                </div>


            </div>
            <div className={s.textArea}>
                <span style={{fontSize: '2rem'}}>Жалейкин</span> <br/><br/>
                {words.map((word, i) => (
                        <span key={i} style={{color: i <= index ? `${effect}` : 'black'}}>
          {`${word} `}
        </span>
                ))}
            </div>
        </div>
    );
};

export default SpeedReading;
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
const CountDown = ({ max = 60, isStart = false, text = "獲取驗證碼", onClick }) => {
    const [seconds, setSeconds] = useState(max + 1);
    const [timer, setTimer] = useState(null);

    const count = () => {
        let timer1 = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        setTimer(timer1);
    };
    useEffect(() => {
        if (isStart) {
            count();
        }
    }, [isStart]);
    useEffect(() => {
        if (seconds < 0) {
            clearInterval(timer);
            setSeconds(max + 1);
        }
    }, [seconds]);
    return (
        seconds <= max ?
            <Button color="primary" disabled>{seconds} S</Button>
            :
            <Button color="primary" onClick={onClick}>{text}</Button>
    )
}
export default CountDown;
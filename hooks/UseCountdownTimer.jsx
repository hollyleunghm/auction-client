import { useState, useEffect } from 'react';

const UseCountdownTimer = (deadline) => {
    const calculateTimeRemaining = () => {
        const currentTime = new Date().getTime();
        const timeDifference = deadline - currentTime;

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());



    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return timeRemaining;
};

export default UseCountdownTimer;

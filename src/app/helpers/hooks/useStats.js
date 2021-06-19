import { useEffect, useState } from "react";

const useStats = () => {
    const [statistics, setStatistics] = useState({
        win: 0,
        lose: 0,
        averageTime: 0,
        storage: [],
    });

    useEffect(() => {
        calculateStats();
    }, []);

    const calculateStats = () => {
        const { LSStatistics } = getLSMeta();
        if (LSStatistics.length) {
            const win = LSStatistics.reduce(
                (acc, cur) => (cur.result === "win" ? ++acc : acc),
                0
            );
            const lose = LSStatistics.reduce(
                (acc, cur) => (cur.result === "lose" ? ++acc : acc),
                0
            );
            const averageTimeSum = LSStatistics.reduce(
                (acc, cur) => acc + cur.time,
                0
            );
            const averageTime = averageTimeSum / LSStatistics.length;

            setStatistics({
                win,
                lose,
                averageTime,
                storage: LSStatistics,
            });
        }
    };

    const getLSMeta = () => {
        const LSName = "stats";
        const LSStatistics = localStorage.getObj(LSName) ?? [];

        return {
            LSName,
            LSStatistics,
        };
    };

    const addRecordToStorage = (gameResult, time) => {
        const { LSName, LSStatistics } = getLSMeta();
        const LSRecord = {
            id: LSStatistics.length,
            result: gameResult,
            date: new Date().toLocaleDateString("en-US"),
            time,
        };
        LSStatistics.push(LSRecord);
        localStorage.setObj(LSName, LSStatistics);
        calculateStats();
    };

    return { statistics, addRecordToStorage };
};

export default useStats;

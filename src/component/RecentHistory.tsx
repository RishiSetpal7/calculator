
import styles from './calculator.module.scss'
import cx from 'classnames'
import { FiMoon, FiSun, FiChevronLeft } from 'react-icons/fi'


import { useContext, useEffect, useState } from 'react'
import { LightModeContext } from './lightModeContext'
import { useLocation, useNavigate } from "react-router-dom";

export default function RecentHistory() {
    // theme
    const { lightMode, toogleLightMode } = useContext(LightModeContext);
    const handleThemeChange = () => {
        toogleLightMode();
    }

    const [history, setHistory] = useState<string[]>(['No History']);

    // get Data form props
    const loc = useLocation();
    useEffect(() => {
        setHistory(loc.state.savedHistory);
    }, [loc.state.savedHistory]);

    // navigation
    const nav = useNavigate();
    const handleNavigateBack = () => {
        nav('/');
    }

    return <>
        <div className={lightMode ? cx(styles.lightcalculator, styles.calculator) : styles.calculator}>
            <section className={styles.theme} >
                <span onClick={handleNavigateBack}> {lightMode ? <FiChevronLeft className={styles.lighticon} /> : <FiChevronLeft />} </span>
                <span>Calculator</span>
                <span onClick={handleThemeChange}> {lightMode ? <FiSun className={styles.lighticon} /> : <FiMoon />}</span>
            </section>
            <section className={styles.historyContainer}>
                {
                    history.map((operation, index) => (
                        <>
                            <div key={index}>{operation}</div>
                            <hr style={{ width: '150px' }} />
                        </>
                    ))
                }
            </section>
        </div>
    </>
}
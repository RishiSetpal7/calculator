
import styles from './calculator.module.scss'
import cx from 'classnames'
import { FiMoon, FiSun, FiClock } from 'react-icons/fi'


import { useContext, useState } from 'react'
import { LightModeContext } from './lightModeContext'
import { useNavigate } from 'react-router-dom';

// Solution 1 [use String] ********************************
// One of the easiest ways to calculate is to use eval(string) inside try{}catch(error){} block
// on btn it will concat and on equal it will eval(string) 
// if isNaN that show error message
// Solution 2 [use Number]
export default function Calculator() {
    // theme
    const { lightMode, toogleLightMode } = useContext(LightModeContext);
    const handleThemeChange = () => {
        toogleLightMode();
    }

    const [previousOperations, setPreviousOperations] = useState<string[]>(['No History']);
    // navigation
    const nav = useNavigate();
    const handleNavigateHistory = () => {
        nav('/recentHistory', { state: { savedHistory: previousOperations } });
    }

    // Calculator
    // <>   this helps to define the data type of the state
    // ()=> this helps to set the Inital state value only once when first rendered, same as constructor.

    const [currentOperation, setCurrentOperation] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>('0');

    const [firstOperand, setFirstOperand] = useState<number>(() => 0);
    const [operator, setOperator] = useState<string>(() => '');
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const handleClear = () => {
        setPreviousOperations(['No History']);
        setCurrentOperation('');
        setDisplayValue('0');
        setFirstOperand(0);
        setOperator('');
        setWaitingForSecondOperand(false);
    };

    const handleToggleSign = () => {
        const value = parseFloat(displayValue);
        setDisplayValue(String(-value));
    };

    const handlePercentage = () => {
        const inputValue = parseFloat(displayValue);

        if (inputValue === 0) {
            displayError('Cannot calculate percentage of zero.');
            return;
        }

        const result = inputValue / 100;

        setPreviousOperations(prev => {
            if (prev[0] === 'No History') {
                return [`${currentOperation}${displayValue} % = ${result}`];
            }
            return [...prev, `${currentOperation}${displayValue} % = ${result}`];
        });
        setCurrentOperation(`${result}`);
        setDisplayValue(String(result));
        setFirstOperand(result);
        setOperator('');
        setWaitingForSecondOperand(true);
    };

    const handleButtonClick = (value: number | string): void => {
        console.log('typeof value: ', typeof value);
        if (typeof value === 'number') {
            handleDigitInput(value);
        } else if (typeof value === 'string') {
            if (value === '.') {
                handleDecimalInput();
            } else if (value === '=') {
                handleEquals();
            } else {
                handleOperatorInput(value);
            }
        }
    };

    const handleDigitInput = (digit: number): void => {
        if (waitingForSecondOperand) {
            setDisplayValue(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
        }
    };

    const handleDecimalInput = () => {
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const handleEquals = () => {
        if (operator === '') return;

        if (waitingForSecondOperand) {
            displayError('Incomplete input.');
            return;
        }

        const result = performCalculation();
        if (!isFinite(result)) {
            displayError('Invalid input.');
            return;
        }

        setDisplayValue(String(result));
        setFirstOperand(0);
        setOperator('');
        setWaitingForSecondOperand(false);
        setCurrentOperation('');
        setPreviousOperations(prev => {
            if (prev[0] === 'No History') {
                return [`${currentOperation} ${displayValue} = ${result}`];
            }
            return [...prev, `${currentOperation} ${displayValue} = ${result}`];
        });
    };


    const handleOperatorInput = (nextOperator: string) => {
        const inputValue = parseFloat(displayValue);

        if (firstOperand === 0) {
            setFirstOperand(inputValue);
            // setDisplayValue('0');
        } else if (operator !== '') {
            const result = performCalculation();
            setDisplayValue(String(result));
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
        setCurrentOperation(`${inputValue} ${nextOperator}`);

    };

    const performCalculation = () => {
        const inputValue = parseFloat(displayValue);

        if (operator === '+') {
            return firstOperand + inputValue;
        } else if (operator === '-') {
            return firstOperand - inputValue;
        } else if (operator === '*') {
            return firstOperand * inputValue;
        } else if (operator === '/') {
            return firstOperand / inputValue;
        }

        return inputValue;
    };

    const handleDelete = () => {
        if (displayValue.length === 1) {
            setDisplayValue('0');
        } else {
            setDisplayValue(displayValue.slice(0, -1));
        }
    };

    const displayError = (message: string) => {
        alert(message);
    };


    return <>
        <div className={lightMode ? cx(styles.lightcalculator, styles.calculator) : styles.calculator}>
            <section className={styles.theme} >
                <span onClick={handleNavigateHistory}> {lightMode ? <FiClock className={styles.lighticon} /> : <FiClock />} </span>
                <span>Calculator</span>
                <span onClick={handleThemeChange}> {lightMode ? <FiSun className={styles.lighticon} /> : <FiMoon />}</span>

            </section>
            <section className={styles.monitor}>
                <p className={styles.prevmonitor}>{currentOperation}</p>
                <p>{displayValue}</p>
            </section>
            <section className={styles.calcbtnContainer}>
                <button onClick={handleClear} className={lightMode ? styles.btnyellow : styles.btngrey}>AC</button>
                <button onClick={() => { return handlePercentage() }} className={lightMode ? styles.btnyellow : styles.btngrey}>%</button>
                <button onClick={() => handleButtonClick('/')} className={lightMode ? styles.btnyellow : styles.btngrey}>/</button>
                <button onClick={() => handleDelete()} className={lightMode ? styles.btnyellow : styles.btngrey}>C</button>
                <button onClick={() => handleButtonClick(7)} className={lightMode ? styles.btnred : styles.btndavygrey}>7</button>
                <button onClick={() => handleButtonClick(8)} className={lightMode ? styles.btnred : styles.btndavygrey}>8</button>
                <button onClick={() => handleButtonClick(9)} className={lightMode ? styles.btnred : styles.btndavygrey}>9</button>
                <button onClick={() => handleButtonClick('*')} className={lightMode ? styles.btnyellow : styles.btngrey}>*</button>
                <button onClick={() => handleButtonClick(4)} className={lightMode ? styles.btnred : styles.btndavygrey}>4</button>
                <button onClick={() => handleButtonClick(5)} className={lightMode ? styles.btnred : styles.btndavygrey}>5</button>
                <button onClick={() => handleButtonClick(6)} className={lightMode ? styles.btnred : styles.btndavygrey}>6</button>
                <button onClick={() => handleButtonClick('-')} className={lightMode ? styles.btnyellow : styles.btngrey}>-</button>
                <button onClick={() => handleButtonClick(1)} className={lightMode ? styles.btnred : styles.btndavygrey}>1</button>
                <button onClick={() => handleButtonClick(2)} className={lightMode ? styles.btnred : styles.btndavygrey}>2</button>
                <button onClick={() => handleButtonClick(3)} className={lightMode ? styles.btnred : styles.btndavygrey}>3</button>
                <button onClick={() => handleButtonClick('+')} className={lightMode ? styles.btnyellow : styles.btngrey}>+</button>
                <button onClick={() => handleButtonClick(0)} className={cx(lightMode ? styles.btnred : styles.btndavygrey, styles.btnzero)}>0</button>
                <button onClick={() => handleDecimalInput()} className={cx(lightMode ? styles.btnred : styles.btndavygrey, styles.btndot)}>.</button>
                <button onClick={() => handleToggleSign()} className={cx(lightMode ? styles.btnyellow : styles.btngrey, styles.btnPlusMinus)}>-/+</button>
                <button onClick={() => handleButtonClick('=')} className={lightMode ? cx(styles.btntotallight, styles.btntotal) : styles.btntotal}>=</button>
            </section>
        </div>
    </>
}
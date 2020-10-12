import React, { useState } from 'react';

import Button from '~/components/Button';
import FormulaScreen from '~/components/FormulaScreen';
import {
  checkZeroDigit, checkLastAction, isDot, isNumber, deleteElement, changeLastElement
} from '~/utils/';

import {
  Wrapper, Parent, Layer,
} from './styles';

export default function Calculator() {
  const [result, setResult] = useState('0');
  const [countDot, setCountDot] = useState(0);

  function equalAction() {
    if (checkLastAction(result)) {
      setResult((res) => deleteElement(res, 1));
    } else {

      const data = new FormData();
      data.append('expression', result);
      const requestOptions = {
        method: 'POST',
        body: data
      };
      fetch('http://localhost:8080/api/calculate', requestOptions)
        .then((response) => response.json())
        .then((res) => setResult(res));
      if (eval(result) % 1 === 0) {
        setCountDot(0);
      }
    }
  }

  function resetAction() {
    setResult('0');
    setCountDot(0);
  }

  function othersActions(value) {
    if (checkLastAction(value)) {
      if (isDot(value)) {
        setCountDot((count) => count + 1);

        if (countDot < 1) {
          setResult((res) => res + value);
        }
      } else {
        setCountDot(0);
        setResult((res) => res + value);
      }
    } else if (checkZeroDigit(result)) {
      setResult(value);
    } else {
      setResult((res) => res + value);
    }
  }

  function calculate(e) {
    e.persist();
    const { value } = e.target;

    switch (value) {
      case 'AC':
        resetAction();
        break;
      case '=':
        equalAction(value);
        break;
      default:
        othersActions(value);
        break;
    }
  }

  return (
    <Parent>
      <Wrapper>
        <Layer>
          <p> CALCULATOR </p>
        </Layer>
      </Wrapper>
      <Wrapper>
        <FormulaScreen value={result} />
        <Button value="AC" id="clear" onClick={calculate} />
        <Button value="(" id="left" onClick={calculate} />
        <Button value=")" id="right" onClick={calculate} />
        <Button value="/" id="divide" onClick={calculate} />
        <Button value="7" id="seven" onClick={calculate} />
        <Button value="8" id="eight" onClick={calculate} />
        <Button value="9" id="nine" onClick={calculate} />
        <Button value="*" id="multiply" onClick={calculate} />
        <Button value="4" id="four" onClick={calculate} />
        <Button value="5" id="five" onClick={calculate} />
        <Button value="6" id="six" onClick={calculate} />
        <Button value="-" id="subtract" onClick={calculate} />
        <Button value="1" id="one" onClick={calculate} />
        <Button value="2" id="two" onClick={calculate} />
        <Button value="3" id="three" onClick={calculate} />
        <Button value="+" id="add" onClick={calculate} />
        <Button value="." id="decimal" onClick={calculate} />
        <Button value="0" id="zero" onClick={calculate} />
        <Button value="=" id="equals" onClick={calculate} />
      </Wrapper>
    </Parent>
  );
}

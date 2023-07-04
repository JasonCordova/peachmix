import {useRef, useState, useEffect} from 'react';

const Knob = (props) => {

    const [value, setValue] = useState(props.default);
    const maxThresh = 60;
    const [focus, setFocus] = useState(false);
    const [hover, setHover] = useState(false);
    window.onmouseup = () => {setFocus(false);}
    window.onblur = () => {setFocus(false);}

    var element = useRef();
    const getAngle = (e) => {
        if (element.current === null) return;
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        var knobBounds = element.current.getBoundingClientRect();
        var knobX = knobBounds.x + knobBounds.width/2;
        var knobY = knobBounds.y + knobBounds.height/2;
        var degree = -(((Math.atan2(knobY - mouseY, mouseX - knobX) * 180 / Math.PI) + 360) % 360) + 90;
        setAngle(degree);
    }

    const setAngle = (degree) => {
        var intA = -180 + maxThresh;
        var intB = -180 - maxThresh;
        if (degree < intA && degree > -180) degree = intA;
        else if (degree > -270 && degree < intB) degree += 360;
        else if (degree < -180 && degree > intB) degree = intB + 360;

        element.current.style.transform = `rotate(${degree}deg)`;
        var a = ((degree/120) + 1)/2;
        a = (a * (props.max - props.min)) + props.min;
        a = Math.floor(a * 100)/100;
        setValue(a.toFixed(2));
        if (props.type === "volume"){
            props.element.volume = a.toFixed(2);
        }
        if (props.type === "speed"){
            props.element.playbackRate = a.toFixed(2);
        }
    }

    const convertToAngle = (x) => {
        var realInterval = (x - props.min) / (props.max - props.min);
        var realDegree = ((realInterval * 2) - 1) * 120;
        return realDegree;
    }

    const resetValue = (x) => {
        var realInterval = (x - props.min) / (props.max - props.min);
        var realDegree = ((realInterval * 2) - 1) * 120;

        var a = ((realDegree/120) + 1)/2;
        a = (a * (props.max - props.min)) + props.min;
        a = Math.floor(a * 100)/100;
        
        element.current.style.transform = `rotate(${realDegree}deg)`;
        setValue(a.toFixed(2));
        if (props.type === "volume"){
            props.element.volume = a.toFixed(2);
        }
        if (props.type === "speed"){
            props.element.playbackRate = a.toFixed(2);
        }

    }

    useEffect(() => {
        element.current.style.transform = `rotate(${convertToAngle(props.default)}deg)`;
    }, []);

    return (
        <div className="option-holder">
            <div ref={element} className="option-knob" onMouseLeave={() => {setFocus(false); setHover(false);}} onMouseMove={(e) => {if (focus) getAngle(e);}} onMouseOver={() => {setHover(true);}} onDoubleClick={() => {resetValue(props.default)}} onMouseDown={(e) => {getAngle(e); setFocus(true);}}></div>
            <span draggable={false} className={`option-label ${focus || hover ? "focused" : ""}`}>
                {focus || hover ? `${Math.floor(value * 100)}%` : props.label}
            </span>
        </div>
    );
}

export default Knob;
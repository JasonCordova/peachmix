import {useState, useEffect} from 'react';

const ModeElement = (props) => {

    const [playMode, setPlayMode] = useState("gate");

    const changeMode = (x) => {
        setPlayMode(x);
        props.element.mode = x;
        
        if (x === "loop") props.element.importAudio.loop = true;
        else props.element.importAudio.loop = false;
    }

    useEffect(() => {
        changeMode(props.element.mode);
    }, [props.current]);

    return (
        <div className="mode-holder">
            <span className="label">Play Mode</span>
            <div className="mode-option-holder">
                <div className={`button-holder ${playMode === "gate" ? "active" : ""}`} onClick={() => {changeMode("gate")}}>
                    <div className="button"></div>
                    <div className={`button-label`}>Gate</div>
                </div>

                <div className={`button-holder ${playMode === "oneshot" ? "active" : ""}`} onClick={() => {changeMode("oneshot");}}>
                    <div className="button"></div>
                    <div className={`button-label`}>One-Shot</div>
                </div>

                <div className={`button-holder ${playMode === "loop" ? "active" : ""}`} onClick={() => {changeMode("loop");}}>
                    <div className="button"></div>
                    <div className={`button-label`}>Loop</div>
                </div>
            </div>
        </div>
    );
}

export default ModeElement;
import WaveSurfer from "wavesurfer.js";
import { useRef, useEffect } from "react";

const AudioWave = (props) => {

    const holder = useRef();

    useEffect(() => {

        holder.current.innerHTML = "";
        WaveSurfer.create({
            container: holder.current,
            waveColor: "#0994FF",
            progressColor: 'transparent',
            url: props.element.getAttribute("src"),
            normalize: true,
            interact: false,
            fillParent: true,
            barWidth: 4,
          });

    }, [holder, props.current]);

    return (
        <div className="audio-wave" ref={holder}>

        </div>
    );

}

export default AudioWave;
import './Header.css';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useState, useRef} from 'react';

const Header = () => {

    const [additional, setAdditional] = useState(false);
    const currentRef = useRef(null);

    useLayoutEffect(() => {

        document.addEventListener("scroll", () => {

            if (window.scrollY > currentRef.current.offsetHeight) 
                setAdditional(true);
            else 
                setAdditional(false);

        });

    }, []);

    return (

        <div className={"main-header" + (additional ? " small" : "")} id="main-header" ref={currentRef}>

            <Link to="/" className="header-logo">JC</Link>

            <div className="header-links">

                <div className="header-anchor">About</div>
                <div className="header-anchor">Projects</div>
                <div className="header-anchor">Contact</div>

            </div>

        </div>

    );

}

export default Header;
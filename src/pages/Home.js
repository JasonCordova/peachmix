import Header from '../components/Header.js';
import { useState } from 'react';

const Home = () => {

    const [section, setSection] = useState(null);

    return (

        <>
            <Header />
            <section className="w-sec">

                <div className="sec-title">Nice to meet you.</div>

            </section>

            <section className="b-sec">

                <div className="sec-title">Let's talk details.</div>

            </section>
        </>

    );

}

export default Home;
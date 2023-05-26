import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {
  const a=useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  
   return (
     <div>
       this is {a.state.name}
       his age is {a.state.age}
     </div>
   )
}

export default About

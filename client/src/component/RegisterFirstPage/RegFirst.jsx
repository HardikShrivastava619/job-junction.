import React, { useEffect, useRef, useState } from 'react';
import './RegFirst.css';
import { PiBuildingsFill } from 'react-icons/pi';
import { FaUserTie } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const RegFirst = ({ setBtnRemove, setRole }) => {
  const empCardRef = useRef();
  const compCardRef = useRef();
const [tab,setTab] = useState(null)






useEffect(() => {
  if (!tab) return;

  const tl = gsap.timeline();

  if (tab == 'emp') {
    tl.to('.hirerbtn',{
      y:200,
      delay:.4,
      opacity:0
    
    })

    tl.to('.emplo-btn',{

      duration:.5,
    rotate:360,
scale:10,

    })



    tl.to('.emplo-btn',{
      x:-1800,

    })


  }


  
  if (tab == 'entp') {
    tl.to('.emplo-btn',{
      y:200,
      delay:.4,
      opacity:0
    
    })

    tl.to('.hirerbtn',{

      duration:.5,
    rotate:360,
scale:10,

    })



    tl.to('.hirerbtn',{
      x:1800,

    })


  }


}, [tab]);





useGSAP(()=>{
  const tl = gsap.timeline();


  tl.from('.emplo-btn',{
    delay:1,
    y:-100,
opacity:0,
duration:1.5
  })

  gsap.from('.hirerbtn',{
    delay:1,
    y:100,
opacity:0,
duration:1.5
  })

gsap.from('.fausertie',{
  opacity:0,
delay:2.6  
})


gsap.from('.empl-head-btn',{
  opacity:0,
delay:2.7  
})



gsap.to('.emplo-btn', {
 skewY: -10,
  duration: 0.5, // half a second
  ease: "power2.in" ,
  delay:3

});
gsap.to('.hirerbtn', {
 skewY: 10,
  duration: 0.5, // half a second
  ease: "power2.in" ,
  delay:3

});

})



  return (
    <div className='two-btn-container'>
      <div
        className='emplo-btn'
        ref={empCardRef}
     onClick={() => {
setTab('emp')

setTimeout(()=>{      setRole('Employee');
          setBtnRemove(true);
},1800)
}}
      >
        <FaUserTie className='fausertie' />
        <button className='empl-head-btn'>Register as Employee</button>
      </div>

      <div
        className='hirerbtn'
onClick={() => {
setTab('entp')  
  setTimeout(()=>{
  
  
          setRole('Enterprise');
          setBtnRemove(true);

        },1800)
        }}


        >
        <PiBuildingsFill className='fausertie' />
        <button className='empl-head-btn'>Register as Enterprise</button>
      </div>
    </div>
  );
};

export default RegFirst;

/* 












           

*/
import React from 'react';
import {AiOutlineQuestionCircle,AiOutlineGift} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'


const Header = () => {
  return (
    <div
      className="header"
      style={{

        position:"fixed",
        backgroundColor:"white",
        top: 0,
        left: 47,
        width: '100%',
        display:"flex",
        justifyContent:"space-around"
      }}
      >
      <div className="logo-name-container">
      <img src={require('./t.png')}
        className='head-icon'
          style={
            { 
              height:"2.5rem",
          borderRadius:"45px"
          }
          }
          />
      <h1 className="name">iamneo.ai</h1>
    </div><div className='right'>
        <div className="search-container">
          <button className="search-button"><BsSearch
          size={"0.8rem"}
          color='black'/></button>
      <input
   
        type="text"
        placeholder="Search..."
        // onChange={(e) => onChange(e.target.value)}
        className="search-input"
        />
        </div>
        <div
        style={{
          position:"relative",
          justifySelf:"end"
        }}>
        <AiOutlineGift
        className='head-icon'
        size={"2.5rem"}
        />
        <AiOutlineQuestionCircle
        className='head-icon'
        size={"2.5rem"}/>
        <img src={require('./t.png')}
        className='head-icon'
        style={
          { height:"2.5rem",
          borderRadius:"45px"
        }
      }
      /></div></div>
      </div>
  );
};

export default Header;

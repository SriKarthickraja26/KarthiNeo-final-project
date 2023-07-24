
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsArrow90DegDown, BsArrowDown, BsArrowDownShort, BsBag, BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineStar, AiOutlineQuestionCircle, AiOutlineGift } from 'react-icons/ai'
import "../index.css"
import Header from "./header";
import axios from "axios";
import {BsSearch} from 'react-icons/bs'

// const API_URL = "https://randomuser.me/api/"; // Replace with your random API URL

// fake data generator




// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     // content: `item ${k + offset}`,
//     name: `iam`,
//     city: `NEO`,
//   }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function Dashboard() {
  // const [state, setState] = useState([]);


  const search = (key)=>{
    var temp = []
    var s = state;
    
    state.map((item,idx)=>{//[[{},{}],[],[]]
      
      temp.push([])
      item.map((ele,oidx)=>{
        console.log(ele)
        if(ele.name.toLowerCase().includes(key.toLowerCase()) && !temp[idx].includes(ele)){
          temp[idx].push(ele)
        }
      
      })
    })
    temp.length>0 ? setState(temp): setState(s)
  }


  const [state, setState] = useState([[{
    id:"101",
    name: "Abishek",
    company: "IamNeo"
  },
  {
    id:"102",
    name: "Balu",
    company: "Appviewx"
  },
  {
    id:"103",
    name: "Charles",
    company: "AppviewX"
  },{
    id:"104",
    name: "Daniel",
    company: "Wipro"
  },{
    id:"105",
    name: "Joseph",
    company: "TCS"
  },{
    id:"106",
    name: "Virat",
    company: "IBM"
  },{
    id:"107",
    name: "Ganesh",
    company: "TCS"
  },,{
    id:"108",
    name:"Mahesh",
    company:"Neo"
  }], [{
    id:"201",
    name:"David",
    company:"Hexaware"
  },{
    id:"202",
    name:"Keerthi",
    company:"CTS"
  },{
    id:"203",
    name:"Joe",
    company:"Wipro"
  },{
    id:"204",
    name:"Vijay",
    company:"CodingMart"
  },{
    id:"205",
    name:"Mithun",
    company:"Kaar Tech"
  }],[{
    id:"301",
    name:"Sri",
    company:"IamNeo"
  },{
    id:"302",
    name:"Rahul",
    company:"Hexaware"
  },{
    id:"303",
    name:"Kishor",
    company:"Accenture"
  },{
    id:"304",
    name:"Rahul",
    company:"TCS"
  },{
    id:"305",
    name:"Soloman",
    company:"Mallow Tech"
  },{
    id:"306",
    name:"Sanjeev",
    company:"Avasoft"
  }],[
    {
      id:"401",
      name:"Raja",
      company:"IamNeo"
    },{
      id:"402",
      name:"Sanjay",
      company:"Mallow Tech"
    },
    {
      id:"403",
      name:"Sangamesh",
      company:"Wipro"
    },{
      id:"404",
      name:"Sabari",
      company:"Neo"
    },{
      id:"405",
      name:"Swathi",
      company:"Neo"
    },{
      id:"406",
      name:"Siva",
      company:"Neo"
    },{
      id:"407",
      name:"Lekha",
      company:"Neo"
    }
  ],[
    {
      id:"501",
      name:"Manju",
      company:"Neo"
    }
  ],[
    {
      id:"601",
      name:"Nithya",
      company:"Neo"
    },
    {
      id:"602",
      name:"Priya",
      company:"Neo"
    },{
      id:"603",
      name:"Kumar",
      company:"Neo"
    },{
      id:"604",
      name:"Krithika",
      company:"Neo"
    },{
      id:"605",
      name:"Elango",
      company:"Neo"
    }
  ]]);
  function onDragEnd(result) {
    const { source, destination } = result;


    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (

    
    <div
      style={{
        backgroundColor: "white",
        height: "1rem",
        padding: '1rem',
        paddingLeft: '3rem'
      }}
    >
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
      onChange={(e)=>{search(e.target.value)}}
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
      {/* <div>
        <div
          className="buttons"
          style={{

            justifyContent: "flex-end",
            paddingBottom: "1rem"
          }}
        >
          <button
            style={{
              marginTop: "2rem",
              marginRight: "25px",
              paddingRight: "1rem",
              padding: "10px",
              backgroundColor: "blue",
              color: "white", // Set text color to white
              border: "none", // Remove border
              borderRadius: "1px", // Add border radius for rounded corners
              cursor: "pointer", // Show pointer cursor on hover

            }}
            type="button"
            onClick={() => {
              setState([...state, []]);
            }}
          >
            Add new group
          </button>
          <button
            style={{
              marginTop: "2rem",
              marginRight: "25px",
              paddingRight: "1rem",
              padding: "10px",
              backgroundColor: "darkblue",
              color: "white", // Set text color to white
              border: "none", // Remove border
              borderRadius: "1px", // Add border radius for rounded corners
              cursor: "pointer", // Show pointer cursor on hover
            }}
            type="button"
            onClick={() => {
              setState([...state, getItems(1)]);
            }} */}
          {/* >
            Add new item
          </button> */}
        {/* </div></div> */}

        <div style={{display:"flex",width:"100vw",padding:"20px",backgroundColor:"white",alignItems:"center",gap:"6px",marginTop:"50px"}}>
  <BsBag/>
  <h4>Jobs  </h4>
  <h4 style={{color:"gray"}}>{">"} Full Stack Developer</h4>
  
</div>
<div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"10px"}}>
  <h4>All candidates </h4>
  <h4 style={{color:"gray"}}>- Active (32)</h4>
  <BsArrowDownShort style={{scale:"120%"}}/>
</div>


      <div style={{ display: "flex", gap: "12px", padding: "0.7rem", alignItems: "center", flexDirection: "row", width: "100vw", justifyContent: "flex-start" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", width: "14.5rem", backgroundColor: "white", boxShadow: "2rem" }}>
          <div style={{ minHeight: "100%", minWidth: "5px", backgroundColor: "gray" }}>

          </div>
          <h4>Open</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", width: "14.5rem", backgroundColor: "white", boxShadow: "2rem" }}>
          <div style={{ minHeight: "100%", minWidth: "5px", backgroundColor: "yellow" }}>

          </div>
          <h4>Contacted</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", width: "14.5rem", backgroundColor: "white", boxShadow: "2rem" }}>
          <div style={{ minHeight: "100%", minWidth: "5px", backgroundColor: "yellow" }}>

          </div>
          <h4>Written test</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", width: "14.5rem", backgroundColor: "white", boxShadow: "2rem" }}>
          <div style={{ minHeight: "100%", minWidth: "5px", backgroundColor: "yellow" }}>

          </div>
          <h4>Verbal test</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", marginLeft: "18px", width: "14.5rem", backgroundColor: "white", boxShadow: "2rem" }}>
          <div style={{ minHeight: "100%", minWidth: "5px", backgroundColor: "yellow" }}>

          </div>
          <h4>Communication test</h4>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", marginLeft: "18px", width: "14.5rem", backgroundColor: "white", boxShadow: "2rem" }}>
          <div style={{ minHeight: "100%", minWidth: "5px", backgroundColor: "yellow" }}>

          </div>
          <h4>Technical test</h4>
        </div>


      </div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >{console.log(el)}
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={
                            getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                        >
                          <div
                            style={{
                              padding: ".7rem",
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              height: "5rem"
                            }}
                          >

                            {item.content}
                            <h4 style={{ color: "blue" }}>{item.name}</h4>
                            <br />
                            <h4 style={{ marginTop: "-15px" }}>{item.company}</h4>
                            <h6 style={
                              {
                                display: "absolute",
                                marginLeft: "150px"
                              }
                            }>REQ: #1062</h6>
                          </div>
                          <div style={{
                            backgroundColor: "lightgrey",
                            height: '2rem',
                            display: 'flex',
                            alignItems: "center"
                          }}>

                            <div
                              style={{
                                marginLeft: "5px",
                                alignItems: "left"
                              }}
                            >
                              <AiOutlineStar />
                              <AiOutlineStar />
                              <AiOutlineStar />
                              <AiOutlineStar />
                              <AiOutlineStar /></div>
                            <div
                              style={{
                                paddingLeft: "6rem",
                                display: "flex",
                                justifyContent: 'flex-end'
                              }}>
                              <img src={require('./t.png')}
                                style={
                                  {
                                    height: "1.3rem",
                                    borderRadius: "45px"
                                  }
                                }
                              />
                              <BsThreeDotsVertical
                                size={"1.3rem"}
                              /></div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
export default Dashboard;

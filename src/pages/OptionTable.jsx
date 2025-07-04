import { useState,useRef, useEffect } from "react";
import Select from "react-select";
import './App.css'
import React from "react";

const OptionTable = (props) => {
    const [tabledata,setTableData] = useState(props.table);
    const [sumCredit,setSumCredit] = useState(0)
    useEffect(()=>{
        setTableData(props.table);
        let sum = 0
        props.table.map((row) =>{
          if(row.labbool == false){ sum += Number(row.credit) }
          else{ sum += Number(row.credit) + Number(row.lab.credit) } 
        })
        setSumCredit(sum);
    },[props.table]);

    const makeCourseStr = (creditL) => {
      let strtmp = ""
      for(let x in creditL){
        strtmp += creditL[x] + "+"
      }
      return strtmp.slice(0,-1)
    }

    const makeRow = (row,index) => {
      if(row.labbool == true){
        return(
          <tr className="labtheory">
              <td>{index+1}</td>
              <td>{makeCourseStr(row.courseslot)} <br/> {makeCourseStr(row.lab.courseslot)}</td>
              <td>{row.coursename} <br/> {row.lab.coursename} </td>
              <td>{row.coursecode} <br/> {row.lab.coursecode}</td>
              <td>{row.facultyname}</td>
              <td>{row.credit} <br/> {row.lab.credit}</td>
              <td><button className="style2" onClick={() => props.func(row)}><i className="material-icons" id = {props.iconid}>{props.iconname}</i></button></td>
          </tr> 
        )
      }
      return(
        <tr className="tablerow">
            <td>{index+1}</td>
            <td>{makeCourseStr(row.courseslot)}</td>
            <td>{row.coursename}</td>
            <td>{row.coursecode}</td>
            <td>{row.facultyname}</td>
            <td>{row.credit}</td>
            <td><button className="style2" onClick={() => props.func(row)}>
                <i className="material-icons" id = {props.iconid}>{props.iconname}</i>
              </button></td>
        </tr> 
      )
    }

    const totalCredit = () => {
      if(props.totcredit == true){
        return(<tr className="tablerow"><td colSpan={7}>Total Credits: {sumCredit} </td></tr>)
      }
      return;
    }

    const noOption = () => {
      if(tabledata.length == 0){
        return(
          <tr>
            <td>-</td><td>-</td><td>-</td><td>-</td>
            <td>-</td><td>-</td><td>-</td>
          </tr>
        )
      }
      return null
    }

    return(
        <div id = "option">
          <table className = 'tbl'>
            <tr className="tablehead">
              <th>No.</th><th>Course Slot</th><th>Course Name</th><th>Course Code</th>
              <th>Faculty Name</th><th>Credit</th> <th>{props.funcname}</th>
            </tr>
            {noOption()}
            {tabledata.map((row,index)=>(
              makeRow(row,index)           
            ))}
            {totalCredit()}
          </table>
        </div>
    );
}

export default OptionTable;
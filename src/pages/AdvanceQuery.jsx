import { useEffect, useState } from "react";
import Select from "react-select";
import Papa from "papaparse";
import './App.css'
import React from "react";
import DropDown from "./DropDown";
import TimeTable from "./TimeTable";
import OptionTable from "./OptionTable";

function AdvanceQuery(){

    //Form Elements
    const coursenamelist = [
      { value: 'Choose Semester', label: 'Choose Semester' }
    ];
    const [courseNameList,setCourseNameList] = useState(coursenamelist);
    const [courseName,setCourseName] = useState(null);

    const coursefacultylist = [
      { value: 'Choose Semester', label: 'Choose Semester' }
    ];
    const [courseFacultyList,setCourseFacultyList] = useState(coursefacultylist);
    const [courseFaculty,setCourseFaculty] = useState(null);

    const courseslotlist = [
      { value: 'Choose Semester', label: 'Choose Semester' }
    ];

    const [courseSlotList,setCourseSlotList] = useState(courseslotlist);
    const [courseSlot,setCourseSlot] = useState(null);
    const coursemornevenlist = [
      { value: 'morning', label: 'Morning' },
      { value: 'evening', label: 'Evening' }
    ];

    const [courseMornEvenList,setCourseMornEvenList] = useState(coursemornevenlist);
    const [courseMornEven,setCourseMornEven] = useState(null);

    // semester select
    
    const semester = ["Select Semester","Winter Semester 2024"];
    const [semesterList,setSemesterList] = useState(semester);
    const [selectedSemester,setSelectedSemester] = useState(0);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // load data 

    const loadCsv = async (url) => {
      const response = await fetch('https://raw.githubusercontent.com/navinkumar-classic/ffcsproassets/refs/heads/main/winter24-25.csv');
      const text = await response.text();
  
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          setLoading(false);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setLoading(false);
        },
      });
    };

    useEffect(()=>{
      loadCsv("url");
    },[])

    useEffect(()=>{
      const tmpdata = data
      tmpdata.map((key)=> key["FACULTY"] = key["FACULTY"].split(" ")
      .map(part => part.charAt(0) + part.slice(1).toLowerCase())
      .join(" "))
    },[data])

    // set deafult option values

    const updateDefaultOptions = (rowname,setfunction) => {
      const uniqueopt = [...new Set(data.map(row => row[rowname]))]; 
      const formattedOptions = uniqueopt.map(jk => ({
        value: jk,
        label: jk,
      }));
      setfunction(formattedOptions); 
    };
    
    const handleSemesterChange = (e) => {
      setSelectedSemester(e.target.value);
      updateDefaultOptions('FACULTY',setCourseFacultyList);
      updateDefaultOptions('SLOT',setCourseSlotList);
      updateDefaultOptions('COURSE TITLE',setCourseNameList);
    }

    //option change does not work 

    const changeOptionList = (rowname,setfunction) => {
      let filteringdata = data;
      if(courseName != null){
        filteringdata = filteringdata.filter(row => row['COURSE TITLE'] === courseName.value)
      }
      if(courseFaculty != null){
        filteringdata = filteringdata.filter(row => row['FACULTY'] === courseFaculty.value)
      }
      if(courseSlot != null){
        filteringdata = filteringdata.filter(row => row['SLOT'] === courseSlot.value)
      }
      if(courseMornEven != null){
        filteringdata = filteringdata.filter(row => checkMornEven(row['SLOT'],courseMornEven) === true)
      }
      if(rowname == "MORNEVEN"){
        if(courseSlot != null){
          console.log(courseSlot.value)
          if(checkMornEven(courseSlot.value,{value: "morning"}) == true){
            setfunction([{value: "morning", label: "Morning"}])
          }
          else if(checkMornEven(courseSlot.value,{value: "evening"}) == true){
            setfunction([{value: "evening", label: "Evening"}])
          }
        }
      }
      else{
        const uniqueopt = [...new Set(filteringdata.map(row => row[rowname]))]; 
        const formattedOptions = uniqueopt.map(jk => ({
          value: jk,
          label: jk,
        }));
        setfunction(formattedOptions);
      }
    }

    useEffect(()=>{

      changeOptionList('FACULTY',setCourseFacultyList);
      changeOptionList('SLOT',setCourseSlotList);
      changeOptionList('COURSE TITLE',setCourseNameList);
      changeOptionList('MORNEVEN',setCourseMornEvenList);

    },[courseFaculty,courseName,courseSlot,courseMornEven])

    //decide whether lab is morning ot evening 

    const morningLab = [
      "L31", "L32", "L33", "L34", "L35", "L36", "L37", "L38", "L39", "L40",
      "L41", "L42", "L43", "L44", "L45", "L46", "L47", "L48", "L49", "L50",
      "L51", "L52", "L53", "L54", "L55", "L56", "L57", "L58", "L59", "L60"
    ]

    const eveningLab = [
      "L1", "L2", "L3", "L4", "L7", "L8", "L9", "L10",
      "L13", "L14", "L15", "L16", "L19", "L20",
      "L21", "L22", "L25", "L26", "L27", "L28"
    ]

    const middleLab = [
      "L5", "L6","L11", "L12", "L17", "L18", "L23", "L24", "L29", "L30"
    ]
    

    const labSemester = (slotlist) => {
      for(let i in slotlist){
        if(morningLab.includes(slotlist[i])){
          return "morning"
        }
        else if(eveningLab.includes(slotlist[i])){
          return "evening"
        }
      }
      return "middle"
    }

    const checkMornEven = (slot,morneven) => {
      if (morneven.value == "morning"){
        if(slot[0] == "L"){
          let ver = labSemester(slot.split("+"))
          if (ver == "morning" || ver == "middle"){
            return true
          }
        }
        else{
          if(slot.split("+")[0].slice(-1) != "2"){
            return true
          }
        }
      }
      else if(morneven.value == "evening"){
        if(slot[0] == "L"){
          let ver = labSemester(slot.split("+"))
          if (ver == "evening" || ver == "middle"){
            return true
          }
        }
        else{
          if(slot.split("+")[0].slice(-1) == "2"){
            return true
          }
        }
      }
      return false
    }


    //submit function
    const submit = () => {
      let filteringdata = data;
      if(courseName != null){
        filteringdata = filteringdata.filter(row => row['COURSE TITLE'] === courseName.value)
      }
      if(courseFaculty != null){
        filteringdata = filteringdata.filter(row => row['FACULTY'] === courseFaculty.value)
      }
      if(courseSlot != null){
        filteringdata = filteringdata.filter(row => row['SLOT'] === courseSlot.value)
      } 
      if(courseMornEven != null){
        filteringdata = filteringdata.filter(row => checkMornEven(row['SLOT'],courseMornEven) === true)
      }

      let optionsmap = []
      filteringdata.map((key)=>{
        //
        let labcompul = false
        let labinfo = {}
        if(String(key['COURSE CODE']).slice(-1) == "L"){
          let labcode = String(key['COURSE CODE']).slice(0,-1)+"P"
          let temp = data.filter(ro => ro['COURSE CODE'] === labcode && ro['FACULTY'] === key['FACULTY'])
          if(temp.length > 0){
            labcompul = true
            let jk = 0;
            if(temp.length >  1){
              let t0 = labSemester(temp[0]["SLOT"].split("+"))
              let t1 = labSemester(temp[1]["SLOT"].split("+"))
              let morn = Number(key["SLOT"].split("+")[0].slice(-1))
              if(morn == 1){
                if(t0 == "morning") jk = 0
                else if(t1 == "morning") jk = 1
                else if(t0 == "middle") jk = 0
                else if(t1 == "middle") jk = 1
              }
              else{
                if(t0 == "evening") jk = 0
                else if(t1 == "evening") jk = 1
                else if(t0 == "middle") jk = 0
                else if(t1 == "middle") jk = 1
              }
            }
            labinfo = {coursecode: temp[jk]["COURSE CODE"], coursename: temp[jk]["COURSE TITLE"], facultyname: temp[jk]["FACULTY"],
            credit: temp[jk]["CREDITS"], courseslot: temp[jk]["SLOT"].split("+")}
          }
        }
        //
        optionsmap.push({coursecode: key["COURSE CODE"], coursename: key["COURSE TITLE"], facultyname: key["FACULTY"],
        credit: key["CREDITS"], courseslot: key["SLOT"].split("+"), labbool: labcompul, lab: labinfo})
      })

      setTableData(optionsmap);
      setResetFlag(!resetFlag);
    }

    //option table data
    let table = [];
    const [tableData,setTableData] = useState(table);
    const [courseTableData,setCourseTableData] = useState([]);

    //reset function
    const [resetFlag, setResetFlag] = useState(null);
    const reset = () => {
      setResetFlag(!resetFlag);
      setTableData([])
    }

    //timetable
    const timetablemap = [
      [["A1","L1",""],["F1","L2",""],["D1","L3",""],["TB1","L4",""],["TG1","L5",""],["S11","L6",""],["A2","L31",""],["F2","L32",""],["D2","L33",""],["TB2","L34",""],["TG2","L35",""],["S3","L36",""]],
      [["B1","L7",""],["G1","L8",""],["E1","L9",""],["TC1","L10",""],["TAA1","L11",""],["","L12",""],["B2","L37",""],["G2","L38",""],["E2","L39",""],["TC2","L40",""],["TAA2","L41",""],["S1","L42",""]],
      [["C1","L13",""],["A1","L14",""],["F1","L15",""],["TD1","L16",""],["TBB1","L17",""],["","L18",""],["C2","L43",""],["A2","L44",""],["F2","L45",""],["TD2","L46",""],["TBB2","L47",""],["S4","L48",""]],
      [["D1","L19",""],["B1","L20",""],["G1","L21",""],["TE1","L22",""],["TCC1","L23",""],["","L24",""],["D2","L49",""],["B2","L50",""],["G2","L51",""],["TE2","L52",""],["TCC2","L53",""],["S2","L54",""]],
      [["E1","L25",""],["C1","L26",""],["TA1","L27",""],["TF1","L28",""],["TDD1","L29",""],["S15","L30",""],["E2","L55",""],["C2","L56",""],["TA2","L57",""],["TF2","L58",""],["TDD2","L59",""],["","L60",""]]
    ]

    //removing and adding data to final table and time table
    const [timeTableData,setTimeTableData] = useState(timetablemap);
    
    const removeFromTimeTable = (row) => {
      let tmp = timeTableData;
      let slotlist = row.courseslot
      slotlist = slotlist.map((row, index) => {
        if (Number.isNaN(Number(row.slice(-1))) && row.slice(0) != "L") {
          return row + "1";
        }
        return row;
      });
      for(let i in slotlist){
        for(let j in tmp){
          for(let k in tmp[0]){
            if(tmp[j][k][0] == slotlist[i] || tmp[j][k][1] == slotlist[i]){
              tmp[j][k][2] = ""
            }
          }
        }
      }
      if(row.labbool == true){
        slotlist = row.lab.courseslot
        for(let i in slotlist){
          for(let j in tmp){
            for(let k in tmp[0]){
              if(tmp[j][k][0] == slotlist[i] || tmp[j][k][1] == slotlist[i]){
                tmp[j][k][2] = ""
              }
            }
          }
        }
      }
      setTimeTableData(prev => tmp)
    }

    const remcourse = (row) => {
      setCourseTableData(prev => prev.filter(item => item !== row));
      removeFromTimeTable(row)
    }

    const addToTimeTable = (row) => {
      let tmp = timeTableData;
      let slotlist = row.courseslot
      slotlist = slotlist.map((row, index) => {
        if (Number.isNaN(Number(row.slice(-1))) && row.slice(0) != "L") {
          return row + "1";
        }
        return row;
      });
      for(let i in slotlist){
        for(let j in tmp){
          for(let k in tmp[0]){
            if(tmp[j][k][0] == slotlist[i] || tmp[j][k][1] == slotlist[i]){
              tmp[j][k][2] = row.coursecode
            }
          }
        }
      }

      if(row.labbool == true){
        slotlist = row.lab.courseslot
        for(let i in slotlist){
          for(let j in tmp){
            for(let k in tmp[0]){
              if(tmp[j][k][0] == slotlist[i] || tmp[j][k][1] == slotlist[i]){
                tmp[j][k][2] = row.lab.coursecode
              }
            }
          }
        }
      }
      setTimeTableData(prev => tmp)
    }

    const slotTaken = (slotlist,coursename) => {
      let tmp = timeTableData;
      for(let i in slotlist){
        for(let j in tmp){
          for(let k in tmp[0]){
            if(tmp[j][k][0] == slotlist[i] || tmp[j][k][1] == slotlist[i]){
              if(tmp[j][k][2] != ""){
                return true
              }
            }
          }
        }
      }
      for(let i in courseTableData){
        if(coursename == courseTableData[i].coursename){
          return true
        }
      }
      return false
    }

    const addcourse = (row) => {
      let tmpcourseslot = row.courseslot
      if(row.labbool == true){
        tmpcourseslot = row.courseslot.concat(row.lab.courseslot)
      }
      tmpcourseslot = tmpcourseslot.map((row, index) => {
        if (Number.isNaN(Number(row.slice(-1))) && row.slice(0) != "L") {
          return row + "1";
        }
        return row;
      });
      console.log(tmpcourseslot)
      if(courseTableData.includes(row) == false && slotTaken(tmpcourseslot,row.coursename) == false){
        setCourseTableData(prev => [...prev,row]);
        addToTimeTable(row);
      }
    }

    return(
        <>
          <div id = "selcourse">
            {/*Select Course*/} 
            <select id = "sel" value = {selectedSemester} onChange={(e) => handleSemesterChange(e)}>
                {semesterList.map((row,index)=>(
                  <option value={index}>{row}</option>
                ))}
            </select>
            {/*Select Course - end*/} 
            
            {/*Advance Query*/}
            <div id = "query">

              <div id = 'querytitle'>
                <h2 id = 'h2c'>Advance Query</h2>
                <div id="help">
                  <i className="material-icons" id = "hlp">info</i>
                  <span open id = "hlp1">Tip 1: Choose Course, Faculty, or Slot etc. to refine your search. 
                  Leaving a field blank will include all options for that field.</span>
                </div>
              </div>

              <div id = 'querybody'>
                <DropDown option = {courseNameList} val = {courseName} onchange = {setCourseName} resetflag = {resetFlag}
                placeholder = "Type/Select Course"/>
                <DropDown option = {courseFacultyList} val = {courseFaculty} onchange = {setCourseFaculty} resetflag = {resetFlag}
                placeholder = "Type/Select Faculty"/>
                <DropDown option = {courseSlotList} val = {courseSlot} onchange = {setCourseSlot} resetflag = {resetFlag}
                placeholder = "Type/Select Slot"/>
                <DropDown option = {courseMornEvenList} val = {courseMornEven} onchange = {setCourseMornEven} resetflag = {resetFlag}
                placeholder = "Morning/Evening"/>
              </div>
              {/*<div id = "tip1">Tip 1: Choose Course, Faculty, or Slot to refine your search. 
              Leaving a field blank will include all options for that field.</div>*/}
              <div id = "butcont">
                <div><button className= "style1" onClick={submit}>Search</button></div>
                <div><button className= "style1" onClick={reset}>Reset</button></div>
              </div>
            </div>
            {/*Advance Query - end*/}
            
            <h2 style={{textAlign: "center", fontSize: "1.7em"}}>Options</h2>
            <OptionTable title = "Options" table = {tableData} funcname = "Add" iconname = "queue" 
            func = {addcourse} totcredit = {false} iconid = "q"/>

            <h2 style={{textAlign: "center", fontSize: "1.7em"}}>Time Table</h2>
            <TimeTable content = {timeTableData}/>

            <h2 style={{textAlign: "center", fontSize: "1.7em"}}>Courses List</h2>
            <OptionTable title = "Courses List" table = {courseTableData} funcname = "Remove" iconname = "delete_forever" 
            func = {remcourse} totcredit = {true} iconid = "d"/>
          </div>
          
        </>
    )
}

export default AdvanceQuery
import { useEffect, useState } from "react";
import Select from "react-select";
import './App.css'
import React from "react";

function TimeTable(props){

    const [table,setTable] = useState(props.content)

    useEffect(() => {
      setTable(props.content);
    },[props.content])

    const theorytiming = [["8:00AM","8:50AM"],["8:55AM","9:45AM"],["9:50AM","10:40AM"],["10:45AM","11:35AM"],["11:40AM","12:30PM"],
    ["12:35PM","1:25PM"],["2:00PM","2:50PM"],["2:55PM","3:45PM"],["3:50PM","4:40PM"],["4:45PM","5:35PM"],["5:40PM","6:30PM"],
    ["6:35PM","7:25PM"]]

    const labtiming = [["8:00AM","8:50AM"],["8:55AM","9:45AM"],["9:50AM","10:40AM"],["10:45AM","11:35AM"],["11:40AM","12:30PM"],
    ["12:35PM","1:25PM"],["2:00PM","2:50PM"],["2:55PM","3:45PM"],["3:50PM","4:40PM"],["4:45PM","5:35PM"],["5:40PM","6:30PM"],
    ["6:35PM","7:25PM"]]

    const cellValue = (index,i) => {
      if(table[i][index][2] == ""){
        return(<td className="normalcell">{table[i][index][0] + "/" + table[i][index][1]}</td>)    
      }
      else{
        return(<td className="occupiedcell">{table[i][index][0] + "/" + table[i][index][1]} <br/> <div className="smoltext">{table[i][index][2]}</div> </td>)
      }
    }
    return(
        <div id = "timetable">
          <table id = "ttable">
            <tr className="ttablehead">
              <th> Theory <br/> Hours </th>
              {theorytiming.slice(0,6).map((row) => (
                <th className="time">
                    {row[0]} <br/> To <br/> {row[1]}
                </th>
              ))}

              <th rowSpan = {9}>L<br/>U<br/>N<br/>C<br/>H<br/></th>
              {theorytiming.slice(6,12).map((row) => (
                <th className="time">
                    {row[0]} <br/> To <br/> {row[1]}
                </th>
              ))}
            </tr>

            <tr className="ttablehead">
              <th> Lab <br/> Hours </th>
              {labtiming.slice(0,6).map((row) => (
                <th className="time">
                    {row[0]} <br/> To <br/> {row[1]}
                </th>
              ))}

              {labtiming.slice(6,12).map((row) => (
                <th className="time">
                    {row[0]} <br/> To <br/> {row[1]}
                </th>
              ))}
            </tr>
            <tr>
                <th>Mon</th>
                {table[0].map((row,index) => (
                  cellValue(index,0)
                ))}
            </tr>
            <tr>
                <th>Tue</th>
                {table[1].map((row,index) => (
                  cellValue(index,1)
                ))}
            </tr>
            <tr>
                <th>Wed</th>
                {table[2].map((row,index) => (
                  cellValue(index,2)
                ))}
            </tr>
            <tr>
                <th>Thus</th>
                {table[3].map((row,index) => (
                  cellValue(index,3)
                ))}
            </tr>
            <tr>
                <th>Fri</th>
                {table[4].map((row,index) => (
                  cellValue(index,4)
                ))}
            </tr>

          </table>
        </div>
    );
}

export default TimeTable;
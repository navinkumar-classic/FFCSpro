import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import "./App.css";

function DropDown(props){
    const formRef = useRef();
    const [option,setOption] = useState(props.option);

    //change options function
    useEffect(()=>{
        setOption(props.option);
        //formRef.current.clearValue();

    },[props.option])

    //reset function
    useEffect(()=>{
        formRef.current.clearValue();
    },[props.resetflag])

    const cstyle = {
        control: (provided, state) => ({
          ...provided,
          boxShadow: "none",
          border: "none",
          backgroundColor: "#050505",
          color: "white",
          width:"100%",
          fontSize: "1em",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: "white",
        }),
    }

    return(
        <>
          <Select
            ref={formRef} 
            id = "select"
            options={option}
            placeholder={props.placeholder}
            theme={(theme) => ({
                ...theme, borderRadius: 0,
                colors: { ...theme.colors,neutral0: '#050505', neutral50: 'white', neutral80: 'white'}
            })}
            styles={cstyle}
            value={props.val}
            onChange={props.onchange}
            isSearchable = {true}
            isClearable = {true}
            onMenuOpen={()=>{formRef.current.clearValue()}}
            />
        </>
    )
}

export default DropDown;
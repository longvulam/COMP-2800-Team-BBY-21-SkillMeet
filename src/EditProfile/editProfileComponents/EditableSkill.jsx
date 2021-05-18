
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const skillsList = ["Java", "C#"];

export default function EditableSkill(props) {
    const { skillName, skillLevel, skillDescription }= props;
    const [expanded, setExpanded] = useState(false);
    function expandSkills() {
        setExpanded(!expanded);
    }
    
    return (
      <Paper
        style={{
          width:'100%',
        }}>
        <div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-around',
        }}>
        <div
        div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-around',
          width:'calc(100% - 5em)',
        }}>
        <Autocomplete
          options={skillsList}
          getOptionLabel={(option) => option}
          defaultValue={{}}
          style={{ width:'55%', }}
          renderInput={(params) => <TextField {...params} 
            style={{
              border:'none',
            }} 
            variant="standard"/>}        
        />
        <Autocomplete
          options={skillsList}
          getOptionLabel={(option) => option}
          defaultValue={{}}
          style={{ width: '35%', }}
          renderInput={(params) => <TextField {...params} 
            style={{
              border:'none',
            }} 
            variant="standard"/>}        
        />
        </div>
        <IconButton>
          <DeleteIcon
          />
        </IconButton>
        </div>
        <div style={{
            display:'flex',
            justifyContent:'center',
            width:'100%',
          }}>
             <InputBase
            defaultValue={skillDescription}
            readOnly={false}
            multiline
            defaultValue={"HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"}
            style={{
              width:'95%',
              textAlign:'center',
            }}
            >
            </InputBase>
          </div>
      </Paper>

  );
}
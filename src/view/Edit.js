import React, { useState, Fragment, useEffect } from 'react'
import {
    Box,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Divider,
    MenuItem,
    FormLabel,
    FormControlLabel,
    InputLabel,
    FormControl,
  } from "@mui/material";
  import Axios from "axios";
  import Select, { SelectChangeEvent } from "@mui/material/Select";
  import CloseIcon from "@mui/icons-material/Close";

function Edit(props) {
    const [status,setStatus] = useState(props.currentUser.status)
    const [comments,setComments] = useState(props.currentUser.comments)
    console.log('status',status);
    const id = props.currentUser.id
    const handleCancel = () => {
        props.handleClose();
        props.setView(false);    
    }
    const state = {status:status,comments:comments}
    console.log(state);
    const handleSubmit = () => {
        props.handleClose();
        Axios.patch("http://localhost:9001/member/update/63d7b60777f1c868f3581279", state)
        .then(({data}) => {
           console.log(data);
        });
    }
        const city = props.currentUser.city
        const district = props.currentUser.district
        const amtrequest = props.currentUser.amtrequest
        const aidtype = props.currentUser.aidtype
        const reasonforrequesting = props.currentUser.reasonforrequesting
        const uname = props.currentUser.uname
        const ivname = props.currentUser.ivname
        const usvname = props.currentUser.usvname
        const committeenotes = props.currentUser.committeenotes
  return (
    <>
    <DialogTitle sx={{bgcolor:'#1C3812',color:'white'}}>
        <Box display="grid"  gridTemplateColumns="repeat(12, 1fr)">
          <Box
            gridColumn="span 5"
            display="flex"
          >
            View 
          </Box>
          <Box
            gridColumn="span 6"
            display="flex"
          ></Box>
          <Box
            gridColumn="span 1"
            display="flex"
          >
            <CloseIcon onClick={handleCancel} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
      <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          //gridAutoRows="60px"
          gap="10px"
        >
     <Box gridColumn="span 6" margin="8px">
        City = {city}
        </Box>
        <Box gridColumn="span 6" margin="8px">
        District = {district}
        </Box>
        <Box gridColumn="span 6" margin="8px">
        Amtrequest = {amtrequest}
        </Box>
        <Box gridColumn="span 6" margin="8px">
          Aid Type = {aidtype}
        </Box>
        <Box gridColumn="span 6" margin="8px">
           Reason for requesting = {reasonforrequesting}
        </Box>
        <Box gridColumn="span 6" margin="8px">
           InstitutionName = {uname}
        </Box>
        <Box gridColumn="span 6" margin="8px">
           India Volunteer Name = {ivname}
        </Box>
        <Box gridColumn="span 6" margin="8px">
           USA Volunteer Name = {usvname}
        </Box>
        <Box gridColumn="span 6" margin="8px">
          Committee Notes = {committeenotes}
        </Box>
        <Box gridColumn="span 6" margin="8px">
          Comments = {comments}
        </Box>
        <Box gridColumn="span 12" margin="8px">
        <Divider/>
        </Box>
        <Box gridColumn="span 6" margin="8px">
        <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
         <Select    
         size='small'
         label="Status"
         value={status}
         required
         labelId="demo-select-small"
         id="demo-select-small"
         onChange={e => setStatus(e.target.value)}
          name="status"
         >
           <MenuItem value='Requested'>Requested</MenuItem>
           <MenuItem value='Received'>Received</MenuItem>
           <MenuItem value='On Hold'>On Hold</MenuItem>
           <MenuItem value='Rejected'>Rejected</MenuItem>
           <MenuItem value='Approved'>Approved</MenuItem>
         </Select>
         </FormControl>
        </Box>
        <Box gridColumn="span 6" margin="8px">
            <TextField
              size="small"
              id="outlined-basic"
              label="Comments"
              name="comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
              variant="outlined"
            />
            </Box>
        </Box>
        <DialogActions>
        <Button variant="contained" color="success" onClick={handleSubmit} >
          OK 
        </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
}

export default Edit
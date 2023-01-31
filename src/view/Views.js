import React, { useState, Fragment, useEffect } from 'react'
import {Table, TableBody, TableContainer,  TableHead,  TableRow,  Paper, styled  } from '@mui/material';
import { DialogActions,DialogContent,DialogContentText, 
  DialogTitle,Divider,MenuItem,InputLabel,FormControl  } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Axios from "axios";
import { Box,TextField,Dialog,Button,InputAdornment,  } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Edit from './Edit';
import Pagination from './Pagination';
function Views() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const [listall, setListAll] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
    useEffect(() => {
       Axios.get('http://localhost:9001/member/listall/user').then(res => { 
       console.log('Getting axios data',res.data)   
       setListAll(res.data)
        }).catch(err => console.log(err))    
      }, []);
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      const currentPosts = listall.slice(firstPostIndex, lastPostIndex);
const initialFormState = {id:null,address: { city:'' },address: { district:'' },aidinformation: { amtrequest:'' },
aidinformation: { aidtype:'' },aidinformation: { reasonforrequesting:'' },institutiondetails: { uname:'' },indiavolunteer: { ivname:''}}
     const [currentMember,setCurrentMember] = useState(initialFormState)
     const [currentUser,setCurrentUser] = useState(initialFormState)
     console.log('Currentuser',currentUser)
     console.log('Usestate data',listall);
     const [opens,setOpens] = useState(false);
     const [searchTerm,setSearchTerm] = useState('');
     const handleClosed = () => {
      setOpens(false);
    };  
     const handleOpen = (user) => {
      setOpens(true);
      setCurrentMember({id:user.id,city:user.address.city,district:user.address.district,amtrequest:user.aidinformation.amtrequest,
      aidtype:user.aidinformation.aidtype,reasonforrequesting:user.aidinformation.reasonforrequesting,
      uname:user.institutiondetails.uname,ivname:user.indiavolunteer.ivname});
      }
      const editRow = (user) => {
        setView(true);
        setOpen(true);
        console.log("hi");
        setCurrentUser({id:user._id,city:user.address.city,district:user.address.district,amtrequest:user.aidinformation.amtrequest,
          aidtype:user.aidinformation.aidtype,reasonforrequesting:user.aidinformation.reasonforrequesting,
          uname:user.institutiondetails.uname,ivname:user.indiavolunteer.ivname,usvname:user.usavolunteer.usvname,
          committeenotes:user.committeenotes,comments:user.comments,status:user.status});
          }
      const handleEvent = (event) =>{
        setSearchTerm(event.target.value);
    }
      const search = (datas) => {
        return datas.filter(
          (item) =>
           item.indiavolunteer['ivname'].toLowerCase().includes(searchTerm) ||
           item.usavolunteer['usvname'].toLowerCase().includes(searchTerm) ||
           item.aidinformation['aidtype'].toLowerCase().includes(searchTerm) ||
           item. address['city'].toLowerCase().includes(searchTerm)
      );
      };
      const listorder = (datass) => {
        return datass.sort((a,b) => a.aidinformation['amtrequested'] < b.aidinformation['amtrequested'] ? 1 : -1)
      };
  return (
    <>
    <Box
           display="grid"
           gridTemplateColumns="repeat(12, 1fr)"
           >
     <Box
         gridColumn="span 10"
         ></Box>
         <Box
         gridColumn="span 2"
         //gridRow="span 3"
         ></Box>       
    <Box
         gridColumn="span 2"
         gridRow="span 3"
         >
    <TextField
          // label="Search..."
          id="outlined-start-adornment"
          size='small'
          onChange={handleEvent}
           placeholder='Search...'
          sx={{ m: 0, width: '25ch', marginBottom: '10px', marginTop: '10px' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>,
          }}
          variant="outlined"
        />
        </Box>
        <Box
         gridColumn="span 9"
         gridRow="span 3"
         ></Box>
         <Box
         gridColumn="span 1"
         gridRow="span 3"
         ></Box>
         <Box
         gridColumn="span 10"
         ></Box>
         <Box
         gridColumn="span 2"
         ></Box>
         </Box>
         {/* filter((user) => user.indiavolunteer['ivname'].toLowerCase().includes(searchTerm)) */}
         <Dialog open={open} onClose={handleClose}>
       {
        view?
        <Edit currentUser={currentUser} handleClose={handleClose} setView={setView} />:<></>
       }
        </Dialog>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="customized table">
    <TableHead>
    <TableRow>
      <StyledTableCell>Name</StyledTableCell>
      <StyledTableCell>City</StyledTableCell>
      <StyledTableCell>District</StyledTableCell>
      <StyledTableCell>Amount Request</StyledTableCell>
      <StyledTableCell>Aid Type</StyledTableCell>
      <StyledTableCell>Reason for request</StyledTableCell>
      <StyledTableCell>Institution Name</StyledTableCell>
      <StyledTableCell>India Volunteer</StyledTableCell>
      <StyledTableCell>USA Sponsor</StyledTableCell>
      <StyledTableCell>Notes</StyledTableCell>
      <StyledTableCell>comments</StyledTableCell>
      <StyledTableCell>status</StyledTableCell>
      <StyledTableCell>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {/* filter((user) => user.firstname.toLowerCase().includes(searchTerm)) */}
      {/* {
        listall.map((user) =>(
        <Fragment>
          <TableRow key={user._id}>
          {Object.values(user).map((val) => (
            <>
            <TableCell>{val.ausername}<Tooltip opens={opens} onOpen={() => handleOpen(val) } onClose={handleClosed} 
            title="Add"><InfoIcon sx={{ m: 1 }} /></Tooltip></TableCell>
            <TableCell>{val.aidtype}</TableCell>
            <TableCell>{val.reasonforrequesting}</TableCell>
            <TableCell>{val.uname}</TableCell>
            <TableCell>{val.ivname}</TableCell>
            <TableCell>{val.usvname}</TableCell>
            </>
            ))} 
            </TableRow>
         </Fragment>
   ))
  }          */}
      {/* sort((a,b) => a.aidinformation['amtrequested'] < b.aidinformation['amtrequested'] ? 1 : -1) */}
  {
        search(currentPosts).sort((a,b) => a.aidinformation['amtrequested'] < b.aidinformation['amtrequested'] ? 1 : -1).map((user) => (
        <Fragment>
          <StyledTableRow key={user._id}>
            <StyledTableCell>{user.applicant['ausername']}</StyledTableCell>
            <StyledTableCell>{user.address['city']}</StyledTableCell>
            <StyledTableCell>{user.address['district']}</StyledTableCell>
            <StyledTableCell>{user.aidinformation['amtrequested']}</StyledTableCell>
            <StyledTableCell>{user.aidinformation['aidtype']}</StyledTableCell>
            <StyledTableCell>{user.aidinformation['reasonforrequesting']}</StyledTableCell>
            <StyledTableCell>{user.institutiondetails['uname']}</StyledTableCell>
            <StyledTableCell>{user.indiavolunteer['ivname']}</StyledTableCell>
            <StyledTableCell>{user.usavolunteer['usvname']}</StyledTableCell>
            <StyledTableCell>{user.committeenotes}</StyledTableCell>
            <StyledTableCell>{user.comments}</StyledTableCell>
            <StyledTableCell>{user.status}</StyledTableCell>
            <StyledTableCell><EditIcon onClick={()=> editRow(user)}/></StyledTableCell>
            </StyledTableRow>
         </Fragment>
   ))}
   </TableBody>
      </Table>
      </TableContainer>
      <Pagination
                totalPosts={listall.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
    </>
  );
}

export default Views;

// title={currentUser.city+','+district+','+amtrequest+','+aidtype+','+userforrequesting+','+uname+','+ivname}
import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

import axios from "axios";

import {GrPowerReset} from 'react-icons/gr';


const useStyles = makeStyles({
  table: {
    maxWidth: window.innerWidth/2,
  },
})


export default function Board(props) {

  const classes = useStyles();
  const [switchChecked, setSwitchChecked] = useState(false)
  const [rows, setRows] = useState([
    createData(1, 'Alpha', 0, 0, 0, 0, 0),
    createData(2, 'Bravo', 0, 0, 0, 0, 0),
    createData(3, 'Charlie', 0, 0, 0, 0, 0),
    createData(4, 'Delta', 0, 0, 0, 0, 0),
    createData(5, 'Echo', 0, 0, 0, 0, 0),
    createData(6, 'Foxtrot', 0, 0, 0, 0, 0),
  ])
  const [rowChecked, setRowChecked] = useState([true,true,true,true,true,true])
  const [totalCasualties, setTotalCasualties] = useState(0)
  const [hydrants, setHydrants] = useState(0)
  const [hoses, setHoses] = useState(0)
  const [trucks, setTrucks] = useState(0)

  const [p1C, setP1C] = useState(0)
  const [p2C, setP2C] = useState(0)
  const [p3C, setP3C] = useState(0)
  const [p4C, setP4C] = useState(0)
  var interval1
  var rows2 = []

  useEffect( ()=> {
    setTotalCasualties(p1C+p2C+p3C+p4C)
  }, [p1C,p2C,p3C,p4C])

  function createData(_id, name, temp, bars, heartRate, o2ConRate, estTimeRemain){
    return {_id, name, temp, bars, heartRate, o2ConRate, estTimeRemain}
  }

  function switchChangeHandler(e) {
    setSwitchChecked(e.target.checked)
    if (e.target.checked){
      if (interval1 === undefined) {
        interval1 = setInterval( () => {
          Promise.all([
            rows.map( (row) => {
              const idx = row._id;
              return (new Promise( (resolve, reject) => {
                axios({
                  method: 'post',
                  headers: {
                    "Content-Type": "application/json"
                  },
                  url: 'https://python-flask-app-mxaye.mybluemix.net/retrieveDocument',
                  data: { "uid": `${idx}` },
                }).then( res => {
                  row = {
                    name: row.name,
                    _id: parseInt(res.data._id),
                    temp: res.data.temp.toFixed(1),
                    bars: res.data.bars.toFixed(1),
                    heartRate: res.data.heartRate.toFixed(0),
                    o2ConRate: res.data.o2ConRate.toFixed(4),
                    estTimeRemain: (res.data.estTimeRemain/60).toFixed(1),
                  }
                  rows2.push(row)
                  resolve(idx)
                }).catch( (err)=> {
                  clearInterval(interval1)
                  setSwitchChecked(false)
                })
              }))
            })
          ]).then( (values)=> {
            rows2.sort( (row, row2)=>{return row._id-row2._id} )
            if (rows2.length === 6){
              setRows(rows2)
            }
            rows2 = []
          })
        },2000)
      }
    }
    else {
      clearInterval(interval1)
    }
  }

  return (
    <div>
    <Grid container direction='column' justify="space-between" alignItems={'center'} spacing={3}>

      <Grid item style={{marginLeft:'20px', marginTop:'30px'}}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="simple table" padding="none">
            <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={7}>
                <Grid container alignItems="center" justify="center">
                  <Grid item>
                  <Typography variant="h5">
                    Live Readings
                  </Typography>
                  </Grid>
                  <Grid item>
                    <Switch checked={switchChecked} onChange={switchChangeHandler}/>
                  </Grid>
                </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Body Temp (C)</TableCell>
                <TableCell align="center">Tank Pressure (bar)</TableCell>
                <TableCell align="center">Heart Rate (bpm)</TableCell>
                <TableCell align="center">O2 Consumption Rate (bar/s)</TableCell>
                <TableCell align="center">Est. Time Left (min)</TableCell>
                <TableCell align="center">Deployed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"
                  style={row.temp >=37.6 ? {color: 'red'} : {}}>
                  {row.temp}</TableCell>
                  <TableCell align="center"
                  style={row.bars <=150 && rowChecked[row._id-1] ? {color: 'red'} : {}}>
                  {rowChecked[row._id-1] ? row.bars : "-"}</TableCell>
                  <TableCell align="center"
                  style={row.heartRate >=130 ? {color: 'red'} : {}}>
                  {row.heartRate}</TableCell>
                  <TableCell align="center">
                  {rowChecked[row._id-1] ? row.o2ConRate : "-"}</TableCell>
                  <TableCell align="center"
                  style={row.estTimeRemain <=15 && rowChecked[row._id-1] ? {color: 'red'} : {}}>
                  {rowChecked[row._id-1] ? row.estTimeRemain : "-"}</TableCell>
                  <TableCell align="center">
                  <Checkbox
                    checked={rowChecked[row._id-1]}
                    onChange={ (e)=> {
                      let rowChecked2 = rowChecked.map((row_)=>(row_))
                      rowChecked2[row._id-1] = e.target.checked
                      setRowChecked(rowChecked2)
                    }}
                  />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell padding="default" align="center" colSpan={7}>
                <Grid container justify="center" alignItems="center" spacing={3}>
                  <Grid item>
                    <Typography variant="h6">
                      OIC:
                    </Typography>
                  </Grid>
                    <Input placeholder="Name" />
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      O2IC:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Input placeholder="Name" />
                  </Grid>
                </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="default" align="center" colSpan={7}>
                  <Typography variant="h6">
                    Logistics
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="default" align="center" colSpan={7}>
                <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item container direction="column" xs={4}>
                  <Grid item>
                  <Typography variant="body1" >
                    Hydrants: {hydrants}
                  </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton size="small" color="primary" style={{"marginLeft":"5px"}}
                    onClick={()=>{setHydrants(hydrants+1)}}>
                      <AddIcon />
                    </IconButton>
                    <IconButton size="small" color="primary"
                    onClick={()=>{if (hydrants>0) {setHydrants(hydrants-1)}}}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item container direction="column" xs={4}>
                  <Grid item>
                  <Typography variant="body1">
                    Hoses: {hoses}
                  </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton size="small" color="primary" style={{"marginLeft":"5px"}}
                    onClick={()=>{setHoses(hoses+1)}}>
                      <AddIcon />
                    </IconButton>
                    <IconButton size="small" color="primary"
                    onClick={()=>{if (hoses>0) {setHoses(hoses-1)}}}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item container direction="column" xs={4}>
                  <Grid item>
                  <Typography variant="body1">
                    Trucks: {trucks}
                  </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton size="small" color="primary" style={{"marginLeft":"5px"}}
                    onClick={()=>{setTrucks(trucks+1)}}>
                      <AddIcon />
                    </IconButton>
                    <IconButton size="small" color="primary"
                    onClick={()=>{if (trucks>0) {setTrucks(trucks-1)}}}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="default" align="center" colSpan={7}>
                  <Typography variant="h6" style={ totalCasualties>=15 ? {'color':'red'} : {}}>
                    Total Casualties: {totalCasualties}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7} align="center" padding="default">
                <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid container item xs={3} direction="column">
                  <Grid item>
                  <Typography variant="body1" style={ p1C>=10 ? {'color':'red'} : {}}>
                    P1: {p1C}
                  </Typography>
                  </Grid>
                  <Grid item>
                  <IconButton size="small" color="primary"
                  onClick={()=>{setP1C(p1C+1)}}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary"
                  onClick={()=>{if (p1C>0) {setP1C(p1C-1)}}}>
                    <RemoveIcon />
                  </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={3} direction="column">
                  <Grid item>
                  <Typography variant="body1" style={ p4C>=10 ? {'color':'red'} : {}}>
                    P2: {p2C}
                  </Typography>
                  </Grid>
                  <Grid item>
                  <IconButton size="small" color="primary"
                  onClick={()=>{setP2C(p2C+1)}}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary"
                  onClick={()=>{if (p2C>0) {setP2C(p2C-1)}}}>
                    <RemoveIcon />
                  </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={3} direction="column">
                  <Grid item>
                  <Typography variant="body1" style={ p4C>=10 ? {'color':'red'} : {}}>
                    P3: {p3C}
                  </Typography>
                  </Grid>
                  <Grid item>
                  <IconButton size="small" color="primary"
                  onClick={()=>{setP3C(p3C+1)}}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary"
                  onClick={()=>{if (p3C>0) {setP3C(p3C-1)}}}>
                    <RemoveIcon />
                  </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={3} direction="column">
                  <Grid item>
                  <Typography variant="body1" style={ p4C>=10 ? {'color':'red'} : {}}>
                    P4: {p4C}
                  </Typography>
                  </Grid>
                  <Grid item>
                  <IconButton size="small" color="primary"
                  onClick={()=>{setP4C(p4C+1)}}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary"
                  onClick={()=>{if (p4C>0) {setP4C(p4C-1)}}}>
                    <RemoveIcon />
                  </IconButton>
                  </Grid>
                </Grid>
                </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item>
      <IconButton aria-label="reset"
      onClick={()=>{
        axios.get('https://python-flask-app-mxaye.mybluemix.net/initialiseCloudant')
        .then((res)=>{console.log(res)})
      }}
      style={{'fontSize':20, 'color':'black'}}
      >
        <GrPowerReset style={{'marginRight': '10px'}}/>
        Reset Database
      </IconButton>
      </Grid>

    </Grid>

    </div>
  )
}

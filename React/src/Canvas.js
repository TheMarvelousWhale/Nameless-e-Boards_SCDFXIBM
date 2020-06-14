import React, { Component } from 'react';
import { v4 } from 'uuid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {FaEraser} from 'react-icons/fa';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      userStrokeStyle: '#000000',
      activeButton: 'create',
    }
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

  }
  isPainting = false;
  line = [];
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };


  async onMouseDown(e) {
    if (e.target === this.canvas) {
      e.preventDefault();
    }

    const nativeEvent = e.nativeEvent

    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      this.position = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.line = this.line.concat(this.position);
      this.paint(this.prevPos, offSetData, this.state.userStrokeStyle);
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }


  componentDidMount() {

    this.setState({
      width: window.innerWidth - 25,
      height: window.innerHeight - 75,
    })
    this.canvas.width = this.state.width/2 - 25;
    this.canvas.height = this.state.height - 75;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;
  }

  onClickHandler = (e)=> {
    this.canvas.height = this.state.height
  }

  render() {
    return (
      <div>
      <IconButton aria-label="create" color={this.state.activeButton==="create"?"primary":"default"}
      onClick={()=>{
        this.setState({userStrokeStyle: '#000000', activeButton:"create"})
        this.ctx.lineWidth = 2;
      }}
      >
        <CreateIcon />
      </IconButton>

      <IconButton aria-label="erase" color={this.state.activeButton==="erase"?"primary":"default"}
      onClick={()=>{
        this.setState({userStrokeStyle: '#FFFFFF', activeButton:"erase"})
        this.ctx.lineWidth = 25;
      }}
      >
        <FaEraser />
      </IconButton>

      <IconButton aria-label="delete"
      onClick={()=>{
        this.canvas.height=this.state.height
      }}
      >
        <DeleteIcon />
      </IconButton>

      <canvas
        ref={(ref) => (this.canvas = ref)}
        style={{
          background: 'white',
          border:"2px solid black",
          // width:'100%',
          // height:"200%"
        }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
      </div>
    );
  }
}

export default Canvas;

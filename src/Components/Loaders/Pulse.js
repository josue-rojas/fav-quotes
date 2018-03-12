import React, { Component } from 'react';
import './Styles/Pulse.css';

// props
// maxSize: int (px) of max size of pulse
// minSize: int (px) of size of inner circle
// borderSize: int (px) of size of outer circle (border)
// color: string of color
// delay: int (ms) of delay for animation

export default class Pulse extends Component{
  render(){
    const style={
      wrapper:{
        width: this.props.maxSize + 'px',
        height: this.props.maxSize + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      },
      outer:{
        borderRadius: '100%',
        animation: 'pulse ' + this.props.delay + 'ms linear infinite',
        border: this.props.borderSize + 'px solid ' + this.props.color,
      },
      inner:{
        width: this.props.minSize + 'px',
        height: this.props.minSize + 'px',
        backgroundColor: this.props.color,
        borderRadius: '100%',
        position: 'absolute',
        left: 'calc(50% - ' + (this.props.minSize/2) + 'px)',
        top: 'calc(50% - ' + (this.props.minSize/2) + 'px)',

      }
    }
    return(
      <div style={style.wrapper}>
        <div style={style.outer}/>
        <div style={style.inner}/>
      </div>
    )
  }
}

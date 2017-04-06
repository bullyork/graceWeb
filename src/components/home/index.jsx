import React from 'react'
import './index.scss'

class Home extends React.Component{
  componentDidMount(){
    Typed.new('.home .content .test', {
      strings: ["Do one thing at a time, and do well！", "shut up and show me the code!"],
      typeSpeed: 100
    });
    setTimeout(function(){
      $('.more').fadeIn()
    }, 12000)
  }
  render(){
    return (<div className='home'>
      <div className="content">
        <span className="test"></span>
      </div>
      <div className='more'>
        <a href="javascript:;">more</a>
      </div>
    </div>)
  }
}

export default Home
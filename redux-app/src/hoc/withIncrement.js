//HOC
import React from 'react'

const withIncrement = (OriginalComponent) => {
     class updateComponent  extends React.Component{
        state={count:0}
        increment= ()=>{
           this.setState( prevState => { 
                 return {count:prevState.count + 1}
                 })        
        }
    render(){
            return (
                        <OriginalComponent countProp={this.state.count} 
                            incrementProp={this.increment}/>
                    )
        } //end of class     
    }
      return updateComponent
}
export default withIncrement

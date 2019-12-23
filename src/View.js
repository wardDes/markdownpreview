import React, { Component } from 'react';
import marked from 'marked'

const renderer = marked.renderer

export class View extends Component {
    constructor(props){
        super(props)

        this.state = {
            input: ''
          }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({ input: event.target.value});
    }


    render(){
        return (
            <div>
                <textarea id="editor" value={this.state.input} onChange={this.handleChange} type="text"></textarea>
                <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.input, { renderer: renderer })}}></div>
            </div>
        )
    }
}

export default View
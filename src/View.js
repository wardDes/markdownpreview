import React, { Component } from 'react';
import marked from 'marked'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCompressArrowsAlt, faArrowsAlt, } from '@fortawesome/free-solid-svg-icons'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fab, faCompressArrowsAlt, faArrowsAlt)


const renderer = marked.renderer

const placeholder = 
`
# My Online Markdown Previewer

---

## Below are samples of markdown text.



For more on Github's Flavored Markdown Spec click [here](https://github.github.com/gfm) "Github's Flavored Markdown Spec")

Github Flavored Markdown Spec has **extensions** such as \`<table>\` 

Markdown is great for making code snippets look good and readable:

\`\`\`

for (let index = 0; index < array.length; index++) {
    const element = array[index];    
 }
 
\`\`\`

Markdown makes it especially easy to make a list:
- first item
- second item
- third item

> It must be noted that the GitHub markdown and the Common markdown 
vary in indentation and use of spaces as far as where and what HTML is rendered.

| |
---
|![React Logo w/ Text](logo512.png)|
|React Logo|
`

export class View extends Component {
    constructor(props){
        super(props)

        this.state = {
            markdown: placeholder,
            text: [
                "Editor",
                "Previewer"
            ],
            icon: "arrows-alt"
          }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
    }

    handleChange(event){
        this.setState({ markdown: event.target.value});
    }

    handleClickEdit(state){
        var el = document.querySelector(".edDiv")
        var el2 = document.querySelector(".preDiv")
        var el3 = document.querySelector("#editor")
        el2.classList.toggle("hide");
        el.classList.toggle("maximized")
        el3.classList.toggle("editorMaxH")
        this.state.icon === "arrows-alt" ?
            this.setState({...state, icon: "compress-arrows-alt"}) :
            this.setState({...state, icon: "arrows-alt"})
    }

    handleClickPrev(state){
        var el = document.querySelector(".edDiv")
        var el3 = document.querySelector("#preview")
        var el2 = document.querySelector(".preDiv")
        el.classList.toggle("hide");
        el2.classList.toggle("maximized")
        el3.classList.toggle("editorMaxH")
        this.state.icon === "arrows-alt" ?
            this.setState({...state, icon: "compress-arrows-alt"}) :
            this.setState({...state, icon: "arrows-alt"})
    }


    render(){
        return (
            <div>
                <div className="edDiv">
                    <EditToolbar text={this.state.text} 
                                    icon={this.state.icon} 
                                    handleClickEdit={this.handleClickEdit} />
           
                    <textarea id="editor" value={this.state.markdown} onChange={this.handleChange} type="text"></textarea>
                </div>
                <div className="spacer"></div>
                <div className="preDiv">
                    <PreviewToolbar text={this.state.text}
                                    icon={this.state.icon}
                                    handleClickPrev={this.handleClickPrev} />
       
                    <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.markdown, { renderer: renderer })}}></div>
                </div>
            </div>
        )
    }
}

export default View


const EditToolbar = (props) => {
    return (
        <div className="toolbar">
            <div>
                <FontAwesomeIcon icon={['fab', 'free-code-camp']} size="2x" className="frnt" />
                <span id="edText">{props.text[0]}</span>
            </div>
            <FontAwesomeIcon icon={props.icon} onClick={props.handleClickEdit} size="2x" className="bck" />
        </div>
    )
}

const PreviewToolbar = (props) => {
    return (
        <div className="toolbar">
            <div>
                <FontAwesomeIcon icon={['fab', 'free-code-camp']} size="2x" className="frnt" />
                <span id="prevText">{props.text[1]}</span>
            </div>
            <FontAwesomeIcon icon={props.icon} onClick={props.handleClickPrev} size="2x" className="bck" />
        </div >
    )
}
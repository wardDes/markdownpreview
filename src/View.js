import React, { Component } from 'react';
import marked from 'marked'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCompressArrowsAlt, faArrowsAlt, } from '@fortawesome/free-solid-svg-icons'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fab, faCompressArrowsAlt, faArrowsAlt)


const renderer = marked.renderer

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](logo512.png)
## React Logo
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
                    <div className="toolbar">
                        <div>
                            <FontAwesomeIcon icon={['fab', 'free-code-camp']}  size="2x" className="frnt"/>
                            <span id="edText">{this.state.text[0]}</span>
                        </div>
                        <FontAwesomeIcon icon={this.state.icon} onClick={this.handleClickEdit} size="2x" className="bck"/>
                    </div>
                    <textarea id="editor" value={this.state.markdown} onChange={this.handleChange} type="text"></textarea>
                </div>
                <div className="spacer"></div>
                <div className="preDiv">
                    <div className="toolbar">
                        <div>
                            <FontAwesomeIcon icon={['fab', 'free-code-camp']}  size="2x" className="frnt"/>
                            <span id="prevText">{this.state.text[1]}</span>
                        </div>
                        <FontAwesomeIcon icon={this.state.icon} onClick={this.handleClickPrev} size="2x" className="bck" />
                    </div>
                    <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.markdown, { renderer: renderer })}}></div>
                </div>
            </div>
        )
    }
}

export default View
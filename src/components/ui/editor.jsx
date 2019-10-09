import React, { useState, useMemo, useCallback, useContext } from 'react'
import { LiveContext } from 'react-live'
import AceEditor from 'react-ace'
import 'brace/mode/jsx'
import 'brace/'

export const CodeEditor = ({code, disabled, language, onChange, style, minHeight = '100px', theme})=>{

    const getCode = useMemo(()=> code, [code])

    const [editorCode, setEditorCode] = useState(getCode)

    const updateContent = useCallback(code =>{
        setEditorCode(code)
        onChange(code)
    }, [editorCode])
    return (
        <AceEditor
            width={'100%'}
            value={editorCode}
            onChange={updateContent}
            style={{...style, minHeight, maxHeight: '100vh', height:'100%'}}
            name="blah"
            mode={'jsx'}
            theme="monokai"
            showGutter={true}/>
    )
}


export const LiveEditor = props =>{
    const {
        code, language, theme, disabled, onChange
    } = useContext(LiveContext)

    return (
        <CodeEditor theme={theme} code={code} language={'jsx'} disabled={disabled} onChange={onChange} {...props} />
    )
}

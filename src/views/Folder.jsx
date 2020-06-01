import React from "react";
import ExamList from "../components/Common/ExamList";

export default function Folder(props) {
    return (
        <>
            <ExamList
                id={props.match.params.id}
            />
        </>
    );
}

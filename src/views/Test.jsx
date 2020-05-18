import React, {useState} from "react";
import {ReactMic} from 'react-mic';
import Pizzicato from 'pizzicato';

export default function Test() {
    const [record, setRecord] = useState(false);
    const [blobUrl, setBlobUrl] = useState(null)


    const startRecording = () => {
        setRecord(true)

    };


    const stopRecording = () => {
        setRecord(false)

    }

    const onData = (recordedBlob) => {
    }

    const onStop = (recordedBlob) => {


        /* const sound = new Pizzicato.Sound({
             source: 'file',
             options: { path: [recordedBlob.blobURL] }
         }, () => {
             this.props.addSayingRecording({
                 sound: sound,
                 blob: recordedBlob.blob
             })
         });*/


        const sound = new Pizzicato.Sound({
            source: 'file',
            options: {path: [recordedBlob.blobURL]}
        }, (error) => {
            if (!error) {


                let xhr_send = new XMLHttpRequest();
                const filename = new Date().toISOString();
                const formData = new FormData()
                formData.append("recording", recordedBlob.blob, filename)

                xhr_send.open("POST", "http://localhost:8080/uploadAudio", true);
                xhr_send.send(formData);


                /*
                              axios.post('http://localhost:8080/uploadAudio',
                                  formData,
                                  {
                                      headers: {
                                          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                                      },
                                      timeout: 30000,
                                  }
                              )*/

            }

        });

        console.log(sound);

    };
    /*
        useEffect(() => {
            if (blobUrl) {
                upload()
            }
        }, [blobUrl]);
        const upload = () => {

            //load blob
            let xhr_get_audio = new XMLHttpRequest();
            xhr_get_audio.open('GET', blobUrl, true);
            xhr_get_audio.responseType = 'blob';
            xhr_get_audio.onload = function (e) {
                console.log(this.status);
                if (this.status == 200) {
                    const blob = this.response;
                    console.log(blob)
                    //send the blob to the server
                    let xhr_send = new XMLHttpRequest();
                    const filename = new Date().toISOString();
                    xhr_get_audio.onload = function (e) {
                        if (this.readyState === 4) {
                            console.log("Server returned: ", e.target.responseText);
                        }
                    };
                    let fd = new FormData();
                    fd.append("audio_data", blob, filename);
                    xhr_send.open("POST", "http://localhost:8080/uploadAudio", true);
                    xhr_send.send(fd);
                }
            };
            xhr_get_audio.send();

        };*/


    return (
        <div>
            <div>
                <ReactMic
                    record={record}
                    className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081"
                    mimeType="audio/mp3"/>
                <button onClick={startRecording} type="button">Start</button>
                <button onClick={stopRecording} type="button">Stop</button>
            </div>
            {blobUrl && (<audio src={blobUrl} controls="controls"/>)}
        </div>
    );

}
import React, {useCallback, useState} from "react";
import upload from "./upload.svg";
import "./upload.scss";
import {useDropzone} from 'react-dropzone'
import {Error} from "../../Components/Messages/Message";
import {Spinner, UploadCloud} from "../../Components/Icons/Icons";

export default () => {

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length !== 1) {
      setFileUploadError('Please upload a single file at a time')
      return;
    }

    setFileUploadError(null);
    setFile(acceptedFiles[0]);
  }, []);

  const uploadFile = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false});
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  return <div className="upload-files ml-auto mr-auto pt-16 text-center">
    <img src={upload} alt="upload illustration" className="pb-5" />

    <div {...getRootProps()} className={`file-input ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      {file ?
        <p>The selected file is <b>{file.name}</b></p> :
        <p>You can click here or drag a <b>single</b> file in here</p>
      }
    </div>

    {fileUploadError && <div className="mt-5"><Error message={fileUploadError} /></div> }

    {!fileUploadError && file && <button type="submit" className="button submit shadow" onClick={uploadFile} disabled={uploading}>
      {uploading ? <><Spinner /> Uploading</> : <><UploadCloud /> Upload</>}
    </button>}

  </div>

}

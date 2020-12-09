import React, {useCallback, useState} from "react";
import upload from "./upload.svg";
import "./upload.scss";
import {useDropzone} from 'react-dropzone'
import {Error, Success} from "../../Components/Messages/Message";
import {Spinner, UploadCloud} from "../../Components/Icons/Icons";
import {useMutation} from "@apollo/client";
import {UPLOAD} from "../../Apollo/UploadFile";
import {Redirect} from "react-router-dom";
import {client} from "../../client";
import {Submit} from "../../Components/Buttons/Buttons";

export default () => {
  // Mutation section.
  const [mutateUploadFile] = useMutation(UPLOAD);

  const onDrop = useCallback(async (acceptedFiles) => {

    if (acceptedFiles.length !== 1) {
      setFileUploadError('Please upload a single file at a time')
      return;
    }

    const [file] = acceptedFiles;
    setFileUploadError(null);
    setFile(file);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false});

  // Hooks section.
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState('');
  const [fileUploadSuccess, setFileUploadSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const uploadFile = async () => {
    setUploading(true);

    await mutateUploadFile({variables:{file}});

    // Done with the uploading and set the success message or an error message.
    setUploading(false);

    setFileUploadSuccess('The file has uploaded successfully.');
    await client.resetStore();
    setTimeout(() => setRedirect(true), 3000);
  }

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }

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
      {fileUploadSuccess && <div className="mt-5"><Success message={fileUploadSuccess} /></div> }

      {!fileUploadError && !fileUploadSuccess && file && <Submit clickHandler={uploadFile} disabled={uploading}>
        {uploading ? <><Spinner /> Uploading</> : <><UploadCloud /> Upload</>}
      </Submit>}
  </div>
}

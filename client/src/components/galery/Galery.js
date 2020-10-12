import "./Galery.css";
import React, { useState, useRef, useContext } from "react";
import {Breadcrumb} from "../reusable/BreadCrumb/Breadcrumb";
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {BsFolderCheck} from 'react-icons/bs';
import { ModalMask } from "../reusable/modalmask/ModalMask";
import {MimeTypeValidator} from "../../validation/mimeTypeValidator";
import {UserContext} from "../../customHooks/userContext";
import {useFetch} from "../../customHooks/useFetch";
import axios from "axios";
import { MdNavigateNext , MdNavigateBefore, MdClose,MdDelete, MdCloudDownload } from 'react-icons/md';
import { Spinner } from "../reusable/Spinner/Spinner";
import { ImageCard } from "./ImageCard/ImageCard";
import { Logout } from "../reusable/logut/Logout";
// import ProgressBar from "../reusable/ProgressBar/ProgressBar";
export const Galery = ()=>{
 document.documentElement.style.setProperty('--main-background-image', '#007340');
    const {user} = useContext(UserContext);
    const inputFile = useRef();
    const modalWrapper = useRef();
    const [validUpload , setValidUpload] = useState({success : true ,msg : ''});
    const [boolModal, setBoolShow] = useState(false);
    const [highlight, setHighlight] = useState(false);
    const [images,  setImages] = useState({preview : [] , upload: []});
    const { data, loading , handleResponse} = useFetch(`/api/pictures/getusergalery/${user.id}`);
    const [modalImg , setModalImg] = useState({
        index : null,
        path : ''
    });
    const [tab, setTab]= useState('user');
    const handleClick = (e)=>{
        inputFile.current.click();
    }
    const handleHighlight = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setHighlight(true);
    }
    const handleUnHighlight = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
    }
    const handleDrop = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let files = dt.files;
       handleFiles(files);
        handleUnHighlight(e);
    }
    const handleFiles = (files) => {
        let imagesArray = [];
        let photosArray = [];
        for(let file of files){
            const blob = file;
            const urlCreator = window.URL || window.webkitURL || {}.createObjectURL;
            const fileReader = new FileReader();
            fileReader.onloadend = function(e) {
                const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                let header = "";
                for(let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                let errors = MimeTypeValidator(header);
                setValidUpload({...validUpload , ...errors});
                if(errors.success){
                    let fileObj = {
                        ...blob,
                        src: urlCreator.createObjectURL(blob),
                    };
                    imagesArray.push(fileObj);
                    photosArray.push(file);
                    setImages({
                        ...images,
                        preview : [...images.preview ,...imagesArray],
                        upload : [...images.preview , ...photosArray],

                    });
                }
            };
            fileReader.readAsArrayBuffer(blob);
        }
    }
    const handleDelete = (index)=>{
        console.log(images)
        setImages({
            ...images,
            upload : [...images.upload,...images.upload.slice(index + 1)],
            preview : [...images.preview.slice(0, index),...images.preview.slice(index + 1)]
        });
    }
    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        // if( percent < 100 ){
        //   this.setState({ uploadPercentage: percent })
        // }
      }
    }
    const handleUpload =()=>{
        let formData = new FormData();
        for(let pic of images.upload){
            formData.append('image', pic);
        }
        formData.append('id', user.id);
       axios.post('/api/pictures/upload', formData,options).then((res)=> {
           setImages({upload:[],preview:[]})
           handleResponse(`/api/pictures/getusergalery/${user.id}`)
        }).catch(err => console.log(err))
    }
    const handleChange = (e)=>{
        let files = e.target.files;
        handleFiles(files);
    }
    const handleModalShow = (path, index)=> {
        setBoolShow(true);
        setModalImg({
            index : index,
            path : path
        })
    }
    const handlePicChange = (str) =>{
       if(str === 'prev'){
           setModalImg({
               ...modalImg,
               index : modalImg.index -1,
               path : data[modalImg.index - 1].path

           })
       } else {
           setModalImg({
               ...modalImg,
               index : modalImg.index +1,
               path : data[modalImg.index + 1].path

           })
       }
    }
    const handleClose = () =>{
        setBoolShow(false);
    }
    const handleDownload = (objImg)=>{
        axios({
            url: `/api/pictures/getimg/${data[objImg.index]._id}`, 
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'img.jpg');
            document.body.appendChild(link);
            link.click();
        });
    }
    const handleDeleteIMG = (objImg)=>{
        axios.post(`/api/pictures/deleteimg/${data[objImg.index]._id}` , {user_id : user.id , path :objImg.path }).then(response=>{
            if(response.data.success){
                setBoolShow(false);
                handleResponse(`/api/pictures/getusergalery/${user.id}`)
            }
        })
    }
    const handleChangeTab = (str) =>{
        setTab(str);
        if(str === 'user'){
            handleResponse(`/api/pictures/getusergalery/${user.id}`)
        } else {
            handleResponse(`/api/pictures/getothersgalery/${user.id}`)
        }
    }
    const handleWrapperClose = (e) =>{
        if(e.target === modalWrapper.current){
            handleClose();
        }
    }
    return(
       <>
            <Breadcrumb />
            <div className="galery-heading">Image galery</div>
           {tab === 'user' &&  <div 
                className={ highlight ? "upload-file-wrapper highlight" : "upload-file-wrapper"}
                onClick={handleClick} 
                onDragEnter={handleHighlight}
                onDragOver={handleHighlight}
                onDragLeave={handleUnHighlight}
                onDrop={handleDrop}
            >
                <AiOutlineCloudUpload/> Upload foto
                <p>or drag it over</p>
                <input type="file" className="upload-file-btn" ref={inputFile} onChange={handleChange} />
                {validUpload.success === false && <p className="error-message">{validUpload.msg}</p>}
            </div>}
            <div className={images.preview.length > 0 ? "custom-file-preview" : '' }>
            {images.preview.length > 0 &&
                images.preview.map((item, index) => {
                return (
                    <div className="prev-img" key={index} data-imgindex={index}>
                        <span onClick={()=>{handleDelete(index)}}>&times;</span>
                        <img src={item.src} alt={item.name} />
                        {/* <ProgressBar progress={100}/> */}
                    </div>
                    
                );
            })}
            {images.preview.length>0 && 
                <div className="confirm-upload" onClick={handleUpload}>
                    <BsFolderCheck/>
                </div>
            }
            </div>
            <div className="tabs-wrapper">
                <span className={tab === 'user' ? 'active' : ''} onClick={()=>{
                    handleChangeTab('user')
                }}>My galery</span>
                <span  className={tab === 'others' ? 'active' : ''} onClick={()=>{
                    handleChangeTab('others')
                }}>Others</span>
            </div>
            {data ?<div className="img-grid">
                {data.length > 0  ? data.map((item, index) =>{
                    return (
                        <ImageCard path={item.path} key={index} openModal = {()=>{handleModalShow(item.path , index)}}/>
                    )
                }) : 'No records at the moment'}
            </div> :  
            <Spinner /> }
            {boolModal && 
                <ModalMask boolShow={boolModal}>
                    <div className="modal-img-wrapper" ref={modalWrapper} onClick={handleWrapperClose}>
                       {modalImg.index !== 0 &&  <span className="previous controls" onClick={()=>{handlePicChange('prev')}}>
                            <MdNavigateBefore/>
                        </span>}
                        <span className="image-hoder">
                            <span className="close controls" onClick={handleClose}>
                                <MdClose/>
                            </span>
                            <img src={modalImg.path}  alt="..." style={{ width: '500px' , height: '500px'}} />
                            {tab === 'user' && <span className="delete controls" onClick={()=>{
                                handleDeleteIMG(modalImg);
                            }}> <MdDelete/> </span>}
                            <span className="download controls" onClick={()=>{
                                handleDownload(modalImg);
                            }}><MdCloudDownload/></span>
                        </span>
                        {modalImg.index < data.length -1 && <span className="next controls" onClick={()=>{
                            handlePicChange('next')
                        }}>
                            <MdNavigateNext />
                        </span>}
                    </div>
                </ModalMask>
            }
            <Logout />
       </>
    )
}
import React, { useRef, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  IoSearch,
  IoSettingsOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { FaRegBell } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineAreaChart } from "react-icons/ai";
import { PiTagChevronBold } from "react-icons/pi";
import { RiBearSmileLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import "./App.css";
import Home from "./home.jsx";
import Message from "./message.jsx";
import Bell from "./bell.jsx";
import Postpage from "./postpage.jsx";

function App() {
  const [selectedIcon, setSelectedIcon] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showNicky, setShowNicky] = useState(true);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);


  const navigate = useNavigate();
  const modal1Ref = useRef();
  const searchModalRef = useRef();
  const uploadRef = useRef();

  const handleIconClick = (iconName, event) => {
    event.stopPropagation();
    console.log(iconName);
    setSelectedIcon(iconName);
    if (iconName === "home") {
      navigate("/");
      window.location.reload();
    } else if (iconName === "more") {
      setIsModalOpen((pre) => !pre);
    } else if (iconName === "search") {
      setIsSearchOpen(true);
      setIsModalOpen(false);
      setShowNicky(false);
    } else if (iconName === "message") {
      navigate("/message");
    } else if (iconName === "bell") {
      navigate("/notification");
    } else if (iconName === "add") {
      const modal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.show();
    } else {
      setShowNicky(true);
    }
  };

  const iconStyle = (iconName) => ({
    fontSize: "20px",
    fontWeight: selectedIcon === iconName ? "bold" : "normal",
  });

  const handleModalClose = (event) => {
    if (event && modal1Ref.current && !modal1Ref.current.contains(event.target)) {
      if (isModalOpen) {
        setIsModalOpen(false);
      }
    }
    if (
      event && searchModalRef.current &&
      !searchModalRef.current.contains(event.target)
    ) {
      if (isSearchOpen) {
        setIsSearchOpen(false);
        setShowNicky(true);
      }
    }
    if (event && uploadRef.current && !uploadRef.current.contains(event.target)) {
      if (isImageUploaded) {
        cancelImage();
      }
    }
  };

  const resetImage = ()=>{
    setImageFile("");
  }

  const handleClear = () => {
    setSearchText("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; 
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      const url = URL.createObjectURL(file);
      reader.onload = function (e) {
        setImagePreview(url);
        setIsImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelImage = () => {
    setIsImageUploaded(false);
    setImagePreview("");
  };

  const submit = () => {
    if (isImageUploaded === true){
      navigate('/post');
      setIsImageUploaded(false);
    }else{
      alert('內容不可為空白')
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleModalClose);
    return () => {
      document.removeEventListener("click", handleModalClose);
    };
  }, [isModalOpen, isSearchOpen, isImageUploaded]);

  return (
    <div className="container1">
      <div className="list">
        <div
          className="title"
          onClick={(event) => handleIconClick("home", event)}
        >
          <div
            className={`title-transition ${
              showNicky ? "title-visible" : "title-hidden"
            }`}
          >
            Nicky
          </div>
          <div className={`bear ${showNicky ? "icon-hidden" : "icon-visible"}`}>
            <RiBearSmileLine />
          </div>
        </div>
        <div className="icons">
          <div
            className="icon"
            onClick={(event) => handleIconClick("home", event)}
          >
            <AiOutlineHome style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text" style={iconStyle("home")}>
              首頁
            </div>
          </div>
          <div
            className="icon"
            onClick={(event) => {
              handleIconClick("search", event);
            }}
          >
            <IoSearch style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text" style={iconStyle("search")}>
              搜尋
            </div>
          </div>
          <div
            className="icon"
            onClick={(event) => {
              handleIconClick("message", event);
            }}
          >
            <TbMessageCircle style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text" style={iconStyle("message")}>
              訊息
            </div>
          </div>
          <div
            className="icon"
            onClick={(event) => {
              handleIconClick("bell", event);
            }}
          >
            <FaRegBell style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text" style={iconStyle("bell")}>
              通知
            </div>
          </div>
          <div
            className="icon"
            onClick={(event) => {
              handleIconClick("add", event);
            }}
          >
            <IoMdAddCircleOutline
              style={{ fontSize: "30px", margin: "10px" }}
            />
            <div className="icon-text" style={iconStyle("add")}>
              建立
            </div>
          </div>
          <div
            className="iconLast"
            onClick={(event) => {
              handleIconClick("more", event);
            }}
          >
            <CgDetailsMore style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text" style={iconStyle("more")}>
              更多
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Message />} />
        <Route path="/notification" element={<Bell />} />
        <Route path="/post" element={<Postpage imagePreview={imagePreview} handleModalClose={handleModalClose} isImageUploaded={isImageUploaded} imageFile={imageFile} resetImage={resetImage}/>} />
      </Routes>
      {isModalOpen && (
        <div className="modal1" ref={modal1Ref}>
          <div className="modal-content1">
            <IoSettingsOutline style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text">設定</div>
          </div>
          <div className="modal-content1">
            <AiOutlineAreaChart style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text">你的動態</div>
          </div>
          <div className="modal-content1" style={{ marginBottom: "5px" }}>
            <PiTagChevronBold style={{ fontSize: "30px", margin: "10px" }} />
            <div className="icon-text">我的珍藏</div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              height: "2px",
              width: "100%",
            }}
          ></div>
          <div className="modal-content1" style={{ marginTop: "5px" }}>
            <div className="icon-text">切換帳號</div>
          </div>
          <div className="modal-content1" style={{ marginBottom: "5px" }}>
            <div className="icon-text">登出</div>
          </div>
        </div>
      )}
      <div
        className={`search-modal ${isSearchOpen ? "show" : ""}`}
        onClick={handleModalClose}
        ref={searchModalRef}
      >
        <div className="search-header">
          <h3 style={{ margin: "25px", fontWeight: "bold" }}>搜尋</h3>
        </div>
        <div
          className="input-wrapper"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <input
            type="text"
            className={`searching ${
              !isFocused && searchText ? "placeholder-color" : ""
            }`}
            placeholder="搜尋"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <IoCloseCircleOutline
              className="clear-icon"
              onClick={handleClear}
            />
          )}
        </div>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "1px",
            width: "100%",
            marginTop: "40px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <h5 style={{ marginLeft: "30px", fontWeight: "bold" }}>最近</h5>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" ref={uploadRef}>
          <div className="modal-content">
            <div className="modal-header">選擇圖片</div>
            <div className="modal-body" id="modalBody">
            {isImageUploaded ? (
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <div className="image-upload">
                  <CiImageOn style={{ fontSize: "80px" }} />
                  <p>將圖片上傳至這裡</p>
                  <div className="upload-container">
                    <label className="file-label btn btn-primary">
                      上傳圖片
                      <input
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cancelImage}
              >
                取消
              </button>
              <button type="button" className='btn btn-primary' onClick={submit} data-bs-dismiss = {isImageUploaded?"modal":undefined}>
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

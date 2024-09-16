import React from "react";

function Message() {
  return (
    <div className="notlist">
      <div className="message-list">
        <div
          style={{
            width: "100%",
            height: "120px",
            display: "flex",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            paddingLeft: "20px",
          }}
        >
          username
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "20px",
            margin: "20px",
          }}
        >
          訊息
        </div>
        <div className="friends"></div>
      </div>
      <div className="messagebox">
          <div className="friend-user">朋友的名字</div>
          <div className="message"></div>
      </div>
    </div>
  );
}
export default Message;

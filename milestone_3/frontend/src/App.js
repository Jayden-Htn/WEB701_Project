import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardStaff from "./components/BoardStaff";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatLogsRef = useRef(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowStaffBoard(user.role.includes("role_staff"));
      setShowAdminBoard(user.role.includes("role_admin"));
      setShowUserBoard(user.role.includes("role_beneficiary"));
    }
  }, []);

  const logOut = () => {
    setShowStaffBoard(false);
    setShowAdminBoard(false);
    setShowUserBoard(false);
    setCurrentUser(undefined);
    AuthService.logout();
  };

  // For chatbot
  useEffect(() => {
    // Scroll to the bottom of the chat logs when a new message is added
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages]);

  const generateMessage = (msg, type) => {
    const newMessage = {
      id: messages.length + 1,
      text: msg,
      type,
    };
    setMessages([...messages, newMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    generateMessage(input, "self");
    setInput("");

    // Simulate response
    setTimeout(() => {
      generateMessage("Hello! How can I assist you today?", "user");
    }, 1000);
  };

  const handleButtonResponse = (name) => {
    generateMessage(name, "self");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Nav bar section */}
      <nav className="navbar navbar-expand navbar-dark">
        <Link to={"/"} className="logo">
          <img src={"./logo.png"} className="logo"></img>
        </Link>
        <Link to={"/"} className="navbar-brand">
          Re:Tech
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/about"} className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/contact"} className="nav-link">
              Contact
            </Link>
          </li>
          {showStaffBoard && (
            <li className="nav-item">
              <Link to={"/staff"} className="nav-link">
                Staff
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            </li>
          )}
          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Shop
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Account
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>

      {/* Main body section */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/staff" element={<BoardStaff/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
        </Routes>
      </div>

      {/* Chatbot overlay */}
      <div className="chat-container">
        <button id="chat-circle" onClick={toggleChat}>
          <ion-icon name="chatbox-ellipses-outline" class="icon">Chat</ion-icon>
        </button>
        {isChatOpen && (
          <div className="chat-box">
            <div className="chat-box-header">
              <h3>Re:Tech Chatbot</h3>
              <button className="chat-box-toggle" onClick={toggleChat}>
                <ion-icon name="close-outline">Close</ion-icon>
              </button>
            </div>
            <div className="chat-logs" ref={chatLogsRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.type}`}>
                  <div className="cm-msg-text">{msg.text}</div>
                </div>
              ))}
            </div>
            <form className="form-group" onSubmit={handleSendMessage}>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="chat-submit" type="submit">
                <ion-icon name="send-outline">Send</ion-icon>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer section */}
      <footer className="footer">
        <footer-section>
          <h3>Address</h3>
          <p>Re:Tech Charity,</p>
          <p>114 Recycle Lane,</p>
          <p>Tahunanui,</p>
          <p>Nelson NZ,</p>
        </footer-section>

        <footer-section>
          <h3>Pages</h3>
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/home"} className="footer-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="footer-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="footer-link">
                Contact
              </Link>
            </li>
            {showStaffBoard && (
              <li className="nav-item">
                <Link to={"/staff"} className="footer-link">
                  Staff
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="footer-link">
                  Admin
                </Link>
              </li>
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="footer-link">
                  Shop
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="footer-link">
                  Account
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="footer-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="footer-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="footer-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </footer-section>

        <footer-section>
          <h3>Social Media</h3>
          <Link href="/" className="footer-link footer-link-override">Instagram</Link>
          <Link href="/" className="footer-link footer-link-override">Twitter</Link>
          <Link href="/" className="footer-link footer-link-override">YouTube</Link>
          <Link href="/" className="footer-link footer-link-override">Email</Link>
        </footer-section>
      </footer>
    </div>
  );
};

export default App;
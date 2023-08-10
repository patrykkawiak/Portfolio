import { Form } from "react-router-dom";
import ImgBg from "../../assets/img/phone.png";
import Heading from "../UI/Heading";
import { useState } from "react";
const Contact = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = () => {
    setTitle("");
    setName("");
    setMsg("");
    alert('message sent');
  };

  return (
    <section
      class="contact"
      id="contact"
      data-aos="zoom-in-up"
      data-aos-delay="1000"
      data-aos-offset="100"
      data-aos-duration="800"
      data-aos-once="true"
    >
      <img src={ImgBg} alt="mobile phone background" />
      <div class="wrapper">
        <Heading classes={"contact-heading"}>Contact</Heading>
        <div class="contact-inputs">
          <Form class="form" method="post" onSubmit={handleSubmit}>
            <div class="form-boxes">
              <div class="form-box">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitle}
                  class="form_input title"
                  name="title"
                  id="title"
                />
                <label class="form_label">Title</label>
                <label class="form_label-addon">
                  <i class="bx bx-edit-alt"></i>
                </label>
              </div>
              <div class="form-box">
                <input
                  type="text"
                  value={name}
                  onChange={handleName}
                  class="form_input name"
                  name="name"
                  id="name"
                />
                <label class="form_label">Name</label>
                <label class="form_label-addon">
                  <i class="bx bx-user"></i>
                </label>
              </div>
              <div class="area">
                <textarea
                  class="message"
                  value={msg}
                  onChange={handleMsg}
                  name="msg"
                  id="msg"
                ></textarea>
                <label class="area_label">Message</label>
              </div>
              <button class="send-btn animated-btn" type="submit">
                Send
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

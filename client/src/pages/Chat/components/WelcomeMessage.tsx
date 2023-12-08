/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../../assets/robot.gif";
import Cookies from "js-cookie";

export default function Welcome() {
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
   setUserName(
    //@ts-expect-error
        JSON.parse(Cookies.get('info')).fullname
      );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Hoşgeldin, <span>{userName}!</span>
      </h1>
      <h3>Kişi seçerek sohbet etmeye başlayabilirsin.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #67686b;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
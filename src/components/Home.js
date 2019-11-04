import React from "react";
import styled from "styled-components";
import isElectron from "is-electron";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const FormGrp = styled.div`
  display: block;
  width: 300px;
  margin: 30px auto;
`;

const Label = styled.label`
  margin-bottom: 0.5em;
  color: #000;
  display: block;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type
}))`
  padding: 0.5em;
  border: none;
  width: 100%;
  margin-bottom: 0.5em;
  outline: none;
  box-sizing: border-box;

  background-color: #8a939f;
  color: #fff;
  font-size: 1em;
  border-radius: 3px;
  &::placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
  outline: none;
  padding: 0.5em;
  border: none;
  margin-top: 2em;
  font-size: 1em;
  color: #fff;
  background-color: #2d9cdb;
  width: 100%;
  border-radius: 3px;
`;

const Link = ({ className, children }) => (
  <a href="###" className={className}>
    <b>{children}</b>
  </a>
);
const LinkStyle = styled(Link)`
  color: #000;
  text-decoration: none;
`;

function Home() {
  function showCamera() {
    ipcRenderer.send("toogle-camera");
  }

  return (
    <div className="home-login">
      <div className="contenedor">
        <FormGrp>
          <Label>Usuario</Label>
          <Input
            type="text"
            required
            placeholder="Escribe tu nombre de usuario"
          />
        </FormGrp>

        <FormGrp>
          <Label>Contraseña</Label>
          <Input type="password" required placeholder="Escribe tu contraseña" />
        </FormGrp>

        <FormGrp>
          <Button>Log in</Button>
        </FormGrp>

        <FormGrp>
          <p>Olvidaste tu contraseña?</p>
          <LinkStyle>Haz click aqui</LinkStyle>
          <Button onClick={() => showCamera()}>Camara</Button>
        </FormGrp>
      </div>
    </div>
  );
}

export default Home;

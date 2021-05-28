import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: -4px;
`;

/*
All SVG icons are from https://tablericons.com/
1280 Fully customizable free SVG icons. (MIT license)
*/

const Add = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#ffffff"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
    <path d="M6 19a2 2 0 0 1 -2 -2v-4l-1 -1l1 -1v-4a2 2 0 0 1 2 -2" />
    <path d="M18 19a2 2 0 0 0 2 -2v-4l1 -1l-1 -1v-4a2 2 0 0 0 -2 -2" />
  </svg>
);

const CreateAgreement = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#ffffff"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
    <path d="M16 7h4" />
    <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
  </svg>
);

const Agreement = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
    <line x1="9" y1="7" x2="13" y2="7" />
    <line x1="9" y1="11" x2="13" y2="11" />
  </svg>
);

const Wallet = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
  </svg>
);

export interface SvgProps {
  icon: string;
}

export const SVG = ({ icon }: SvgProps) => {
  let svgIcon;
  switch (icon) {
    case "add":
      svgIcon = Add;
      break;
    case "createAgreement":
      svgIcon = CreateAgreement;
      break;
    case "agreement":
      svgIcon = Agreement;
      break;
    case "wallet":
      svgIcon = Wallet;
      break;
    default:
      throw new Error("Please specify pattern type");
  }
  return <Wrapper>{svgIcon}</Wrapper>;
};

export default SVG;
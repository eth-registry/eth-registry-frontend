import React, { useState } from "react";
import styled from 'styled-components';
import { Body, BodyWrapper, Byline } from '../theme/components';

export default function Report() {
  return (
    <BodyWrapper>
      <Byline>Report a malicious address</Byline>
      <Body>
        We also enable users to report addresses they might consider malicious to the curated registry. Please use the form below
        and we will review your submission!
      </Body>
    </BodyWrapper>
  );
}

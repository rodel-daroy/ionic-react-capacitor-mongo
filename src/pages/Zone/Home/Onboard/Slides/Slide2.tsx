import React from 'react';
import { logo } from 'src/assets/images';
import { StyledSlide, StyledInput, FieldInfo, StyledLogo } from './styles';

interface IProps {
    setUsername: (value: string) => void;
}
export const Slide2: React.FC<IProps> = ({ setUsername }: IProps) => {
    return (
        <StyledSlide>
            <StyledLogo src={logo}></StyledLogo>
            <StyledInput placeholder="Userame" onIonChange={(e) => setUsername(e.detail.value!)}></StyledInput>
            <FieldInfo>Your nickname will be publicly viewable</FieldInfo>
        </StyledSlide>
    );
};

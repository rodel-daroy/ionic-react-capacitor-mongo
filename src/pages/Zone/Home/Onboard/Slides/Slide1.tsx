import React from 'react';
import { StyledSlide, StyledLogo, StyledInput, FieldInfo } from './styles';
import { logo } from 'src/assets/images/icons';

interface IProps {
    setFirstname: (value: string) => void;
    setLastname: (value: string) => void;
}
export const Slide1: React.FC<IProps> = ({ setFirstname, setLastname }: IProps) => {
    return (
        <StyledSlide>
            <StyledLogo src={logo}></StyledLogo>
            <StyledInput
                placeholder="First Name"
                onIonChange={(e) => setFirstname(e.detail.value!)}
                required
            ></StyledInput>
            <StyledInput
                placeholder="Last Name"
                onIonChange={(e) => setLastname(e.detail.value!)}
                required
            ></StyledInput>
            <FieldInfo>Your name and surname will stay private</FieldInfo>
        </StyledSlide>
    );
};

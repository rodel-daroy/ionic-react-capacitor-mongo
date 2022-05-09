import React from 'react';
import {
    StyledSlide,
    StyledSlider,
    SlideTitle,
    SlideParagraph,
    SlideImage,
    SlideImageWrapper,
    LoginButton,
} from './styles';
//images
//import { Logo_HiRes } from '../../../assets/images';
import { welcome, collect, play, trade, social, dogood } from '../../../assets/images/Onboarding_Slides';

export interface ISlideProps {
    setSlideshow(arg: boolean): void;
    slideshow: boolean;
}

export const Slider: React.FC<ISlideProps> = (props: ISlideProps) => {
    const { setSlideshow, slideshow } = props;

    const slideshowComplete = (arg: boolean) => {
        if (slideshow) {
            return setSlideshow(arg);
        }
    };

    return (
        <StyledSlider pager={true}>
            <StyledSlide>
                <SlideTitle>Welcome To Fanzone</SlideTitle>
                <SlideParagraph>
                    The ultimate platform for digital sport collectibles (NFTs) and fan experience.
                </SlideParagraph>
                <SlideImageWrapper>
                    <SlideImage src={welcome} />
                </SlideImageWrapper>
                <SlideParagraph>Let&apos;s discover FANZONE together!</SlideParagraph>
            </StyledSlide>
            <StyledSlide>
                <SlideTitle>Collect</SlideTitle>
                <SlideParagraph>
                    Buy limited cards and packs to build up your collections of stars and athletes.
                </SlideParagraph>
                <SlideImageWrapper>
                    <SlideImage src={collect} />
                </SlideImageWrapper>
            </StyledSlide>
            <StyledSlide>
                <SlideTitle>Play</SlideTitle>
                <SlideParagraph>
                    Compete in fantasy sports challenges to earn rare cards and special awards.
                </SlideParagraph>
                <SlideImageWrapper>
                    <SlideImage src={play} />
                </SlideImageWrapper>
            </StyledSlide>
            <StyledSlide>
                <SlideTitle>Trade</SlideTitle>
                <SlideParagraph>
                    Acquire cards you think have potential and sell when they’ve increased in value.
                </SlideParagraph>
                <SlideImageWrapper>
                    <SlideImage src={trade} />
                </SlideImageWrapper>
            </StyledSlide>
            <StyledSlide>
                <SlideTitle>Social</SlideTitle>
                <SlideParagraph>
                    Acquire cards you think have potential and sell when they’ve increased in value.
                </SlideParagraph>
                <SlideImageWrapper>
                    <SlideImage src={social} />
                </SlideImageWrapper>
            </StyledSlide>
            <StyledSlide>
                <SlideTitle>LET’S DO GOOD</SlideTitle>
                <SlideParagraph>
                    By using the app, you support sustaibable sports and enviromental projects.
                </SlideParagraph>
                <SlideImageWrapper>
                    <SlideImage src={dogood} />
                </SlideImageWrapper>
                <LoginButton onClick={() => slideshowComplete(true)}>Get Started</LoginButton>
            </StyledSlide>
        </StyledSlider>
    );
};

import React, { ReactNode, useCallback } from 'react';
import { StyledGridWrapper } from './style';

interface IProps {
    children: ReactNode;
    onClick: (target: React.MouseEvent<HTMLUListElement, MouseEvent>) => void | Promise<void>;
}
export const Grid: React.FC<IProps> = (props: IProps) => {
    const { children, onClick } = props;

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
            void onClick(e);
        },
        [onClick],
    );

    return <StyledGridWrapper onClick={handleClick}>{children}</StyledGridWrapper>;
};

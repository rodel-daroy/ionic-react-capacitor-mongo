import React, { useCallback } from 'react';
import { IonButton, useIonRouter } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { StyledBackButton, StyledBackIcon, StyledLabel } from './style';
import { ExtractProps } from 'src/utility';

type IProps = {
    label?: string;
    to?: string;
    onClick?: (to?: string) => void;
} & ExtractProps<typeof IonButton>;

export const BackButton: React.FC<IProps> = ({ onClick, label, to, children, ...props }: IProps) => {
    const router = useIonRouter();

    const handleClick = useCallback(() => {
        if (typeof onClick === 'function') return onClick(to);
        if (to) router.push(to, 'root');
    }, [onClick, router, to]);

    return (
        <StyledBackButton {...props} onClick={handleClick}>
            <StyledBackIcon icon={chevronBack} onClick={handleClick} />
            {label && <StyledLabel>{label}</StyledLabel>}
            {children}
        </StyledBackButton>
    );
};

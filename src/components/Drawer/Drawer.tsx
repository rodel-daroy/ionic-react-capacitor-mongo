import { IonButtons, IonPage, IonSpinner, IonText, IonToolbar } from '@ionic/react';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { STATUS } from 'src/utility';
import { BackButton } from '../BackButton';
import { StyledDrawerContent, StyledDrawerHeader } from './style';

interface IProps {
    title?: string;
    status?: STATUS;
    error?: string;
    children: {
        header?: ReactNode;
        body?: ReactNode;
        footer?: ReactNode;
    };
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer: React.FC<IProps> = (props: IProps) => {
    const { isOpen, children, error, status, onClose, title } = props;

    let content: ReactNode;
    switch (status) {
        case STATUS.LOADING:
            content = <IonSpinner />;
            break;
        case STATUS.FAILED:
            content = <IonText>{error}</IonText>;
            break;
        case STATUS.IDLE:
        default:
            content = children.body;
    }

    const container = document.querySelector('ion-app');

    return isOpen ?? true
        ? container &&
              ReactDOM.createPortal(
                  <IonPage>
                      {children.header && children.header}
                      {title && (
                          <StyledDrawerHeader>
                              <IonToolbar>
                                  <IonButtons slot="start">
                                      <BackButton mode="ios" onClick={onClose}>
                                          {title}
                                      </BackButton>
                                  </IonButtons>
                              </IonToolbar>
                          </StyledDrawerHeader>
                      )}
                      <StyledDrawerContent fullscreen>{content}</StyledDrawerContent>
                  </IonPage>,
                  container,
              )
        : null;
};

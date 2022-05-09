import React, { useEffect, useRef, useState } from 'react';
import { IonModal } from '@ionic/react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { Button } from 'src/components';

interface IProps {
    image: HTMLImageElement;
    callback: (resultUrl: string) => void;
    isOpen: boolean;
}

export const ImageCropper: React.FC<IProps> = ({ image, callback, isOpen }: IProps) => {
    const [cropper, setCropper] = useState<Cropper>();
    const cropperRef = useRef<HTMLImageElement>(null);

    const handleConfirm = () => {
        if (!cropper) return;
        const dataUrl = cropper.getCroppedCanvas().toDataURL();
        callback(dataUrl);
    };

    useEffect(() => {
        if (image && cropperRef.current) {
            setCropper(
                new Cropper(cropperRef.current, {
                    aspectRatio: 1,
                    viewMode: 3,
                }),
            );
        }
    }, [image]);

    return (
        <IonModal isOpen={isOpen}>
            <div>
                <img
                    alt="Cropper"
                    style={{ display: 'block', maxWidth: '100%' }}
                    ref={cropperRef}
                    id="cropperImage"
                    src={image?.src}
                />
            </div>
            <Button onClick={handleConfirm}>Confirm</Button>
        </IonModal>
    );
};

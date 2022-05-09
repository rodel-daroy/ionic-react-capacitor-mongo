import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { Button, Drawer } from 'src/components';
import { IonAvatar } from '@ionic/react';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { isPlatform } from '@ionic/react';
import { ImageCropper } from 'src/features/userData/AccountSettings/ImageCropper';

export type FileEventTarget = EventTarget & { files: FileList };

interface Event<T = EventTarget> {
    target: T;
}

export const ProfileImageDrawer: React.FC = () => {
    const { status, error, me: user } = useSelector((state: RootState) => state.userData);

    const defaultAvatar = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';

    const [image, setImage] = useState<HTMLImageElement | null>();
    const [avatar, setAvatar] = useState<string>(user?.media?.profilePhoto || defaultAvatar);

    useEffect(() => {
        if (!user?.media?.profilePhoto) return;
        setAvatar(user.media.profilePhoto);
    }, [user?.media?.profilePhoto]);

    const onEdit = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        if (isPlatform('hybrid')) {
            event.preventDefault();
            void FileChooser.open().then((uri) => {
                void FilePath.resolveNativePath(uri).then((file: string) => {
                    const filePath: string = file;
                    if (filePath) {
                        void Base64.encodeFile(filePath).then((base64File: string) => {
                            const image = new Image();
                            image.src = URL.createObjectURL(base64File);
                            setImage(image);
                        });
                    }
                });
            });
        }
    };

    const handleCrop = (resultUrl: string) => {
        setAvatar(resultUrl);
        setImage(null);
    };

    const handleWebFileSelected = (event: Event<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) {
            return;
        }
        const file = event.target.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            if (typeof fr.result !== 'string') {
                return;
            }
            const image = new Image();
            image.src = fr.result;
            setImage(image);
        };
        fr.readAsDataURL(file);
    };

    return (
        <Drawer status={status} error={error?.message}>
            {{
                body: (
                    <React.Fragment>
                        <p>Change picture</p>
                        <label onClick={onEdit} htmlFor="avatar">
                            <IonAvatar>
                                <img alt="yourself" src={avatar} />
                            </IonAvatar>
                        </label>
                        <input
                            onChange={handleWebFileSelected}
                            style={{ display: 'none' }}
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                        />
                        <Button>Confirm</Button>
                        {image && <ImageCropper isOpen={!!image} callback={handleCrop} image={image} />}
                    </React.Fragment>
                ),
            }}
        </Drawer>
    );
};

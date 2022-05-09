import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { Button, Drawer } from 'src/components';
import { updateUserData } from 'src/features/userData/userDataSlice';

interface IProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const UsernameDrawer: React.FC<IProps> = (props: IProps) => {
    const { status, error, me: user } = useSelector((state: RootState) => state.userData);

    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        if (!user?.username) return;
        setUsername(user.username);
    }, [user?.username]);

    const handleConfirm = useCallback(() => {
        void dispatch(updateUserData({ username }));
    }, [username, dispatch]);

    return (
        <Drawer
            isOpen={props.isOpen}
            onClose={props.onClose}
            status={status}
            error={error?.message}
            title="Change Username"
        >
            {{
                body: (
                    <React.Fragment>
                        <h2>Change nickname</h2>
                        <p>
                            Please bear in mind that the first nickname change is on us, from the second on, the cost is
                            xxxx Fzn.
                        </p>
                        <label htmlFor="username">New nickname</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            type="text"
                            id="username"
                            name="username"
                        />
                        <Button onClick={handleConfirm}>Confirm</Button>
                    </React.Fragment>
                ),
            }}
        </Drawer>
    );
};

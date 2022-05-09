import React from 'react';
import style from './ExploreContainer.module.sass';

interface ContainerProps {
    name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }: ContainerProps) => {
    return (
        <div className={style['container']}>
            <strong>{name}</strong>
            <p>
                Explore{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
                    UI Components
                </a>
            </p>
        </div>
    );
};

export default ExploreContainer;
